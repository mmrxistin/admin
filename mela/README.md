Bismillahirrahmanirahim

Elhamdulillahirabbulalemin

Es selatu vesselamu  ala rasulina  Muhammed'in


LA İLAHE İLLALLAH
## Yönetici Girişi (Vercel dahil)

- **Kullanıcı adı:** `MehmetKarakus`
- **Şifre:** `mehmetkarakus`
- **Görünen ad:** Yazar Mehmet Karakuş

### Yerelde
```bash
npm install --legacy-peer-deps
npx prisma migrate deploy
npm run seed:admin
```
(`.env.local` içinde `POSTGRES_PRISMA_URL` ve `POSTGRES_URL_NON_POOLING` tanımlı olmalı.)

### Vercel'de (tek seferlik)
1. Vercel → Project → Settings → Environment Variables:
   - `POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING` (Vercel Postgres bunları otomatik verir)
   - `ADMIN_SETUP_TOKEN` = istediğiniz gizli kurulum anahtarı
2. Yerelde aynı production DB değişkenleriyle: `npm run db:setup`
   (veya sadece `npm run seed:admin`)
3. Alternatif: canlı sitede **`/admin-kur`** sayfasını açıp `ADMIN_SETUP_TOKEN` girin;
   hesap oluşturulur/güncellenir ve otomatik giriş yapılır.
4. Giriş: **`/login`** sayfası.

Hesap her seed çalıştırmasında `MehmetKarakus` / `mehmetkarakus` olarak yenilenir.
