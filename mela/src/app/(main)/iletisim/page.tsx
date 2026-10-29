// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah
import { Metadata } from "next";
import ContentSectionPage from "../components/ContentSectionPage";

export const metadata: Metadata = {
  title: "İletişim",
};

export default function IletisimAdminPage() {
  return <ContentSectionPage title="İLETİŞİM" apiPath="/api/parvekirin/iletisim" />;
}
