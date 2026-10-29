// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirahmanirahim
// Elhamdulillahirabbulalemin
// Esselatu vesselamu ala rasulillah
// La ilahe illAllahu vahdehu la sharika leh, lehu'l-mulku ve lehu'l-hamdu,
// yuhyi ve yumit
// bîyadîhîl xayr
//  ve huve ala kulli şey'in kadir
// Allah u Ekber, Allahu Ekber, Allahu Ekber
// La ilahe illAllah, Allahu Ekber, Allahu Ekber ve lillahi'l-hamd
import React from "react";
import RedNavbar from "./components/red-nav";
import RedFooter from "./components/red-footer";
import DestpekLoginListener from "./components/destpek-login";
import { getSiteConfig } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const config = await getSiteConfig();
  return (
    <div
      className="min-h-screen antialiased"
      style={
        {
          backgroundColor: config.theme.background,
          color: config.theme.foreground,
          "--site-accent": config.theme.accent,
        } as React.CSSProperties
      }
    >
      <DestpekLoginListener />
      <RedNavbar config={config} />
      <div className="pt-20">{children}</div>
      <RedFooter config={config} />
    </div>
  );
}
