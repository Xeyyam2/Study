# X — Türkiyədə Təhsil Platforması: Tam Arxitektura Sənədi
### (StudyLeo-dan güclü, daha sürətli, daha təhlükəsiz, Google-da lider mövqe üçün nəzərdə tutulmuş layihə)

> **Qeyd:** Bu sənəddə **`X`** hərfi hələ seçilməmiş brend/platforma adı üçün **dəyişəndir** (placeholder). Son adı seçdiyiniz zaman, mətn redaktorunda (Word, VS Code, Google Docs və s.) **"Find & Replace All"** funksiyası ilə `X` sözünü seçdiyiniz real adla (məs: "Uniro", "StudyBridge" və s.) bir dəfəyə əvəz etsəniz, sənədin hər yerində ad avtomatik yenilənəcək. `X`-i yalnız tam söz kimi axtarın (whole word), əks halda başqa sözlərin içindəki "x" hərflərinə də təsir edə bilər.

---

## 0. Missiya və Uğur Meyarları

**Missiya:** **X** olaraq, StudyLeo-nun xidmət göstərdiyi 18 bazardan (aşağıda siyahı) gələn tələbələri Türkiyədəki universitetlərlə tanış edib, onlara qəbul prosesində başdan-sona (login → müraciət → qəbul → viza) rəhbərlik etmək.

**Uğur meyarları (KPI-lar):**
| Meyar | Hədəf |
|---|---|
| Google-da "study in Turkey" və bənzər sorğularda mövqe | Top 3, ideal olaraq #1 |
| İndeksdə olan səhifə sayı | 50,000–100,000+ |
| Core Web Vitals | LCP <1.5s, INP <200ms, CLS <0.1 |
| Lighthouse skoru | 90–100 (bütün kateqoriyalarda) |
| Dil sayı | 18 (StudyLeo ilə eyni bazarlar) |
| AI axtarış motorlarında görünmə (ChatGPT, Gemini, Perplexity) | Cavablarda mənbə kimi göstərilmə |

---

## 1. Texnoloji Stack (Təkmilləşdirilmiş)

### Frontend
- **Next.js 15 (App Router)** — statik generasiya + ISR üçün ideal
- **TypeScript** — tip təhlükəsizliyi, az bug
- **Tailwind CSS + shadcn/ui** — sürətli, müasir, tutarlı dizayn sistemi
- **Framer Motion** — yüngül animasiyalar (performansı korlamayacaq şəkildə, `prefers-reduced-motion` dəstəyi ilə)

### Backend / Data
- **Supabase (PostgreSQL + Row Level Security)** — autentifikasiya, verilənlər bazası, faylların saxlanması
- **Prisma ORM** — tip-təhlükəsizliyi olan sorğular
- **Edge Functions** — sürətli, coğrafi baxımdan yaxın icra

> **Alternativ (böyük miqyas üçün):** Əgər gələcəkdə CRM, ödəniş sistemləri, xarici universitet API-ləri ilə mürəkkəb inteqrasiyalar planlaşdırılırsa, Supabase-in üzərinə əlavə **ayrıca backend qatı** (Node.js/NestJS və ya Python/FastAPI, REST və ya GraphQL ilə) qoymaq daha çevik olar. Başlanğıc mərhələdə (Faza 1-2) Supabase tək başına kifayətdir — bu, sonrakı miqyaslanma üçün ehtiyat seçimdir.

### Axtarış
- **Meilisearch və ya Typesense** — universitet/proqram üzrə millisaniyəlik axtarış, faset filtrləmə (ölkə, şəhər, dil, təqaüd, qiymət)
- **Alternativ:** Algolia (ödənişli, amma hazır infrastruktur və daha az DevOps yükü tələb edir — büdcəyə görə seçilə bilər)

### Hosting / CDN
- **Vercel** (Next.js üçün doğma inteqrasiya, Edge Network)
- **Cloudflare** — əlavə DDoS qoruması, WAF, şəkil optimallaşdırması (əgər Vercel-in Image Optimization-u ilə yanaşı istifadə olunacaqsa diqqətlə planlaşdırılmalıdır ki, ikiqat keşləmə olmasın)

### Niyə bu stack daha sürətli və təhlükəsizdir?
- Statik/ISR səhifələr → server hər dəfə yenidən hesablamır, CDN-dən birbaşa verilir
- RLS (Row Level Security) → istifadəçi yalnız öz məlumatına çata bilir, backend məntiqi bazası səviyyəsində qorunur
- Edge middleware → bot/zərərli trafik səhifə render olunmazdan əvvəl süzülür

---

## 2. Rendering Strategiyası (Səhifə tipinə görə)

| Səhifə tipi | Strategiya | Səbəb |
|---|---|---|
| Ana səhifə, Haqqımızda | SSG (Static) | Nadir dəyişir, maksimum sürət |
| Universitet/Proqram/Şəhər səhifələri (min-lərlə) | **ISR** (revalidate: 3600s) | Build zamanı hamısını yaratmaq mümkün deyil, amma tez-tez də dəyişmir |
| Bloq | ISR + on-demand revalidation | Admin panel-dən yazı dərc olunanda ani yenilənmə |
| Tələbə Dashboard-u, Admin Panel | SSR / Client-side | Fərdi, dinamik məlumat, keşlənməməlidir |
| Axtarış nəticələri | Edge Runtime + Meilisearch | Ən aşağı gecikmə |

---

## 3. Beynəlxalq Dəstək (i18n) — 18 Dil (StudyLeo bazarları ilə eyni)

StudyLeo-nun footer-indəki ölkə kodlarını (`US/RU/DE/FR/IR/IQ/AZ/TM/KZ/TR/KG/SA/CN/BG/PK/UZ/TZ/SO/ID`) dillərə uyğunlaşdırdım:

| Kod | Ölkə | Dil | URL prefiksi |
|---|---|---|---|
| US | ABŞ | İngilis | `/en` |
| RU | Rusiya | Rus | `/ru` |
| DE | Almaniya | Alman | `/de` |
| FR | Fransa | Fransız | `/fr` |
| IR | İran | Fars | `/fa` |
| IQ | İraq | Ərəb | `/ar` |
| AZ | Azərbaycan | Azərbaycan | `/az` |
| TM | Türkmənistan | Türkmən | `/tk` |
| KZ | Qazaxıstan | Qazax | `/kk` |
| TR | Türkiyə | Türk | `/tr` |
| KG | Qırğızıstan | Qırğız | `/ky` |
| SA | Səudiyyə Ər. | Ərəb (SA ilə ortaq) | `/ar` (SA/IQ eyni dil səhifəsinə düşür, region hədəflənməsi hreflang ilə) |
| CN | Çin | Çin (Mandarin) | `/zh` |
| BG | Bolqarıstan | Bolqar | `/bg` |
| PK | Pakistan | Urdu | `/ur` |
| UZ | Özbəkistan | Özbək | `/uz` |
| TZ | Tanzaniya | Suahili | `/sw` |
| SO | Somali | Somali | `/so` |
| ID | İndoneziya | İndoneziya | `/id` |

**Nəticə: 17 unikal dil** (Ərəb dili IQ və SA üçün ortaqdır, amma hər iki ölkəyə ayrıca `hreflang="ar-IQ"` və `hreflang="ar-SA"` ilə regional hədəflənmə edilir).

### Texniki tələblər
- `next-intl` və ya `next-i18next` kitabxanası
- Hər dil üçün ayrı URL segment: `/[locale]/universities/[slug]`
- `hreflang` bütün dil versiyaları arasında qarşılıqlı keçid
- `x-default` — dil aşkarlanmayanda ingilis dilinə yönləndirmə
- Brauzer dilinə görə avtomatik təklif (məcburi yönləndirmə yox — SEO üçün zərərlidir, yalnız banner/təklif, `Accept-Language` header-i oxunur)
- Tərcümələr verilənlər bazasında `translations` cədvəlində saxlanılır (statik JSON deyil), ki admin panel-dən idarə oluna bilsin

### Semantik URL nümunəsi
```
X.com/az/universities/turkey/istanbul/bahcesehir-university
X.com/en/programs/medicine/istanbul
X.com/ru/study-in-turkey-from-uzbekistan
```
URL-lər həmişə oxunaqlı, açar sözlə zəngin və kiçik hərflərlə, tire (`-`) ilə ayrılmış olmalıdır — sorğu parametri (`?id=123`) və ya mənasız hash istifadə edilmir.

### hreflang nümunəsi (hər səhifənin `<head>` hissəsində)
```html
<link rel="alternate" hreflang="az-AZ" href="https://X.com/az/universities/bahcesehir-university" />
<link rel="alternate" hreflang="en-US" href="https://X.com/en/universities/bahcesehir-university" />
<link rel="alternate" hreflang="ru-RU" href="https://X.com/ru/universities/bahcesehir-university" />
<link rel="alternate" hreflang="tr-TR" href="https://X.com/tr/universities/bahcesehir-university" />
<link rel="alternate" hreflang="x-default" href="https://X.com/en/universities/bahcesehir-university" />
```
Next.js-də bu, `generateMetadata` funksiyası daxilində bütün 17 dil üçün avtomatik generasiya olunmalıdır (əl ilə yazılmır).

> ⚠️ **Diqqət:** Yuxarıdakı kodda görünən `x-default` — SEO-nun texniki standart termini olub, bizim **`X`** brend-adı dəyişəni ilə heç bir əlaqəsi yoxdur. "Find & Replace" edərkən "whole word" seçimini aktiv etsəniz, `x-default` sözünə toxunulmayacaq.

---

## 4. SEO Strategiyası (Google-da Lider Olmaq Üçün)

### 4.1 Programmatic SEO (əsas güc mənbəyi)
StudyLeo-nun etdiyinin təkmilləşdirilmiş versiyası — kombinasiyalar 4 ölçülü olmalıdır:

```
{Proqram} × {Şəhər} × {Dərəcə səviyyəsi} × {Dil}
```

Nümunə çıxışlar:
- `/study-medicine-in-istanbul-turkey`
- `/bachelor-computer-engineering-ankara-english`
- `/universities-in-turkey-for-pakistani-students`
- `/study-in-turkey-from-nigeria` (ölkə-spesifik giriş səhifələri — vizası, sənədləri, valyuta çevrilməsi ilə)

**Diqqət:** Sırf kombinasiya yaratmaq kifayət deyil — hər səhifədə **unikal, faydalı məzmun** olmalıdır (məs: ölkəyə uyğun viza tələbləri, valyuta ilə qiymət, oxşar tələbələrin rəyi), əks halda Google "thin content/doorway pages" kimi cəzalandıra bilər. Bu, StudyLeo-nun zəif nöqtəsi ola bilər.

### 4.2 Entity SEO & Topical Authority
- Hər universitet üçün **Knowledge Graph-uyğun struktur** (Wikipedia-vari infobox: tarix, tələbə sayı, reytinq, akkreditasiya)
- Mövzu klasterləri: "Tibb təhsili Türkiyədə" mərkəzi səhifə + 50 alt-səhifə (hər universitet, hər şəhər, hər dərəcə üzrə) daxili linklərlə bağlanır

### 4.3 Texniki SEO
- XML sitemap-lar bölünmüş: `sitemap-universities.xml`, `sitemap-programs.xml`, `sitemap-blog.xml`, image/video sitemap
- `robots.txt` — axtarış botlarına düzgün icazə, admin/dashboard bloklanır
- Canonical tag-lar — dublikat kombinasiya səhifələri üçün mütləqdir
- JSON-LD Schema (bax bölmə 8)
- Open Graph + Twitter Card hər səhifədə fərdi

### 4.4 Backlink və Avtoritet Strategiyası (texniki hissədən kənar, amma vacib)
- Türk universitetləri ilə rəsmi tərəfdaşlıq səhifələri (`.edu.tr` domenlərindən link almaq üçün)
- Təhsil jurnalistikası/qonaq bloq yazıları
- Bu, sırf kod məsələsi deyil — məzmun/marketinq komandası tələb edir

---

## 5. GEO (Generative Engine Optimization) — AI Axtarış Motorları Üçün

ChatGPT, Gemini, Perplexity kimi alətlər cavab verərkən mənbə kimi göstərilmək üçün hər səhifədə bu strukturlar olmalıdır:

- **Qısa Cavab bloku** (səhifənin başında, 40-60 söz, birbaşa sualı cavablandıran)
- **Xülasə cədvəli** (tuition, dil, müddət, tələblər — bir baxışda)
- **FAQ bölməsi** (FAQPage schema ilə)
- **Müqayisə cədvəlləri** (universitet A vs B)
- **Statistika/mənbələr** (rəsmi mənbəyə istinad, etibarlılıq siqnalı)
- **Pros & Cons** siyahısı

Bu format həm insan oxucusu, həm də AI modelin mətndən "çıxarış" etməsini asanlaşdırır.

## 6. AEO (Answer Engine Optimization) — Google AI Overview Üçün

- Hər səhifədə ən azı 1 `HowTo` schema (məs: "Türkiyədə universitetə necə müraciət etmək olar")
- Aydın tərif blokları ("Nədir?" sualına cavab verən 2-3 cümləlik paraqraflar)
- Addım-addım siyahılar (`<ol>` strukturu ilə, schema uyğun)

---

## 7. Verilənlər Bazası Strukturu (əsas cədvəllər)

```
countries          (id, name, code, flag_url)
cities              (id, country_id, name)
universities        (id, name, slug, city_id, founded_year, student_count,
                      ranking, accreditation, is_state, logo_url, description)
campuses            (id, university_id, address, lat, lng)
programs            (id, name, degree_level, category, duration)
university_programs  (university_id, program_id, language, tuition_fee, currency)
scholarships        (id, university_id, name, percentage, requirements)
dormitories         (id, university_id, capacity, price, photos)
reviews             (id, university_id, user_id, rating, text, verified)
faqs                (id, entity_type, entity_id, question, answer)
blog_posts          (id, slug, title, content, author, published_at)
translations         (id, entity_type, entity_id, locale, field, value)
leads               (id, user_id, university_id, program_id, status, source)
applications        (id, lead_id, documents[], status, assigned_consultant_id)
users               (id, full_name, email, phone, whatsapp, country, role, ...)
audit_logs          (id, user_id, action, entity, timestamp)
```

---

## 8. JSON-LD Schema Tipləri (hər səhifə tipinə uyğun)

| Səhifə | Schema |
|---|---|
| Ana səhifə | `Organization`, `WebSite` (+ `SearchAction`) |
| Universitet səhifəsi | `CollegeOrUniversity`, `EducationalOrganization`, `AggregateRating` |
| Proqram səhifəsi | `Course`, `Offer` |
| Bloq | `Article`, `BreadcrumbList` |
| FAQ bölmələri | `FAQPage` |
| Rəylər | `Review` |
| Şəkil/Video qalereya | `ImageObject`, `VideoObject` |

---

## 9. İstifadəçi Axını — Login və Müraciət Prosesi

Sizin tələbinizə uyğun olaraq:

```
1. Ziyarətçi → universitet/proqram səhifəsinə baxır (login TƏLƏB OLUNMUR)
2. "Apply Now" düyməsini basır → LOGIN/REGISTER modalı açılır
3. Qeydiyyat forması (məcburi sahələr):
     - Ad, Soyad
     - Telefon nömrəsi
     - WhatsApp nömrəsi (fərqli ola bilər deyə ayrıca sahə)
     - Ölkə (dropdown, bayraqlarla)
     - E-mail (autentifikasiya üçün, Supabase Auth)
     - Şifrə / və ya OTP (SMS/WhatsApp ilə) / və ya Google/Apple ilə giriş
4. Qeydiyyatdan sonra → seçdiyi universitet/proqram avtomatik "Lead" olaraq
   CRM-ə düşür → konsultanta təyin olunur
5. Tələbə Dashboard-una yönləndirilir:
     - Müraciət statusu
     - Sənəd yükləmə
     - Konsultantla mesajlaşma
     - Bildirişlər
```

### Autentifikasiya təhlükəsizliyi
- Supabase Auth + RLS (istifadəçi yalnız öz müraciətini görür)
- Email/SMS doğrulama (OTP)
- Google/Apple OAuth seçimi (sürətli qeydiyyat üçün)
- Passkey dəstəyi (parolsuz giriş, gələcək faza)
- Rate limiting (brute-force qarşısını almaq üçün)

---

## 10. Universitet Detal Səhifəsinin Strukturu

Hər universitet səhifəsi bunları ehtiva etməlidir:

1. **Hero bölməsi** — şəkil, ad, şəhər, reytinq, "Apply Now" CTA
2. **Sürətli faktlar cədvəli** — təsis ili, tələbə sayı, akkreditasiya, dil seçimləri
3. **Proqramlar siyahısı** — dərəcə səviyyəsi üzrə filtrlənə bilən (Bachelor/Master/PhD/Associate)
4. **Təqaüd imkanları**
5. **Tədris haqqı cədvəli** (proqram üzrə, valyuta seçimi ilə)
6. **Yataqxana məlumatı** — qiymət, şəkillər, tutum
7. **Kampus qalereyası** (şəkil/video)
8. **Tələbə rəyləri** (verified badge ilə)
9. **FAQ bölməsi** (universitetə spesifik suallar)
10. **Oxşar universitetlər** (daxili linkləmə üçün)
11. **"Apply Now"** — sabit (sticky) düymə, mobil-friendly

---

## 11. X Admin Panel / Dashboard

### Əsas modullar
- **CRM** — Lead → Konsultant → Sənədlər → Universitet → Təklif → Qəbul → Viza → Gəliş → Tamamlandı (pipeline görünüşü, Kanban board)
- **Universitetlər/Proqramlar** — CRUD idarəetmə
- **Tərcümələr** — hər sahə üçün 17 dildə redaktə paneli
- **SEO Panel** — meta title/description, redirect idarəetmə, sitemap statusu
- **Media Kitabxanası** — şəkil/video yükləmə, avtomatik optimallaşdırma
- **Analitika** — GA4, Search Console inteqrasiyası, konversiya hunisi
- **İstifadəçi/Rol idarəetməsi** — Admin, Konsultant, Redaktor, Tələbə rolları
- **Audit Log** — kim, nə vaxt, nəyi dəyişdi

### AI-dəstəkli alətlər (admin üçün)
- Məqalə/bloq yazısı generatoru
- Meta təsvir generatoru
- FAQ generatoru (universitet məlumatından avtomatik)
- Alt-mətn generatoru (şəkillər üçün)
- Tərcümə köməkçisi (insan yoxlaması ilə)

---

## 12. Performans Hədəfləri

| Metrik | Hədəf |
|---|---|
| LCP (Largest Contentful Paint) | < 1.5s |
| INP (Interaction to Next Paint) | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| TTFB | < 200ms |
| Lighthouse Performance | 90-100 |

### Necə əldə olunur
- Şəkillər üçün `next/image` + WebP/AVIF formatı
- Kritik olmayan JS-lərin lazy-load edilməsi
- Font-ların `font-display: swap` ilə yüklənməsi
- ISR ilə server yükünün azaldılması
- Cloudflare/Vercel Edge Cache

---

## 13. Təhlükəsizlik

- **RLS (Row Level Security)** — Supabase səviyyəsində məlumat izolasiyası
- **2FA** — konsultant/admin hesabları üçün məcburi
- **Rate limiting** — API və login formaları üçün
- **CSP (Content Security Policy)** — XSS hücumlarının qarşısını almaq
- **CSRF token-lər** — form təhlükəsizliyi
- **Şifrələnmiş sənəd saxlama** — tələbə sənədləri (pasport, diplom) üçün
- **Gündəlik backup** — verilənlər bazasının avtomatik ehtiyat nüsxəsi
- **Audit logging** — bütün admin əməliyyatlarının izlənməsi

---

## 14. Analitika və İzləmə

- Google Analytics 4
- Google Search Console (bütün 17 dil versiyası üçün ayrı-ayrı property)
- Microsoft Clarity (heatmap, session recording)
- Meta Pixel / TikTok Pixel (marketinq kampaniyaları üçün, əgər planlaşdırılırsa)
- Konversiya hunisi izləmə: Ziyarət → Qeydiyyat → Müraciət → Qəbul

---

## 15. Qovluq Strukturu (Next.js App Router)

```
app/
  [locale]/
    (marketing)/
      page.tsx                    → Ana səhifə
      about/
      contact/
    universities/
      page.tsx                    → Bütün universitetlər (filtr/axtarış)
      [slug]/
        page.tsx                  → Universitet detalı
    programs/
      [category]/
        [city]/
          page.tsx                → Proqram × Şəhər kombinasiyası
    study-in-turkey-from-[country]/
      page.tsx                    → Ölkə-spesifik giriş səhifəsi
    blog/
      [slug]/
    compare/
      page.tsx                    → Universitet müqayisəsi
    dashboard/                     → Tələbə paneli (auth tələb olunur)
      applications/
      documents/
      messages/
    admin/                         → Admin/CRM (auth + rol tələb olunur)
      crm/
      universities/
      translations/
      seo/
      analytics/
  api/
    auth/
    leads/
    search/
```

---

## 16. Tövsiyə Olunan Faza Planı

| Faza | Məzmun | Təxmini müddət | Status |
|---|---|---|---|
| **Faza 1** | Əsas stack qurulması, verilənlər bazası dizaynı, 3-4 dil (EN/TR/AZ/RU), universitet/proqram səhifə template-ləri | 4-6 həftə | ✅ Tamamlanıb |
| **Faza 2** | Login/CRM axını, tələbə dashboard-u, admin panel əsasları | 3-4 həftə | ✅ Tamamlanıb |
| **Faza 3** | Qalan 13-14 dilin əlavəsi, programmatic SEO səhifələrinin miqyaslandırılması (min-lərlə səhifə) | 4-6 həftə | ✅ Tamamlanıb |
| **Faza 4** | GEO/AEO optimallaşdırma, schema-ların tamamlanması, performans tənzimlənməsi | 2-3 həftə | ✅ Tamamlanıb |
| **Faza 5** | AI modullar (chatbot, məqalə generatoru), analitika tam inteqrasiyası, launch | 3-4 həftə | ✅ Tamamlanıb |

---

## 17. Realist Xəbərdarlıq (vacib)

Bir neçə vacib qeyd:

- **"Google-da həmişə #1 olmaq"** heç bir sayt üçün texniki olaraq zəmanət verilə bilməyən bir şeydir — Google-un alqoritmi, rəqiblərin fəaliyyəti və zamanla dəyişən amillərdən asılıdır. Yuxarıdakı arxitektura ən yaxşı texniki əsası yaradır, amma nəticə həm də məzmun keyfiyyətindən, backlink profilindən və brend etibarlılığından asılıdır.
- **100,000+ səhifə** yaratmaq mümkündür, amma **hər səhifədə unikal dəyər** olmasa, Google bunları "aşağı keyfiyyətli/doorway pages" kimi qiymətləndirib sıralamadan çıxara bilər. Kəmiyyət deyil, kəmiyyət+keyfiyyət birlikdə lazımdır.
- 17-18 dildə peşəkar tərcümə (maşın tərcüməsi deyil) böyük əlavə iş və büdcə tələb edir.

---

Bu sənəd sizin növbəti addım kimi inkişaf komandasına (və ya mənə davamlı iş üçün) verilə biləcək tam texniki spesifikasiyadır. İstəsəniz, bunun əsasında konkret bir hissəni (məsələn, verilənlər bazası sxemi SQL kodu, ya da bir universitet səhifəsinin real Next.js komponenti) kodlaya bilərəm.
