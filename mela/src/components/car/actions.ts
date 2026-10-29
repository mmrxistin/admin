// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirrahmanirahim
// Elhamdu lillahi rabbil alamin
// Esselatu vesselamu ala rasulillah
// La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber


"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getCarDataInclude } from "@/lib/types";

export async function deletePost(id: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");
  // Sadece adminler paylaşım silebilir
  if (user.role !== "ADMIN") throw new Error("Unauthorized");
  const post = await prisma.car.findUnique({
    where: { id },
  });
  if (!post) throw new Error("Post not found");
  const deletedPost = await prisma.car.delete({
    where: { id },
    include: getCarDataInclude(user.id),
  });
  return deletedPost;
}
