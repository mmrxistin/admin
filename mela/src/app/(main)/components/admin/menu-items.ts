// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

import {
  FileText,
  Gauge,
  Images,
  Layout,
  Mail,
  MessageSquare,
  Newspaper,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface AdminMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badgeKey?: string;
}

export const adminMenuItems: AdminMenuItem[] = [
  { label: "Genel Bakış", href: "/", icon: Gauge },
  { label: "Anasayfa", href: "/anasayfa", icon: Layout },
  { label: "Site İçerikleri", href: "/icerik", icon: Newspaper },
  { label: "İşler", href: "/isler", icon: Images },
  { label: "Hizmetler", href: "/hizmetler", icon: ShieldCheck },
  { label: "Hakkında", href: "/hakkinda", icon: FileText },
  { label: "İletişim", href: "/iletisim", icon: Mail },
  { label: "Peyam", href: "/peyam", icon: MessageSquare, badgeKey: "messages" },
];
