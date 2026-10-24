# Wort — Kurulum (iPad / iPhone, kod yazmadan)

Uygulama iki parçadan oluşur: **(1) Web sitesi** (dosyalar, GitHub Pages'te ücretsiz yayınlanır) ve **(2) Bulut** (hesap + eşitleme, Supabase ücretsiz plan). Bulutu kurmadan da uygulama "yerel modda" çalışır; ama o zaman ilerleme cihazlar arasında eşitlenmez.

Hiçbir adımda ödeme, kart bilgisi veya "Upgrade" istenmez. İstenirse DURDUR ve bana yaz.

## 1) Dosyaları GitHub'a yükle (site yayını)
1. Safari'de github.com → ücretsiz hesap aç / giriş yap.
2. Sağ üst "+" → **New repository**. Ad: `wort`. **Public** seç (Pages ücretsiz planda böyle çalışır). **Create repository**.
3. Gelen sayfada **uploading an existing file** bağlantısına dokun.
4. Aldığın `wort.zip`'i Dosyalar uygulamasında açıp (üstüne dokun) çıkan **tüm dosyaları** seç ve yükle. Klasör değil, dosyalar düz yüklenecek (app.js, index.html, config.js, sw.js, words.json, styles.css, manifest.webmanifest, 3 png).
5. **Commit changes**.
6. Repo → **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, klasör `/ (root)` → **Save**. 1–2 dakika sonra adres görünür: `https://KULLANICIADIN.github.io/wort/`

> Kelime listesi ve kod herkese açık olur; **gizli bilgi içermez** (Supabase'in "anon" anahtarı zaten herkese açık tasarlanmıştır, veriyi güvenlik kuralları korur).

## 2) Bulutu kur (Supabase, ücretsiz)
1. supabase.com → **Start your project** → GitHub ile giriş yap.
2. **New project**: ad `wort`, bir veritabanı şifresi belirle (bir yere not al), bölge **Frankfurt (eu-central-1)**, plan **Free**. Oluşmasını bekle (~2 dk).
3. Sol menü **SQL Editor → New query** → `supabase-kurulum.sql` dosyasının içeriğini yapıştır → **Run**. "Success" görmelisin. (Bu, tabloları ve "herkes yalnızca kendi verisini görür" kurallarını kurar.)
4. **Authentication → Providers → Email**: açık kalsın. Kişisel kullanım için istersen **Confirm email**'i kapatabilirsin (kapatırsan kayıttan sonra onay maili beklemezsin). Açık bırakırsan kayıt sonrası gelen maildeki bağlantıya dokunman gerekir.
5. **Authentication → URL Configuration → Site URL**: GitHub Pages adresini yaz (`https://KULLANICIADIN.github.io/wort/`).
6. **Project Settings → API** (veya "API Keys"): şu ikisini kopyala:
   - **Project URL** (`https://xxxx.supabase.co`)
   - **anon / publishable key** (herkese açık olan)
   - ⚠️ **service_role / secret** anahtarını ASLA kopyalama, kimseyle paylaşma.

## 3) Anahtarları uygulamaya yaz
1. GitHub'da repo → `config.js` → kalem simgesi (Edit).
2. Tırnakların arasına URL ve anon anahtarı yapıştır:
   ```
   export const SUPABASE_URL = 'https://xxxx.supabase.co';
   export const SUPABASE_ANON_KEY = 'eyJ...';
   ```
3. **Commit changes**. 1–2 dakika bekle.
4. Uygulamayı açıp tamamen kapat, tekrar aç (güncelleme ikinci açılışta gelir). Giriş ekranı görünüyorsa bulut bağlanmıştır.

## 4) Ana ekrana ekle
- **iPhone/iPad Safari**'de site adresini aç → Paylaş simgesi → **Ana Ekrana Ekle**. (Chrome değil, Safari kullan.)
- Her cihazda aynı e-posta/şifreyle giriş yap; ilerleme eşitlenir.

## Sık sorulanlar
- **Sesli okuma çalışmıyor / sessiz:** Ayarlar › Erişilebilirlik › Konuşma İçeriği › Sesler › Almanca'dan bir ses indir. Sessiz mod anahtarı kapalı olmalı.
- **Çevrimdışı:** Uygulamayı bir kez internetle açtıktan sonra uçak modunda da quiz yapabilirsin; ilerleme cihazda saklanır, internet gelince eşitlenir.
- **Şifremi unuttum:** 1. aşamada uygulamada yok. Supabase paneli → Authentication → Users'tan şifre sıfırlanabilir.
- **Kelime eklemek:** 1. aşamada liste sabit (156 kelime). Fotoğraf/metinden içe aktarma sonraki aşamada.
