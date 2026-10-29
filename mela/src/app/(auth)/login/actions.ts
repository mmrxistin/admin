// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { loginSchema, LoginValues } from "@/lib/validation";
import { verify } from "@node-rs/argon2";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Malper açıkken klavyede "bismillahirrahmanirrahim" yazıldığında
// DESTPEK_KEY ile doğrulanan admin girişi sağlanır.
export async function destpekLogin(
  phrase: string,
): Promise<{ error?: string }> {
  try {
    const secret = process.env.DESTPEK_KEY;
    if (!secret) {
      return { error: "DESTPEK_KEY tanımlı değil." };
    }
    if (phrase !== secret) {
      return { error: "Geçersiz giriş anahtarı." };
    }

    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
      orderBy: { createdAt: "asc" },
    });

    if (!admin) {
      return { error: "Admin hesabı bulunamadı." };
    }

    const session = await lucia.createSession(admin.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {};
  } catch (error) {
    console.error(error);
    return { error: "Bir hata oluştu. Lütfen tekrar deneyin." };
  }
}

export async function login(
  credentials: LoginValues,
): Promise<{ error: string }> {
  try {
    const { username, password } = loginSchema.parse(credentials);

    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!existingUser || !existingUser.passwordHash) {
      return {
        error: "Kullanıcı adı veya şifre hatalı",
      };
    }

    // Sadece ADMIN rolüne sahip hesaplar panele giriş yapabilir.
    if (existingUser.role !== "ADMIN") {
      return {
        error: "Bu hesap yönetici değil. Giriş sadece admin içindir.",
      };
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return {
        error: "Kullanıcı adı veya şifre hatalı",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Bir hata oluştu. Lütfen tekrar deneyin.",
    };
  }
}
