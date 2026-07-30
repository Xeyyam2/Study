import type { Scholarship } from '@/types';

export const seedScholarships: Scholarship[] = [
  {
    id: 's-1',
    universityId: 'u-bahcesehir',
    name: { en: 'International Merit Scholarship', tr: 'Uluslararası Başarı Bursu', az: 'Beynəlxalq Nailiyyət Təqaüdü', ru: 'Международная стипендия за заслуги' },
    percentage: 50,
    requirements: {
      en: 'GPA above 3.5 and a strong motivational letter.',
      tr: '3.5 üzeri not ortalaması ve güçlü bir motivasyon mektubu.',
      az: '3.5-dən yüksək ortalam və güclü motivasiya məktubu.',
      ru: 'Средний балл выше 3,5 и сильное мотивационное письмо.',
    },
  },
  {
    id: 's-2',
    universityId: 'u-bahcesehir',
    name: { en: 'Early Application Discount', tr: 'Erken Başvuru İndirimi', az: 'Vaxtında Müraciət Endirimi', ru: 'Скидка за раннюю заявку' },
    percentage: 25,
    requirements: {
      en: 'Apply before the early-bird deadline.',
      tr: 'Erken başvuru tarihinden önce başvurun.',
      az: 'Vaxtında müraciət tarixindən əvvəl müraciət edin.',
      ru: 'Подайте заявку до даты раннего обращения.',
    },
  },
  {
    id: 's-3',
    universityId: 'u-metu',
    name: { en: 'Turkiye Burslari (Government)', tr: 'Türkiye Bursları (Devlet)', az: 'Türkiyə Təqaüdləri (Dövlət)', ru: 'Türkiye Bursları (Государственные)' },
    percentage: 100,
    requirements: {
      en: 'National government scholarship program with full tuition, accommodation and stipend.',
      tr: 'Tam ücret, konaklama ve burs sağlayan ulusal devlet burs programı.',
      az: 'Tam tədris haqqı, qalma yeri və təqaüd təklif edən milli dövlət təqaüd proqramı.',
      ru: 'Государственная стипендия: полное покрытие обучения, проживание и стипендия.',
    },
  },
  {
    id: 's-4',
    universityId: 'u-izmir-econ',
    name: { en: 'Design Talent Award', tr: 'Tasarım Yetenek Ödülü', az: 'Dizayn İstedad Mükafatı', ru: 'Премия за талант в дизайне' },
    percentage: 40,
    requirements: {
      en: 'Portfolio review for design and architecture applicants.',
      tr: 'Tasarım ve mimarlık başvuru sahipleri için portföy değerlendirmesi.',
      az: 'Dizayn və memarlıq müraciətçiləri üçün portfel qiymətləndirməsi.',
      ru: 'Проверка портфолио для абитуриентов дизайна и архитектуры.',
    },
  },
  {
    id: 's-5',
    universityId: 'u-antalya-bilim',
    name: { en: 'Regional Grant', tr: 'Bölge Hibesi', az: 'Regional Qrant', ru: 'Региональный грант' },
    percentage: 30,
    requirements: {
      en: 'Available for students from selected partner countries.',
      tr: 'Seçili partner ülkelerden gelen öğrenciler içindir.',
      az: 'Seçilmiş tərəfdaş ölkələrdən gələn tələbələr üçündür.',
      ru: 'Для студентов из избранных стран-партнёров.',
    },
  },
];
