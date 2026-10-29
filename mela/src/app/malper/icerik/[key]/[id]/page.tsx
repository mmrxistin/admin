// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin

import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { key: string; id: string };
}

// key: cases | services | news ; id: öğenin index'i
export default async function IcerikDetayPage({ params }: PageProps) {
  const { key, id } = params;
  const idx = parseInt(id, 10);
  if (Number.isNaN(idx)) notFound();

  const site = await getSiteContent();
  const list = Array.isArray(site[key]) ? (site[key] as Record<string, string>[]) : [];
  const item = list[idx];
  if (!item) notFound();

  const titles: Record<string, string> = {
    cases: "Seçili Kitaplar",
    services: "Türler",
    news: "Duyurular",
  };
  const backHref: Record<string, string> = {
    cases: "/malper",
    services: "/malper",
    news: "/malper",
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-16 text-zinc-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1100px]">
        <Link
          href={backHref[key] ?? "/malper"}
          className="text-xs font-black uppercase tracking-[0.16em] text-zinc-400 no-underline transition-colors hover:text-white"
        >
          ← Geri
        </Link>

        <p className="mt-10 mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#ff4d00]">
          {titles[key] ?? key} — #{idx + 1}
        </p>

        <div className="rounded-3xl border border-white/10 bg-zinc-900 p-8 sm:p-12">
          {key === "cases" && (item as any).img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={(item as any).img}
              alt={(item as any).brand ?? ""}
              className="mb-8 h-72 w-full rounded-2xl object-cover sm:h-96"
            />
          )}

          <div className="space-y-5">
            {Object.entries(item).map(([field, value]) => (
              <div key={field}>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                  {field}
                </div>
                {field === "img" ? (
                  <span className="break-all text-sm text-zinc-300">{value}</span>
                ) : (
                  <div className="mt-1 text-lg font-semibold text-white sm:text-xl">{value}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900/50 p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
            Veri kaynağı
          </p>
          <p className="mt-2 break-all font-mono text-xs text-zinc-400">
            site_content · {key} · index {idx} · veritabanından çekildi
          </p>
        </div>
      </div>
    </main>
  );
}
