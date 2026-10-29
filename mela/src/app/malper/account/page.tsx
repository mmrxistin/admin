// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirrahmanirrahim
// Elhamdulillahi Rabbil Alamin
// Essalatu vesselamu ala Resulina Muhammedin 
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illAllah
// SubhanAllah, Elhamdulillah, Allahu Ekber
// La ilahe illAllah, Muhammedur Resulullah
// Allah U Ekber ve lillahi'l-hamd
import Link from "next/link";
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";

export default async function Page() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }
// Elhamdulillah ya Kerim i Vehhab bedawiti
  return (
    <main className="container mx-auto py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Hesabım</h1>
        <p className="mt-2 text-sm text-slate-600">
          Bu sayfa, normal kullanıcı üyeliği ile giriş yapan kullanıcılar için tasarlandı.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-6">
            <h2 className="text-sm uppercase tracking-[0.25em] text-slate-500">Kullanıcı Adı</h2>
            <p className="mt-2 text-lg font-medium text-slate-900">{user.username}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <h2 className="text-sm uppercase tracking-[0.25em] text-slate-500">Email</h2>
            <p className="mt-2 text-lg font-medium text-slate-900">{"Kayıtlı değil"}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 sm:col-span-2">
            <h2 className="text-sm uppercase tracking-[0.25em] text-slate-500">Profil Bilgisi</h2>
            <p className="mt-2 text-slate-700">{user.displayName ?? "Henüz bir isim eklenmedi."}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/malper" className="inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
            Siteye Dön
          </Link>
          <Link href="/login" className="inline-flex rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50">
            Oturumu Kapatmak İçin Giriş Sayfasına Git
          </Link>
        </div>
      </div>
    </main>
  );
}
// El Hamdu Lillah Kesira

// La ilahe illALLAH u vahdehu la şerike leh, lehul-mulku ve lehul-hamdu.
// Yuhyi ve yumit
// Biyadihil xayr
// ve huve ala kulli şey'in kadir