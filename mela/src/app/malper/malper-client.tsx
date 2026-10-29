// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
"use client";
import React from "react";
import Link from "next/link";
import HeroUnderwaterScene from "./components/hero-underwater";
import ParvekirinaYek from "./components/parvekirin";
import BrandLogo from "@/components/BrandLogo";
import { DEFAULT_SITE_CONFIG, type SiteConfig } from "@/lib/site-config";

interface MalperClientProps {
  stats: { n: string; l: string }[];
  cases: { brand: string; title: string; tag: string; img: string }[];
  services: { n: string; t: string; d: string }[];
  clients: string[];
  config: SiteConfig;
}

export default function MalperClient({ stats: STATS, cases: CASES, services: SERVICES, clients: CLIENTS, config }: MalperClientProps) {
  const S = config.sections;
  const general = { ...DEFAULT_SITE_CONFIG.general, ...config.general };
  const accent = config.theme.accent;
  const MARQUEE = `${general.tagline} — ${general.siteName} — `;
  return (
    <main className="min-h-screen text-zinc-100" style={{ backgroundColor: config.theme.background }}>
      <style>{`
        @keyframes red-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .red-marquee-track { display: inline-flex; white-space: nowrap; animation: red-marquee 28s linear infinite; }
        .red-marquee-track:hover { animation-play-state: paused; }
        @keyframes red-float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
        .red-float { animation: red-float 6s ease-in-out infinite; }
        @keyframes red-grid-pulse { 0%,100% { opacity: .25; } 50% { opacity: .55; } }
        .red-grid { animation: red-grid-pulse 5s ease-in-out infinite; }
      `}</style>

      {/* ======== HERO — SU ALTI 360 SAHNE (metinsiz) ======== */}
      <section
        className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden"
        aria-label="Su alti 360 sahnesi"
      >
        <HeroUnderwaterScene />
        <div className="pointer-events-none absolute inset-0 flex items-center px-4 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-[1600px] text-center">
            <div className="mb-6 flex justify-center">
              <BrandLogo size={Math.max(72, general.logoSize)} title={general.siteName} className="shadow-2xl" />
            </div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em]" style={{ color: accent }}>
              {S.hero.label}
            </p>
            <h1 className="mx-auto max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl">
              {S.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              {S.hero.text}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/malper/iletisim"
                className="rounded-full px-8 py-4 text-xs font-black uppercase tracking-[0.16em] text-white no-underline transition-all hover:bg-white hover:text-zinc-950"
                style={{ backgroundColor: accent }}
              >
                Site Kur
              </Link>
              <Link
                href="/malper/hizmetler"
                className="rounded-full border border-white/25 px-8 py-4 text-xs font-black uppercase tracking-[0.16em] no-underline transition-all hover:border-white"
              >
                Şablonları Gör
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======== MARQUEE ======== */}
      <section className="overflow-hidden border-y border-white/10 py-10">
        <div className="red-marquee-track text-5xl font-black uppercase tracking-tight text-white/90 sm:text-7xl">
          {[0, 1].map((i) => (
            <span key={i} className="pr-8">
              {MARQUEE.repeat(3)}
            </span>
          ))}
        </div>
      </section>

      {/* ======== STATS ======== */}
      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="p-10 transition-colors hover:bg-white/5" style={{ backgroundColor: config.theme.background }}>
              <div className="text-5xl font-black tracking-tight lg:text-6xl" style={{ color: accent }}>{s.n}</div>
              <div className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ======== WORK ======== */}
      <section id="work" className="px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.3em]" style={{ color: accent }}>{S.work.label}</p>
              <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">{S.work.title}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">{S.work.text}</p>
            </div>
            <Link
              href="/malper/isler"
              className="group text-xs font-black uppercase tracking-[0.16em] text-zinc-300 no-underline transition-colors hover:text-white"
            >
Tümü <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {CASES.map((c, i) => (
              <Link
                key={`${c.brand}-${i}`}
                href="/malper/isler"
                className={`group relative block overflow-hidden rounded-3xl bg-zinc-900 no-underline ${i === 0 ? "md:col-span-2" : ""
                  }`}
              >
                <div className={`${i === 0 ? "h-[420px] md:h-[560px]" : "h-[380px]"} w-full overflow-hidden`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={c.brand}
                    className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <span className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white" style={{ backgroundColor: accent }}>
                    {c.tag}
                  </span>
                  <h3 className="text-2xl font-black text-white sm:text-3xl">{c.brand}</h3>
                  <p className="mt-1 text-sm text-zinc-300">{c.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SERVICES ======== */}
      <section id="services" className="px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-14">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.3em]" style={{ color: accent }}>{S.services.label}</p>
            <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">{S.services.title}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">{S.services.text}</p>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.n}
                href="/malper/hizmetler"
                className="group relative p-10 no-underline transition-colors hover:text-white"
                style={{ backgroundColor: config.theme.background }}
              >
                <span className="font-mono text-xs tracking-widest transition-colors group-hover:text-white" style={{ color: accent }}>
                  {s.n}
                </span>
                <h3 className="mt-4 text-2xl font-black text-white">{s.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400 transition-colors group-hover:text-white/85">
                  {s.d}
                </p>
                <span className="absolute right-8 top-8 text-xl text-zinc-700 transition-all group-hover:translate-x-1 group-hover:text-white">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======== MANIFESTO ======== */}
      <section className="px-4 py-32 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.3em]" style={{ color: accent }}>{S.manifesto.label}</p>
          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {S.manifesto.title}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-zinc-400">
            {S.manifesto.text}
          </p>
        </div>
      </section>

      {/* ======== NEWS ======== */}
      <section className="px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.3em]" style={{ color: accent }}>{S.news.label}</p>
              <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">{S.news.title}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">{S.news.text}</p>
            </div>
          </div>
          <ParvekirinaYek />
        </div>
      </section>

      {/* ======== CLIENTS ======== */}
      <section className="border-y border-white/10 px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-8 text-center text-xs font-black uppercase tracking-[0.3em] text-zinc-600">
Birlikte çalıştığımız kurumlar
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {CLIENTS.map((b) => (
              <span
                key={b}
                className="text-xl font-black tracking-tight text-zinc-700 transition-colors hover:text-white sm:text-2xl"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CONTACT CTA ======== */}
      <section className="px-4 py-32 text-center sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[900px]">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.3em]" style={{ color: accent }}>{S.contact.label}</p>
          <h2 className="text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            {S.contact.title}
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-zinc-400">
            {S.contact.text}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/malper/iletisim"
              className="rounded-full px-10 py-5 text-xs font-black uppercase tracking-[0.16em] text-white no-underline transition-all hover:bg-white hover:text-zinc-950"
              style={{ backgroundColor: accent }}
            >
              Bize Yazın
            </Link>
            <a
              href={`mailto:${general.email}`}
              className="rounded-full border border-white/25 px-10 py-5 text-xs font-black uppercase tracking-[0.16em] no-underline transition-all hover:border-white hover:text-white"
            >
              {general.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}


// Elhamdulillah Elhamdulillah Elhamdulillah
// El Hamdu Lillahi Rabbil Alemin
