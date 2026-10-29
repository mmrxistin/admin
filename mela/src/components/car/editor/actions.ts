// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirrahmanirrahim
// Elhamdulillahirabbulalemin
// Es-selatu vesselamu ala resulina Muhammedin 
// La ilahe illAllah
// SubhanAllah, Elhamdulillah, Allahu Ekber
// LA İLAHE İLL ALLAH U VAHDEHU LA ŞERİKE LEH,LEHUL MULKU VE LEHUL HAMDU
// YUHYI VE YUMIT
// HUWE HAYYUN LA YEMUT
// BIYADIHIL XAYR
// HUWE U ALA KULLI ŞEYIN KADIR
// ALLAH U EKBER VELILLAHIL HAMD
"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getCarDataInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";

export async function submitPost(input: {
  content: string[];
  mediaIds: string[];
}) {
  try {
    const { user } = await validateRequest();
    if (!user) return { error: "Oturum bulunamadı. Lütfen tekrar giriş yapın." };

    const { content, mediaIds } = createPostSchema.parse(input);

    const newPost = await prisma.car.create({
      data: {
        content,
        userId: user.id,
        attachments: {
          connect: mediaIds.map((id) => ({ id })),
        },
      },
      include: getCarDataInclude(user.id),
    });

    return newPost;
  } catch (error: any) {
    console.error("submitPost server hatası:", error);
    return { error: error?.message || "Sunucu hatası oluştu." };
  }
}
