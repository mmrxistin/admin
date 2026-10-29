// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
"use client";
import React, { useState } from "react";
import { AGENCY } from "../ajans-veri";

export default function IletisimPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: backend entegrasyonu (api route / e-posta servisi)
    setSent(true);
  };

  const inputCls =
    "w-full rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-[#ff4d00]";

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* HERO */}
      <section className="border-b border-white/10 px-4 pb-20 pt-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#ff4d00]">Yazışalım</p>
          <h1 className="text-6xl font-black uppercase tracking-tighter sm:text-8xl">İletişim</h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-400">
            Kitap, söyleşi, atölye ya da sadece bir merhaba — bir fincan kahve kadar yakınım. Formu doldurun, en kısa sürede dönerim.
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-2">
          {/* FORM */}
          <div>
            {sent ? (
              <div className="rounded-3xl border border-[#ff4d00]/40 bg-[#ff4d00]/10 p-12 text-center">
                <div className="text-5xl">🎉</div>
                <h2 className="mt-6 text-2xl font-black">Mektubunuz ulaştı!</h2>
                <p className="mt-3 text-zinc-300">
                  El Hamdu Lillah — en kısa sürede size dönüş yapacağım.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Adınız"
                    className={inputCls}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    required
                    type="email"
                    placeholder="E-posta"
                    className={inputCls}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <select
                  className={inputCls}
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                >
                  <option value="" className="bg-zinc-950">Bir konu seçin</option>
                  <option value="s" className="bg-zinc-950">Kitap & Söyleşi</option>
                  <option value="m" className="bg-zinc-950">Atölye & Danışmanlık</option>
                  <option value="l" className="bg-zinc-950">Diğer</option>
                </select>
                <textarea
                  required
                  rows={6}
                  placeholder="Bana bir şeyler yazın..."
                  className={inputCls}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <button
                  type="submit"
                  className="mt-2 rounded-full bg-[#ff4d00] px-10 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition-all hover:bg-white hover:text-zinc-950"
                >
Mektubu gönder →
                </button>
              </form>
            )}
          </div>

          {/* BİLGİLER */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-zinc-500">E-posta</h3>
              <a
                href={`mailto:${AGENCY.email}`}
                className="text-2xl font-black text-white no-underline transition-colors hover:text-[#ff4d00] sm:text-3xl"
              >
                {AGENCY.email}
              </a>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-zinc-500">Telefon</h3>
              <p className="text-2xl font-black sm:text-3xl">{AGENCY.phone}</p>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-zinc-500">Adres</h3>
              <p className="text-xl font-bold text-zinc-300">{AGENCY.address}</p>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-zinc-500">Sosyal</h3>
              <div className="flex gap-3">
                {["Instagram", "X", "Goodreads", "YouTube"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-zinc-300 no-underline transition-all hover:border-[#ff4d00] hover:text-[#ff4d00]"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
