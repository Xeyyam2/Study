import type { Faq } from '@/types';

export const seedFaqs: Faq[] = [
  // General FAQs
  {
    id: 'f-g1',
    entityType: 'general',
    entityId: 'general',
    question: {
      en: 'Do I need to know Turkish to study in Turkey?',
      tr: 'Türkiye\'de okumak için Türkçe bilmem gerekir mi?',
      az: 'Türkiyədə oxumaq üçün türkçə bilməliyəmmi?',
      ru: 'Нужно ли знать турецкий, чтобы учиться в Турции?',
    },
    answer: {
      en: 'No. Hundreds of programs are taught fully in English. Turkish is helpful for daily life but not required for English-medium programs.',
      tr: 'Hayır. Yüzlerce program tamamen İngilizce verilir. Türkçe günlük hayat için faydalıdır ama İngilizce programlar için gerekli değildir.',
      az: 'Xeyr. Yüzlərlə proqram tamamilə ingilis dilindədir. Türkçə gündəlik həyat üçün faydalıdır, amma ingilis dilində proqramlar üçün tələb olunmur.',
      ru: 'Нет. Сотни программ полностью на английском. Турецкий полезен в быту, но не обязателен для англоязычных программ.',
    },
  },
  {
    id: 'f-g2',
    entityType: 'general',
    entityId: 'general',
    question: {
      en: 'How much does it cost to study in Turkey?',
      tr: 'Türkiye\'de eğitim maliyeti ne kadar?',
      az: 'Türkiyədə təhsilin dəyəri nə qədərdir?',
      ru: 'Сколько стоит учёба в Турции?',
    },
    answer: {
      en: 'State universities cost roughly USD 600–2,000 per year; private universities USD 5,000–25,000. Living costs are around USD 300–600 per month.',
      tr: 'Devlet üniversiteleri yılda yaklaşık 600–2.000 USD; vakıf üniversiteleri 5.000–25.000 USD. Yaşam maliyeti aylık 300–600 USD civarındadır.',
      az: 'Dövlət universitetləri təxminən 600–2000 ABŞ dolları; özəl universitetlər 5000–25000 ABŞ dolları. Yaşayış xərcləri ayda 300–600 ABŞ dollarıdır.',
      ru: 'Государственные вузы: 600–2 000 USD в год; частные: 5 000–25 000 USD. Проживание — около 300–600 USD в месяц.',
    },
  },
  {
    id: 'f-g3',
    entityType: 'general',
    entityId: 'general',
    question: {
      en: 'Do I need a student visa?',
      tr: 'Öğrenci vizesi gerekli mi?',
      az: 'Tələbə vizası lazımdırmı?',
      ru: 'Нужна ли студенческая виза?',
    },
    answer: {
      en: 'Yes. After acceptance you apply for a student visa at the Turkish consulate, then convert it to a residence permit after arrival.',
      tr: 'Evet. Kabul aldıktan sonra Türk konsolosluğundan öğrenci vizesi alır, varıştan sonra ikamet iznine dönüştürürsünüz.',
      az: 'Bəli. Qəbul aldıqdan sonra Türkiyə konsolulluğundan tələbə vizası alır, gəlişdən sonra yaşayış icazəsinə çevirirsiniz.',
      ru: 'Да. После зачисления вы получаете студенческую визу в консульстве, а по приезде меняете её на вид на жительство.',
    },
  },
  {
    id: 'f-g4',
    entityType: 'general',
    entityId: 'general',
    question: {
      en: 'Are scholarships available for international students?',
      tr: 'Uluslararası öğrenciler için burs var mı?',
      az: 'Beynəlxalq tələbələr üçün təqaüd varmı?',
      ru: 'Есть ли стипендии для иностранных студентов?',
    },
    answer: {
      en: 'Yes. The Türkiye Bursları government program offers full scholarships, and most private universities offer merit discounts of 25–100%.',
      tr: 'Evet. Türkiye Bursları devlet programı tam burs sunar ve çoğu vakıf üniversitesi %25–100 başarı indirimleri verir.',
      az: 'Bəli. Türkiye Bursları dövlət proqramı tam təqaüd təklif edir və əksər özəl universitetlər 25–100% nailiyyət endirimləri verir.',
      ru: 'Да. Программа Türkiye Bursları даёт полные стипендии, а частные вузы — скидки 25–100% за заслуги.',
    },
  },
  {
    id: 'f-g5',
    entityType: 'general',
    entityId: 'general',
    question: {
      en: 'What documents do I need to apply?',
      tr: 'Başvuru için hangi belgeler gerekli?',
      az: 'Müraciət üçün hansı sənədlər lazımdır?',
      ru: 'Какие документы нужны для подачи заявки?',
    },
    answer: {
      en: 'Typically: passport, high-school diploma and transcript (translated & notarised), passport photo, motivational letter and language certificate.',
      tr: 'Genellikle: pasaport, lise diploması ve transkripti (tercümeli ve onaylı), vesikalık fotoğraf, motivasyon mektubu ve dil sertifikası.',
      az: 'Adətən: pasport, orta məktəb diploması və transkripti (tərcümə və təsdiq edilmiş), şəkil, motivasiya məktubu və dil sertifikatı.',
      ru: 'Обычно: паспорт, аттестат и выписка оценок (перевод и нотариальное заверение), фото, мотивационное письмо и сертификат о языке.',
    },
  },
  // University-specific
  {
    id: 'f-bau1',
    entityType: 'university',
    entityId: 'u-bahcesehir',
    question: {
      en: 'Is Bahçeşehir University accredited internationally?',
      tr: 'Bahçeşehir Üniversitesi uluslararası akredite mi?',
      az: 'Bahçeşehir Universiteti beynəlxalq akreditə olunubmu?',
      ru: 'Аккредитован ли Бахчешеширский университет международно?',
    },
    answer: {
      en: 'Yes. It is recognised by YÖK and holds several international accreditations for its business and engineering programs.',
      tr: 'Evet. YÖK tarafından tanınır ve işletme ile mühendislik programları için çeşitli uluslararası akreditasyonlara sahiptir.',
      az: 'Bəli. YÖK tərəfindən tanınır və biznes və mühəndislik proqramları üçün bir neçə beynəlxalq akreditasiyaya malikdir.',
      ru: 'Да. Признан YÖK и имеет ряд международных аккредитаций по бизнесу и инженерии.',
    },
  },
  {
    id: 'f-metu1',
    entityType: 'university',
    entityId: 'u-metu',
    question: {
      en: 'Does METU offer accommodation on campus?',
      tr: 'ODTÜ kampüste konaklama sunuyor mu?',
      az: 'ODTÜ kampusda qalma yeri təklif edirmi?',
      ru: 'Предоставляет ли ODTÜ проживание на кампусе?',
    },
    answer: {
      en: 'Yes. METU has one of the largest dormitory capacities in Turkey, with affordable on-campus housing for students.',
      tr: 'Evet. ODTÜ, Türkiye\'nin en büyük yurt kapasitelerinden birine sahiptir ve uygun fiyatlı kampüs içi konaklama sunar.',
      az: 'Bəli. ODTÜ Türkiyənin ən böyük yataqxana tutumlarından birinə malikdir və tələbələr üçün uyğun qiymətli kampus içi qalma yeri təklif edir.',
      ru: 'Да. В ODTÜ одно из крупнейших общежитий в Турции с доступным проживанием на кампусе.',
    },
  },
];
