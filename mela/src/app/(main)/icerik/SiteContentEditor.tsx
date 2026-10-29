// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin

"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { updateSiteContent } from "@/lib/site-content-actions";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";

// Bölüm tipi: list-of-objects (stats, cases, services, news) veya string list (clients)
interface FieldDef {
  key: string; // objedeki alan adı
  label: string;
  type?: "text" | "textarea";
}

interface SectionDef {
  key: string;
  title: string;
  fields: FieldDef[];
}

const SECTIONS: SectionDef[] = [
  {
    key: "stats",
    title: "Sayılar (Ödül, Marka Ortağı vb.)",
    fields: [
      { key: "n", label: "Değer (örn: 340)" },
      { key: "l", label: "Etiket (örn: Ödül)" },
    ],
  },
  {
    key: "cases",
    title: "Seçili İşler (Vestel, Ülker vb.)",
    fields: [
      { key: "brand", label: "Marka" },
      { key: "title", label: "Başlık" },
      { key: "tag", label: "Etiket" },
      { key: "img", label: "Görsel URL" },
    ],
  },
  {
    key: "services",
    title: "Hizmetler",
    fields: [
      { key: "n", label: "Numara (01, 02...)" },
      { key: "t", label: "Başlık" },
      { key: "d", label: "Açıklama", type: "textarea" },
    ],
  },
  {
    key: "news",
    title: "Haberler",
    fields: [
      { key: "cat", label: "Kategori" },
      { key: "date", label: "Tarih" },
      { key: "title", label: "Başlık", type: "textarea" },
      { key: "href", label: "Bağlantı" },
    ],
  },
];

interface RowData {
  [key: string]: string;
}

interface Props {
  initialContent: Record<string, unknown>;
}

export default function SiteContentEditor({ initialContent }: Props) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState<Record<string, unknown>>(initialContent);
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());

  function getList(key: string): RowData[] {
    const list = content[key];
    return Array.isArray(list) ? (list as RowData[]) : [];
  }

  function setList(key: string, list: RowData[]) {
    setContent((prev) => ({ ...prev, [key]: list }));
  }

  function updateRow(sectionKey: string, idx: number, fieldKey: string, value: string) {
    const list = [...getList(sectionKey)];
    list[idx] = { ...list[idx], [fieldKey]: value };
    setList(sectionKey, list);
    setSavedKeys((prev) => new Set([...prev].filter((k) => k !== sectionKey)));
  }

  function addRow(sectionKey: string, fields: FieldDef[]) {
    const empty: RowData = {};
    for (const f of fields) empty[f.key] = "";
    setList(sectionKey, [...getList(sectionKey), empty]);
  }

  function removeRow(sectionKey: string, idx: number) {
    setList(sectionKey, getList(sectionKey).filter((_, i) => i !== idx));
  }

  function saveSection(sectionKey: string) {
    startTransition(async () => {
      try {
        await updateSiteContent(sectionKey, getList(sectionKey));
        setSavedKeys((prev) => new Set([...prev, sectionKey]));
        toast({ description: "Kaydedildi" });
      } catch (e) {
        toast({ variant: "destructive", description: "Kaydedilemedi. Admin yetkisi gerekiyor." });
      }
    });
  }

  // CLIENTS — düz string listesi
  const clients: string[] = Array.isArray(content.clients) ? (content.clients as string[]) : [];

  function updateClient(idx: number, value: string) {
    const next = [...clients];
    next[idx] = value;
    setContent((prev) => ({ ...prev, clients: next }));
    setSavedKeys((prev) => new Set([...prev].filter((k) => k !== "clients")));
  }

  function saveClients() {
    startTransition(async () => {
      try {
        await updateSiteContent("clients", clients.filter(Boolean));
        setSavedKeys((prev) => new Set([...prev, "clients"]));
        toast({ description: "Kaydedildi" });
      } catch {
        toast({ variant: "destructive", description: "Kaydedilemedi." });
      }
    });
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Site İçerikleri</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Malper sayfasındaki yazıları buradan güncelleyin. Kaydettikten sonra site anında güncellenir.
        </p>
      </div>

      {SECTIONS.map((section) => {
        const list = getList(section.key);
        const isSaved = savedKeys.has(section.key);
        return (
          <div key={section.key} className="rounded-3xl border border-slate-200 bg-card p-6 shadow-sm dark:border-slate-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{section.title}</h2>
              <Button
                size="sm"
                variant="outline"
                onClick={() => addRow(section.key, section.fields)}
              >
                <Plus className="mr-1 h-4 w-4" /> Ekle
              </Button>
            </div>
            <div className="space-y-4">
              {list.length === 0 && (
                <p className="text-sm text-slate-500">Henüz öğe yok. "Ekle" ile yeni öğe oluşturun.</p>
              )}
              {list.map((row, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {section.fields.map((f) => (
                      <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                        <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                          {f.label}
                        </label>
                        {f.type === "textarea" ? (
                          <textarea
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                            rows={2}
                            value={row[f.key] ?? ""}
                            onChange={(e) => updateRow(section.key, idx, f.key, e.target.value)}
                          />
                        ) : (
                          <Input
                            value={row[f.key] ?? ""}
                            onChange={(e) => updateRow(section.key, idx, f.key, e.target.value)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => removeRow(section.key, idx)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => saveSection(section.key)} disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : isSaved ? <Check className="mr-2 h-4 w-4" /> : null}
                Kaydet
              </Button>
            </div>
          </div>
        );
      })}

      {/* CLIENTS */}
      <div className="rounded-3xl border border-slate-200 bg-card p-6 shadow-sm dark:border-slate-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Birlikte Çalıştığımız Markalar
          </h2>
          <Button size="sm" variant="outline" onClick={() => setContent((prev) => ({ ...prev, clients: [...clients, ""] }))}>
            <Plus className="mr-1 h-4 w-4" /> Ekle
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {clients.map((c, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Input value={c} onChange={(e) => updateClient(idx, e.target.value)} placeholder="MARKA ADI" />
              <Button
                size="icon"
                variant="ghost"
                className="text-red-600"
                onClick={() => setContent((prev) => ({ ...prev, clients: clients.filter((_, i) => i !== idx) }))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={saveClients} disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
}
