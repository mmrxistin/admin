// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import BrandLogo from "@/components/BrandLogo";
import { DEFAULT_SITE_CONFIG, type SiteConfig } from "@/lib/site-config";

export default function RedNavbar({ config }: { config?: Partial<SiteConfig> }) {
  const nav = config?.navigation ?? DEFAULT_SITE_CONFIG.navigation;
  const general = { ...DEFAULT_SITE_CONFIG.general, ...(config?.general ?? {}) };
  const accent = config?.theme?.accent ?? DEFAULT_SITE_CONFIG.theme.accent;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled
          ? "border-b border-white/10 bg-zinc-950/80 py-3 backdrop-blur-xl"
          : "bg-transparent py-5"
          }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link href="/malper" className="group flex items-center gap-2 no-underline">
            <BrandLogo size={general.logoSize} title={general.siteName} className="transition-transform group-hover:scale-105" />
            <span className="text-lg font-black uppercase tracking-tight text-white">
              {general.siteName}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative text-xs font-bold uppercase tracking-[0.18em] text-white/70 no-underline transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: accent }} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label="Tema değiştir"
                className="hidden h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition-colors sm:grid"
              >
                {resolvedTheme === "dark" ? "☾" : "☀"}
              </button>
            )}
            <Link
              href="/malper/iletisim"
              className="hidden rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-white no-underline transition-all hover:bg-white hover:text-zinc-950 md:block"
              style={{ backgroundColor: accent }}
            >
              İletişim
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menü"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 lg:hidden"
            >
              <div className="space-y-1.5">
                <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU — tam ekran */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-zinc-950 px-8 transition-all duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"
          }`}
      >
        <nav className="flex flex-col gap-2">
          {nav.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-4 text-4xl font-black uppercase tracking-tight text-white no-underline transition-colors"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="mr-3 text-sm font-mono" style={{ color: accent }}>0{i + 1}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <a
          href={`mailto:${general.email}`}
          className="mt-10 text-sm font-bold uppercase tracking-[0.2em] no-underline"
          style={{ color: accent }}
        >
          {general.email}
        </a>
      </div>
    </>
  );
}
