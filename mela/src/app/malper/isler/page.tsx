// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import React from "react";
import ParvekirinaYek from "../components/parvekirin";

export const metadata = { title: "Yazılar" };

export default function IslerPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-12 text-zinc-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 border-b border-white/10 pb-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#ff4d00]">
Yazılar
          </p>
          <h1 className="text-5xl font-black uppercase tracking-tight sm:text-7xl">
Yazılar
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
Burada yayınlanan denemeleri, öyküleri ve notları okuyabilirsiniz.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
          <ParvekirinaYek />
        </section>
      </div>
    </main>
  );
}
