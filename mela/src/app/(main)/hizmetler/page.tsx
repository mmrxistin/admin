// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import { Metadata } from "next";
import ContentSectionPage from "../components/ContentSectionPage";

export const metadata: Metadata = {
  title: "Hizmetler",
};

export default function HizmetlerAdminPage() {
  return <ContentSectionPage title="HİZMETLER" apiPath="/api/parvekirin/hizmetler" />;
}
