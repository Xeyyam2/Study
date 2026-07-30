import type { BlogPost } from '@/types';
import { seedImages } from './images';

export const seedBlog: BlogPost[] = [
  {
    id: 'b-1',
    slug: 'how-to-apply-to-turkish-universities',
    title: {
      en: 'How to Apply to Turkish Universities: A Step-by-Step Guide',
      tr: 'Türk Üniversitelerine Nasıl Başvurulur: Adım Adım Rehber',
      az: 'Türk Universitetlərinə Necə Müraciət Etmək Olar: Addım-addım Bələdçi',
      ru: 'Как поступить в турецкие университеты: пошаговое руководство',
    },
    excerpt: {
      en: 'From choosing a program to getting your acceptance letter — everything you need to know about the application process.',
      tr: 'Program seçmekten kabul mektubunu almak kadar — başvuru süreci hakkında bilmeniz gereken her şey.',
      az: 'Proqram seçməkdən qəbul məktubu almağa qədər — müraciət prosesi haqqında bilməli olduğunuz hər şey.',
      ru: 'От выбора программы до получения письма о зачислении — всё о процессе подачи заявки.',
    },
    content: {
      en: 'Applying to a Turkish university is straightforward if you follow the steps carefully. First, shortlist programs that match your goals and budget. Second, prepare your documents: passport, diploma, transcript, language certificate and motivational letter. Third, submit applications — many universities accept online applications year-round. Fourth, after acceptance, apply for a student visa and arrange accommodation. Finally, arrive and convert your visa to a residence permit within a month.',
      tr: 'Türk üniversitesine başvurmak adımları dikkatlice izlerseniz kolaydır. Önce hedeflerinize ve bütçenize uygun programları kısa listeye alın. İkinci olarak belgelerinizi hazırlayın: pasaport, diploma, transkript, dil sertifikası ve motivasyon mektubu. Üçüncü olarak başvurularınızı gönderin — birçok üniversite yıl boyunca çevrimiçi başvuru kabul eder. Dördüncü olarak kabul sonrası öğrenci vizesi için başvurun ve konaklama ayarlayın. Son olarak varın ve bir ay içinde vizenizi ikamet iznine dönüştürün.',
      az: 'Türk universitetinə müraciət addımlarını diqqətlə izləsəniz asandır. Əvvəlcə məqsədlərinizə və büdcənizə uyğun proqramları qısa siyahıya alın. İkincisi, sənədlərinizi hazırlayın: pasport, diplom, transkript, dil sertifikatı və motivasiya məktubu. Üçüncüsü, müraciətlərinizi göndərin — bir çox universitet il boyu onlayn müraciət qəbul edir. Dördüncüsü, qəbuldan sonra tələbə vizası üçün müraciət edin və qalma yeri təşkil edin. Son olaraq gəlin və bir ay ərzində vizanızı yaşayış icazəsinə çevirin.',
      ru: 'Поступить в турецкий университет несложно, если следовать шагам. Сначала составьте список программ по целям и бюджету. Затем подготовьте документы: паспорт, диплом, выписку, сертификат о языке и мотивационное письмо. После отправьте заявки — многие вузы принимают онлайн круглый год. После зачисления оформите студенческую визу и жильё. По приезде в течение месяца поменяйте визу на вид на жительство.',
    },
    author: 'StudyHub Team',
    publishedAt: '2026-06-15',
    coverImage: seedImages.students,
    category: { en: 'Guides', tr: 'Rehberler', az: 'Bələdçilər', ru: 'Руководства' },
    readingMinutes: 6,
  },
  {
    id: 'b-2',
    slug: 'cost-of-living-in-istanbul-for-students',
    title: {
      en: 'Cost of Living in Istanbul for Students in 2026',
      tr: '2026\'da Öğrenciler için İstanbul Yaşam Maliyeti',
      az: '2026-cı ildə Tələbələr üçün İstanbul Yaşayış Xərcləri',
      ru: 'Стоимость жизни в Стамбуле для студентов в 2026 году',
    },
    excerpt: {
      en: 'Rent, food, transport and fun — a realistic monthly budget breakdown for student life in Istanbul.',
      tr: 'Kira, yemek, ulaşım ve eğlence — İstanbul öğrenci hayatı için gerçekçi bir aylık bütçe dökümü.',
      az: 'İcarə, yemək, nəqliyyat və əyləncə — İstanbul tələbə həyatı üçün realistik aylıq büdcə dökümü.',
      ru: 'Аренда, еда, транспорт и развлечения — реалистичная разбивка ежемесячного бюджета студента в Стамбуле.',
    },
    content: {
      en: 'Istanbul offers a vibrant student life at a reasonable cost. A shared flat runs about USD 200–350 per month; a university dorm is cheaper at USD 150–250. Groceries cost around USD 120–180, and a student transport pass is about USD 20 monthly. Eating out is affordable: a hearty meal is USD 3–6. Overall, plan for USD 400–600 per month including everything.',
      tr: 'İstanbul makul maliyetle canlı bir öğrenci hayatı sunar. Paylaşımlı daire ayda 200–350 USD; üniversite yurdu 150–250 USD ile daha ucuzdur. Market harcamaları 120–180 USD, öğrenci ulaşım kartı aylık 20 USD civarıdır. Dışarıda yemek ucuzdur: doyurucu bir öğün 3–6 USD. Genel olarak her şey dahil ayda 400–600 USD planlayın.',
      az: 'İstanbul məqbul qiymətə canlı tələbə həyatı təklif edir. Paylaşılan mənzil ayda 200–350 ABŞ dolları; universitet yataqxanası 150–250 ABŞ dolları ilə daha ucuzdur. Market xərcləri 120–180 ABŞ dolları, tələbə nəqliyyat kartı ayda 20 ABŞ dollarıdır. Bayırda yemək ucuzdur: doyüşlu yemək 3–6 ABŞ dolları. Ümumilikdə hər şey daxil ayda 400–600 ABŞ dolları planlayın.',
      ru: 'Стамбул предлагает насыщенную студенческую жизнь по разумной цене. Комната — 200–350 USD в месяц; общежитие дешевле — 150–250 USD. Продукты — 120–180 USD, студенческий проездной — около 20 USD. Поесть вне дома недорого: 3–6 USD. В целом закладывайте 400–600 USD в месяц.',
    },
    author: 'StudyHub Team',
    publishedAt: '2026-07-02',
    coverImage: seedImages.istanbul,
    category: { en: 'Student Life', tr: 'Öğrenci Hayatı', az: 'Tələbə Həyatı', ru: 'Студенческая жизнь' },
    readingMinutes: 5,
  },
  {
    id: 'b-3',
    slug: 'turkiye-burslari-scholarship-guide',
    title: {
      en: 'Türkiye Bursları: The Complete Government Scholarship Guide',
      tr: 'Türkiye Bursları: Kapsamlı Devlet Burs Rehberi',
      az: 'Türkiye Bursları: Tam Dövlət Təqaüd Bələdçisi',
      ru: 'Türkiye Bursları: полное руководство по государственной стипендии',
    },
    excerpt: {
      en: 'Full tuition, accommodation, stipend and health insurance — here is how to win the most coveted scholarship in Turkey.',
      tr: 'Tam ücret, konaklama, burs ve sağlık sigortası — Türkiye\'nin en çok istenen bursunu kazanma rehberi.',
      az: 'Tam tədris haqqı, qalma yeri, təqaüd və sığorta — Türkiyənin ən arzu olunan təqaüdünü qazanmaq üçün bələdçi.',
      ru: 'Полное обучение, проживание, стипендия и страховка — как выиграть самую желанную стипендию Турции.',
    },
    content: {
      en: 'Türkiye Bursları is a competitive government scholarship covering 100% of tuition, monthly stipend, accommodation, health insurance and a Turkish language course. Applications open once a year, usually January–February. Selection is based on academic merit, extracurricular achievements and a letter of intent. Prepare early: gather translated and notarised documents and craft a compelling personal statement highlighting your goals.',
      tr: 'Türkiye Bursları, ücretin %100\'ünü, aylık bursu, konaklamayı, sağlık sigortasını ve Türkçe dil kursunu kapsayan rekabetçi bir devlet bursudur. Başvurular yılda bir kez, genellikle Ocak–Şubat açılır. Seçim akademik başarı, sosyal etkinlikler ve niyet mektubuna dayanır. Erken hazırlanın: çevrilmiş ve onaylı belgeleri toplayın ve hedeflerinizi vurgulayan etkileyici bir kişisel beyan yazın.',
      az: 'Türkiye Bursları tədris haqqının 100%-ni, aylıq təqaüdü, qalma yerini, sığortanı və türkçə dil kursunu əhatə edən rəqabətli dövlət təqaüdüdür. Müraciətlər ildə bir dəfə, adətən Yanvar–Fevralda açılır. Seçim akademik nailiyyət, fəaliyyətlər və niyyət məktubu əsasındadır. Vaxtında hazırlaşın: tərcümə və təsdiq edilmiş sənədləri toplayın və məqsədlərinizi vurğulayan təsirli şəxsi bəyanat yazın.',
      ru: 'Türkiye Bursları — конкурентная государственная стипендия: 100% обучения, ежемесячная выплата, проживание, страховка и курс турецкого. Заявки открывают раз в год, обычно январь–февраль. Отбор — по успеваемости, внеучебным достижениям и письму о намерениях. Готовьтесь заранее: соберите переведённые и заверенные документы и напишите убедительное личное заявление.',
    },
    author: 'StudyHub Team',
    publishedAt: '2026-05-20',
    coverImage: seedImages.graduation,
    category: { en: 'Scholarships', tr: 'Burslar', az: 'Təqaüdlər', ru: 'Стипендии' },
    readingMinutes: 7,
  },
];
