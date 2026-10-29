// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin

import prisma from "@/lib/prisma";
import { STATS, CASES, SERVICES, NEWS, CLIENTS } from "@/app/malper/ajans-veri";
import { mergeSiteConfig, DEFAULT_SITE_CONFIG, type SiteConfig } from "@/lib/site-config";
export const DEFAULT_SITE_CONTENT: Record<string, unknown> = {
  stats: STATS,
  cases: CASES,
  services: SERVICES,
  news: NEWS,
  clients: CLIENTS,

  general: DEFAULT_SITE_CONFIG.general,
  sections: DEFAULT_SITE_CONFIG.sections,
  theme: DEFAULT_SITE_CONFIG.theme,
  navigation: DEFAULT_SITE_CONFIG.navigation,
};

export async function getStoredSiteContent(): Promise<Record<string, unknown>> {
  try {
    const rows = await prisma.siteContent.findMany();
    const stored: Record<string, unknown> = {};
    for (const row of rows) stored[row.key] = row.data;
    return stored;
  } catch {
    return {};
  }
}

export async function getSiteContent(): Promise<Record<string, unknown>> {
  const stored = await getStoredSiteContent();
  return { ...DEFAULT_SITE_CONTENT, ...stored };
}


export async function getSiteConfig(): Promise<SiteConfig> {
  const stored = await getStoredSiteContent();
  return mergeSiteConfig(stored);
}
