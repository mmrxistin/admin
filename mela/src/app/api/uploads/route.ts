// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import type { MediaType } from "@prisma/client";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 16 * 1024 * 1024; // 16MB
const MAX_FILES = 5;

function mediaTypeOf(mime: string): MediaType | null {
  if (mime.startsWith("image/")) return "IMAGE";
  if (mime.startsWith("video/")) return "VIDEO";
  return null;
}

export async function POST(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const files = formData.getAll("files") as File[];

  if (!files.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { error: `You can only upload up to ${MAX_FILES} files at a time.` },
      { status: 400 },
    );
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const results: { name: string; mediaId: string; url: string; type: string }[] = [];

  for (const file of files) {
    const type = mediaTypeOf(file.type);
    if (!type) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type || file.name}` },
        { status: 400 },
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File ${file.name} exceeds the 16MB size limit.` },
        { status: 400 },
      );
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const media = await prisma.media.create({
      data: { type, url: "" },
    });
    const extension = (file.name.split(".").pop() || "").toLowerCase();
    const fileName = `${media.id}${extension ? "." + extension : ""}`;
    await writeFile(path.join(uploadDir, fileName), bytes);
    const url = `/uploads/${fileName}`;
    await prisma.media.update({
      where: { id: media.id },
      data: { url },
    });

    results.push({ name: file.name, mediaId: media.id, url, type });
  }

  return NextResponse.json(results);
}

export async function DELETE(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const mediaId = req.nextUrl.searchParams.get("mediaId");
  if (!mediaId) {
    return NextResponse.json({ error: "mediaId required" }, { status: 400 });
  }

  const media = await prisma.media.findUnique({ where: { id: mediaId } });
  if (!media) {
    return NextResponse.json({ error: "Media not found" }, { status: 404 });
  }

  try {
    await unlink(path.join(process.cwd(), "public", path.posix.join(...media.url.split("/"))));
  } catch {
    // ignore file removal errors
  }

  await prisma.media.delete({ where: { id: mediaId } });

  return NextResponse.json({ ok: true });
}
