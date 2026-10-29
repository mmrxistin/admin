// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import { Metadata } from "next";
import ContentSectionPage from "../components/ContentSectionPage";

export const metadata: Metadata = {
  title: "Anasayfa",
};

export default function AnasayfaAdminPage() {
  return <ContentSectionPage title="ANASAYFA" apiPath="/api/parvekirin/anasayfa" />;
}
