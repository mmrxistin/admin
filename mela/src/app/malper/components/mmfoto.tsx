// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirrahmanirrahim
// Kitap Galerisi Bileşeni
"use client";

import React from "react";

const photos = [
  { id: 1, title: "Sessizliğin Alfabesi", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=900&q=80" },
  { id: 2, title: "Sokağın Hafızası", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&q=80" },
  { id: 3, title: "Kuşlar ve Kırık Saat", img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=900&q=80" },
  { id: 4, title: "Babanın Defteri", img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80" },
];

export default function MmPhotoGallery() {
  return (
    <section className="py-8 bg-white border-t border-zinc-200 px-4 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-black uppercase tracking-[0.14em] border-b-[3px] border-zinc-900 pb-2">
KİTAPLAR
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
          {photos.map((p) => (
            <a key={p.id} href="#" className="min-w-[280px] md:min-w-[320px] group relative overflow-hidden rounded-lg shadow-md aspect-[4/3]">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-white font-bold text-sm leading-snug group-hover:text-[#d90000] transition-colors">{p.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
