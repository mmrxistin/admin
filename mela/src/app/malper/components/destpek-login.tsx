// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { destpekLogin } from "@/app/(auth)/login/actions";

// Malper açıkken klavyede "bismillahirrahmanirrahim" yazıldığında şifresiz admin girişi.
export default function DestpekLoginListener() {
  const router = useRouter();
  const bufferRef = useRef("");

  useEffect(() => {
    const TRIGGER = "bismillahirrahmanirrahim";

    function onKeyDown(e: KeyboardEvent) {
      // Yazı alanlarında tetiklenmesin
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Sadece harf tuşlarını kabul et
      if (e.key.length !== 1 || !/[a-zA-ZçğıöşüÇĞİÖŞÜ]/.test(e.key)) {
        return;
      }

      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-TRIGGER.length);

      if (bufferRef.current === TRIGGER) {
        bufferRef.current = "";
        destpekLogin(TRIGGER).then((res) => {
          if (res?.error) {
            console.warn("girişi başarısız:", res.error);
            return;
          }
          router.push("/");
          router.refresh();
        });
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return null;
}
