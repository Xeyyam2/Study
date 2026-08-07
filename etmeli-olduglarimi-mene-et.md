# Supabase Dashboard-da Etməli Olanlar

Bu faylda admin panel və tələbə Google OAuth üçün Supabase Dashboard-da etməli olduğunuz bütün addımlar var.

---

## 1. Google Provider Aktivləşdir

**Yol:** Supabase Dashboard → sizin project → Authentication → Providers → Google

1. **Enable** düyməsini bas
2. **Client ID** və **Client Secret** — Google Cloud Console-dan al:
   - https://console.cloud.google.com/ adresinə get
   - Yeni project yarat (və ya mövcudu seç)
   - **APIs & Services → Credentials → Create Credentials → OAuth client ID**
   - Application type: **Web application**
   - Authorized redirect URIs əlavə et:
     ```
     https://yshjzqkrhzlzatvtrsof.supabase.co/auth/v1/callback
     ```
   - Yaradılandan sonra **Client ID** və **Client Secret** kopyala
3. Supabase-də hər ikisini yapışdır və **Save** et

---

## 2. Redirect URLs Əlavə Et

**Yol:** Authentication → URL Configuration

**Site URL:**
```
http://localhost:3000
```
(Production-a deploy edəndə dəyiş: `https://sizindomeniniz.com`)

**Redirect URLs (hamısını əlavə et):**
```
http://localhost:3000/auth/callback
https://sizindomeniniz.com/auth/callback
```

---

## 3. Email OTP-ni Söndür (İstəyə bağlı)

**Yol:** Authentication → Providers → Email

Email OTP artıq istifadə olunmur (Google OAuth əvəzinə). Əgər tamamilə söndürmək istəsənsə:

- **Enable Email provider** — ON saxla (admin/consultant üçün lazım ola bilər)
- **Confirm email** — OFF et (Google artıq doğrulayır)

---

## 4. Storage Bucket Yarat (Sənəd yükləmə üçün)

**Yol:** Storage → New bucket

1. Bucket adı: `apply-documents`
2. **Public** bucket et (ON)
3. **Create bucket** bas

**RLS Policy əlavə et:**

Storage → apply-documents → Policies → New Policy

```sql
-- Tələbə öz sənədlərini yükləyə bilər
CREATE POLICY "Students upload own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'apply-documents');

-- Hər kəs oxuya bilər (admin və tələbə)
CREATE POLICY "Anyone can read apply documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'apply-documents');
```

---

## 5. Environment Variables Yoxla

**Yol:** `.env.local` faylı (lokal) və ya Vercel/ deployment platforması

`.env.local` faylında bunlar olmalıdır:

```env
# Supabase (artıq var)
NEXT_PUBLIC_SUPABASE_URL=https://yshjzqkrhzlzatvtrsof.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Site URL (Google OAuth redirect üçün)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Production-a keçəndə:
# SUPABASE_ENABLED=true
# NEXT_PUBLIC_SITE_URL=https://sizindomeniniz.com
```

---

## 6. Admin/Consultant İlk Giriş

Admin panelə (`/admin`) daxil olmaq üçün:

1. `.env.local` faylında əlavə et:
   ```env
   INITIAL_ADMIN_EMAIL=sizin@gmail.com
   ```

2. `/admin/login` səhifəsinə get
3. Google ilə daxil ol
4. İlk giriş avtomatik admin rolunu verəcək

Daha sonra admin paneldən (`/admin/users`) başqa Gmail adresləri əlavə edə bilərsən (admin və ya consultant rolunda).

---

## 7. Deployment (Vercel və ya başqa)

Production-a deploy edəndə:

1. Supabase Dashboard → **URL Configuration**
   - Site URL: `https://sizindomeniniz.com`
   - Redirect URLs: `https://sizindomeniniz.com/auth/callback`

2. Google Cloud Console → Credentials
   - Authorized redirect URIs:
     ```
     https://yshjzqkrhzlzatvtrsof.supabase.co/auth/v1/callback
     ```

3. Deployment platformasında environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://yshjzqkrhzlzatvtrsof.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   NEXT_PUBLIC_SITE_URL=https://sizindomeniniz.com
   INITIAL_ADMIN_EMAIL=sizin@gmail.com
   SUPABASE_ENABLED=true
   ```

4. Database migration-ı Supabase-ə tətbiq et:
   ```bash
   # Supabase SQL Editor-də supabase/migrations/ fayllarını sıra ilə çalışdır
   # Və ya local-dan:
   DATABASE_URL=postgresql://postgres:[PAROL]@db.yshjzqkrhzlzatvtrsof.supabase.co:5432/postgres npm run db:migrate
   ```

---

## Yoxlama Siyahısı

axşam bunları sıra ilə et:

- [ ] Google Cloud Console-da OAuth Client ID yarat
- [ ] Supabase-də Google provider aktivləşdir (Client ID + Secret)
- [ ] Supabase Redirect URLs əlavə et
- [ ] `.env.local` faylına `NEXT_PUBLIC_SITE_URL` əlavə et
- [ ] `apply-documents` Storage bucket yarat + RLS policy
- [ ] `npm run dev` başlat və `/az/dashboard/login`-də Google ilə daxil ol
- [ ] `/admin/login`-də admin kimi daxil ol (ilk Gmail `INITIAL_ADMIN_EMAIL` ilə)
- [ ] Admin paneldən bir consultant Gmail əlavə et
- [ ] Apply formasını yoxla: `/az/apply` — universitet/proqram seçimi, sənəd yükləmə
- [ ] Floating Apply + WhatsApp/Telegram buttonları yoxla

Hamısı işləyirsə hazırdır!
