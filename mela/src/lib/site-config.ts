// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin
// La ilahe ill Allah Muhammeden Rasulullah

export const LOCKED_LOGO = {
  color: "#0f7a3d",
  flag: "#ffffff",
  locked: true as const,
};

export interface SiteGeneral {
  siteName: string;
  brandLine2: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  footerNote: string;
  logoSize: number;
}

export interface SiteSection {
  label: string;
  title: string;
  text: string;
}

export interface SiteSections {
  hero: SiteSection;
  work: SiteSection;
  services: SiteSection;
  manifesto: SiteSection;
  news: SiteSection;
  contact: SiteSection;
}

export interface SiteTheme {
  accent: string;
  background: string;
  foreground: string;
}

export interface SiteConfig {
  general: SiteGeneral;
  sections: SiteSections;
  theme: SiteTheme;
  navigation: { href: string; label: string }[];
}


export const HALAL_RULES = [
  "Faiz (ribâ), kumar, şans oyunu ve borsa/spekülasyon reklamı yapılmaz.",
  "Haram ürün (içki, domuz, tesettüre aykırı ürün) tanıtımı ve satışı yapılamaz.",
  "Görsellerde tesettür ve mahremiyet (hicâb) ölçülerine uyulur.",
  "Müzik, dans ve benzeri dini ölçülere aykırı içerik yayınlanmaz.",
  "Alkol, tütün ve zararlı madde tanıtımı kabul edilmez.",
  "Yalan, iftira, gıybet ve kardeşlik bağını zedeleyen içerik yayınlanmaz.",
];


export const DEFAULT_SITE_CONFIG: SiteConfig = {
  general: {
    siteName: "Helal Site",
    brandLine2: "Kurucusu",
    tagline: "Müslümanlar için helal web sitesi kurucu",
    description:
      "İslami ölçülere uygun, helal bir web sitesini dakikalar içinde kurun. Şablonlar, renkler ve içerikler tamamen panelden; logo değişmez.",
    email: "merhaba@helalsite.com",
    phone: "+90 555 000 00 00",
    address: "İstanbul, Türkiye",
    footerNote: "El Hamdu Lillahi Rabbil Alemin — Allahu Ekber ve Lillahil Hamd",
    logoSize: 40,
  },
  sections: {
    hero: {
      label: "Helal Site Kurucu",
      title: "Helal Bir Site, Saniyeler İçinde",
      text: "Bismillahirrahmanirrahim. İslami kurallara uygun şablonlar, helal içerik denetimi ve tek panelden yönetim. Kâh bir kurum, kâh bir hocaefendi için — aynı sade ve samimi ruh.",
    },
    work: {
      label: "Seçili İşler",
      title: "Çalışmalarımız",
      text: "Camilerden vakıflara, medreselerden hayır derneklerine; her biri helal ölçüler içinde hazırlanmış işler.",
    },
    services: {
      label: "Hizmetler",
      title: "Helal Çözümler",
      text: "Kurumunuza uygun şablonu seçin, renkleri düzenleyin, içerikleri ekleyin. Logo her zaman aynı: yeşil zeminde beyaz sancak.",
    },
    manifesto: {
      label: "Manifesto",
      title: "Helal ve Temiz Web",
      text: "Bizim için site bir vitrin değil, bir emanettir. Her görsel, her kelime helal ölçülere göre seçilir; tıklama uğruna haram reklama yer verilmez.",
    },
    news: {
      label: "Güncel",
      title: "Duyurular",
      text: "Yeni şablonlar, güncellemeler ve helal web üzerine notlar.",
    },
    contact: {
      label: "İletişim",
      title: "Sitenizi birlikte kuralım",
      text: "Sorularınız için bize yazın. El hamdu lillah ile başlayalım.",
    },
  },
  theme: {
    accent: "#0f7a3d",
    background: "#0b1512",
    foreground: "#e9f2ee",
  },
  navigation: [
    { href: "/malper", label: "Ana Sayfa" },
    { href: "/malper/hakkinda", label: "Hakkında" },
    { href: "/malper/hizmetler", label: "Hizmetler" },
    { href: "/malper/isler", label: "Yazılar" },
    { href: "/malper/kariyer", label: "Eğitim" },
    { href: "/malper/iletisim", label: "İletişim" },
  ],
};

export type SiteConfigKey = keyof SiteConfig;

export const SITE_CONFIG_KEYS: SiteConfigKey[] = [
  "general",
  "sections",
  "theme",
  "navigation",
];


export function mergeSiteConfig(stored: Record<string, unknown>): SiteConfig {
  const pick = (key: SiteConfigKey) => (stored[key] ?? {}) as Record<string, unknown>;
  const out = structuredClone(DEFAULT_SITE_CONFIG) as unknown as Record<string, any>;

  for (const [k, v] of Object.entries(pick("general"))) {
    if (v !== undefined && v !== null && v !== "") out.general[k] = v;
  }
  for (const [sectionKey, sectionVal] of Object.entries(pick("sections"))) {
    if (!out.sections[sectionKey]) continue;
    for (const [k, v] of Object.entries(sectionVal as Record<string, unknown>)) {
      if (v !== undefined && v !== null) out.sections[sectionKey][k] = v;
    }
  }
  for (const [k, v] of Object.entries(pick("theme"))) {
    if (typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v)) out.theme[k] = v;
  }
  const nav = stored.navigation;
  if (Array.isArray(nav) && nav.length) {
    out.navigation = (nav as { href: string; label: string }[]).filter(
      (l) => l && typeof l.href === "string" && typeof l.label === "string",
    );
  }

  const size = Number(out.general.logoSize);
  out.general.logoSize = Number.isFinite(size) ? Math.min(96, Math.max(24, size)) : 40;
  return out as SiteConfig;
}
