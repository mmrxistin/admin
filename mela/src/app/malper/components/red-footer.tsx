// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import React from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { DEFAULT_SITE_CONFIG, type SiteConfig } from "@/lib/site-config";

export default function RedFooter({ config }: { config?: Partial<SiteConfig> }) {
  const nav = config?.navigation ?? DEFAULT_SITE_CONFIG.navigation;
  const general = { ...DEFAULT_SITE_CONFIG.general, ...(config?.general ?? {}) };
  const accent = config?.theme?.accent ?? DEFAULT_SITE_CONFIG.theme.accent;
  return (
    <footer className="relative overflow-hidden bg-zinc-950 text-white">
      {/* DEVASA LOGO */}
      <div className="pointer-events-none select-none px-4 pt-20">
        <div className="mx-auto max-w-[1600px] text-center">
          <span className="block bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-[18vw] font-black uppercase leading-none tracking-tighter text-transparent">
{general.siteName.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 pb-10 pt-16 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 border-t border-white/10 pt-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <BrandLogo size={36} title={general.siteName} />
              <span className="text-xl font-black uppercase">{general.siteName}</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              {general.description}
            </p>
          </div>
          <div>
            <h4 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-white/40">Menü</h4>
            <ul className="space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 no-underline transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-white/40">İletişim</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href={`mailto:${general.email}`} className="no-underline transition-colors hover:text-white">{general.email}</a></li>
              <li>{general.phone}</li>
              <li>{general.address}</li>
            </ul>
            <div className="mt-6 flex gap-3">
              {["IG", "X", "GR", "YT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-[10px] font-black text-white/60 no-underline transition-all hover:text-white"
                  style={{ borderColor: `${accent}55` }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} {general.siteName} — {general.footerNote}</span>
          <span className="font-mono">{general.address}</span>
        </div>
      </div>
    </footer>
  );
}
