// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirahmanirrahim
// Modern manşet slider'ı — otomatik dönen, ok/dot kontrollü, tam responsive
"use client";

import React, { useEffect, useRef, useState } from "react";

const mansetler = [
  {
    title: "Sessizliğin Alfabesi: Sustuğumuz her an bir cümledir",
    desc: "Yeni deneme kitabında yazar, susmanın bir tür konuşma olduğunu ve kelimelerin en çok yokluğunda anlam kazandığını anlatıyor.",
    img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&q=80",
    href: "/malper/hizmetler",
    cat: "KİTAP",
  },
  {
    title: "Sokağın Hafızası: Bir şehrin bıraktığı izler",
    desc: "Roman, göç eden insanların ardında bıraktığı boş evleri, yarım kalmış cümleleri ve şehrin unutmayan hafızasını anlatıyor.",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=80",
    href: "/malper/hizmetler",
    cat: "ROMAN",
  },
  {
    title: "Gece yarısı yazılan notlar: Günlükten sayfalar",
    desc: "Yazarın defterinden seçilmiş kısa metinler; uykusuzluk, bekleyiş ve yazmanın sessiz telaşı üzerine.",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80",
    href: "/malper/hizmetler",
    cat: "DENEME",
  },
  {
    title: "Kuşlar ve Kırık Saat: Zamanın kayboluşu",
    desc: "Öykü kitabında her hikâye, durmuş bir saatin arkasında saklanan bir ömrü açığa çıkarıyor.",
    img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=1200&q=80",
    href: "/malper/hizmetler",
    cat: "ÖYKÜ",
  },
];

function MansetSlider() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => setIndex((i) => (i + 1) % mansetler.length), 6000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const goto = (i: number) => {
    setIndex(i);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setIndex((v) => (v + 1) % mansetler.length), 6000);
  };

  const onceki = () => goto((index - 1 + mansetler.length) % mansetler.length);
  const sonraki = () => goto((index + 1) % mansetler.length);

  const item = mansetler[index];

  return (
    <div className="mm-ms-slider">
      <a href={item.href} className="mm-ms-slide mm-ms-active" aria-label={item.title}>
        <img src={item.img} alt={item.title} className="mm-ms-img" draggable={false} />
        <div className="mm-ms-grad" />

        <div className="mm-ms-tag">
          <span className="size-2 rounded-full bg-white animate-pulse" />
  ÖNE ÇIKAN • {item.cat}
        </div>

        <div className="mm-ms-text">
          <h2 className="mm-ms-title">{item.title}</h2>
          <p className="mm-ms-desc">{item.desc}</p>
        </div>
      </a>

      {/* Oklar */}
      <button aria-label="Önceki metin" className="mm-ms-arrow mm-ms-prev" onClick={(e) => { e.preventDefault(); onceki(); }}>
        ‹
      </button>
      <button aria-label="Sonraki metin" className="mm-ms-arrow mm-ms-next" onClick={(e) => { e.preventDefault(); sonraki(); }}>
        ›
      </button>

      {/* Noktalar */}
      <div className="mm-ms-dots">
        {mansetler.map((_, i) => (
          <button
            key={i}
            aria-label={`Metin ${i + 1}`}
            onClick={(e) => { e.preventDefault(); goto(i); }}
            className={`mm-ms-dot ${i === index ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export default MansetSlider;
