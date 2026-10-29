// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirrahmanirrahim
// Söyleşi & Okuma Videoları Bileşeni
"use client";

import React from "react";

const videos = [
  { id: "1", title: "Söyleşi: Hafıza ve Yazmak", thumb: "https://img.youtube.com/vi/UCeHJLmZ75j/0.jpg", url: "#" },
  { id: "2", title: "Kitaptan Okumalar: Sokağın Hafızası", thumb: "https://img.youtube.com/vi/UCeHJLmZ75j/1.jpg", url: "#" },
  { id: "3", title: "Atölye Atölyesi: İlk Cümle", thumb: "https://img.youtube.com/vi/UCeHJLmZ75j/2.jpg", url: "#" },
  { id: "4", title: "Kütüphane Günleri Sohbeti", thumb: "https://img.youtube.com/vi/UCeHJLmZ75j/3.jpg", url: "#" },
];

export default function MmVideoGallery() {
  return (
    <section className="py-8 bg-zinc-950 text-white px-4 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <h2 className="text-xl font-black uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-6 bg-[#d90000]"></span>
VİDEOLAR
          </h2>
          <a href="#" className="text-xs font-bold hover:text-[#d90000] transition-colors">TÜMÜNÜ GÖR →</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((v) => (
            <a key={v.id} href={v.url} className="group block">
              <div className="relative aspect-video bg-zinc-800 overflow-hidden rounded-md border border-zinc-800">
                <img src={v.thumb} alt={v.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#d90000]/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="mt-3 text-sm font-bold leading-tight group-hover:text-[#d90000] transition-colors">{v.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
