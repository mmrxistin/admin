// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import React from "react";
import Link from "next/link";
import { AGENCY, NEWS, CLIENTS, STATS } from "../ajans-veri";

export const metadata = { title: "Yazar" };
const TEAM = [
  { name: "Roman", role: "Sokağın Hafızası · 2022", initials: "R" },
  { name: "Öykü", role: "Kuşlar ve Kırık Saat · 2019", initials: "Ö" },
  { name: "Deneme", role: "Sessizliğin Alfabesi · 2024", initials: "D" },
  { name: "Mektup", role: "Babanın Defteri · 2016", initials: "M" },
];
const VALUES = ["Dinle", "Yavaş Yaz", "Dürüst Kal", "Tekrar Tekrar" ];

export default function HakkindaPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* HERO */}
      <section className="border-b border-white/10 px-4 pb-20 pt-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#ff4d00]">Ben kimim</p>
          <h1 className="text-6xl font-black uppercase tracking-tighter sm:text-8xl">{AGENCY.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Roman, öykü, deneme ve mektup türlerinde yazan bir yazarım.
            Yıllardır sokağın sesini, hafızanın kırılganlığını ve sıradan
            insanın hikâyesini kelimelere döküyorum; her kitap uzun bir
            dinlemenin ürünü.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="text-4xl font-black text-[#ff4d00] lg:text-5xl">{s.n}</div>
              <div className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="border-y border-white/10 px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-8 text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Yazı İlkelerim</p>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <div key={v} className="bg-zinc-950 p-10">
                <span className="font-mono text-xs text-[#ff4d00]">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-black uppercase tracking-tight">{v}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-8 text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Yazdığım Türler</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((t) => (
              <div
                key={t.name}
                className="group rounded-3xl border border-white/10 p-8 transition-colors hover:border-[#ff4d00]/60"
              >
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#ff4d00]/15 text-lg font-black text-[#ff4d00] transition-colors group-hover:bg-[#ff4d00] group-hover:text-white">
                  {t.initials}
                </div>
                <h3 className="mt-6 text-xl font-black">{t.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS + NEWS */}
      <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-8 text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Birlikte Yazdığım Yerler</p>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
            {CLIENTS.map((b) => (
              <span key={b} className="text-xl font-black text-zinc-700 transition-colors hover:text-[#ff4d00] sm:text-2xl">
                {b}
              </span>
            ))}
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {NEWS.slice(0, 2).map((n) => (
              <a
                key={n.title}
                href={n.href}
                className="group rounded-3xl border border-white/10 bg-zinc-900/60 p-8 no-underline transition-all hover:border-[#ff4d00]/60"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#ff4d00]">
                  {n.cat} · {n.date}
                </span>
                <h3 className="mt-4 text-xl font-bold leading-snug transition-colors group-hover:text-[#ff4d00]">
                  {n.title}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 text-center sm:px-6 lg:px-10">
        <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">
          Bir kahve içelim mi<span className="text-[#ff4d00">?</span>
        </h2>
        <Link
          href="/malper/iletisim"
          className="mt-10 inline-block rounded-full bg-[#ff4d00] px-10 py-4 text-xs font-black uppercase tracking-[0.16em] text-white no-underline transition-all hover:bg-white hover:text-zinc-950"
        >
          İletişime geç
        </Link>
      </section>
    </main>
  );
}
