// AUTO-GENERATED from the StudyLeo catalog (scripts/data/studyleo-catalog.json).
// Do not edit by hand. Regenerate with:
//   npm run scrape:studyleo && node scripts/generate-seed-from-catalog.mjs
//
// Import is RELATIVE ('../../types') on purpose: scripts/seed-content.ts runs
// under tsx, which does not resolve the '@/' path alias.
import type { City, Program, University, UniversityProgram } from '../../types';

/**
 * StudyLeo-only universities. Currently empty: every university in the catalog
 * is already present in the hand-written src/lib/seed/universities.ts (matched
 * by name or slug). Rows for these are inserted into the DB by the existing
 * seedUniversities; this array exists so new catalog universities automatically
 * flow through the same pipeline.
 *
 * Placeholder fields (catalog has no data): foundedYear 1998, studentCount 0,
 * ranking 999 (sorts to the end of /universities), tagline/description empty,
 * heroImage points at the scraped local file, gallery empty.
 */
export const studyLeoUniversities: University[] = [];

/**
 * StudyLeo-only programs (EN name only). Program rows whose EN name already
 * exists in seedPrograms are skipped. Slugs are globally unique in the DB, so
 * repeated catalog slugs get a '-<universitySlug>' suffix after the first use.
 */
export const studyLeoPrograms: Program[] = [
  {
    "id": "p-u-istanbul-medipol-dental-prosthetics-technology",
    "slug": "dental-prosthetics-technology",
    "name": {
      "en": "Dental Prosthetics Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "dentistry",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-sports-management",
    "slug": "sports-management",
    "name": {
      "en": "Sports Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-audiology",
    "slug": "audiology",
    "name": {
      "en": "Audiology"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-social-services",
    "slug": "social-services",
    "name": {
      "en": "Social Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-physiotherapy-and-rehabilitation",
    "slug": "physiotherapy-and-rehabilitation",
    "name": {
      "en": "Physiotherapy and Rehabilitation"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-midwifery",
    "slug": "midwifery",
    "name": {
      "en": "Midwifery"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-civil-aviation-cabin-services",
    "slug": "civil-aviation-cabin-services",
    "name": {
      "en": "Civil Aviation Cabin Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-medical-imaging-techniques",
    "slug": "medical-imaging-techniques",
    "name": {
      "en": "Medical Imaging Techniques"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-medical-documentation-and-secretary",
    "slug": "medical-documentation-and-secretary",
    "name": {
      "en": "Medical Documentation and Secretary"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-opticianry",
    "slug": "opticianry",
    "name": {
      "en": "Opticianry"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-audiometry",
    "slug": "audiometry",
    "name": {
      "en": "Audiometry"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-architectural-restoration",
    "slug": "architectural-restoration",
    "name": {
      "en": "Architectural Restoration"
    },
    "degreeLevel": "associate",
    "categorySlug": "architecture",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-construction-technology",
    "slug": "construction-technology",
    "name": {
      "en": "Construction Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-interior-design",
    "slug": "interior-design",
    "name": {
      "en": "Interior Design"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-electroneurophysiology",
    "slug": "electroneurophysiology",
    "name": {
      "en": "Electroneurophysiology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-dialysis",
    "slug": "dialysis",
    "name": {
      "en": "Dialysis"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-child-development",
    "slug": "child-development",
    "name": {
      "en": "Child Development"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-biomedical-device-technology",
    "slug": "biomedical-device-technology",
    "name": {
      "en": "Biomedical Device Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-computer-programming",
    "slug": "computer-programming",
    "name": {
      "en": "Computer Programming"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-operating-room-services",
    "slug": "operating-room-services",
    "name": {
      "en": "Operating Room Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-oral-and-dental-health",
    "slug": "oral-and-dental-health",
    "name": {
      "en": "Oral and Dental Health"
    },
    "degreeLevel": "associate",
    "categorySlug": "dentistry",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-justice",
    "slug": "justice",
    "name": {
      "en": "Justice"
    },
    "degreeLevel": "associate",
    "categorySlug": "law",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-civil-aviation-transportation-management",
    "slug": "civil-aviation-transportation-management",
    "name": {
      "en": "Civil Aviation Transportation Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-applied-english-and-translation",
    "slug": "applied-english-and-translation",
    "name": {
      "en": "Applied English and Translation"
    },
    "degreeLevel": "associate",
    "categorySlug": "humanities",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-accounting-and-tax-applications",
    "slug": "accounting-and-tax-applications",
    "name": {
      "en": "Accounting and Tax Applications"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-logistics",
    "slug": "logistics",
    "name": {
      "en": "Logistics"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-human-resource-management",
    "slug": "human-resource-management",
    "name": {
      "en": "Human Resource Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-radio-and-television-programming",
    "slug": "radio-and-television-programming",
    "name": {
      "en": "Radio and Television Programming"
    },
    "degreeLevel": "associate",
    "categorySlug": "communication",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-public-relation-and-publicity",
    "slug": "public-relation-and-publicity",
    "name": {
      "en": "Public Relation and Publicity"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-foreign-trade",
    "slug": "foreign-trade",
    "name": {
      "en": "Foreign Trade"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-banking-and-insurance",
    "slug": "banking-and-insurance",
    "name": {
      "en": "Banking and Insurance"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-medical-laboratory-techniques",
    "slug": "medical-laboratory-techniques",
    "name": {
      "en": "Medical Laboratory Techniques"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-management-of-health-institutions",
    "slug": "management-of-health-institutions",
    "name": {
      "en": "Management of Health Institutions"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-radiotherapy",
    "slug": "radiotherapy",
    "name": {
      "en": "Radiotherapy"
    },
    "degreeLevel": "associate",
    "categorySlug": "communication",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-pathology-laboratory-techniques",
    "slug": "pathology-laboratory-techniques",
    "name": {
      "en": "Pathology Laboratory Techniques"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-occupational-health-and-safety",
    "slug": "occupational-health-and-safety",
    "name": {
      "en": "Occupational Health and Safety"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-emergency-and-first-aid",
    "slug": "emergency-and-first-aid",
    "name": {
      "en": "Emergency and First Aid"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-pharmacy-services",
    "slug": "pharmacy-services",
    "name": {
      "en": "Pharmacy Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-anesthesia",
    "slug": "anesthesia",
    "name": {
      "en": "Anesthesia"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-english-teaching",
    "slug": "english-teaching",
    "name": {
      "en": "English Teaching"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-logistic-management",
    "slug": "logistic-management",
    "name": {
      "en": "Logistic Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-speech-and-language-therapy",
    "slug": "speech-and-language-therapy",
    "name": {
      "en": "Speech and Language Therapy"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "health-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-ergotherapy",
    "slug": "ergotherapy",
    "name": {
      "en": "Ergotherapy"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-turkish-music-art",
    "slug": "turkish-music-art",
    "name": {
      "en": "Turkish Music Art"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-urban-design-and-landscape-architecture",
    "slug": "urban-design-and-landscape-architecture",
    "name": {
      "en": "Urban Design and Landscape Architecture"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "architecture",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-health-management",
    "slug": "health-management",
    "name": {
      "en": "Health Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-interior-architecture-and-environmental-design",
    "slug": "interior-architecture-and-environmental-design",
    "name": {
      "en": "Interior Architecture and Environmental Design"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "architecture",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-special-education-teaching",
    "slug": "special-education-teaching",
    "name": {
      "en": "Special Education Teaching"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-radio-tv-and-cinema",
    "slug": "radio-tv-and-cinema",
    "name": {
      "en": "Radio, TV and Cinema"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-orthopedic-prosthetic-and-orthotics",
    "slug": "orthopedic-prosthetic-and-orthotics",
    "name": {
      "en": "Orthopedic Prosthetic and Orthotics"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-public-relation-and-advertisement",
    "slug": "public-relation-and-advertisement",
    "name": {
      "en": "Public Relation and Advertisement"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-visual-communication-design",
    "slug": "visual-communication-design",
    "name": {
      "en": "Visual Communication Design"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-political-science-and-public-administration",
    "slug": "political-science-and-public-administration",
    "name": {
      "en": "Political Science and Public Administration"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-political-science-and-international-relations",
    "slug": "political-science-and-international-relations",
    "name": {
      "en": "Political Science and International Relations"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-management-information-system",
    "slug": "management-information-system",
    "name": {
      "en": "Management Information System"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-international-trade-and-finance",
    "slug": "international-trade-and-finance",
    "name": {
      "en": "International Trade and Finance"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-economics-and-finance",
    "slug": "economics-and-finance",
    "name": {
      "en": "Economics and Finance"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-aviation-management",
    "slug": "aviation-management",
    "name": {
      "en": "Aviation Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-electrical-and-electronic-engineering",
    "slug": "electrical-and-electronic-engineering",
    "name": {
      "en": "Electrical and Electronic Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-new-media-and-communication-systems",
    "slug": "new-media-and-communication-systems",
    "name": {
      "en": "New Media and Communication Systems"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "communication",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-pre-school-teaching",
    "slug": "pre-school-teaching",
    "name": {
      "en": "Pre-School Teaching"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-media-and-visual-arts",
    "slug": "media-and-visual-arts",
    "name": {
      "en": "Media and Visual Arts"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-primary-mathematics-education",
    "slug": "primary-mathematics-education",
    "name": {
      "en": "Primary Mathematics Education"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "natural-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-guidance-and-psychology-counselling",
    "slug": "guidance-and-psychology-counselling",
    "name": {
      "en": "Guidance and Psychology Counselling"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "health-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-medipol-molecular-medicine",
    "slug": "molecular-medicine",
    "name": {
      "en": "Molecular Medicine"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-healthcare-systems-engineering",
    "slug": "healthcare-systems-engineering",
    "name": {
      "en": "Healthcare Systems Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-electrical-electronics-engineering-and-cyber-systems",
    "slug": "electrical-electronics-engineering-and-cyber-systems",
    "name": {
      "en": "Electrical-Electronics Engineering and Cyber Systems"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-construction-management-and-law",
    "slug": "construction-management-and-law",
    "name": {
      "en": "Construction Management and Law"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-medipol-climate-change-energy-and-health",
    "slug": "climate-change-energy-and-health",
    "name": {
      "en": "Climate Change, Energy and Health"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-medipol-built-environment-and-health",
    "slug": "built-environment-and-health",
    "name": {
      "en": "Built Environment and Health"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-medipol-biomedical-engineering-and-bioinformatics",
    "slug": "biomedical-engineering-and-bioinformatics",
    "name": {
      "en": "Biomedical Engineering and Bioinformatics"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-eldercare",
    "slug": "eldercare",
    "name": {
      "en": "Eldercare"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-data-science-and-analytics",
    "slug": "data-science-and-analytics",
    "name": {
      "en": "Data Science and Analytics"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "computer-science",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-topkapi-cyber-security",
    "slug": "cyber-security",
    "name": {
      "en": "Cyber Security"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-aircraft-technology-ep",
    "slug": "aircraft-technology-ep",
    "name": {
      "en": "Aircraft Technology EP"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-film-design-and-directing",
    "slug": "film-design-and-directing",
    "name": {
      "en": "Film Design and Directing"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-topkapi-culinary-arts-ep",
    "slug": "culinary-arts-ep",
    "name": {
      "en": "Culinary Arts (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-culinary-arts-dl",
    "slug": "culinary-arts-dl",
    "name": {
      "en": "Culinary Arts (DL)"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-culinary-arts",
    "slug": "culinary-arts",
    "name": {
      "en": "Culinary Arts"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-computer-technology",
    "slug": "computer-technology",
    "name": {
      "en": "Computer Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-automotive-technology",
    "slug": "automotive-technology",
    "name": {
      "en": "Automotive Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-web-design-and-coding",
    "slug": "web-design-and-coding",
    "name": {
      "en": "Web Design and Coding"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-maritime-politics-and-strategies",
    "slug": "maritime-politics-and-strategies",
    "name": {
      "en": "Maritime Politics and Strategies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-information-systems-engineering",
    "slug": "information-systems-engineering",
    "name": {
      "en": "Information Systems Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-topkapi-tourism-guidance-dl",
    "slug": "tourism-guidance-dl",
    "name": {
      "en": "Tourism Guidance (DL)"
    },
    "degreeLevel": "associate",
    "categorySlug": "tourism",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-cooking-ep",
    "slug": "cooking-ep",
    "name": {
      "en": "Cooking (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-cooking-dl",
    "slug": "cooking-dl",
    "name": {
      "en": "Cooking (DL)"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-cooking",
    "slug": "cooking",
    "name": {
      "en": "Cooking"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-acting",
    "slug": "acting",
    "name": {
      "en": "Acting"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-topkapi-performing-arts",
    "slug": "performing-arts",
    "name": {
      "en": "Performing Arts"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-topkapi-artificial-intelligence-istanbul-topkapi-university",
    "slug": "artificial-intelligence-istanbul-topkapi-university",
    "name": {
      "en": "Artificial Intelligence"
    },
    "degreeLevel": "master",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-english-translation-and-interpreting",
    "slug": "english-translation-and-interpreting",
    "name": {
      "en": "English Translation and Interpreting"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-topkapi-security-sciences-and-applications",
    "slug": "security-sciences-and-applications",
    "name": {
      "en": "Security Sciences and Applications"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-medical-imaging-techniques-ep",
    "slug": "medical-imaging-techniques-ep",
    "name": {
      "en": "Medical Imaging Techniques (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-medical-laboratory-ep",
    "slug": "medical-laboratory-ep",
    "name": {
      "en": "Medical Laboratory (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-medical-documentation-and-secretarial-ep",
    "slug": "medical-documentation-and-secretarial-ep",
    "name": {
      "en": "Medical Documentation and Secretarial (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-civil-aviation-cabin-services-ep",
    "slug": "civil-aviation-cabin-services-ep",
    "name": {
      "en": "Civil Aviation Cabin Services (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-civil-aviation-transportation-management-ep",
    "slug": "civil-aviation-transportation-management-ep",
    "name": {
      "en": "Civil Aviation Transportation Management (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-fashion-design-ep",
    "slug": "fashion-design-ep",
    "name": {
      "en": "Fashion Design (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-architectural-restoration-ep",
    "slug": "architectural-restoration-ep",
    "name": {
      "en": "Architectural Restoration (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "architecture",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-internet-and-network-technologies-ep",
    "slug": "internet-and-network-technologies-ep",
    "name": {
      "en": "Internet and Network Technologies (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-emergency-and-first-aid-ep",
    "slug": "emergency-and-first-aid-ep",
    "name": {
      "en": "Emergency and First Aid (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-interior-design-ep",
    "slug": "interior-design-ep",
    "name": {
      "en": "Interior Design (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-maps-and-cadaster-ep",
    "slug": "maps-and-cadaster-ep",
    "name": {
      "en": "Maps and Cadaster (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-graphic-design-dl",
    "slug": "graphic-design-dl",
    "name": {
      "en": "Graphic Design (DL)"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-physiotherapy-ep",
    "slug": "physiotherapy-ep",
    "name": {
      "en": "Physiotherapy (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-child-development-ep",
    "slug": "child-development-ep",
    "name": {
      "en": "Child Development (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-computer-programming-ep",
    "slug": "computer-programming-ep",
    "name": {
      "en": "Computer Programming (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-computer-aided-design-and-animation-ep",
    "slug": "computer-aided-design-and-animation-ep",
    "name": {
      "en": "Computer Aided Design and Animation (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-oral-and-dental-health-ep",
    "slug": "oral-and-dental-health-ep",
    "name": {
      "en": "Oral and Dental Health (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "dentistry",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-international-business-and-trade",
    "slug": "international-business-and-trade",
    "name": {
      "en": "International Business and Trade"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-topkapi-management-information-systems",
    "slug": "management-information-systems",
    "name": {
      "en": "Management Information Systems"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-marketing-communication",
    "slug": "marketing-communication",
    "name": {
      "en": "Marketing Communication"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-electrics",
    "slug": "electrics",
    "name": {
      "en": "Electrics"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-maps-and-cadaster",
    "slug": "maps-and-cadaster",
    "name": {
      "en": "Maps and Cadaster"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-tourism-guidance",
    "slug": "tourism-guidance",
    "name": {
      "en": "Tourism Guidance"
    },
    "degreeLevel": "associate",
    "categorySlug": "tourism",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-fashion-design-dl",
    "slug": "fashion-design-dl",
    "name": {
      "en": "Fashion Design (DL)"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-medical-laboratory",
    "slug": "medical-laboratory",
    "name": {
      "en": "Medical Laboratory"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-medical-documentation-and-secretarial",
    "slug": "medical-documentation-and-secretarial",
    "name": {
      "en": "Medical Documentation and Secretarial"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-internet-and-network-technologies-dl",
    "slug": "internet-and-network-technologies-dl",
    "name": {
      "en": "Internet and Network Technologies (DL)"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-internet-and-network-technologies",
    "slug": "internet-and-network-technologies",
    "name": {
      "en": "Internet and Network Technologies"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-computer-programming-dl",
    "slug": "computer-programming-dl",
    "name": {
      "en": "Computer Programming (DL)"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-computer-aided-design-and-animation-dl",
    "slug": "computer-aided-design-and-animation-dl",
    "name": {
      "en": "Computer Aided Design and Animation (DL)"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-computer-aided-design-and-animation",
    "slug": "computer-aided-design-and-animation",
    "name": {
      "en": "Computer Aided Design and Animation"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-aircraft-technology",
    "slug": "aircraft-technology",
    "name": {
      "en": "Aircraft Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-child-development-dl",
    "slug": "child-development-dl",
    "name": {
      "en": "Child Development (DL)"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-topkapi-painting",
    "slug": "painting",
    "name": {
      "en": "Painting"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-topkapi-theatre",
    "slug": "theatre",
    "name": {
      "en": "Theatre"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-topkapi-digital-game-design",
    "slug": "digital-game-design",
    "name": {
      "en": "Digital Game Design"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-topkapi-recreation",
    "slug": "recreation",
    "name": {
      "en": "Recreation"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-topkapi-coaching-training",
    "slug": "coaching-training",
    "name": {
      "en": "Coaching Training"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-topkapi-new-media",
    "slug": "new-media",
    "name": {
      "en": "New Media"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "communication",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-topkapi-public-relations-and-advertisement",
    "slug": "public-relations-and-advertisement",
    "name": {
      "en": "Public Relations and Advertisement"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-topkapi-english-language-and-literature",
    "slug": "english-language-and-literature",
    "name": {
      "en": "English Language and Literature"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-topkapi-cartoons-and-animation",
    "slug": "cartoons-and-animation",
    "name": {
      "en": "Cartoons and Animation"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-topkapi-fashion-and-textile-design",
    "slug": "fashion-and-textile-design",
    "name": {
      "en": "Fashion and Textile Design"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-acibadem-mehmet-ali-aydinlar-healthcare-management",
    "slug": "healthcare-management",
    "name": {
      "en": "Healthcare Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-acibadem-mehmet-ali-aydinlar-culinary",
    "slug": "culinary",
    "name": {
      "en": "Culinary"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-acibadem-mehmet-ali-aydinlar-biomedical-equipment-technology",
    "slug": "biomedical-equipment-technology",
    "name": {
      "en": "Biomedical Equipment Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-acibadem-mehmet-ali-aydinlar-first-and-emergency-health",
    "slug": "first-and-emergency-health",
    "name": {
      "en": "First and Emergency Health"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-acibadem-mehmet-ali-aydinlar-orthopedic-prostheses-and-ortheses",
    "slug": "orthopedic-prostheses-and-ortheses",
    "name": {
      "en": "Orthopedic Prostheses and Ortheses"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-acibadem-mehmet-ali-aydinlar-podology",
    "slug": "podology",
    "name": {
      "en": "Podology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-acibadem-mehmet-ali-aydinlar-medical-documentation-and-secretariat",
    "slug": "medical-documentation-and-secretariat",
    "name": {
      "en": "Medical Documentation and Secretariat"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-antalya-bilim-electrical-and-electronics-engineering",
    "slug": "electrical-and-electronics-engineering",
    "name": {
      "en": "Electrical and Electronics Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-antalya-bilim-pilotage",
    "slug": "pilotage",
    "name": {
      "en": "Pilotage"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-antalya-bilim-global-politics-and-international-relations",
    "slug": "global-politics-and-international-relations",
    "name": {
      "en": "Global Politics and International Relations"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-antalya-bilim-electrical-and-computer-engineering",
    "slug": "electrical-and-computer-engineering",
    "name": {
      "en": "Electrical and Computer Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-antalya-bilim-public-law",
    "slug": "public-law",
    "name": {
      "en": "Public Law"
    },
    "degreeLevel": "master",
    "categorySlug": "law",
    "durationYears": 2
  },
  {
    "id": "p-u-antalya-bilim-private-law",
    "slug": "private-law",
    "name": {
      "en": "Private Law"
    },
    "degreeLevel": "master",
    "categorySlug": "law",
    "durationYears": 2
  },
  {
    "id": "p-u-antalya-bilim-clinical-psychology",
    "slug": "clinical-psychology",
    "name": {
      "en": "Clinical Psychology"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-physical-education-and-sports",
    "slug": "physical-education-and-sports",
    "name": {
      "en": "Physical Education and Sports"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-surgery-services-ep",
    "slug": "surgery-services-ep",
    "name": {
      "en": "Surgery Services (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-surgery-services",
    "slug": "surgery-services",
    "name": {
      "en": "Surgery Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-anthropology",
    "slug": "anthropology",
    "name": {
      "en": "Anthropology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-prosthetic-dental-treatment",
    "slug": "prosthetic-dental-treatment",
    "name": {
      "en": "Prosthetic Dental Treatment"
    },
    "degreeLevel": "master",
    "categorySlug": "dentistry",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-anglo-american-literature-and-creative-writing",
    "slug": "anglo-american-literature-and-creative-writing",
    "name": {
      "en": "Anglo American Literature and Creative Writing"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-technology-and-restoration-of-painting",
    "slug": "technology-and-restoration-of-painting",
    "name": {
      "en": "Technology and Restoration of Painting"
    },
    "degreeLevel": "master",
    "categorySlug": "architecture",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-communication-management",
    "slug": "communication-management",
    "name": {
      "en": "Communication Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-orthodontics",
    "slug": "orthodontics",
    "name": {
      "en": "Orthodontics"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-clinical-embryology",
    "slug": "clinical-embryology",
    "name": {
      "en": "Clinical Embryology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-logistics-ep",
    "slug": "logistics-ep",
    "name": {
      "en": "Logistics (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-tourism-and-travel-services-ep",
    "slug": "tourism-and-travel-services-ep",
    "name": {
      "en": "Tourism and Travel Services (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "tourism",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-tourism-and-hotel-management",
    "slug": "tourism-and-hotel-management",
    "name": {
      "en": "Tourism and Hotel Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-elderly-care-services",
    "slug": "elderly-care-services",
    "name": {
      "en": "Elderly Care Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-anesthesia-ep",
    "slug": "anesthesia-ep",
    "name": {
      "en": "Anesthesia (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-new-media-and-journalism",
    "slug": "new-media-and-journalism",
    "name": {
      "en": "New Media and Journalism"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "communication",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-yeni-yuzyil-international-trade-and-logistics",
    "slug": "international-trade-and-logistics",
    "name": {
      "en": "International Trade and Logistics"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-esenyurt-emergency-services-ep",
    "slug": "emergency-services-ep",
    "name": {
      "en": "Emergency Services (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-esenyurt-emergency-services",
    "slug": "emergency-services",
    "name": {
      "en": "Emergency Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-esenyurt-operating-room-service-ep",
    "slug": "operating-room-service-ep",
    "name": {
      "en": "Operating Room Service (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-esenyurt-criminal-enforcement-and-security-services",
    "slug": "criminal-enforcement-and-security-services",
    "name": {
      "en": "Criminal Enforcement and Security Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-esenyurt-information-security-technology",
    "slug": "information-security-technology",
    "name": {
      "en": "Information Security Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-esenyurt-business-management",
    "slug": "business-management",
    "name": {
      "en": "Business Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-esenyurt-occupational-health-and-safety-ep",
    "slug": "occupational-health-and-safety-ep",
    "name": {
      "en": "Occupational Health and Safety (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-esenyurt-graphic-design-ep",
    "slug": "graphic-design-ep",
    "name": {
      "en": "Graphic Design (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-esenyurt-e-trade-and-marketing",
    "slug": "e-trade-and-marketing",
    "name": {
      "en": "E-Trade and Marketing"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-esenyurt-movement-and-training-sciences",
    "slug": "movement-and-training-sciences",
    "name": {
      "en": "Movement and Training Sciences"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-esenyurt-physical-exercise-health-and-sports-science",
    "slug": "physical-exercise-health-and-sports-science",
    "name": {
      "en": "Physical Exercise Health and Sports Science"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-esenyurt-sport-sciences",
    "slug": "sport-sciences",
    "name": {
      "en": "Sport Sciences"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-esenyurt-political-science-and-international-relation",
    "slug": "political-science-and-international-relation",
    "name": {
      "en": "Political Science and International Relation"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-esenyurt-online-mba",
    "slug": "online-mba",
    "name": {
      "en": "Online MBA"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-esenyurt-health-institutions-management-dl",
    "slug": "health-institutions-management-dl",
    "name": {
      "en": "Health Institutions Management (DL)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-esenyurt-management-and-organisation",
    "slug": "management-and-organisation",
    "name": {
      "en": "Management and Organisation"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-esenyurt-health-institutions-management",
    "slug": "health-institutions-management",
    "name": {
      "en": "Health Institutions Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-esenyurt-real-estate-finance-and-valuation",
    "slug": "real-estate-finance-and-valuation",
    "name": {
      "en": "Real Estate Finance and Valuation"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-esenyurt-electronic-commerce-and-management",
    "slug": "electronic-commerce-and-management",
    "name": {
      "en": "Electronic Commerce and Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-esenyurt-sport-s-management",
    "slug": "sport-s-management",
    "name": {
      "en": "Sport's Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-altinbas-public-relations-and-advertising",
    "slug": "public-relations-and-advertising",
    "name": {
      "en": "Public Relations and Advertising"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-altinbas-software-development",
    "slug": "software-development",
    "name": {
      "en": "Software Development"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "computer-science",
    "durationYears": 4
  },
  {
    "id": "p-u-altinbas-logistics-management",
    "slug": "logistics-management",
    "name": {
      "en": "Logistics Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-altinbas-jewelry-technology-and-design",
    "slug": "jewelry-technology-and-design",
    "name": {
      "en": "Jewelry Technology And Design"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-altinbas-international-relations-altinbas-university",
    "slug": "international-relations-altinbas-university",
    "name": {
      "en": "International Relations "
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-altinbas-international-trade-law",
    "slug": "international-trade-law",
    "name": {
      "en": "International Trade Law"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-altinbas-international-taxation",
    "slug": "international-taxation",
    "name": {
      "en": "International Taxation "
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-altinbas-financial-economics",
    "slug": "financial-economics",
    "name": {
      "en": "Financial Economics"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-altinbas-accounting-and-auditing",
    "slug": "accounting-and-auditing",
    "name": {
      "en": "Accounting and Auditing"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-altinbas-international-relations-joint",
    "slug": "international-relations-joint",
    "name": {
      "en": "International Relations Joint"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-altinbas-arts-and-design",
    "slug": "arts-and-design",
    "name": {
      "en": "Arts and Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-altinbas-strategic-marketing-and-brand-management",
    "slug": "strategic-marketing-and-brand-management",
    "name": {
      "en": "Strategic Marketing and Brand Management "
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-altinbas-data-analytics",
    "slug": "data-analytics",
    "name": {
      "en": "Data Analytics "
    },
    "degreeLevel": "master",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-altinbas-information-technology",
    "slug": "information-technology",
    "name": {
      "en": "Information Technology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-altinbas-pediatric-dentistry",
    "slug": "pediatric-dentistry",
    "name": {
      "en": "Pediatric Dentistry"
    },
    "degreeLevel": "master",
    "categorySlug": "dentistry",
    "durationYears": 3
  },
  {
    "id": "p-u-altinbas-histology-and-embryology",
    "slug": "histology-and-embryology",
    "name": {
      "en": "Histology and Embryology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-altinbas-clinical-periodontology",
    "slug": "clinical-periodontology",
    "name": {
      "en": "Clinical Periodontology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 3
  },
  {
    "id": "p-u-altinbas-aesthetic-dentistry",
    "slug": "aesthetic-dentistry",
    "name": {
      "en": "Aesthetic Dentistry"
    },
    "degreeLevel": "master",
    "categorySlug": "dentistry",
    "durationYears": 1
  },
  {
    "id": "p-u-altinbas-biomedical-sciences",
    "slug": "biomedical-sciences",
    "name": {
      "en": "Biomedical Sciences"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-altinbas-periodontology",
    "slug": "periodontology",
    "name": {
      "en": "Periodontology"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-altinbas-pharmaceutical-sciences",
    "slug": "pharmaceutical-sciences",
    "name": {
      "en": "Pharmaceutical Sciences"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-bahcesehir-sports-physiotherapy",
    "slug": "sports-physiotherapy",
    "name": {
      "en": "Sports Physiotherapy"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-bioengineering",
    "slug": "bioengineering",
    "name": {
      "en": "Bioengineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-financial-technology",
    "slug": "financial-technology",
    "name": {
      "en": "Financial Technology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-executive-business-adminstration",
    "slug": "executive-business-adminstration",
    "name": {
      "en": "Executive Business Adminstration"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-engineering-management",
    "slug": "engineering-management",
    "name": {
      "en": "Engineering Management"
    },
    "degreeLevel": "phd",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-bahcesehir-english-language-teaching",
    "slug": "english-language-teaching",
    "name": {
      "en": "English Language Teaching"
    },
    "degreeLevel": "phd",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-bahcesehir-educational-technology",
    "slug": "educational-technology",
    "name": {
      "en": "Educational Technology"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-bahcesehir-guidance-and-counselling",
    "slug": "guidance-and-counselling",
    "name": {
      "en": "Guidance And Counselling"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-bahcesehir-accounting-and-international-reporting",
    "slug": "accounting-and-international-reporting",
    "name": {
      "en": "Accounting And International Reporting"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-game-design",
    "slug": "game-design",
    "name": {
      "en": "Game Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-marketing-communication-and-public-relations",
    "slug": "marketing-communication-and-public-relations",
    "name": {
      "en": "Marketing Communication And Public Relations"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-global-affairs",
    "slug": "global-affairs",
    "name": {
      "en": "Global Affairs"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-capital-markets-and-finance",
    "slug": "capital-markets-and-finance",
    "name": {
      "en": "Capital Markets And Finance"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-film-and-television",
    "slug": "film-and-television",
    "name": {
      "en": "Film and Television"
    },
    "degreeLevel": "master",
    "categorySlug": "communication",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-information-system-management",
    "slug": "information-system-management",
    "name": {
      "en": "Information System Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-big-data-analytic-and-management",
    "slug": "big-data-analytic-and-management",
    "name": {
      "en": "Big Data Analytic And Management"
    },
    "degreeLevel": "master",
    "categorySlug": "computer-science",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-construction-management",
    "slug": "construction-management",
    "name": {
      "en": "Construction Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-energy-systems-operation-and-technology",
    "slug": "energy-systems-operation-and-technology",
    "name": {
      "en": "Energy Systems Operation And Technology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-risk-engineering-and-management",
    "slug": "risk-engineering-and-management",
    "name": {
      "en": "Risk Engineering And Management"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-sound-technology",
    "slug": "sound-technology",
    "name": {
      "en": "Sound Technology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-industry-4-0",
    "slug": "industry-4-0",
    "name": {
      "en": "Industry 4.0"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-family-counselling",
    "slug": "family-counselling",
    "name": {
      "en": "Family Counselling"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-tissue-engineering-and-regenerative-medicine",
    "slug": "tissue-engineering-and-regenerative-medicine",
    "name": {
      "en": "Tissue Engineering And Regenerative Medicine"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-chiropractic",
    "slug": "chiropractic",
    "name": {
      "en": "Chiropractic"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-health-informatics",
    "slug": "health-informatics",
    "name": {
      "en": "Health Informatics"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-social-work",
    "slug": "social-work",
    "name": {
      "en": "Social Work"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-neuroscience",
    "slug": "neuroscience",
    "name": {
      "en": "Neuroscience"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-english-language-teaching-dl",
    "slug": "english-language-teaching-dl",
    "name": {
      "en": "English Language Teaching(Dl)"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-english-language-education",
    "slug": "english-language-education",
    "name": {
      "en": "English Language Education"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-educational-administration-and-planning",
    "slug": "educational-administration-and-planning",
    "name": {
      "en": "Educational Administration And Planning"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-educational-design-and-evaluation",
    "slug": "educational-design-and-evaluation",
    "name": {
      "en": "Educational Design And Evaluation"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-early-childhood-education",
    "slug": "early-childhood-education",
    "name": {
      "en": "Early Childhood Education"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-gifted-and-talented-education",
    "slug": "gifted-and-talented-education",
    "name": {
      "en": "Gifted And Talented Education"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-psycological-guidance-and-counselling",
    "slug": "psycological-guidance-and-counselling",
    "name": {
      "en": "Psycological Guidance And Counselling"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-information-technology-law",
    "slug": "information-technology-law",
    "name": {
      "en": "Information Technology Law"
    },
    "degreeLevel": "master",
    "categorySlug": "law",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-digital-media-management",
    "slug": "digital-media-management",
    "name": {
      "en": "Digital Media Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-gastronomy",
    "slug": "gastronomy",
    "name": {
      "en": "Gastronomy"
    },
    "degreeLevel": "master",
    "categorySlug": "tourism",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-migration-studies",
    "slug": "migration-studies",
    "name": {
      "en": "Migration Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-advanced-acting",
    "slug": "advanced-acting",
    "name": {
      "en": "Advanced Acting"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-communication-design",
    "slug": "communication-design",
    "name": {
      "en": "Communication Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-bahcesehir-human-resource-management-dl",
    "slug": "human-resource-management-dl",
    "name": {
      "en": "Human Resource Management(Dl)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-political-science-and-international-relation-dl",
    "slug": "political-science-and-international-relation-dl",
    "name": {
      "en": "Political Science And International Relation(Dl)"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-game-development-technology",
    "slug": "game-development-technology",
    "name": {
      "en": "Game Development Technology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-instructional-technolog-dl",
    "slug": "instructional-technolog-dl",
    "name": {
      "en": "Instructional Technolog(Dl)"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-marketing-dl",
    "slug": "marketing-dl",
    "name": {
      "en": "Marketing(Dl)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-bahcesehir-mathematical-engineering",
    "slug": "mathematical-engineering",
    "name": {
      "en": "Mathematical Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-bahcesehir-management-engineering",
    "slug": "management-engineering",
    "name": {
      "en": "Management Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-bahcesehir-pre-school-education",
    "slug": "pre-school-education",
    "name": {
      "en": "Pre-School Education"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-bahcesehir-artificial-intelligence-engineering",
    "slug": "artificial-intelligence-engineering",
    "name": {
      "en": "Artificial Intelligence Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-bahcesehir-international-trade-and-management",
    "slug": "international-trade-and-management",
    "name": {
      "en": "International Trade And Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-bahcesehir-international-finance",
    "slug": "international-finance",
    "name": {
      "en": "International Finance"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-bahcesehir-computer-education-and-instructional-technology",
    "slug": "computer-education-and-instructional-technology",
    "name": {
      "en": "Computer Education And Instructional Technology"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "computer-science",
    "durationYears": 4
  },
  {
    "id": "p-u-bahcesehir-music-technology",
    "slug": "music-technology",
    "name": {
      "en": "Music Technology"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-bahcesehir-vocal-training",
    "slug": "vocal-training",
    "name": {
      "en": "Vocal Training"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-gedik-nanotechnology-engineering",
    "slug": "nanotechnology-engineering",
    "name": {
      "en": "Nanotechnology Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-gedik-metallurgy-and-materials-engineering",
    "slug": "metallurgy-and-materials-engineering",
    "name": {
      "en": "Metallurgy and Materials Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-gedik-coaching-education",
    "slug": "coaching-education",
    "name": {
      "en": "Coaching Education"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-gedik-physical-education-and-sports-teaching",
    "slug": "physical-education-and-sports-teaching",
    "name": {
      "en": "Physical Education and Sports Teaching"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-gedik-media-and-communication",
    "slug": "media-and-communication",
    "name": {
      "en": "Media and Communication"
    },
    "degreeLevel": "associate",
    "categorySlug": "communication",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-public-administration-and-applied-sciences",
    "slug": "public-administration-and-applied-sciences",
    "name": {
      "en": "Public Administration and Applied Sciences"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-first-aid-and-emergency",
    "slug": "first-aid-and-emergency",
    "name": {
      "en": "First Aid and Emergency"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-cybersecurity-technology",
    "slug": "cybersecurity-technology",
    "name": {
      "en": "Cybersecurity Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-electricity",
    "slug": "electricity",
    "name": {
      "en": "Electricity"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-mechanical-technology",
    "slug": "mechanical-technology",
    "name": {
      "en": "Mechanical Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-chemical-technology",
    "slug": "chemical-technology",
    "name": {
      "en": "Chemical Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-machinery",
    "slug": "machinery",
    "name": {
      "en": "Machinery"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-mechatronics",
    "slug": "mechatronics",
    "name": {
      "en": "Mechatronics"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-underwater-technology",
    "slug": "underwater-technology",
    "name": {
      "en": "Underwater Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-non-destructive-testing",
    "slug": "non-destructive-testing",
    "name": {
      "en": "Non-Destructive Testing"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-statistics-and-data-science",
    "slug": "statistics-and-data-science",
    "name": {
      "en": "Statistics And Data Science"
    },
    "degreeLevel": "master",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-physical-education-and-sports-sciences",
    "slug": "physical-education-and-sports-sciences",
    "name": {
      "en": "Physical Education and Sports Sciences"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-obstetrics-and-gynecology",
    "slug": "obstetrics-and-gynecology",
    "name": {
      "en": "Obstetrics And Gynecology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-electrical-electronic-engineering",
    "slug": "electrical-electronic-engineering",
    "name": {
      "en": "Electrical-Electronic Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-defense-technologies",
    "slug": "defense-technologies",
    "name": {
      "en": "Defense Technologies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gedik-business-administration-mba",
    "slug": "business-administration-mba",
    "name": {
      "en": "Business Administration (MBA)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-gedik-industrial-engineering-mba",
    "slug": "industrial-engineering-mba",
    "name": {
      "en": "Industrial Engineering (MBA)"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-gedik-business-administration-executive-mba",
    "slug": "business-administration-executive-mba",
    "name": {
      "en": "Business Administration (Executive MBA)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-gedik-business-administration-distance-education",
    "slug": "business-administration-distance-education",
    "name": {
      "en": "Business Administration (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-gedik-management-and-organization",
    "slug": "management-and-organization",
    "name": {
      "en": "Management and Organization"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-gedik-international-financial-reporting-and-auditing",
    "slug": "international-financial-reporting-and-auditing",
    "name": {
      "en": "International Financial Reporting And Auditing"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-gedik-organizational-psychology",
    "slug": "organizational-psychology",
    "name": {
      "en": "Organizational Psychology"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-gedik-occupational-health-and-safety-distance-education",
    "slug": "occupational-health-and-safety-distance-education",
    "name": {
      "en": "Occupational Health and Safety (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-gedik-disaster-management",
    "slug": "disaster-management",
    "name": {
      "en": "Disaster Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-gedik-product-development-and-design-engineering",
    "slug": "product-development-and-design-engineering",
    "name": {
      "en": "Product Development and Design Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-nisantasi-court-and-office-services",
    "slug": "court-and-office-services",
    "name": {
      "en": "Court And Office Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-information-systems-and-technologies",
    "slug": "information-systems-and-technologies",
    "name": {
      "en": "Information Systems And Technologies"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-nisantasi-tourism-administration",
    "slug": "tourism-administration",
    "name": {
      "en": "Tourism Administration"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-nisantasi-accounting-and-finance-management",
    "slug": "accounting-and-finance-management",
    "name": {
      "en": "Accounting And Finance Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-nisantasi-unmanned-vehicle-technician",
    "slug": "unmanned-vehicle-technician",
    "name": {
      "en": "Unmanned Vehicle Technician"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-department-of-software-development",
    "slug": "department-of-software-development",
    "name": {
      "en": "Department Of Software Development"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-marina-and-yacht-management",
    "slug": "marina-and-yacht-management",
    "name": {
      "en": "Marina And Yacht Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-electronics-technology",
    "slug": "electronics-technology",
    "name": {
      "en": "Electronics Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-green-and-ecological-building-technician",
    "slug": "green-and-ecological-building-technician",
    "name": {
      "en": "Green And Ecological Building Technician"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-mobile-technologies",
    "slug": "mobile-technologies",
    "name": {
      "en": "Mobile Technologies"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-internet-and-web-technologies",
    "slug": "internet-and-web-technologies",
    "name": {
      "en": "Internet And Web Technologies"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-photography-and-camera-operation",
    "slug": "photography-and-camera-operation",
    "name": {
      "en": "Photography And Camera Operation"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-medical-data-processing-technician",
    "slug": "medical-data-processing-technician",
    "name": {
      "en": "Medical Data Processing Technician"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-digital-health-services-technician",
    "slug": "digital-health-services-technician",
    "name": {
      "en": "Digital Health Services Technician"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-movement-and-exercise-sciences",
    "slug": "movement-and-exercise-sciences",
    "name": {
      "en": "Movement And Exercise Sciences"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-nisantasi-local-governments",
    "slug": "local-governments",
    "name": {
      "en": "Local Governments"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-music-and-performing-arts",
    "slug": "music-and-performing-arts",
    "name": {
      "en": "Music And Performing Arts"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-nisantasi-public-relations-and-promotion",
    "slug": "public-relations-and-promotion",
    "name": {
      "en": "Public Relations and Promotion"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-exercise-and-sport-science",
    "slug": "exercise-and-sport-science",
    "name": {
      "en": "Exercise and Sport Science"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-international-business-international-business-management",
    "slug": "international-business-international-business-management",
    "name": {
      "en": "International Business (International Business Management)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-international-business-international-business-management-dl",
    "slug": "international-business-international-business-management-dl",
    "name": {
      "en": "International Business (International Business Management)(DL)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-nisantasi-banking-and-finance-dl",
    "slug": "banking-and-finance-dl",
    "name": {
      "en": "Banking And Finance (DL)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-nisantasi-aviation-electrical-and-electronics",
    "slug": "aviation-electrical-and-electronics",
    "name": {
      "en": "Aviation Electrical and Electronics"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-nisantasi-public-relations-and-presentation",
    "slug": "public-relations-and-presentation",
    "name": {
      "en": "Public Relations And Presentation"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-business-administration-dl",
    "slug": "business-administration-dl",
    "name": {
      "en": "Business Administration (DL)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-nisantasi-architecture-design",
    "slug": "architecture-design",
    "name": {
      "en": "Architecture Design"
    },
    "degreeLevel": "master",
    "categorySlug": "architecture",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-advertising-and-brand-communication-dl",
    "slug": "advertising-and-brand-communication-dl",
    "name": {
      "en": "Advertising And Brand Communication (DL)"
    },
    "degreeLevel": "master",
    "categorySlug": "communication",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-nisantasi-accounting-and-auditing-dl",
    "slug": "accounting-and-auditing-dl",
    "name": {
      "en": "Accounting And Auditing (DL)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-nisantasi-banking-and-finance",
    "slug": "banking-and-finance",
    "name": {
      "en": "Banking And Finance"
    },
    "degreeLevel": "phd",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-nisantasi-aircraft-maintenance-and-repair",
    "slug": "aircraft-maintenance-and-repair",
    "name": {
      "en": "Aircraft Maintenance And Repair"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-nisantasi-biotechnology",
    "slug": "biotechnology",
    "name": {
      "en": "Biotechnology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-new-media-communication-and-journalism",
    "slug": "new-media-communication-and-journalism",
    "name": {
      "en": "New Media Communication And Journalism"
    },
    "degreeLevel": "master",
    "categorySlug": "communication",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-nisantasi-advertising-and-brand-communication",
    "slug": "advertising-and-brand-communication",
    "name": {
      "en": "Advertising And Brand Communication"
    },
    "degreeLevel": "master",
    "categorySlug": "communication",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-nisantasi-public-affairs",
    "slug": "public-affairs",
    "name": {
      "en": "Public Affairs"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-pathology-laboratory",
    "slug": "pathology-laboratory",
    "name": {
      "en": "Pathology Laboratory"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-sports-trainer-education",
    "slug": "sports-trainer-education",
    "name": {
      "en": "Sports Trainer Education"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-maritime-and-port-management",
    "slug": "maritime-and-port-management",
    "name": {
      "en": "Maritime And Port Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-nisantasi-management",
    "slug": "management",
    "name": {
      "en": "Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-nisantasi-flight-training",
    "slug": "flight-training",
    "name": {
      "en": "Flight Training"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-nisantasi-air-traffic-control",
    "slug": "air-traffic-control",
    "name": {
      "en": "Air Traffic Control"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-nisantasi-interpretation-translation-english",
    "slug": "interpretation-translation-english",
    "name": {
      "en": "Interpretation & Translation (English)"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-nisantasi-textile-and-fashion",
    "slug": "textile-and-fashion",
    "name": {
      "en": "Textile And Fashion"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-fenerbahce-sports-coaching",
    "slug": "sports-coaching",
    "name": {
      "en": "Sports Coaching"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-fenerbahce-sports-sciences",
    "slug": "sports-sciences",
    "name": {
      "en": "Sports Sciences"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-fenerbahce-clinical-pharmacy",
    "slug": "clinical-pharmacy",
    "name": {
      "en": "Clinical Pharmacy"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-fenerbahce-internal-diseases-nursing",
    "slug": "internal-diseases-nursing",
    "name": {
      "en": "Internal Diseases Nursing"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-fenerbahce-organizational-behavior",
    "slug": "organizational-behavior",
    "name": {
      "en": "Organizational Behavior"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-fenerbahce-exercise-and-sport-psychology",
    "slug": "exercise-and-sport-psychology",
    "name": {
      "en": "Exercise and Sport Psychology"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-fenerbahce-applied-data-science",
    "slug": "applied-data-science",
    "name": {
      "en": "Applied Data Science"
    },
    "degreeLevel": "master",
    "categorySlug": "computer-science",
    "durationYears": 1
  },
  {
    "id": "p-u-ankara-bilim-film-design-and-direction",
    "slug": "film-design-and-direction",
    "name": {
      "en": "Film Design and Direction"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-ankara-bilim-english-translation-and-interpretation",
    "slug": "english-translation-and-interpretation",
    "name": {
      "en": "English Translation and Interpretation"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-ankara-bilim-film-design-and-new-media",
    "slug": "film-design-and-new-media",
    "name": {
      "en": "Film Design and New Media"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-ankara-bilim-industrial-literature-design",
    "slug": "industrial-literature-design",
    "name": {
      "en": "Industrial Literature Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 1
  },
  {
    "id": "p-u-ankara-bilim-e-commerce-and-marketing",
    "slug": "e-commerce-and-marketing",
    "name": {
      "en": "E-Commerce and Marketing"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-ankara-bilim-web-design-and-programming",
    "slug": "web-design-and-programming",
    "name": {
      "en": "Web Design and Programming"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-ankara-bilim-unmanned-aerial-vehicle-technology-and-operator",
    "slug": "unmanned-aerial-vehicle-technology-and-operator",
    "name": {
      "en": "Unmanned Aerial Vehicle Technology and Operator"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kent-pharmacology",
    "slug": "pharmacology",
    "name": {
      "en": "Pharmacology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kent-media-and-cultural-studies",
    "slug": "media-and-cultural-studies",
    "name": {
      "en": "Media And Cultural Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "communication",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-kent-cosmetics-technology",
    "slug": "cosmetics-technology",
    "name": {
      "en": "Cosmetics Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kent-elderly-care",
    "slug": "elderly-care",
    "name": {
      "en": "Elderly Care"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kent-international-trade-and-business",
    "slug": "international-trade-and-business",
    "name": {
      "en": "International Trade And Business"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-kent-economy-and-finance",
    "slug": "economy-and-finance",
    "name": {
      "en": "Economy and Finance"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-kent-pedodontics",
    "slug": "pedodontics",
    "name": {
      "en": "Pedodontics"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-kent-oral-and-maxillofacial-surgery",
    "slug": "oral-and-maxillofacial-surgery",
    "name": {
      "en": "Oral And Maxillofacial Surgery"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-kent-restorative-dentistry",
    "slug": "restorative-dentistry",
    "name": {
      "en": "Restorative Dentistry"
    },
    "degreeLevel": "phd",
    "categorySlug": "dentistry",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-kent-international-business-international-business-managment",
    "slug": "international-business-international-business-managment",
    "name": {
      "en": "International Business (International Business Managment)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-kent-hair-care-and-beauty-services",
    "slug": "hair-care-and-beauty-services",
    "name": {
      "en": "Hair Care And Beauty Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kent-first-aid-and-emergency-care",
    "slug": "first-aid-and-emergency-care",
    "name": {
      "en": "First Aid and Emergency Care"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kent-digital-health-systems-technology",
    "slug": "digital-health-systems-technology",
    "name": {
      "en": "Digital Health Systems Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kent-medical-data-processing-technology",
    "slug": "medical-data-processing-technology",
    "name": {
      "en": "Medical Data Processing Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kent-telehealth-technology",
    "slug": "telehealth-technology",
    "name": {
      "en": "Telehealth Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kent-court-office-services",
    "slug": "court-office-services",
    "name": {
      "en": "Court Office Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kent-international-business-administration",
    "slug": "international-business-administration",
    "name": {
      "en": "International Business Administration"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-kent-public-health-nursing",
    "slug": "public-health-nursing",
    "name": {
      "en": "Public Health Nursing"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-ankara-medipol-health-tourism-management",
    "slug": "health-tourism-management",
    "name": {
      "en": "Health Tourism Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-antalya-belek-communication-and-design",
    "slug": "communication-and-design",
    "name": {
      "en": "Communication and Design"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-antalya-belek-radio-television-and-cinema-antalya-belek-university",
    "slug": "radio-television-and-cinema-antalya-belek-university",
    "name": {
      "en": "Radio Television and Cinema"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-antalya-belek-international-trade-and-business-administration",
    "slug": "international-trade-and-business-administration",
    "name": {
      "en": "International Trade and Business Administration"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-antalya-belek-tourist-guiding",
    "slug": "tourist-guiding",
    "name": {
      "en": "Tourist Guiding"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-alanya-cartoon-and-animation",
    "slug": "cartoon-and-animation",
    "name": {
      "en": "Cartoon and Animation"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-alanya-cookery",
    "slug": "cookery",
    "name": {
      "en": "Cookery"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-medical-genetics",
    "slug": "medical-genetics",
    "name": {
      "en": "Medical Genetics"
    },
    "degreeLevel": "phd",
    "categorySlug": "medicine",
    "durationYears": 4
  },
  {
    "id": "p-u-uskudar-clinical-anatomy",
    "slug": "clinical-anatomy",
    "name": {
      "en": "Clinical Anatomy"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-uskudar-perfusion",
    "slug": "perfusion",
    "name": {
      "en": "Perfusion"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-uskudar-family-counseling",
    "slug": "family-counseling",
    "name": {
      "en": "Family Counseling"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-molecular-biology",
    "slug": "molecular-biology",
    "name": {
      "en": "Molecular Biology"
    },
    "degreeLevel": "master",
    "categorySlug": "natural-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-uskudar-forensic-science",
    "slug": "forensic-science",
    "name": {
      "en": "Forensic Science"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-uskudar-criminal-justice",
    "slug": "criminal-justice",
    "name": {
      "en": "Criminal Justice"
    },
    "degreeLevel": "master",
    "categorySlug": "law",
    "durationYears": 1
  },
  {
    "id": "p-u-uskudar-biosecurity",
    "slug": "biosecurity",
    "name": {
      "en": "Biosecurity"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-bioinformatics",
    "slug": "bioinformatics",
    "name": {
      "en": "Bioinformatics"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-physiology",
    "slug": "physiology",
    "name": {
      "en": "Physiology"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-uskudar-women-s-health-and-diseases-nursing",
    "slug": "women-s-health-and-diseases-nursing",
    "name": {
      "en": "Women's Health And Diseases Nursing"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-psychiatric-nursing",
    "slug": "psychiatric-nursing",
    "name": {
      "en": "Psychiatric Nursing"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-uskudar-occupational-therapy",
    "slug": "occupational-therapy",
    "name": {
      "en": "Occupational Therapy"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-uskudar-anatomy",
    "slug": "anatomy",
    "name": {
      "en": "Anatomy"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-uskudar-addiction-consultancy-and-rehabilitation",
    "slug": "addiction-consultancy-and-rehabilitation",
    "name": {
      "en": "Addiction Consultancy And Rehabilitation"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-uskudar-islamic-civilization-thought-history-and-literature",
    "slug": "islamic-civilization-thought-history-and-literature",
    "name": {
      "en": "Islamic Civilization, Thought, History And Literature"
    },
    "degreeLevel": "phd",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-uskudar-tasawwuf-sufi-culture-and-literature",
    "slug": "tasawwuf-sufi-culture-and-literature",
    "name": {
      "en": "Tasawwuf(Sufi) Culture And Literature"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 1
  },
  {
    "id": "p-u-uskudar-neuromarketing",
    "slug": "neuromarketing",
    "name": {
      "en": "Neuromarketing"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-uskudar-applied-psychology",
    "slug": "applied-psychology",
    "name": {
      "en": "Applied Psychology"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-uskudar-work-health-and-safety",
    "slug": "work-health-and-safety",
    "name": {
      "en": "Work Health And Safety"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-social-safety",
    "slug": "social-safety",
    "name": {
      "en": "Social Safety"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-nuclear-technology-and-radiation-safety",
    "slug": "nuclear-technology-and-radiation-safety",
    "name": {
      "en": "Nuclear Technology And Radiation Safety"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-medicinal-and-aromatic-plants",
    "slug": "medicinal-and-aromatic-plants",
    "name": {
      "en": "Medicinal And Aromatic Plants"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-medical-promotion-and-marketing",
    "slug": "medical-promotion-and-marketing",
    "name": {
      "en": "Medical Promotion And Marketing"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-laboratory-technology",
    "slug": "laboratory-technology",
    "name": {
      "en": "Laboratory Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-home-care-services",
    "slug": "home-care-services",
    "name": {
      "en": "Home-Care Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-health-information-system-technics",
    "slug": "health-information-system-technics",
    "name": {
      "en": "Health Information System Technics"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-food-technology",
    "slug": "food-technology",
    "name": {
      "en": "Food Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "agriculture",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-environmental-health",
    "slug": "environmental-health",
    "name": {
      "en": "Environmental Health"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-emergency-and-disaster-management",
    "slug": "emergency-and-disaster-management",
    "name": {
      "en": "Emergency And Disaster Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-dental-technology",
    "slug": "dental-technology",
    "name": {
      "en": "Dental Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "dentistry",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-child-protective-and-nursing-services",
    "slug": "child-protective-and-nursing-services",
    "name": {
      "en": "Child Protective And Nursing Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-care-and-rehablitation-of-people-with-disabilities",
    "slug": "care-and-rehablitation-of-people-with-disabilities",
    "name": {
      "en": "Care And Rehablitation Of People With Disabilities"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-autopsy-assistanship",
    "slug": "autopsy-assistanship",
    "name": {
      "en": "Autopsy Assistanship"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-uskudar-translation-and-interpretation",
    "slug": "translation-and-interpretation",
    "name": {
      "en": "Translation and Interpretation"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-rumeli-civil-air-transportation-management",
    "slug": "civil-air-transportation-management",
    "name": {
      "en": "Civil Air Transportation Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-rumeli-pastry-and-breadmaking",
    "slug": "pastry-and-breadmaking",
    "name": {
      "en": "Pastry and Breadmaking"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-rumeli-dental-prosthesis-technology",
    "slug": "dental-prosthesis-technology",
    "name": {
      "en": "Dental Prosthesis Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "dentistry",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-rumeli-home-patient-care",
    "slug": "home-patient-care",
    "name": {
      "en": "Home Patient Care"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-rumeli-first-and-emergency-aid",
    "slug": "first-and-emergency-aid",
    "name": {
      "en": "First And Emergency Aid"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-rumeli-exercise-and-sports-sciences",
    "slug": "exercise-and-sports-sciences",
    "name": {
      "en": "Exercise and Sports Sciences"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-rumeli-exercise-and-sports-sciences-for-the-disabled",
    "slug": "exercise-and-sports-sciences-for-the-disabled",
    "name": {
      "en": "Exercise and Sports Sciences for the Disabled"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-dogus-foreign-trade-ep",
    "slug": "foreign-trade-ep",
    "name": {
      "en": "Foreign Trade (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-dogus-graphic",
    "slug": "graphic",
    "name": {
      "en": "Graphic"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-dogus-basic-sciences",
    "slug": "basic-sciences",
    "name": {
      "en": "Basic Sciences"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-dogus-communication-science",
    "slug": "communication-science",
    "name": {
      "en": "Communication Science"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "communication",
    "durationYears": 4
  },
  {
    "id": "p-u-dogus-computer-and-information-sciences",
    "slug": "computer-and-information-sciences",
    "name": {
      "en": "Computer and Information Sciences"
    },
    "degreeLevel": "master",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-dogus-surgical-disease-nursing",
    "slug": "surgical-disease-nursing",
    "name": {
      "en": "Surgical Disease Nursing"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-dogus-engineering-and-technology-management",
    "slug": "engineering-and-technology-management",
    "name": {
      "en": "Engineering and Technology Management"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-dogus-global-relations-an-the-european-union",
    "slug": "global-relations-an-the-european-union",
    "name": {
      "en": "Global Relations an The European Union"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-dogus-logistics-and-supply-chain-management",
    "slug": "logistics-and-supply-chain-management",
    "name": {
      "en": "Logistics and Supply Chain Management"
    },
    "degreeLevel": "phd",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-atilim-tunneling-and-underground-structures",
    "slug": "tunneling-and-underground-structures",
    "name": {
      "en": "Tunneling And Underground Structures"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-atilim-translation-studies",
    "slug": "translation-studies",
    "name": {
      "en": "Translation Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 2
  },
  {
    "id": "p-u-atilim-political-economy",
    "slug": "political-economy",
    "name": {
      "en": "Political Economy"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-atilim-modeling-and-design-of-engineering-systems-modes",
    "slug": "modeling-and-design-of-engineering-systems-modes",
    "name": {
      "en": "Modeling And Design Of Engineering Systems (MODES)"
    },
    "degreeLevel": "phd",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-atilim-metallurgy-and-material-engineering",
    "slug": "metallurgy-and-material-engineering",
    "name": {
      "en": "Metallurgy And Material Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-atilim-manufacturing-engineering",
    "slug": "manufacturing-engineering",
    "name": {
      "en": "Manufacturing Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-atilim-european-union",
    "slug": "european-union",
    "name": {
      "en": "European Union"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-atilim-english-literature-and-culture",
    "slug": "english-literature-and-culture",
    "name": {
      "en": "English Literature And Culture"
    },
    "degreeLevel": "phd",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-atilim-applied-physics",
    "slug": "applied-physics",
    "name": {
      "en": "Applied Physics"
    },
    "degreeLevel": "master",
    "categorySlug": "natural-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-atilim-applied-economics",
    "slug": "applied-economics",
    "name": {
      "en": "Applied Economics"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-atilim-applied-chemistry",
    "slug": "applied-chemistry",
    "name": {
      "en": "Applied Chemistry"
    },
    "degreeLevel": "master",
    "categorySlug": "natural-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-atilim-industrial-products-design",
    "slug": "industrial-products-design",
    "name": {
      "en": "Industrial Products Design"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-atilim-avioincs",
    "slug": "avioincs",
    "name": {
      "en": "Avioincs"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-atilim-airframe-and-powerplant-maintenance",
    "slug": "airframe-and-powerplant-maintenance",
    "name": {
      "en": "Airframe And Powerplant Maintenance"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-ozyegin-artificial-intelligence-and-data-engineering",
    "slug": "artificial-intelligence-and-data-engineering",
    "name": {
      "en": "Artificial Intelligence and Data Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-ozyegin-technology-and-society",
    "slug": "technology-and-society",
    "name": {
      "en": "Technology and Society"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-ozyegin-industrial-and-organizational-psychology",
    "slug": "industrial-and-organizational-psychology",
    "name": {
      "en": "Industrial and Organizational Psychology"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-ozyegin-financial-engineering",
    "slug": "financial-engineering",
    "name": {
      "en": "Financial Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 1
  },
  {
    "id": "p-u-ozyegin-city-and-architecture",
    "slug": "city-and-architecture",
    "name": {
      "en": "City and Architecture"
    },
    "degreeLevel": "master",
    "categorySlug": "architecture",
    "durationYears": 1
  },
  {
    "id": "p-u-ozyegin-entrepreneurship",
    "slug": "entrepreneurship",
    "name": {
      "en": "Entrepreneurship"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-ozyegin-professional-flight",
    "slug": "professional-flight",
    "name": {
      "en": "Professional Flight"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-harp",
    "slug": "harp",
    "name": {
      "en": "Harp"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-composition-and-music-theory",
    "slug": "composition-and-music-theory",
    "name": {
      "en": "Composition and Music Theory"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-guitar",
    "slug": "guitar",
    "name": {
      "en": "Guitar"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-opera",
    "slug": "opera",
    "name": {
      "en": "Opera"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-piano",
    "slug": "piano",
    "name": {
      "en": "Piano"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-string-instruments",
    "slug": "string-instruments",
    "name": {
      "en": "String Instruments"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-primary-school-mathematics-teaching",
    "slug": "primary-school-mathematics-teaching",
    "name": {
      "en": "Primary School Mathematics Teaching"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "natural-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-preschool-teaching",
    "slug": "preschool-teaching",
    "name": {
      "en": "Preschool Teaching"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-guidance-and-psychological-counseling",
    "slug": "guidance-and-psychological-counseling",
    "name": {
      "en": "Guidance and Psychological Counseling"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-classroom-teaching",
    "slug": "classroom-teaching",
    "name": {
      "en": "Classroom Teaching"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-turkish-language-teaching",
    "slug": "turkish-language-teaching",
    "name": {
      "en": "Turkish Language Teaching"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-american-culture-and-literature",
    "slug": "american-culture-and-literature",
    "name": {
      "en": "American Culture And Literature"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-cartoons-and-animations",
    "slug": "cartoons-and-animations",
    "name": {
      "en": "Cartoons and Animations"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-economy",
    "slug": "economy",
    "name": {
      "en": "Economy"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-technology-and-information-management",
    "slug": "technology-and-information-management",
    "name": {
      "en": "Technology and Information Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-accounting-and-financial-management",
    "slug": "accounting-and-financial-management",
    "name": {
      "en": "Accounting And Financial Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-insurance",
    "slug": "insurance",
    "name": {
      "en": "Insurance"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-international-finance-and-banking",
    "slug": "international-finance-and-banking",
    "name": {
      "en": "International Finance and Banking"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-computer-and-educational-technologies",
    "slug": "computer-and-educational-technologies",
    "name": {
      "en": "Computer and Educational Technologies"
    },
    "degreeLevel": "master",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-curriculum-and-instruction",
    "slug": "curriculum-and-instruction",
    "name": {
      "en": "Curriculum And Instruction"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-educational-administration-and-supervision",
    "slug": "educational-administration-and-supervision",
    "name": {
      "en": "Educational Administration And Supervision"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-mathematics-education",
    "slug": "mathematics-education",
    "name": {
      "en": "Mathematics Education"
    },
    "degreeLevel": "master",
    "categorySlug": "natural-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-turkish-education",
    "slug": "turkish-education",
    "name": {
      "en": "Turkish Education"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-teaching-turkish-as-a-foreign-language",
    "slug": "teaching-turkish-as-a-foreign-language",
    "name": {
      "en": "Teaching Turkish as a Foreign Language"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-primary-school-mathematics-education",
    "slug": "primary-school-mathematics-education",
    "name": {
      "en": "Primary School Mathematics Education"
    },
    "degreeLevel": "phd",
    "categorySlug": "natural-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-computer-and-educational-technologies-distance-education",
    "slug": "computer-and-educational-technologies-distance-education",
    "name": {
      "en": "Computer and Educational Technologies (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "computer-science",
    "durationYears": 1
  },
  {
    "id": "p-u-baskent-educational-administration-distance-education",
    "slug": "educational-administration-distance-education",
    "name": {
      "en": "Educational Administration (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-baskent-energy-engineering",
    "slug": "energy-engineering",
    "name": {
      "en": "Energy Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-information-technologies-and-systems-management",
    "slug": "information-technologies-and-systems-management",
    "name": {
      "en": "Information Technologies and Systems Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-quality-engineering",
    "slug": "quality-engineering",
    "name": {
      "en": "Quality Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-healthcare-institutions-management-distance-education",
    "slug": "healthcare-institutions-management-distance-education",
    "name": {
      "en": "Healthcare Institutions Management (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-defense-electronics-and-software",
    "slug": "defense-electronics-and-software",
    "name": {
      "en": "Defense Electronics And Software"
    },
    "degreeLevel": "master",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-defense-platforms",
    "slug": "defense-platforms",
    "name": {
      "en": "Defense Platforms"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-information-technologies-and-system-management",
    "slug": "information-technologies-and-system-management",
    "name": {
      "en": "Information Technologies and System Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-baskent-defense-technologies-and-systems",
    "slug": "defense-technologies-and-systems",
    "name": {
      "en": "Defense Technologies and Systems"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-exercise-and-sports-performance",
    "slug": "exercise-and-sports-performance",
    "name": {
      "en": "Exercise and Sports Performance"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-traditional-and-complementary-medicine-interdisciplinary",
    "slug": "traditional-and-complementary-medicine-interdisciplinary",
    "name": {
      "en": "Traditional and Complementary Medicine (Interdisciplinary)"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-public-health",
    "slug": "public-health",
    "name": {
      "en": "Public Health"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-pharmaceutical-research-and-production-technologies",
    "slug": "pharmaceutical-research-and-production-technologies",
    "name": {
      "en": "Pharmaceutical Research and Production Technologies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-cardiology-intensive-care",
    "slug": "cardiology-intensive-care",
    "name": {
      "en": "Cardiology Intensive Care"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-stem-cell-and-regenerative-medicine",
    "slug": "stem-cell-and-regenerative-medicine",
    "name": {
      "en": "Stem Cell And Regenerative Medicine"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-audiology-and-speech-disorders",
    "slug": "audiology-and-speech-disorders",
    "name": {
      "en": "Audiology and Speech Disorders"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-medical-biology",
    "slug": "medical-biology",
    "name": {
      "en": "Medical Biology"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-medical-microbiology",
    "slug": "medical-microbiology",
    "name": {
      "en": "Medical Microbiology"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-anatomy-and-clinical-anatomy",
    "slug": "anatomy-and-clinical-anatomy",
    "name": {
      "en": "Anatomy and Clinical Anatomy"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-doctoral-in-dental-disease-treatment-and-endodontics",
    "slug": "doctoral-in-dental-disease-treatment-and-endodontics",
    "name": {
      "en": "Doctoral in Dental Disease Treatment and Endodontics"
    },
    "degreeLevel": "phd",
    "categorySlug": "dentistry",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-periodontics",
    "slug": "periodontics",
    "name": {
      "en": "Periodontics"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-prosthetic-dentistry",
    "slug": "prosthetic-dentistry",
    "name": {
      "en": "Prosthetic Dentistry"
    },
    "degreeLevel": "phd",
    "categorySlug": "dentistry",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-accounting-and-finance",
    "slug": "accounting-and-finance",
    "name": {
      "en": "Accounting And Finance"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-museology",
    "slug": "museology",
    "name": {
      "en": "Museology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-music-department-performance",
    "slug": "music-department-performance",
    "name": {
      "en": "Music Department Performance"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-music-and-performing-arts-in-composition",
    "slug": "music-and-performing-arts-in-composition",
    "name": {
      "en": "Music and Performing Arts in Composition"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-music-and-performing-arts-in-musicology",
    "slug": "music-and-performing-arts-in-musicology",
    "name": {
      "en": "Music and Performing Arts in Musicology"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-performance",
    "slug": "performance",
    "name": {
      "en": "Performance"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-master-s-in-healthcare-institutions-management",
    "slug": "master-s-in-healthcare-institutions-management",
    "name": {
      "en": "Master's in Healthcare Institutions Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-capital-markets",
    "slug": "capital-markets",
    "name": {
      "en": "Capital Markets"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-insurance-and-risk-management",
    "slug": "insurance-and-risk-management",
    "name": {
      "en": "Insurance And Risk Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-social-psychology",
    "slug": "social-psychology",
    "name": {
      "en": "Social Psychology"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-international-trade-and-marketing",
    "slug": "international-trade-and-marketing",
    "name": {
      "en": "International Trade And Marketing"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-banking-and-finance-distance-education",
    "slug": "banking-and-finance-distance-education",
    "name": {
      "en": "Banking and Finance (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-economic-law",
    "slug": "economic-law",
    "name": {
      "en": "Economic Law"
    },
    "degreeLevel": "master",
    "categorySlug": "law",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-museum-studies",
    "slug": "museum-studies",
    "name": {
      "en": "Museum Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-music-and-stage-arts",
    "slug": "music-and-stage-arts",
    "name": {
      "en": "Music and Stage Arts"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-health-law",
    "slug": "health-law",
    "name": {
      "en": "Health Law"
    },
    "degreeLevel": "master",
    "categorySlug": "law",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-health-management-distance-education",
    "slug": "health-management-distance-education",
    "name": {
      "en": "Health Management (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-capital-markets-distance-education",
    "slug": "capital-markets-distance-education",
    "name": {
      "en": "Capital Markets (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-insurance-and-risk-management-distance-education",
    "slug": "insurance-and-risk-management-distance-education",
    "name": {
      "en": "Insurance and Risk Management (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-business-administration-for-managers",
    "slug": "business-administration-for-managers",
    "name": {
      "en": "Business Administration for Managers"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-management-organization",
    "slug": "management-organization",
    "name": {
      "en": "Management Organization"
    },
    "degreeLevel": "phd",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-baskent-first-and-emergency-aid-secondary-education",
    "slug": "first-and-emergency-aid-secondary-education",
    "name": {
      "en": "First and Emergency Aid (Secondary Education)"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-office-management-and-executive-assistant",
    "slug": "office-management-and-executive-assistant",
    "name": {
      "en": "Office Management and Executive Assistant"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-photography-and-videography",
    "slug": "photography-and-videography",
    "name": {
      "en": "Photography and Videography"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-accounting-and-tax-practices",
    "slug": "accounting-and-tax-practices",
    "name": {
      "en": "Accounting And Tax Practices"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-radio-and-television",
    "slug": "radio-and-television",
    "name": {
      "en": "Radio and Television"
    },
    "degreeLevel": "associate",
    "categorySlug": "communication",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-health-information-systems-technician",
    "slug": "health-information-systems-technician",
    "name": {
      "en": "Health Information Systems Technician"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-electronic-technology",
    "slug": "electronic-technology",
    "name": {
      "en": "Electronic Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-industrial-raw-materials-processing-technology",
    "slug": "industrial-raw-materials-processing-technology",
    "name": {
      "en": "Industrial Raw Materials Processing Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-food-quality-control-and-analysis",
    "slug": "food-quality-control-and-analysis",
    "name": {
      "en": "Food Quality Control And Analysis"
    },
    "degreeLevel": "associate",
    "categorySlug": "agriculture",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-control-and-automation-technology",
    "slug": "control-and-automation-technology",
    "name": {
      "en": "Control And Automation Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-machine",
    "slug": "machine",
    "name": {
      "en": "Machine"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-electronic-communication-technology",
    "slug": "electronic-communication-technology",
    "name": {
      "en": "Electronic Communication Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "communication",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-industrial-molding",
    "slug": "industrial-molding",
    "name": {
      "en": "Industrial Molding"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-baskent-unmanned-aerial-vehicle-technology-and-operation",
    "slug": "unmanned-aerial-vehicle-technology-and-operation",
    "name": {
      "en": "Unmanned Aerial Vehicle Technology and Operation"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-ted-urban-design",
    "slug": "urban-design",
    "name": {
      "en": "Urban Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-ted-guidance-and-psychological-counselling",
    "slug": "guidance-and-psychological-counselling",
    "name": {
      "en": "Guidance and Psychological Counselling"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-ted-primary-education",
    "slug": "primary-education",
    "name": {
      "en": "Primary Education"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-ted-city-and-regional-planning",
    "slug": "city-and-regional-planning",
    "name": {
      "en": "City And Regional Planning"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istinye-pharmaceutical-chemistry",
    "slug": "pharmaceutical-chemistry",
    "name": {
      "en": "Pharmaceutical Chemistry"
    },
    "degreeLevel": "phd",
    "categorySlug": "natural-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istinye-molecular-oncology",
    "slug": "molecular-oncology",
    "name": {
      "en": "Molecular Oncology"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istinye-medical-biology-and-genetics",
    "slug": "medical-biology-and-genetics",
    "name": {
      "en": "Medical Biology And Genetics"
    },
    "degreeLevel": "phd",
    "categorySlug": "medicine",
    "durationYears": 4
  },
  {
    "id": "p-u-istinye-stem-cell-and-tissue-engineering",
    "slug": "stem-cell-and-tissue-engineering",
    "name": {
      "en": "Stem Cell And Tissue Engineering"
    },
    "degreeLevel": "phd",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-istinye-obstetrics-and-gynaecologic-nursing",
    "slug": "obstetrics-and-gynaecologic-nursing",
    "name": {
      "en": "Obstetrics And Gynaecologic Nursing"
    },
    "degreeLevel": "phd",
    "categorySlug": "health-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istinye-cancer-biology-and-pharmacology",
    "slug": "cancer-biology-and-pharmacology",
    "name": {
      "en": "Cancer Biology And Pharmacology"
    },
    "degreeLevel": "master",
    "categorySlug": "natural-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istinye-justice-ep",
    "slug": "justice-ep",
    "name": {
      "en": "Justice (EP)"
    },
    "degreeLevel": "associate",
    "categorySlug": "law",
    "durationYears": 2
  },
  {
    "id": "p-u-beykoz-big-data-analytics",
    "slug": "big-data-analytics",
    "name": {
      "en": "Big Data Analytics"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-beykoz-foreign-trade-distance-education",
    "slug": "foreign-trade-distance-education",
    "name": {
      "en": "Foreign Trade (Distance Education)"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-beykoz-logistics-distance-education",
    "slug": "logistics-distance-education",
    "name": {
      "en": "Logistics (Distance Education)"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-beykoz-rail-systems-management",
    "slug": "rail-systems-management",
    "name": {
      "en": "Rail Systems Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-beykoz-mba-distance-education",
    "slug": "mba-distance-education",
    "name": {
      "en": "MBA (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-beykoz-international-trade-and-logistics-distance-education",
    "slug": "international-trade-and-logistics-distance-education",
    "name": {
      "en": "International Trade and Logistics (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-beykoz-work-and-organizational-psychology",
    "slug": "work-and-organizational-psychology",
    "name": {
      "en": "Work and Organizational Psychology"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-beykoz-visual-arts-and-visual-communication-design",
    "slug": "visual-arts-and-visual-communication-design",
    "name": {
      "en": "Visual Arts And Visual Communication Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-beykoz-entrepreneurship-and-innovation-management",
    "slug": "entrepreneurship-and-innovation-management",
    "name": {
      "en": "Entrepreneurship And Innovation Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-beykoz-marketing-and-brand-management",
    "slug": "marketing-and-brand-management",
    "name": {
      "en": "Marketing and Brand Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-beykoz-technology-and-innovation-management",
    "slug": "technology-and-innovation-management",
    "name": {
      "en": "Technology and Innovation Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-halic-opera-and-concert-singing",
    "slug": "opera-and-concert-singing",
    "name": {
      "en": "Opera And Concert Singing"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-halic-management-and-information-systems",
    "slug": "management-and-information-systems",
    "name": {
      "en": "Management and Information Systems"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-halic-hospital-and-health-facilities-management",
    "slug": "hospital-and-health-facilities-management",
    "name": {
      "en": "Hospital And Health Facilities Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-halic-electronics-and-communication-engineering",
    "slug": "electronics-and-communication-engineering",
    "name": {
      "en": "Electronics And Communication Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-halic-computational-science-and-engineering",
    "slug": "computational-science-and-engineering",
    "name": {
      "en": "Computational Science And Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-halic-applied-mathematics",
    "slug": "applied-mathematics",
    "name": {
      "en": "Applied Mathematics"
    },
    "degreeLevel": "master",
    "categorySlug": "natural-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-commerce-statistics",
    "slug": "statistics",
    "name": {
      "en": "Statistics"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-kultur-directorship",
    "slug": "directorship",
    "name": {
      "en": "Directorship"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-urbanization",
    "slug": "urbanization",
    "name": {
      "en": "Urbanization"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-architectural-engineering",
    "slug": "architectural-engineering",
    "name": {
      "en": "Architectural Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-structure",
    "slug": "structure",
    "name": {
      "en": "Structure"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-geotechnics",
    "slug": "geotechnics",
    "name": {
      "en": "Geotechnics"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-interior-architecture-and-enviromental-design",
    "slug": "interior-architecture-and-enviromental-design",
    "name": {
      "en": "Interior Architecture And Enviromental Design"
    },
    "degreeLevel": "master",
    "categorySlug": "architecture",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-kultur-educational-programs-and-teaching",
    "slug": "educational-programs-and-teaching",
    "name": {
      "en": "Educational Programs And Teaching"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-flight-operations-management",
    "slug": "flight-operations-management",
    "name": {
      "en": "Flight Operations Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-aviation-logistics",
    "slug": "aviation-logistics",
    "name": {
      "en": "Aviation Logistics"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-special-education-teacher",
    "slug": "special-education-teacher",
    "name": {
      "en": "Special Education Teacher"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-kultur-geomatics",
    "slug": "geomatics",
    "name": {
      "en": "Geomatics"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-kultur-project-management",
    "slug": "project-management",
    "name": {
      "en": "Project Management"
    },
    "degreeLevel": "phd",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-kultur-monetary-and-capital-markets",
    "slug": "monetary-and-capital-markets",
    "name": {
      "en": "Monetary And Capital Markets"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-sports-law",
    "slug": "sports-law",
    "name": {
      "en": "Sports Law"
    },
    "degreeLevel": "master",
    "categorySlug": "law",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-kultur-history-of-architecture-and-restoration",
    "slug": "history-of-architecture-and-restoration",
    "name": {
      "en": "History Of Architecture And Restoration"
    },
    "degreeLevel": "master",
    "categorySlug": "architecture",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-construction-management-and-technology",
    "slug": "construction-management-and-technology",
    "name": {
      "en": "Construction Management And Technology"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-real-estate-development",
    "slug": "real-estate-development",
    "name": {
      "en": "Real Estate Development"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-kultur-geotechnical-engineering",
    "slug": "geotechnical-engineering",
    "name": {
      "en": "Geotechnical Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-enviromental-design",
    "slug": "enviromental-design",
    "name": {
      "en": "Enviromental Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-innovation-management",
    "slug": "innovation-management",
    "name": {
      "en": "Innovation Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-management-economics",
    "slug": "management-economics",
    "name": {
      "en": "Management Economics"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-kultur-production-economics",
    "slug": "production-economics",
    "name": {
      "en": "Production Economics"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-kultur-international-economics-and-finance",
    "slug": "international-economics-and-finance",
    "name": {
      "en": "International Economics And Finance"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-kultur-art-management",
    "slug": "art-management",
    "name": {
      "en": "Art Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-quality-and-production-management",
    "slug": "quality-and-production-management",
    "name": {
      "en": "Quality And Production Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-kultur-communication-arts",
    "slug": "communication-arts",
    "name": {
      "en": "Communication Arts"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-education-management-and-planning",
    "slug": "education-management-and-planning",
    "name": {
      "en": "Education Management And Planning"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-kultur-human-rights",
    "slug": "human-rights",
    "name": {
      "en": "Human Rights"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-european-human-rights",
    "slug": "european-human-rights",
    "name": {
      "en": "European Human Rights"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-mathematics-and-computer-science",
    "slug": "mathematics-and-computer-science",
    "name": {
      "en": "Mathematics And Computer Science"
    },
    "degreeLevel": "master",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-alternative-energy-sources",
    "slug": "alternative-energy-sources",
    "name": {
      "en": "Alternative Energy Sources"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-air-conditioning-and-cooling",
    "slug": "air-conditioning-and-cooling",
    "name": {
      "en": "Air Conditioning And Cooling"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-kultur-elementary-school-teacher-education",
    "slug": "elementary-school-teacher-education",
    "name": {
      "en": "Elementary School Teacher Education"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-beykent-finance-and-banking",
    "slug": "finance-and-banking",
    "name": {
      "en": "Finance and Banking"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-beykent-information-systems-technologies",
    "slug": "information-systems-technologies",
    "name": {
      "en": "Information Systems Technologies"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-beykent-russian-translation-and-interpreting",
    "slug": "russian-translation-and-interpreting",
    "name": {
      "en": "Russian Translation and Interpreting"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-beykent-cnc-programming-and-operation",
    "slug": "cnc-programming-and-operation",
    "name": {
      "en": "CNC Programming and Operation"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-environmental-measurement-and-monitoring-systems-technology",
    "slug": "environmental-measurement-and-monitoring-systems-technology",
    "name": {
      "en": "Environmental Measurement and Monitoring Systems Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-dental-prosthetic-technology",
    "slug": "dental-prosthetic-technology",
    "name": {
      "en": "Dental Prosthetic Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "dentistry",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-energy-plant-management",
    "slug": "energy-plant-management",
    "name": {
      "en": "Energy Plant Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-hybrid-and-electric-vehicles-technology",
    "slug": "hybrid-and-electric-vehicles-technology",
    "name": {
      "en": "Hybrid and Electric Vehicles Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-optometry",
    "slug": "optometry",
    "name": {
      "en": "Optometry"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-orthopaedic-prosthetics-and-orthotics",
    "slug": "orthopaedic-prosthetics-and-orthotics",
    "name": {
      "en": "Orthopaedic Prosthetics and Orthotics"
    },
    "degreeLevel": "associate",
    "categorySlug": "dentistry",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-game-development-and-programming",
    "slug": "game-development-and-programming",
    "name": {
      "en": "Game Development and Programming"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-water-and-waste-management-technician",
    "slug": "water-and-waste-management-technician",
    "name": {
      "en": "Water and Waste Management Technician"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-textile-technology",
    "slug": "textile-technology",
    "name": {
      "en": "Textile Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-tourism-and-travel-services",
    "slug": "tourism-and-travel-services",
    "name": {
      "en": "Tourism and Travel Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "tourism",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-artificial-intelligence-operator",
    "slug": "artificial-intelligence-operator",
    "name": {
      "en": "Artificial Intelligence Operator"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-building-insulation-technology",
    "slug": "building-insulation-technology",
    "name": {
      "en": "Building Insulation Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-earthquake-risky-structures-and-urban-transportation",
    "slug": "earthquake-risky-structures-and-urban-transportation",
    "name": {
      "en": "Earthquake Risky Structures and Urban Transportation"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-industrial-policy-and-technology-management",
    "slug": "industrial-policy-and-technology-management",
    "name": {
      "en": "Industrial Policy and Technology Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-hospital-and-health-institutions-management",
    "slug": "hospital-and-health-institutions-management",
    "name": {
      "en": "Hospital and Health Institutions Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-communication-arts-design",
    "slug": "communication-arts-design",
    "name": {
      "en": "Communication Arts Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-media-and-communication-systems",
    "slug": "media-and-communication-systems",
    "name": {
      "en": "Media and Communication Systems"
    },
    "degreeLevel": "master",
    "categorySlug": "communication",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-cinema-and-tv",
    "slug": "cinema-and-tv",
    "name": {
      "en": "Cinema and TV"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-human-resources-and-organizational-change",
    "slug": "human-resources-and-organizational-change",
    "name": {
      "en": "Human Resources and Organizational Change"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-beykent-architectural-design",
    "slug": "architectural-design",
    "name": {
      "en": "Architectural Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-beykent-health-institutions-management-distance-education",
    "slug": "health-institutions-management-distance-education",
    "name": {
      "en": "Health Institutions Management (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-beykent-management-information-systems-distance-education",
    "slug": "management-information-systems-distance-education",
    "name": {
      "en": "Management Information Systems (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-beykent-human-resources-and-organizational-change-distance-education",
    "slug": "human-resources-and-organizational-change-distance-education",
    "name": {
      "en": "Human Resources and Organizational Change (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-beykent-cinema-and-tv-arts-competency",
    "slug": "cinema-and-tv-arts-competency",
    "name": {
      "en": "Cinema and TV Arts Competency"
    },
    "degreeLevel": "phd",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-ostim-technical-quality-control-in-production",
    "slug": "quality-control-in-production",
    "name": {
      "en": "Quality Control In Production"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-ostim-technical-international-business",
    "slug": "international-business",
    "name": {
      "en": "International Business"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-ostim-technical-industrial-policies-and-technology-management",
    "slug": "industrial-policies-and-technology-management",
    "name": {
      "en": "Industrial Policies And Technology Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-ostim-technical-uav-technologies-and-operations",
    "slug": "uav-technologies-and-operations",
    "name": {
      "en": "UAV Technologies And Operations"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-ostim-technical-weapons-industry-technician",
    "slug": "weapons-industry-technician",
    "name": {
      "en": "Weapons Industry Technician"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-ostim-technical-hybrid-and-electric-vehicle-technology",
    "slug": "hybrid-and-electric-vehicle-technology",
    "name": {
      "en": "Hybrid And Electric Vehicle Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-ostim-technical-material-sciences-and-engineering",
    "slug": "material-sciences-and-engineering",
    "name": {
      "en": "Material Sciences And Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-bezmi-alem-orthopedic-prosthetics-and-orthotics",
    "slug": "orthopedic-prosthetics-and-orthotics",
    "name": {
      "en": "Orthopedic Prosthetics and Orthotics"
    },
    "degreeLevel": "associate",
    "categorySlug": "dentistry",
    "durationYears": 2
  },
  {
    "id": "p-u-bezmi-alem-aromatherapy",
    "slug": "aromatherapy",
    "name": {
      "en": "Aromatherapy"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-bezmi-alem-analytical-chemistry",
    "slug": "analytical-chemistry",
    "name": {
      "en": "Analytical Chemistry"
    },
    "degreeLevel": "master",
    "categorySlug": "natural-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-bezmi-alem-experimental-and-applied-endocrinology",
    "slug": "experimental-and-applied-endocrinology",
    "name": {
      "en": "Experimental and Applied Endocrinology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-bezmi-alem-pharmacognosy-and-natural-products-chemistry",
    "slug": "pharmacognosy-and-natural-products-chemistry",
    "name": {
      "en": "Pharmacognosy and Natural Products Chemistry"
    },
    "degreeLevel": "master",
    "categorySlug": "natural-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-bezmi-alem-player-care-in-football",
    "slug": "player-care-in-football",
    "name": {
      "en": "Player Care in Football"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-bezmi-alem-drug-discovery-and-development",
    "slug": "drug-discovery-and-development",
    "name": {
      "en": "Drug Discovery and Development"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-bezmi-alem-disaster-medicine",
    "slug": "disaster-medicine",
    "name": {
      "en": "Disaster Medicine"
    },
    "degreeLevel": "phd",
    "categorySlug": "medicine",
    "durationYears": 3
  },
  {
    "id": "p-u-bezmi-alem-cardiopulmonary-physiotherapy-and-rehabilitation",
    "slug": "cardiopulmonary-physiotherapy-and-rehabilitation",
    "name": {
      "en": "Cardiopulmonary Physiotherapy and Rehabilitation"
    },
    "degreeLevel": "phd",
    "categorySlug": "health-sciences",
    "durationYears": 3
  },
  {
    "id": "p-u-bezmi-alem-medical-biochemistry",
    "slug": "medical-biochemistry",
    "name": {
      "en": "Medical Biochemistry"
    },
    "degreeLevel": "phd",
    "categorySlug": "medicine",
    "durationYears": 3
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-primary-school-teaching",
    "slug": "primary-school-teaching",
    "name": {
      "en": "Primary School Teaching"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-arabic-language-teaching",
    "slug": "arabic-language-teaching",
    "name": {
      "en": "Arabic Language Teaching"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-music-teaching",
    "slug": "music-teaching",
    "name": {
      "en": "Music Teaching"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-islamic-sciences",
    "slug": "islamic-sciences",
    "name": {
      "en": "Islamic Sciences"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-islamic-economics-and-finance",
    "slug": "islamic-economics-and-finance",
    "name": {
      "en": "Islamic Economics And Finance"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-electrical-electronics-engineering",
    "slug": "electrical-electronics-engineering",
    "name": {
      "en": "Electrical & Electronics Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-family-counseling-and-education",
    "slug": "family-counseling-and-education",
    "name": {
      "en": "Family Counseling and Education"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-computer-science-and-engineering",
    "slug": "computer-science-and-engineering",
    "name": {
      "en": "Computer Science and Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-big-data-and-business-analytics",
    "slug": "big-data-and-business-analytics",
    "name": {
      "en": "Big Data and Business Analytics"
    },
    "degreeLevel": "master",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-communication-and-proclamation-in-religious-services",
    "slug": "communication-and-proclamation-in-religious-services",
    "name": {
      "en": "Communication and Proclamation in Religious Services"
    },
    "degreeLevel": "master",
    "categorySlug": "communication",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-education-management",
    "slug": "education-management",
    "name": {
      "en": "Education Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-philosophy-and-religious-sciences",
    "slug": "philosophy-and-religious-sciences",
    "name": {
      "en": "Philosophy And Religious Sciences"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-food-nutrition",
    "slug": "food-nutrition",
    "name": {
      "en": "Food Nutrition"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-internal-medicine-nursing",
    "slug": "internal-medicine-nursing",
    "name": {
      "en": "Internal Medicine Nursing"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-islamic-economics-and-law",
    "slug": "islamic-economics-and-law",
    "name": {
      "en": "Islamic Economics And Law"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-islamic-history-and-arts",
    "slug": "islamic-history-and-arts",
    "name": {
      "en": "Islamic History And Arts"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-urban-studies-and-management",
    "slug": "urban-studies-and-management",
    "name": {
      "en": "Urban Studies And Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-spiritual-counseling-and-guidance",
    "slug": "spiritual-counseling-and-guidance",
    "name": {
      "en": "Spiritual Counseling And Guidance"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-history-and-civilization-studies",
    "slug": "history-and-civilization-studies",
    "name": {
      "en": "History and Civilization Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-fundamental-islamic-sciences",
    "slug": "fundamental-islamic-sciences",
    "name": {
      "en": "Fundamental Islamic Sciences"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-international-finance-and-participation-banking",
    "slug": "international-finance-and-participation-banking",
    "name": {
      "en": "International Finance And Participation Banking"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sabahattin-zaim-urbanism-and-urban-transformation",
    "slug": "urbanism-and-urban-transformation",
    "name": {
      "en": "Urbanism and Urban Transformation"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-biruni-robotics-and-artificial-intelligence",
    "slug": "robotics-and-artificial-intelligence",
    "name": {
      "en": "Robotics and Artificial Intelligence"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-biruni-disaster-and-emergency-management",
    "slug": "disaster-and-emergency-management",
    "name": {
      "en": "Disaster And Emergency Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-biruni-software-development-program",
    "slug": "software-development-program",
    "name": {
      "en": "Software Development Program"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "computer-science",
    "durationYears": 4
  },
  {
    "id": "p-u-biruni-biostatistics",
    "slug": "biostatistics",
    "name": {
      "en": "Biostatistics"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-biruni-molecular-and-medical-genetics",
    "slug": "molecular-and-medical-genetics",
    "name": {
      "en": "Molecular And Medical Genetics"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-biruni-pharmaceutical-design-and-development",
    "slug": "pharmaceutical-design-and-development",
    "name": {
      "en": "Pharmaceutical Design And Development"
    },
    "degreeLevel": "phd",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-biruni-pharmaceuticals-technology",
    "slug": "pharmaceuticals-technology",
    "name": {
      "en": "Pharmaceuticals Technology"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-biruni-obstetrics-and-gynecology-nursing",
    "slug": "obstetrics-and-gynecology-nursing",
    "name": {
      "en": "Obstetrics And Gynecology Nursing"
    },
    "degreeLevel": "phd",
    "categorySlug": "health-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-biruni-endodontics",
    "slug": "endodontics",
    "name": {
      "en": "Endodontics"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-aydin-teacher-training-in-arabic",
    "slug": "teacher-training-in-arabic",
    "name": {
      "en": "Teacher Training In Arabic"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-aydin-teacher-training-in-mathematics-at-primary-school-level",
    "slug": "teacher-training-in-mathematics-at-primary-school-level",
    "name": {
      "en": "Teacher Training in Mathematics at Primary School Level"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "natural-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-aydin-teacher-training-in-english",
    "slug": "teacher-training-in-english",
    "name": {
      "en": "Teacher Training in English"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-aydin-teacher-training-at-pre-school-level",
    "slug": "teacher-training-at-pre-school-level",
    "name": {
      "en": "Teacher Training at Pre-School Level"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-aydin-guidance-and-psychology-counseling",
    "slug": "guidance-and-psychology-counseling",
    "name": {
      "en": "Guidance and Psychology Counseling"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "health-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-aydin-teacher-training-at-primary-school-level",
    "slug": "teacher-training-at-primary-school-level",
    "name": {
      "en": "Teacher Training At Primary School Level"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-aydin-teacher-training-in-turkish",
    "slug": "teacher-training-in-turkish",
    "name": {
      "en": "Teacher Training In Turkish"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-aydin-digital-gaming-design",
    "slug": "digital-gaming-design",
    "name": {
      "en": "Digital Gaming Design"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-aydin-drama-and-acting",
    "slug": "drama-and-acting",
    "name": {
      "en": "Drama And Acting"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-aydin-television-news-and-programming",
    "slug": "television-news-and-programming",
    "name": {
      "en": "Television News And Programming"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "communication",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-aydin-printing-and-publication-technologies",
    "slug": "printing-and-publication-technologies",
    "name": {
      "en": "Printing and Publication Technologies"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-jewelry-and-jewelry-design",
    "slug": "jewelry-and-jewelry-design",
    "name": {
      "en": "Jewelry And Jewelry Design"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-hair-care-beauty-services",
    "slug": "hair-care-beauty-services",
    "name": {
      "en": "Hair Care Beauty Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-tourist-guide",
    "slug": "tourist-guide",
    "name": {
      "en": "Tourist Guide"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-air-logistics",
    "slug": "air-logistics",
    "name": {
      "en": "Air Logistics"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-construction-inspection",
    "slug": "construction-inspection",
    "name": {
      "en": "Construction Inspection "
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-local-administrations",
    "slug": "local-administrations",
    "name": {
      "en": "Local Administrations"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-operation-room-services",
    "slug": "operation-room-services",
    "name": {
      "en": "Operation Room Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-perfusion-techniques",
    "slug": "perfusion-techniques",
    "name": {
      "en": "Perfusion Techniques"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-arabic-language-training",
    "slug": "arabic-language-training",
    "name": {
      "en": "Arabic Language Training"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-international-economy",
    "slug": "international-economy",
    "name": {
      "en": "International Economy"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-e-business-management",
    "slug": "e-business-management",
    "name": {
      "en": "E-Business Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-aydin-digital-marketing",
    "slug": "digital-marketing",
    "name": {
      "en": "Digital Marketing"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-aydin-business-management-for-business-manager",
    "slug": "business-management-for-business-manager",
    "name": {
      "en": "Business Management for Business Manager"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-aydin-quality-management-and-quality-assurance-systems",
    "slug": "quality-management-and-quality-assurance-systems",
    "name": {
      "en": "Quality Management and Quality Assurance Systems"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-measurement-and-evaluation-in-education",
    "slug": "measurement-and-evaluation-in-education",
    "name": {
      "en": "Measurement and Evaluation in Education"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-educational-technology-and-educational-design",
    "slug": "educational-technology-and-educational-design",
    "name": {
      "en": "Educational Technology and Educational Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-aydin-visual-arts",
    "slug": "visual-arts",
    "name": {
      "en": "Visual Arts"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-public-relations-and-publicity",
    "slug": "public-relations-and-publicity",
    "name": {
      "en": "Public Relations And Publicity"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-elementary-education",
    "slug": "elementary-education",
    "name": {
      "en": "Elementary Education"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-psychological-counseling-and-guidance",
    "slug": "psychological-counseling-and-guidance",
    "name": {
      "en": "Psychological Counseling and Guidance"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-local-governments-and-decentralization",
    "slug": "local-governments-and-decentralization",
    "name": {
      "en": "Local Governments And Decentralization"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-international-relations-and-intelligence-studies",
    "slug": "international-relations-and-intelligence-studies",
    "name": {
      "en": "International Relations And Intelligence Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-international-relations-and-terrorism-researches",
    "slug": "international-relations-and-terrorism-researches",
    "name": {
      "en": "International Relations And Terrorism Researches"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-television-and-film",
    "slug": "television-and-film",
    "name": {
      "en": "Television And Film"
    },
    "degreeLevel": "master",
    "categorySlug": "communication",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-energy-technologies",
    "slug": "energy-technologies",
    "name": {
      "en": "Energy Technologies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-food-safety",
    "slug": "food-safety",
    "name": {
      "en": "Food Safety"
    },
    "degreeLevel": "master",
    "categorySlug": "agriculture",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-earthquake-and-structural-engineering",
    "slug": "earthquake-and-structural-engineering",
    "name": {
      "en": "Earthquake And Structural Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-civil-engineering-construction-and-project-management",
    "slug": "civil-engineering-construction-and-project-management",
    "name": {
      "en": "Civil Engineering Construction And Project Management"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-aydin-urban-renewal",
    "slug": "urban-renewal",
    "name": {
      "en": "Urban Renewal"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-artificial-intelligence-and-data-science",
    "slug": "artificial-intelligence-and-data-science",
    "name": {
      "en": "Artificial Intelligence and Data Science"
    },
    "degreeLevel": "master",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-surgical-diseases-nursing",
    "slug": "surgical-diseases-nursing",
    "name": {
      "en": "Surgical Diseases Nursing"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-athlete-nutrition",
    "slug": "athlete-nutrition",
    "name": {
      "en": "Athlete Nutrition"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-social-service",
    "slug": "social-service",
    "name": {
      "en": "Social Service"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-health-physics",
    "slug": "health-physics",
    "name": {
      "en": "Health Physics"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-medical-pharmacology",
    "slug": "medical-pharmacology",
    "name": {
      "en": "Medical Pharmacology"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-aydin-graphic-design-art-qualification",
    "slug": "graphic-design-art-qualification",
    "name": {
      "en": "Graphic Design Art Qualification"
    },
    "degreeLevel": "phd",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-aydin-television-and-cinema",
    "slug": "television-and-cinema",
    "name": {
      "en": "Television And Cinema"
    },
    "degreeLevel": "phd",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-aydin-mouth-teeth-and-jaw-surgery",
    "slug": "mouth-teeth-and-jaw-surgery",
    "name": {
      "en": "Mouth, Teeth And Jaw Surgery"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-aydin-prosthodontics",
    "slug": "prosthodontics",
    "name": {
      "en": "Prosthodontics"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-atlas-surgical-services",
    "slug": "surgical-services",
    "name": {
      "en": "Surgical Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-atlas-telehealth-technician",
    "slug": "telehealth-technician",
    "name": {
      "en": "Telehealth Technician"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-atlas-cognitive-rehabilitation",
    "slug": "cognitive-rehabilitation",
    "name": {
      "en": "Cognitive Rehabilitation"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-atlas-technology-and-inovasion",
    "slug": "technology-and-inovasion",
    "name": {
      "en": "Technology and Inovasion"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-atlas-artificial-intelligence-and-smart-systems",
    "slug": "artificial-intelligence-and-smart-systems",
    "name": {
      "en": "Artificial Intelligence and Smart Systems"
    },
    "degreeLevel": "master",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-arel-office-management-and-executive-assistance",
    "slug": "office-management-and-executive-assistance",
    "name": {
      "en": "Office Management And Executive Assistance"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-arel-urban-systems-engineering",
    "slug": "urban-systems-engineering",
    "name": {
      "en": "Urban Systems Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 1
  },
  {
    "id": "p-u-yasar-agricultural-machinery-and-technologies-engineering",
    "slug": "agricultural-machinery-and-technologies-engineering",
    "name": {
      "en": "Agricultural Machinery and Technologies Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-yasar-agricultural-economics",
    "slug": "agricultural-economics",
    "name": {
      "en": "Agricultural Economics"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-yasar-proficiency-in-art",
    "slug": "proficiency-in-art",
    "name": {
      "en": "Proficiency in Art"
    },
    "degreeLevel": "phd",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-yasar-agricultural-trade-and-management",
    "slug": "agricultural-trade-and-management",
    "name": {
      "en": "Agricultural Trade And Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-yasar-culture-and-arts-administration",
    "slug": "culture-and-arts-administration",
    "name": {
      "en": "Culture and Arts Administration"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-yasar-international-logistics-management",
    "slug": "international-logistics-management",
    "name": {
      "en": "International Logistics Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-yasar-business-engineering",
    "slug": "business-engineering",
    "name": {
      "en": "Business Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-yasar-logistics-engineering",
    "slug": "logistics-engineering",
    "name": {
      "en": "Logistics Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-yasar-business-administration-mba-distance-education",
    "slug": "business-administration-mba-distance-education",
    "name": {
      "en": "Business Administration MBA (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-yasar-music-and-performance-arts",
    "slug": "music-and-performance-arts",
    "name": {
      "en": "Music and Performance Arts"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-cag-healthcare-institutions-management",
    "slug": "healthcare-institutions-management",
    "name": {
      "en": "Healthcare Institutions Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-cag-international-relations-and-globalization",
    "slug": "international-relations-and-globalization",
    "name": {
      "en": "International Relations and Globalization"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-cag-healthcare-administration",
    "slug": "healthcare-administration",
    "name": {
      "en": "Healthcare Administration"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-gelisim-e-commerce-and-management",
    "slug": "e-commerce-and-management",
    "name": {
      "en": "E-Commerce and Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-gelisim-aircraft-engineering",
    "slug": "aircraft-engineering",
    "name": {
      "en": "Aircraft Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-gelisim-pastry-and-bakery",
    "slug": "pastry-and-bakery",
    "name": {
      "en": "Pastry and Bakery"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gelisim-exercise-and-training-sciences",
    "slug": "exercise-and-training-sciences",
    "name": {
      "en": "Exercise and Training Sciences"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-gelisim-international-logistics-and-transportation",
    "slug": "international-logistics-and-transportation",
    "name": {
      "en": "International Logistics And Transportation"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-gelisim-psychosocial-fields-of-sports",
    "slug": "psychosocial-fields-of-sports",
    "name": {
      "en": "Psychosocial Fields of Sports"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-gelisim-addiction-psychology",
    "slug": "addiction-psychology",
    "name": {
      "en": "Addiction Psychology"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gelisim-flight-operation-management",
    "slug": "flight-operation-management",
    "name": {
      "en": "Flight Operation Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gelisim-security-studies",
    "slug": "security-studies",
    "name": {
      "en": "Security Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-gelisim-television-reporting-and-programming",
    "slug": "television-reporting-and-programming",
    "name": {
      "en": "Television Reporting And Programming"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "communication",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-gelisim-exercise-and-sport-for-disabled",
    "slug": "exercise-and-sport-for-disabled",
    "name": {
      "en": "Exercise and Sport For Disabled"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-gelisim-aeronautical-engineering",
    "slug": "aeronautical-engineering",
    "name": {
      "en": "Aeronautical Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-fatih-sultan-mehmet-basic-islamic-sciences",
    "slug": "basic-islamic-sciences",
    "name": {
      "en": "Basic Islamic Sciences"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-fatih-sultan-mehmet-architectureitecture",
    "slug": "architectureitecture",
    "name": {
      "en": "Architectureitecture"
    },
    "degreeLevel": "master",
    "categorySlug": "architecture",
    "durationYears": 2
  },
  {
    "id": "p-u-fatih-sultan-mehmet-ai-and-data-engineering",
    "slug": "ai-and-data-engineering",
    "name": {
      "en": "Ai And Data Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-fatih-sultan-mehmet-turkish-language-teaching-for-foreigners",
    "slug": "turkish-language-teaching-for-foreigners",
    "name": {
      "en": "Turkish Language Teaching For Foreigners"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 2
  },
  {
    "id": "p-u-fatih-sultan-mehmet-traditional-turkish-arts",
    "slug": "traditional-turkish-arts",
    "name": {
      "en": "Traditional Turkish Arts"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-fatih-sultan-mehmet-psychological-counseling-guidance",
    "slug": "psychological-counseling-guidance",
    "name": {
      "en": "Psychological Counseling& Guidance"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-fatih-sultan-mehmet-preschool-education",
    "slug": "preschool-education",
    "name": {
      "en": "Preschool Education"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-fatih-sultan-mehmet-interior-architectureitecture",
    "slug": "interior-architectureitecture",
    "name": {
      "en": "Interior Architectureitecture"
    },
    "degreeLevel": "master",
    "categorySlug": "architecture",
    "durationYears": 2
  },
  {
    "id": "p-u-fatih-sultan-mehmet-history-of-science",
    "slug": "history-of-science",
    "name": {
      "en": "History Of Science"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 2
  },
  {
    "id": "p-u-fatih-sultan-mehmet-cultural-heritage-conservation-management",
    "slug": "cultural-heritage-conservation-management",
    "name": {
      "en": "Cultural Heritage Conservation &Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-fatih-sultan-mehmet-architectureitectural-conservation-and-restoration",
    "slug": "architectureitectural-conservation-and-restoration",
    "name": {
      "en": "Architectureitectural Conservation And Restoration"
    },
    "degreeLevel": "master",
    "categorySlug": "architecture",
    "durationYears": 2
  },
  {
    "id": "p-u-fatih-sultan-mehmet-arabic-language-teaching-fatih-sultan-mehmet-university",
    "slug": "arabic-language-teaching-fatih-sultan-mehmet-university",
    "name": {
      "en": "Arabic Language& Teaching"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 2
  },
  {
    "id": "p-u-fatih-sultan-mehmet-psychological-counseling-guidance-fatih-sultan-mehmet-university",
    "slug": "psychological-counseling-guidance-fatih-sultan-mehmet-university",
    "name": {
      "en": "Psychological Counseling & Guidance"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-fatih-sultan-mehmet-history-of-science-in-islam",
    "slug": "history-of-science-in-islam",
    "name": {
      "en": "History Of Science In Islam"
    },
    "degreeLevel": "phd",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-fatih-sultan-mehmet-islamic-science",
    "slug": "islamic-science",
    "name": {
      "en": "Islamic Science"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-fatih-sultan-mehmet-architectureitectural-restoration",
    "slug": "architectureitectural-restoration",
    "name": {
      "en": "Architectureitectural Restoration"
    },
    "degreeLevel": "associate",
    "categorySlug": "architecture",
    "durationYears": 2
  },
  {
    "id": "p-u-fatih-sultan-mehmet-shadow-education-for-special-needs",
    "slug": "shadow-education-for-special-needs",
    "name": {
      "en": "Shadow Education For Special Needs"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-fatih-sultan-mehmet-packaging-arts",
    "slug": "packaging-arts",
    "name": {
      "en": "Packaging Arts"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-yeditepe-translation-and-interpreting-studies",
    "slug": "translation-and-interpreting-studies",
    "name": {
      "en": "Translation And Interpreting Studies"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-russian-language-and-literature",
    "slug": "russian-language-and-literature",
    "name": {
      "en": "Russian Language And Literature"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-international-management",
    "slug": "international-management",
    "name": {
      "en": "International Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-european-studies",
    "slug": "european-studies",
    "name": {
      "en": "European Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-yeditepe-plastic-arts-and-painting",
    "slug": "plastic-arts-and-painting",
    "name": {
      "en": "Plastic Arts And Painting"
    },
    "degreeLevel": "phd",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-modern-turkish-literature",
    "slug": "modern-turkish-literature",
    "name": {
      "en": "Modern Turkish Literature"
    },
    "degreeLevel": "phd",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-local-authorities-and-governance",
    "slug": "local-authorities-and-governance",
    "name": {
      "en": "Local Authorities And Governance"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-yeditepe-agribusiness-and-management",
    "slug": "agribusiness-and-management",
    "name": {
      "en": "Agribusiness And Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-yeditepe-media-and-communication-management",
    "slug": "media-and-communication-management",
    "name": {
      "en": "Media And Communication Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-yeditepe-comparative-literature",
    "slug": "comparative-literature",
    "name": {
      "en": "Comparative Literature"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 2
  },
  {
    "id": "p-u-yeditepe-interaction-design",
    "slug": "interaction-design",
    "name": {
      "en": "Interaction Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-yeditepe-cognitive-sciences",
    "slug": "cognitive-sciences",
    "name": {
      "en": "Cognitive Sciences"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-yeditepe-biological-anthropology",
    "slug": "biological-anthropology",
    "name": {
      "en": "Biological Anthropology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-yeditepe-animation-design",
    "slug": "animation-design",
    "name": {
      "en": "Animation Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-yeditepe-dentomaxillofacial-radiology",
    "slug": "dentomaxillofacial-radiology",
    "name": {
      "en": "Dentomaxillofacial Radiology"
    },
    "degreeLevel": "phd",
    "categorySlug": "communication",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-oral-implantology",
    "slug": "oral-implantology",
    "name": {
      "en": "Oral Implantology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-yeditepe-physiopathology",
    "slug": "physiopathology",
    "name": {
      "en": "Physiopathology"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-pharmaceutical-toxicology",
    "slug": "pharmaceutical-toxicology",
    "name": {
      "en": "Pharmaceutical Toxicology"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-pharmacognosy",
    "slug": "pharmacognosy",
    "name": {
      "en": "Pharmacognosy"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-drug-and-cosmetic-production-technologies",
    "slug": "drug-and-cosmetic-production-technologies",
    "name": {
      "en": "Drug And Cosmetic Production Technologies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-yeditepe-cosmetology",
    "slug": "cosmetology",
    "name": {
      "en": "Cosmetology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-yeditepe-phytotheraphy",
    "slug": "phytotheraphy",
    "name": {
      "en": "Phytotheraphy"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-yeditepe-pharmacoeconomics-and-pharmacoepidemiology",
    "slug": "pharmacoeconomics-and-pharmacoepidemiology",
    "name": {
      "en": "Pharmacoeconomics And Pharmacoepidemiology"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-yeditepe-myology",
    "slug": "myology",
    "name": {
      "en": "Myology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-yeditepe-medical-physics",
    "slug": "medical-physics",
    "name": {
      "en": "Medical Physics"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-yeditepe-medical-microbiolog",
    "slug": "medical-microbiolog",
    "name": {
      "en": "Medical Microbiolog"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-yeditepe-healthcare-management-in-emergencies-and-natural-disaster",
    "slug": "healthcare-management-in-emergencies-and-natural-disaster",
    "name": {
      "en": "Healthcare Management In Emergencies And Natural Disaster"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-yeditepe-materials-science-and-nanotechnology-engineering",
    "slug": "materials-science-and-nanotechnology-engineering",
    "name": {
      "en": "Materials Science And Nanotechnology Engineering"
    },
    "degreeLevel": "phd",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-industrial-and-systems-engineering",
    "slug": "industrial-and-systems-engineering",
    "name": {
      "en": "Industrial And Systems Engineering"
    },
    "degreeLevel": "phd",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-sustainable-built-environment",
    "slug": "sustainable-built-environment",
    "name": {
      "en": "Sustainable Built Environment"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-yeditepe-design-and-innovation-for-sustainable-food-systems",
    "slug": "design-and-innovation-for-sustainable-food-systems",
    "name": {
      "en": "Design And Innovation For Sustainable Food Systems"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 1
  },
  {
    "id": "p-u-yeditepe-sustainable-energy",
    "slug": "sustainable-energy",
    "name": {
      "en": "Sustainable Energy"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-yeditepe-educational-economy-and-planning",
    "slug": "educational-economy-and-planning",
    "name": {
      "en": "Educational Economy And Planning"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-yeditepe-information-technologies-and-social-media-education",
    "slug": "information-technologies-and-social-media-education",
    "name": {
      "en": "Information Technologies And Social Media Education"
    },
    "degreeLevel": "master",
    "categorySlug": "communication",
    "durationYears": 2
  },
  {
    "id": "p-u-yeditepe-customs-management",
    "slug": "customs-management",
    "name": {
      "en": "Customs Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-real-estate-development-and-management",
    "slug": "real-estate-development-and-management",
    "name": {
      "en": "Real Estate Development And Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-international-transportation-systems",
    "slug": "international-transportation-systems",
    "name": {
      "en": "International Transportation Systems"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-advertisement-design-and-communication",
    "slug": "advertisement-design-and-communication",
    "name": {
      "en": "Advertisement Design And Communication"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-radio-television-and-film-studies",
    "slug": "radio-television-and-film-studies",
    "name": {
      "en": "Radio, Television And Film Studies"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "communication",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-arts-and-culture-management",
    "slug": "arts-and-culture-management",
    "name": {
      "en": "Arts and Culture Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-yeditepe-mathematics-teaching-for-elementary-schools",
    "slug": "mathematics-teaching-for-elementary-schools",
    "name": {
      "en": "Mathematics Teaching for Elementary Schools"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "natural-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-cappadocia-artificial-intelligence-and-machine-learning",
    "slug": "artificial-intelligence-and-machine-learning",
    "name": {
      "en": "Artificial Intelligence and Machine Learning"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "computer-science",
    "durationYears": 4
  },
  {
    "id": "p-u-cappadocia-urban-and-regional-planning",
    "slug": "urban-and-regional-planning",
    "name": {
      "en": "Urban and Regional Planning"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-cappadocia-aircraft-fuselage-and-engine-maintenance",
    "slug": "aircraft-fuselage-and-engine-maintenance",
    "name": {
      "en": "Aircraft Fuselage And Engine Maintenance"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-cappadocia-computer-science-distance-learning",
    "slug": "computer-science-distance-learning",
    "name": {
      "en": "Computer Science (Distance Learning)"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-cappadocia-computer-security-technology",
    "slug": "computer-security-technology",
    "name": {
      "en": "Computer Security Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-cappadocia-cloud-computing-operation",
    "slug": "cloud-computing-operation",
    "name": {
      "en": "Cloud Computing Operation"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-cappadocia-penal-enforcement-and-security-services",
    "slug": "penal-enforcement-and-security-services",
    "name": {
      "en": "Penal Enforcement and Security Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-cappadocia-digital-transformation-electronics",
    "slug": "digital-transformation-electronics",
    "name": {
      "en": "Digital Transformation Electronics"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-cappadocia-corporate-it-expertise",
    "slug": "corporate-it-expertise",
    "name": {
      "en": "Corporate IT Expertise"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-cappadocia-autonomous-systems-technician",
    "slug": "autonomous-systems-technician",
    "name": {
      "en": "Autonomous Systems Technician"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-cappadocia-tourist-guide-distance-learning",
    "slug": "tourist-guide-distance-learning",
    "name": {
      "en": "Tourist Guide (Distance Learning)"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-cappadocia-city-environment-and-local-governments",
    "slug": "city-environment-and-local-governments",
    "name": {
      "en": "City, Environment and Local Governments"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-cappadocia-cultural-studies",
    "slug": "cultural-studies",
    "name": {
      "en": "Cultural Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-cappadocia-sustainable-tourism-management",
    "slug": "sustainable-tourism-management",
    "name": {
      "en": "Sustainable Tourism Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-hasan-kalyoncu-economy-finance",
    "slug": "economy-finance",
    "name": {
      "en": "Economy& Finance"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-isik-opticianry-ep",
    "slug": "opticianry-ep",
    "name": {
      "en": "Opticianry (Ep)"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-isik-science-of-art",
    "slug": "science-of-art",
    "name": {
      "en": "Science Of Art"
    },
    "degreeLevel": "phd",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-isik-electronics-engineering",
    "slug": "electronics-engineering",
    "name": {
      "en": "Electronics Engineering"
    },
    "degreeLevel": "phd",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-isik-contemporary-business",
    "slug": "contemporary-business",
    "name": {
      "en": "Contemporary Business"
    },
    "degreeLevel": "phd",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-isik-contemporary-engineering",
    "slug": "contemporary-engineering",
    "name": {
      "en": "Contemporary Engineering"
    },
    "degreeLevel": "phd",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-isik-executive-business-administration",
    "slug": "executive-business-administration",
    "name": {
      "en": "Executive Business Administration"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-bilkent-fine-arts",
    "slug": "fine-arts",
    "name": {
      "en": "Fine Arts"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-bilkent-archaeology",
    "slug": "archaeology",
    "name": {
      "en": "Archaeology"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-bilkent-conference-interpreting",
    "slug": "conference-interpreting",
    "name": {
      "en": "Conference Interpreting"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-bilkent-media-and-design",
    "slug": "media-and-design",
    "name": {
      "en": "Media and Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-bilkent-media-and-visual-studies",
    "slug": "media-and-visual-studies",
    "name": {
      "en": "Media and Visual Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "communication",
    "durationYears": 2
  },
  {
    "id": "p-u-bilkent-turkish-literature",
    "slug": "turkish-literature",
    "name": {
      "en": "Turkish Literature"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 2
  },
  {
    "id": "p-u-bilkent-curriculum-and-instruction-with-ib-teaching-and-learning",
    "slug": "curriculum-and-instruction-with-ib-teaching-and-learning",
    "name": {
      "en": "Curriculum and Instruction with IB Teaching and Learning"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-bilkent-teaching-english-as-a-foreign-language",
    "slug": "teaching-english-as-a-foreign-language",
    "name": {
      "en": "Teaching English as a Foreign Language"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 2
  },
  {
    "id": "p-u-bilkent-materials-science-and-nanotechnology",
    "slug": "materials-science-and-nanotechnology",
    "name": {
      "en": "Materials Science and Nanotechnology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-geomatics-engineering",
    "slug": "geomatics-engineering",
    "name": {
      "en": "Geomatics Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-okan-flight-training-pilotage",
    "slug": "flight-training-pilotage",
    "name": {
      "en": "Flight Training (Pilotage)"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-okan-textile-and-fashion-design",
    "slug": "textile-and-fashion-design",
    "name": {
      "en": "Textile and Fashion Design"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-okan-chinese-translation-and-interpreting",
    "slug": "chinese-translation-and-interpreting",
    "name": {
      "en": "Chinese Translation and Interpreting"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-okan-theater",
    "slug": "theater",
    "name": {
      "en": "Theater"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-okan-accounting-and-auditing-distance-education",
    "slug": "accounting-and-auditing-distance-education",
    "name": {
      "en": "Accounting and Auditing (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-okan-advanced-electronics-and-communication-technology",
    "slug": "advanced-electronics-and-communication-technology",
    "name": {
      "en": "Advanced Electronics And Communication Technology"
    },
    "degreeLevel": "master",
    "categorySlug": "communication",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-aesthetic-restorative",
    "slug": "aesthetic-restorative",
    "name": {
      "en": "Aesthetic Restorative"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-automotive-mechatronics-and-intelligent-vehicles",
    "slug": "automotive-mechatronics-and-intelligent-vehicles",
    "name": {
      "en": "Automotive Mechatronics And Intelligent Vehicles"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-banking",
    "slug": "banking",
    "name": {
      "en": "Banking"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-banking-distance-education",
    "slug": "banking-distance-education",
    "name": {
      "en": "Banking (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-okan-child-development-and-education",
    "slug": "child-development-and-education",
    "name": {
      "en": "Child Development and Education"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-economy-law",
    "slug": "economy-law",
    "name": {
      "en": "Economy Law"
    },
    "degreeLevel": "master",
    "categorySlug": "law",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-explosives-engineering",
    "slug": "explosives-engineering",
    "name": {
      "en": "Explosives Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-international-logistics",
    "slug": "international-logistics",
    "name": {
      "en": "International Logistics"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-logistics-management-distance-education",
    "slug": "logistics-management-distance-education",
    "name": {
      "en": "Logistics Management (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-okan-oral-and-maxillofacial-radiology",
    "slug": "oral-and-maxillofacial-radiology",
    "name": {
      "en": "Oral and Maxillofacial Radiology"
    },
    "degreeLevel": "master",
    "categorySlug": "communication",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-power-electronics-and-clean-energy-systems",
    "slug": "power-electronics-and-clean-energy-systems",
    "name": {
      "en": "Power Electronics And Clean Energy Systems"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-quality-management-in-healthcare",
    "slug": "quality-management-in-healthcare",
    "name": {
      "en": "Quality Management In Healthcare"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-real-estate-finance-and-valuation-distance-education",
    "slug": "real-estate-finance-and-valuation-distance-education",
    "name": {
      "en": "Real Estate Finance and Valuation (Distance Education)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-okan-sales-and-marketing",
    "slug": "sales-and-marketing",
    "name": {
      "en": "Sales And Marketing"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-social-and-cultural-studies",
    "slug": "social-and-cultural-studies",
    "name": {
      "en": "Social And Cultural Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-sports-physiology",
    "slug": "sports-physiology",
    "name": {
      "en": "Sports Physiology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-tourism-and-hospitality",
    "slug": "tourism-and-hospitality",
    "name": {
      "en": "Tourism and Hospitality"
    },
    "degreeLevel": "master",
    "categorySlug": "tourism",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-land-planning-and-management",
    "slug": "land-planning-and-management",
    "name": {
      "en": "Land Planning and Management"
    },
    "degreeLevel": "phd",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-okan-smart-infrastructure-technology",
    "slug": "smart-infrastructure-technology",
    "name": {
      "en": "Smart Infrastructure Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-natural-gas-and-installation-technology",
    "slug": "natural-gas-and-installation-technology",
    "name": {
      "en": "Natural Gas And Installation Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-heating-ventilation-and-air-conditioning-technology",
    "slug": "heating-ventilation-and-air-conditioning-technology",
    "name": {
      "en": "Heating, Ventilation and Air Conditioning Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-construction-equipment-operations",
    "slug": "construction-equipment-operations",
    "name": {
      "en": "Construction Equipment Operations"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-artificial-intelligence-operation",
    "slug": "artificial-intelligence-operation",
    "name": {
      "en": "Artificial Intelligence Operation"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-surveying-and-cadaster",
    "slug": "surveying-and-cadaster",
    "name": {
      "en": "Surveying and Cadaster"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-mobile-technology",
    "slug": "mobile-technology",
    "name": {
      "en": "Mobile Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-okan-mechanical",
    "slug": "mechanical",
    "name": {
      "en": "Mechanical"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-kadir-has-gender-studies",
    "slug": "gender-studies",
    "name": {
      "en": "Gender Studies"
    },
    "degreeLevel": "phd",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-kadir-has-user-experience-design",
    "slug": "user-experience-design",
    "name": {
      "en": "User Experience Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 1
  },
  {
    "id": "p-u-kadir-has-business-intelligence-and-analytic",
    "slug": "business-intelligence-and-analytic",
    "name": {
      "en": "Business Intelligence And Analytic"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-kadir-has-design",
    "slug": "design",
    "name": {
      "en": "Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-kadir-has-international-political-economy",
    "slug": "international-political-economy",
    "name": {
      "en": "International Political Economy"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-ibn-haldun-civilization-studies",
    "slug": "civilization-studies",
    "name": {
      "en": "Civilization Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-ibn-haldun-artificial-intelligence-technologies-in-education",
    "slug": "artificial-intelligence-technologies-in-education",
    "name": {
      "en": "Artificial Intelligence Technologies In Education"
    },
    "degreeLevel": "master",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-ibn-haldun-middle-east-studies",
    "slug": "middle-east-studies",
    "name": {
      "en": "Middle East Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-ibn-haldun-air-transport-management",
    "slug": "air-transport-management",
    "name": {
      "en": "Air Transport Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-ibn-haldun-international-and-comparative-law",
    "slug": "international-and-comparative-law",
    "name": {
      "en": "International And Comparative Law"
    },
    "degreeLevel": "master",
    "categorySlug": "law",
    "durationYears": 2
  },
  {
    "id": "p-u-ibn-haldun-philosophical-social-and-historical-foundations-of-education",
    "slug": "philosophical-social-and-historical-foundations-of-education",
    "name": {
      "en": "Philosophical Social And Historical Foundations Of Education"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-ibn-haldun-religious-studies",
    "slug": "religious-studies",
    "name": {
      "en": "Religious Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-ibn-haldun-psychological-guidance-and-counselling",
    "slug": "psychological-guidance-and-counselling",
    "name": {
      "en": "Psychological Guidance And Counselling"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-ibn-haldun-turkish-studies",
    "slug": "turkish-studies",
    "name": {
      "en": "Turkish Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-galata-media-and-communication-studies",
    "slug": "media-and-communication-studies",
    "name": {
      "en": "Media and Communication Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "communication",
    "durationYears": 1
  },
  {
    "id": "p-u-istanbul-galata-front-end-software-development",
    "slug": "front-end-software-development",
    "name": {
      "en": "Front-End Software Development"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-galata-interior-design-and-environmental-design",
    "slug": "interior-design-and-environmental-design",
    "name": {
      "en": "Interior Design and Environmental Design"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 1
  },
  {
    "id": "p-u-tobb-university-of-economics-and-technology-material-science-and-nanotechnology-engineering",
    "slug": "material-science-and-nanotechnology-engineering",
    "name": {
      "en": "Material Science and Nanotechnology Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-tobb-university-of-economics-and-technology-international-entrepreneurship",
    "slug": "international-entrepreneurship",
    "name": {
      "en": "International Entrepreneurship"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-tobb-university-of-economics-and-technology-micro-and-nanotechnology-engineering",
    "slug": "micro-and-nanotechnology-engineering",
    "name": {
      "en": "Micro and Nanotechnology Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-izmir-kavram-vocational-school-environmental-health-and-environmental-risk-management-technician",
    "slug": "environmental-health-and-environmental-risk-management-technician",
    "name": {
      "en": "Environmental Health and Environmental Risk Management Technician"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-izmir-kavram-vocational-school-welding-technology",
    "slug": "welding-technology",
    "name": {
      "en": "Welding Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-izmir-kavram-vocational-school-medical-documentation-and-secretarial-services",
    "slug": "medical-documentation-and-secretarial-services",
    "name": {
      "en": "Medical Documentation and Secretarial Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-izmir-econ-legal-office-management-and-secretariat",
    "slug": "legal-office-management-and-secretariat",
    "name": {
      "en": "Legal Office Management and Secretariat"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-izmir-econ-civil-aviation-transport-management",
    "slug": "civil-aviation-transport-management",
    "name": {
      "en": "Civil Aviation Transport Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-izmir-econ-paramedic",
    "slug": "paramedic",
    "name": {
      "en": "Paramedic"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-izmir-econ-gastronomy-and-cultural-arts",
    "slug": "gastronomy-and-cultural-arts",
    "name": {
      "en": "Gastronomy and Cultural Arts"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-izmir-econ-physical",
    "slug": "physical",
    "name": {
      "en": "Physical"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-izmir-econ-maths",
    "slug": "maths",
    "name": {
      "en": "Maths"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-izmir-econ-surgical-nursing",
    "slug": "surgical-nursing",
    "name": {
      "en": "Surgical Nursing"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-izmir-econ-experimental-psychology",
    "slug": "experimental-psychology",
    "name": {
      "en": "Experimental Psychology"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-izmir-econ-healthcare-quality-and-patient-safety",
    "slug": "healthcare-quality-and-patient-safety",
    "name": {
      "en": "Healthcare Quality and Patient Safety"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-izmir-econ-design-studies",
    "slug": "design-studies",
    "name": {
      "en": "Design Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 1
  },
  {
    "id": "p-u-izmir-econ-business-administration-distance-education-e-mba",
    "slug": "business-administration-distance-education-e-mba",
    "name": {
      "en": "Business Administration - Distance Education (E-MBA)"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-izmir-econ-brand-communication",
    "slug": "brand-communication",
    "name": {
      "en": "Brand Communication"
    },
    "degreeLevel": "master",
    "categorySlug": "communication",
    "durationYears": 1
  },
  {
    "id": "p-u-izmir-econ-marketing-communications-and-public-relations",
    "slug": "marketing-communications-and-public-relations",
    "name": {
      "en": "Marketing Communications and Public Relations"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-toros-electrical-electronics-engineering-toros-university",
    "slug": "electrical-electronics-engineering-toros-university",
    "name": {
      "en": "Electrical-Electronics Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-toros-computering",
    "slug": "computering",
    "name": {
      "en": "Computering"
    },
    "degreeLevel": "associate",
    "categorySlug": "computer-science",
    "durationYears": 2
  },
  {
    "id": "p-u-maltepe-ship-and-yacht-design",
    "slug": "ship-and-yacht-design",
    "name": {
      "en": "Ship And Yacht Design"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-maltepe-bow-instruments",
    "slug": "bow-instruments",
    "name": {
      "en": "Bow Instruments"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-lokman-hekim-coaching",
    "slug": "coaching",
    "name": {
      "en": "Coaching"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-demiroglu-bilim-telehealth",
    "slug": "telehealth",
    "name": {
      "en": "Telehealth"
    },
    "degreeLevel": "associate",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-demiroglu-bilim-medical-documentation-and-secreterial-services",
    "slug": "medical-documentation-and-secreterial-services",
    "name": {
      "en": "Medical Documentation and Secreterial Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-vocational-school-of-health-and-social-sciences-medical-laboratory-technician",
    "slug": "medical-laboratory-technician",
    "name": {
      "en": "Medical Laboratory Technician"
    },
    "degreeLevel": "associate",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-sisli-vocational-school-civil-aviation-and-cabin-services",
    "slug": "civil-aviation-and-cabin-services",
    "name": {
      "en": "Civil Aviation and Cabin Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-29-mayis-arabic-translation-and-interpreting",
    "slug": "arabic-translation-and-interpreting",
    "name": {
      "en": "Arabic Translation and Interpreting"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-29-mayis-information-and-document-management",
    "slug": "information-and-document-management",
    "name": {
      "en": "Information and Document Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-izmir-tinaztepe-autopsy-assistant",
    "slug": "autopsy-assistant",
    "name": {
      "en": "Autopsy Assistant"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-avrasya-cartography-and-cadastre",
    "slug": "cartography-and-cadastre",
    "name": {
      "en": "Cartography and Cadastre"
    },
    "degreeLevel": "associate",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-avrasya-aviation-cabin-services",
    "slug": "aviation-cabin-services",
    "name": {
      "en": "Aviation Cabin Services"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-avrasya-dental-health",
    "slug": "dental-health",
    "name": {
      "en": "Dental Health"
    },
    "degreeLevel": "associate",
    "categorySlug": "dentistry",
    "durationYears": 2
  },
  {
    "id": "p-u-avrasya-work-and-activity-therapy",
    "slug": "work-and-activity-therapy",
    "name": {
      "en": "Work and Activity Therapy"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-health-and-technology-industrial-design-engineering",
    "slug": "industrial-design-engineering",
    "name": {
      "en": "Industrial Design Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-health-and-technology-mechatronic-engineering",
    "slug": "mechatronic-engineering",
    "name": {
      "en": "Mechatronic Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-istanbul-health-and-technology-pharmaceutical-technology",
    "slug": "pharmaceutical-technology",
    "name": {
      "en": "Pharmaceutical Technology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-istanbul-health-and-technology-drug-research-and-development",
    "slug": "drug-research-and-development",
    "name": {
      "en": "Drug Research and Development"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-piri-reis-maritime-business-management",
    "slug": "maritime-business-management",
    "name": {
      "en": "Maritime Business Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-piri-reis-naval-architecture-and-marine-engineering",
    "slug": "naval-architecture-and-marine-engineering",
    "name": {
      "en": "Naval Architecture and Marine Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-piri-reis-maritime-transportation-management-engineering",
    "slug": "maritime-transportation-management-engineering",
    "name": {
      "en": "Maritime Transportation Management Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-piri-reis-ship-machinery-management-engineering",
    "slug": "ship-machinery-management-engineering",
    "name": {
      "en": "Ship Machinery Management Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-piri-reis-maritime-brokerage",
    "slug": "maritime-brokerage",
    "name": {
      "en": "Maritime Brokerage"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-piri-reis-maritime-transportation-management",
    "slug": "maritime-transportation-management",
    "name": {
      "en": "Maritime Transportation Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-piri-reis-hybrid-and-electric-vehicles",
    "slug": "hybrid-and-electric-vehicles",
    "name": {
      "en": "Hybrid and Electric Vehicles"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-piri-reis-ship-machinery-management",
    "slug": "ship-machinery-management",
    "name": {
      "en": "Ship Machinery Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-piri-reis-shipbuilding",
    "slug": "shipbuilding",
    "name": {
      "en": "Shipbuilding"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-piri-reis-maritime-engineering",
    "slug": "maritime-engineering",
    "name": {
      "en": "Maritime Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-piri-reis-maritime-law",
    "slug": "maritime-law",
    "name": {
      "en": "Maritime Law"
    },
    "degreeLevel": "master",
    "categorySlug": "law",
    "durationYears": 2
  },
  {
    "id": "p-u-piri-reis-naval-architecture-and-marine-engineering-advanced-ocean-platforms",
    "slug": "naval-architecture-and-marine-engineering-advanced-ocean-platforms",
    "name": {
      "en": "Naval Architecture and Marine Engineering Advanced Ocean Platforms"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-piri-reis-maritime-transportation-and-management-engineering",
    "slug": "maritime-transportation-and-management-engineering",
    "name": {
      "en": "Maritime Transportation and Management Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-piri-reis-maritime-and-business-economics",
    "slug": "maritime-and-business-economics",
    "name": {
      "en": "Maritime and Business Economics"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-kto-karatay-arabic-turkish-translation-and-interpreting",
    "slug": "arabic-turkish-translation-and-interpreting",
    "name": {
      "en": "Arabic-Turkish Translation and Interpreting"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-kto-karatay-energy-management",
    "slug": "energy-management",
    "name": {
      "en": "Energy Management"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "business",
    "durationYears": 4
  },
  {
    "id": "p-u-kto-karatay-english-turkish-translation-and-interpreting",
    "slug": "english-turkish-translation-and-interpreting",
    "name": {
      "en": "English-Turkish Translation and Interpreting"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "humanities",
    "durationYears": 4
  },
  {
    "id": "p-u-kto-karatay-insurance-and-social-security",
    "slug": "insurance-and-social-security",
    "name": {
      "en": "Insurance and Social Security"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-kto-karatay-digital-factory-technologies",
    "slug": "digital-factory-technologies",
    "name": {
      "en": "Digital Factory Technologies"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-kto-karatay-weapon-industry-technology",
    "slug": "weapon-industry-technology",
    "name": {
      "en": "Weapon Industry Technology"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-kto-karatay-pilot-training",
    "slug": "pilot-training",
    "name": {
      "en": "Pilot Training"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-kto-karatay-computer-forensic-engineering",
    "slug": "computer-forensic-engineering",
    "name": {
      "en": "Computer Forensic Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-kto-karatay-interdisciplinary-family-counseling",
    "slug": "interdisciplinary-family-counseling",
    "name": {
      "en": "Interdisciplinary Family Counseling"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-kto-karatay-electrical-and-computer-engineering-graduate",
    "slug": "electrical-and-computer-engineering-graduate",
    "name": {
      "en": "Electrical and Computer Engineering Graduate"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-kto-karatay-mechatronics-engineering-science",
    "slug": "mechatronics-engineering-science",
    "name": {
      "en": "Mechatronics Engineering Science"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-kto-karatay-mental-health-and-disease-nursing",
    "slug": "mental-health-and-disease-nursing",
    "name": {
      "en": "Mental Health and Disease Nursing"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-kto-karatay-human-resources-and-social-security",
    "slug": "human-resources-and-social-security",
    "name": {
      "en": "Human Resources and Social Security"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-kto-karatay-department-of-civil-engineering",
    "slug": "department-of-civil-engineering",
    "name": {
      "en": "Department of Civil Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-kto-karatay-architecture-graduate-program",
    "slug": "architecture-graduate-program",
    "name": {
      "en": "Architecture Graduate Program"
    },
    "degreeLevel": "master",
    "categorySlug": "architecture",
    "durationYears": 2
  },
  {
    "id": "p-u-kto-karatay-mechanical-engineering-graduate",
    "slug": "mechanical-engineering-graduate",
    "name": {
      "en": "Mechanical Engineering Graduate"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-kto-karatay-interdisciplinary-occupational-health-and-safety",
    "slug": "interdisciplinary-occupational-health-and-safety",
    "name": {
      "en": "Interdisciplinary Occupational Health and Safety"
    },
    "degreeLevel": "phd",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-cankaya-materials-science-and-engineering",
    "slug": "materials-science-and-engineering",
    "name": {
      "en": "Materials Science and Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-cankaya-building-technologies",
    "slug": "building-technologies",
    "name": {
      "en": "Building Technologies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-cankaya-english-literature-and-cultural-studies",
    "slug": "english-literature-and-cultural-studies",
    "name": {
      "en": "English Literature and Cultural Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 2
  },
  {
    "id": "p-u-cankaya-computer-sciences-and-engineering",
    "slug": "computer-sciences-and-engineering",
    "name": {
      "en": "Computer Sciences and Engineering"
    },
    "degreeLevel": "phd",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-konya-plant-production-and-technologies",
    "slug": "plant-production-and-technologies",
    "name": {
      "en": "Plant Production and Technologies"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "social-sciences",
    "durationYears": 4
  },
  {
    "id": "p-u-mef-mechatronics-and-robotics-engineering",
    "slug": "mechatronics-and-robotics-engineering",
    "name": {
      "en": "Mechatronics and Robotics Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-mef-learning-sciences",
    "slug": "learning-sciences",
    "name": {
      "en": "Learning Sciences"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-mef-human-rights-law",
    "slug": "human-rights-law",
    "name": {
      "en": "Human Rights Law"
    },
    "degreeLevel": "master",
    "categorySlug": "law",
    "durationYears": 2
  },
  {
    "id": "p-u-mef-international-security-and-strategy-studies",
    "slug": "international-security-and-strategy-studies",
    "name": {
      "en": "International Security and Strategy Studies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-mef-information-technologies",
    "slug": "information-technologies",
    "name": {
      "en": "Information Technologies"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 1
  },
  {
    "id": "p-u-mef-construction-project-management",
    "slug": "construction-project-management",
    "name": {
      "en": "Construction Project Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 1
  },
  {
    "id": "p-u-sanko-biological-and-biomedical-sciences",
    "slug": "biological-and-biomedical-sciences",
    "name": {
      "en": "Biological And Biomedical Sciences"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 1
  },
  {
    "id": "p-u-nuh-naci-yazgan-electric",
    "slug": "electric",
    "name": {
      "en": "Electric"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-turkish-aeronautical-association-space-engineering",
    "slug": "space-engineering",
    "name": {
      "en": "Space Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-turkish-aeronautical-association-aircraft-manufacturing-technologies",
    "slug": "aircraft-manufacturing-technologies",
    "name": {
      "en": "Aircraft Manufacturing Technologies"
    },
    "degreeLevel": "associate",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-turkish-aeronautical-association-civil-aviation-operations-management",
    "slug": "civil-aviation-operations-management",
    "name": {
      "en": "Civil Aviation Operations Management"
    },
    "degreeLevel": "associate",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-koc-archaeology-and-history-of-art",
    "slug": "archaeology-and-history-of-art",
    "name": {
      "en": "Archaeology and History of Art"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "arts",
    "durationYears": 4
  },
  {
    "id": "p-u-koc-chemical-and-biological-engineering",
    "slug": "chemical-and-biological-engineering",
    "name": {
      "en": "Chemical and Biological Engineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-koc-biomedical-sciences-and-engineering",
    "slug": "biomedical-sciences-and-engineering",
    "name": {
      "en": "Biomedical Sciences and Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-koc-computational-sciences-and-engineering",
    "slug": "computational-sciences-and-engineering",
    "name": {
      "en": "Computational Sciences and Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-koc-industrial-engineering-and-management",
    "slug": "industrial-engineering-and-management",
    "name": {
      "en": "Industrial Engineering and Management"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-koc-design-technology-and-society",
    "slug": "design-technology-and-society",
    "name": {
      "en": "Design, Technology and Society"
    },
    "degreeLevel": "master",
    "categorySlug": "arts",
    "durationYears": 2
  },
  {
    "id": "p-u-koc-comparative-history-and-society",
    "slug": "comparative-history-and-society",
    "name": {
      "en": "Comparative History and Society"
    },
    "degreeLevel": "master",
    "categorySlug": "humanities",
    "durationYears": 2
  },
  {
    "id": "p-u-koc-intensive-care-nursing",
    "slug": "intensive-care-nursing",
    "name": {
      "en": "Intensive Care Nursing"
    },
    "degreeLevel": "master",
    "categorySlug": "health-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-koc-medical-physiology",
    "slug": "medical-physiology",
    "name": {
      "en": "Medical Physiology"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-koc-reproductive-biology",
    "slug": "reproductive-biology",
    "name": {
      "en": "Reproductive Biology"
    },
    "degreeLevel": "master",
    "categorySlug": "natural-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-koc-cellular-and-molecular-medicine",
    "slug": "cellular-and-molecular-medicine",
    "name": {
      "en": "Cellular and Molecular Medicine"
    },
    "degreeLevel": "master",
    "categorySlug": "medicine",
    "durationYears": 2
  },
  {
    "id": "p-u-koc-immunology",
    "slug": "immunology",
    "name": {
      "en": "Immunology"
    },
    "degreeLevel": "master",
    "categorySlug": "social-sciences",
    "durationYears": 2
  },
  {
    "id": "p-u-koc-reproductive-medicine",
    "slug": "reproductive-medicine",
    "name": {
      "en": "Reproductive Medicine"
    },
    "degreeLevel": "phd",
    "categorySlug": "medicine",
    "durationYears": 4
  },
  {
    "id": "p-u-sabanci-molecular-biology-genetics-and-bioengineering",
    "slug": "molecular-biology-genetics-and-bioengineering",
    "name": {
      "en": "Molecular Biology, Genetics and Bioengineering"
    },
    "degreeLevel": "bachelor",
    "categorySlug": "engineering",
    "durationYears": 4
  },
  {
    "id": "p-u-sabanci-energy-technologies-and-management",
    "slug": "energy-technologies-and-management",
    "name": {
      "en": "Energy Technologies and Management"
    },
    "degreeLevel": "master",
    "categorySlug": "business",
    "durationYears": 2
  },
  {
    "id": "p-u-sabanci-materials-science-and-nano-engineering",
    "slug": "materials-science-and-nano-engineering",
    "name": {
      "en": "Materials Science and Nano Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  },
  {
    "id": "p-u-sabanci-production-engineering",
    "slug": "production-engineering",
    "name": {
      "en": "Production Engineering"
    },
    "degreeLevel": "master",
    "categorySlug": "engineering",
    "durationYears": 2
  }
];

/**
 * StudyLeo university↔program rows with real tuition data. Only the non-en locales
 * need the UI; name localization falls back to the EN name (name[locale] renders
 * the missing locale as the raw key — see the university detail table).
 */
export const studyLeoUniversityPrograms: UniversityProgram[] = [
  {
    "id": "up-1",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-dental-prosthetics-technology",
    "language": "en",
    "tuitionFee": 3600,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-2",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-sports-management",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-3",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-audiology",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-4",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-social-services",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-5",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-physiotherapy-and-rehabilitation",
    "language": "tr",
    "tuitionFee": 5400,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-6",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-midwifery",
    "language": "tr",
    "tuitionFee": 6300,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-7",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-civil-aviation-cabin-services",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-8",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-medical-imaging-techniques",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-9",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-medical-documentation-and-secretary",
    "language": "tr",
    "tuitionFee": 3150,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-10",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-opticianry",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-11",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-audiometry",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-12",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-architectural-restoration",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-13",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-construction-technology",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-14",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-interior-design",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-15",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-electroneurophysiology",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-16",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-dialysis",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-17",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-child-development",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-18",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-biomedical-device-technology",
    "language": "tr",
    "tuitionFee": 3150,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-19",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-computer-programming",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 3850,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-20",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-operating-room-services",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-21",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-oral-and-dental-health",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-22",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-justice",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-23",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-civil-aviation-transportation-management",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-24",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-applied-english-and-translation",
    "language": "en",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-25",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-accounting-and-tax-applications",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-26",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-logistics",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-27",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-human-resource-management",
    "language": "tr",
    "tuitionFee": 3150,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-28",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-radio-and-television-programming",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-29",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-public-relation-and-publicity",
    "language": "tr",
    "tuitionFee": 3150,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-30",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-foreign-trade",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-31",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-banking-and-insurance",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-32",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-medical-laboratory-techniques",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-33",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-management-of-health-institutions",
    "language": "tr",
    "tuitionFee": 3150,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-34",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-radiotherapy",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-35",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-pathology-laboratory-techniques",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-36",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-occupational-health-and-safety",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-37",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-emergency-and-first-aid",
    "language": "en",
    "tuitionFee": 3150,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-38",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-pharmacy-services",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-39",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-anesthesia",
    "language": "en",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-40",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-english-teaching",
    "language": "en",
    "tuitionFee": 4500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-41",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-logistic-management",
    "language": "tr",
    "tuitionFee": 4950,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-42",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-speech-and-language-therapy",
    "language": "en",
    "tuitionFee": 4500,
    "originalFee": 4950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-43",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-ergotherapy",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 4950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-44",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-turkish-music-art",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-45",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-urban-design-and-landscape-architecture",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 4950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-46",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-health-management",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 4950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-47",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-interior-architecture-and-environmental-design",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-48",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-special-education-teaching",
    "language": "tr",
    "tuitionFee": 5500,
    "originalFee": 6050,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-49",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-radio-tv-and-cinema",
    "language": "tr",
    "tuitionFee": 4950,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-50",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-orthopedic-prosthetic-and-orthotics",
    "language": "tr",
    "tuitionFee": 4950,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-51",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-public-relation-and-advertisement",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-52",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-visual-communication-design",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 4950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-53",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-political-science-and-public-administration",
    "language": "tr",
    "tuitionFee": 5500,
    "originalFee": 6050,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-54",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-political-science-and-international-relations",
    "language": "en",
    "tuitionFee": 5500,
    "originalFee": 6050,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-55",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-management-information-system",
    "language": "en",
    "tuitionFee": 4950,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-56",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-international-trade-and-finance",
    "language": "en",
    "tuitionFee": 6500,
    "originalFee": 7150,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-57",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-economics-and-finance",
    "language": "en",
    "tuitionFee": 4500,
    "originalFee": 4950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-58",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-aviation-management",
    "language": "tr",
    "tuitionFee": 6500,
    "originalFee": 7150,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-59",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-electrical-and-electronic-engineering",
    "language": "en",
    "tuitionFee": 6000,
    "originalFee": 6600,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-60",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-new-media-and-communication-systems",
    "language": "tr",
    "tuitionFee": 4950,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-61",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-pre-school-teaching",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-62",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-media-and-visual-arts",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 4950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-63",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-primary-mathematics-education",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-64",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-guidance-and-psychology-counselling",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-65",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-molecular-medicine",
    "language": "en",
    "tuitionFee": 13000,
    "originalFee": 14000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-66",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-healthcare-systems-engineering",
    "language": "tr",
    "tuitionFee": 7000,
    "originalFee": 7700,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-67",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-electrical-electronics-engineering-and-cyber-systems",
    "language": "en",
    "tuitionFee": 4000,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-68",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-construction-management-and-law",
    "language": "tr",
    "tuitionFee": 4000,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-69",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-climate-change-energy-and-health",
    "language": "tr",
    "tuitionFee": 7000,
    "originalFee": 7700,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-70",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-built-environment-and-health",
    "language": "tr",
    "tuitionFee": 7000,
    "originalFee": 7700,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-71",
    "universityId": "u-istanbul-medipol",
    "programId": "p-u-istanbul-medipol-biomedical-engineering-and-bioinformatics",
    "language": "en",
    "tuitionFee": 4000,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-72",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-eldercare",
    "language": "tr",
    "tuitionFee": 2900,
    "originalFee": 3900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-73",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-data-science-and-analytics",
    "language": "tr",
    "tuitionFee": 2250,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-74",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-cyber-security",
    "language": "tr",
    "tuitionFee": 1750,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-75",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-aircraft-technology-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-76",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-film-design-and-directing",
    "language": "tr",
    "tuitionFee": 1750,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-77",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-culinary-arts-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-78",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-culinary-arts-dl",
    "language": "tr",
    "tuitionFee": 1450,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-79",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-culinary-arts",
    "language": "tr",
    "tuitionFee": 1450,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-80",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-computer-technology",
    "language": "tr",
    "tuitionFee": 1750,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-81",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-automotive-technology",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-82",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-web-design-and-coding",
    "language": "tr",
    "tuitionFee": 1750,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-83",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-maritime-politics-and-strategies",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 6500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-84",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-information-systems-engineering",
    "language": "tr",
    "tuitionFee": 2650,
    "originalFee": 3650,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-85",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-tourism-guidance-dl",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-86",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-cooking-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-87",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-cooking-dl",
    "language": "tr",
    "tuitionFee": 1450,
    "originalFee": 2450,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-88",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-cooking",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-89",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-acting",
    "language": "tr",
    "tuitionFee": 2750,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-90",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-performing-arts",
    "language": "tr",
    "tuitionFee": 2750,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-91",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-artificial-intelligence-istanbul-topkapi-university",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 6500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-92",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-english-translation-and-interpreting",
    "language": "en",
    "tuitionFee": 2500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-93",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-security-sciences-and-applications",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 6500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-94",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-medical-imaging-techniques-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-95",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-medical-laboratory-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-96",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-medical-documentation-and-secretarial-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-97",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-civil-aviation-cabin-services-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-98",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-civil-aviation-transportation-management-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-99",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-fashion-design-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-100",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-architectural-restoration-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-101",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-internet-and-network-technologies-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-102",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-emergency-and-first-aid-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-103",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-interior-design-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-104",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-maps-and-cadaster-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-105",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-graphic-design-dl",
    "language": "tr",
    "tuitionFee": 1450,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-106",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-physiotherapy-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-107",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-child-development-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-108",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-computer-programming-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-109",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-computer-aided-design-and-animation-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-110",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-oral-and-dental-health-ep",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-111",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-international-business-and-trade",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-112",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-management-information-systems",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 6500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-113",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-marketing-communication",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 6500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-114",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-electrics",
    "language": "tr",
    "tuitionFee": 1450,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-115",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-maps-and-cadaster",
    "language": "tr",
    "tuitionFee": 1450,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-116",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-tourism-guidance",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-117",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-fashion-design-dl",
    "language": "tr",
    "tuitionFee": 1450,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-118",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-medical-laboratory",
    "language": "tr",
    "tuitionFee": 1450,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-119",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-medical-documentation-and-secretarial",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-120",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-internet-and-network-technologies-dl",
    "language": "tr",
    "tuitionFee": 1750,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-121",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-internet-and-network-technologies",
    "language": "tr",
    "tuitionFee": 1750,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-122",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-computer-programming-dl",
    "language": "tr",
    "tuitionFee": 1750,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-123",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-computer-aided-design-and-animation-dl",
    "language": "tr",
    "tuitionFee": 1750,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-124",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-computer-aided-design-and-animation",
    "language": "tr",
    "tuitionFee": 1750,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-125",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-aircraft-technology",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-126",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-child-development-dl",
    "language": "tr",
    "tuitionFee": 1450,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-127",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-painting",
    "language": "tr",
    "tuitionFee": 1950,
    "originalFee": 3900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-128",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-theatre",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-129",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-digital-game-design",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-130",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-recreation",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-131",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-coaching-training",
    "language": "tr",
    "tuitionFee": 1950,
    "originalFee": 3900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-132",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-new-media",
    "language": "tr",
    "tuitionFee": 1950,
    "originalFee": 3900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-133",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-public-relations-and-advertisement",
    "language": "tr",
    "tuitionFee": 1950,
    "originalFee": 3900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-134",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-english-language-and-literature",
    "language": "en",
    "tuitionFee": 2500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-135",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-cartoons-and-animation",
    "language": "tr",
    "tuitionFee": 1950,
    "originalFee": 3900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-136",
    "universityId": "u-istanbul-topkapi",
    "programId": "p-u-istanbul-topkapi-fashion-and-textile-design",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-137",
    "universityId": "u-acibadem-mehmet-ali-aydinlar",
    "programId": "p-u-acibadem-mehmet-ali-aydinlar-healthcare-management",
    "language": "tr",
    "tuitionFee": 5525,
    "originalFee": 8500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-138",
    "universityId": "u-acibadem-mehmet-ali-aydinlar",
    "programId": "p-u-acibadem-mehmet-ali-aydinlar-culinary",
    "language": "tr",
    "tuitionFee": 2625,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-139",
    "universityId": "u-acibadem-mehmet-ali-aydinlar",
    "programId": "p-u-acibadem-mehmet-ali-aydinlar-biomedical-equipment-technology",
    "language": "tr",
    "tuitionFee": 2625,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-140",
    "universityId": "u-acibadem-mehmet-ali-aydinlar",
    "programId": "p-u-acibadem-mehmet-ali-aydinlar-first-and-emergency-health",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-141",
    "universityId": "u-acibadem-mehmet-ali-aydinlar",
    "programId": "p-u-acibadem-mehmet-ali-aydinlar-orthopedic-prostheses-and-ortheses",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-142",
    "universityId": "u-acibadem-mehmet-ali-aydinlar",
    "programId": "p-u-acibadem-mehmet-ali-aydinlar-podology",
    "language": "tr",
    "tuitionFee": 2625,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-143",
    "universityId": "u-acibadem-mehmet-ali-aydinlar",
    "programId": "p-u-acibadem-mehmet-ali-aydinlar-medical-documentation-and-secretariat",
    "language": "tr",
    "tuitionFee": 2625,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-144",
    "universityId": "u-antalya-bilim",
    "programId": "p-u-antalya-bilim-electrical-and-electronics-engineering",
    "language": "en",
    "tuitionFee": 3320,
    "originalFee": 8300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-145",
    "universityId": "u-antalya-bilim",
    "programId": "p-u-antalya-bilim-pilotage",
    "language": "tr",
    "tuitionFee": 8300,
    "originalFee": 9130,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-146",
    "universityId": "u-antalya-bilim",
    "programId": "p-u-antalya-bilim-global-politics-and-international-relations",
    "language": "tr",
    "tuitionFee": 4590,
    "originalFee": 5400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-147",
    "universityId": "u-antalya-bilim",
    "programId": "p-u-antalya-bilim-electrical-and-computer-engineering",
    "language": "en",
    "tuitionFee": 4590,
    "originalFee": 5400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-148",
    "universityId": "u-antalya-bilim",
    "programId": "p-u-antalya-bilim-public-law",
    "language": "tr",
    "tuitionFee": 4590,
    "originalFee": 5400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-149",
    "universityId": "u-antalya-bilim",
    "programId": "p-u-antalya-bilim-private-law",
    "language": "tr",
    "tuitionFee": 4590,
    "originalFee": 5400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-150",
    "universityId": "u-antalya-bilim",
    "programId": "p-u-antalya-bilim-clinical-psychology",
    "language": "tr",
    "tuitionFee": 15000,
    "originalFee": 16500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-151",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-physical-education-and-sports",
    "language": "tr",
    "tuitionFee": 4000,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-152",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-surgery-services-ep",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-153",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-surgery-services",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-154",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-anthropology",
    "language": "tr",
    "tuitionFee": 4000,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-155",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-prosthetic-dental-treatment",
    "language": "en",
    "tuitionFee": 15000,
    "originalFee": 16000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-156",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-anglo-american-literature-and-creative-writing",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-157",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-technology-and-restoration-of-painting",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-158",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-communication-management",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-159",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-orthodontics",
    "language": "en",
    "tuitionFee": 15000,
    "originalFee": 16000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-160",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-clinical-embryology",
    "language": "tr",
    "tuitionFee": 4000,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-161",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-logistics-ep",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-162",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-tourism-and-travel-services-ep",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-163",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-tourism-and-hotel-management",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-164",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-elderly-care-services",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-165",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-anesthesia-ep",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-166",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-new-media-and-journalism",
    "language": "tr",
    "tuitionFee": 2300,
    "originalFee": 4600,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-167",
    "universityId": "u-istanbul-yeni-yuzyil",
    "programId": "p-u-istanbul-yeni-yuzyil-international-trade-and-logistics",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-168",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-emergency-services-ep",
    "language": "tr",
    "tuitionFee": 1650,
    "originalFee": 2650,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-169",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-emergency-services",
    "language": "tr",
    "tuitionFee": 1650,
    "originalFee": 2650,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-170",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-operating-room-service-ep",
    "language": "tr",
    "tuitionFee": 1650,
    "originalFee": 2650,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-171",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-criminal-enforcement-and-security-services",
    "language": "tr",
    "tuitionFee": 1650,
    "originalFee": 2650,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-172",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-information-security-technology",
    "language": "tr",
    "tuitionFee": 1650,
    "originalFee": 2650,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-173",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-business-management",
    "language": "tr",
    "tuitionFee": 1650,
    "originalFee": 2650,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-174",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-occupational-health-and-safety-ep",
    "language": "tr",
    "tuitionFee": 1650,
    "originalFee": 2650,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-175",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-graphic-design-ep",
    "language": "tr",
    "tuitionFee": 1650,
    "originalFee": 2650,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-176",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-e-trade-and-marketing",
    "language": "tr",
    "tuitionFee": 1650,
    "originalFee": 2650,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-177",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-movement-and-training-sciences",
    "language": "tr",
    "tuitionFee": 2400,
    "originalFee": 4800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-178",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-physical-exercise-health-and-sports-science",
    "language": "tr",
    "tuitionFee": 2400,
    "originalFee": 4800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-179",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-sport-sciences",
    "language": "tr",
    "tuitionFee": 2400,
    "originalFee": 4800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-180",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-political-science-and-international-relation",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-181",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-online-mba",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-182",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-health-institutions-management-dl",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-183",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-management-and-organisation",
    "language": "tr",
    "tuitionFee": 2400,
    "originalFee": 4800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-184",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-health-institutions-management",
    "language": "tr",
    "tuitionFee": 2400,
    "originalFee": 4800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-185",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-real-estate-finance-and-valuation",
    "language": "tr",
    "tuitionFee": 2400,
    "originalFee": 4800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-186",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-electronic-commerce-and-management",
    "language": "tr",
    "tuitionFee": 2200,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-187",
    "universityId": "u-istanbul-esenyurt",
    "programId": "p-u-istanbul-esenyurt-sport-s-management",
    "language": "tr",
    "tuitionFee": 2200,
    "originalFee": 4200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-188",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-public-relations-and-advertising",
    "language": "tr",
    "tuitionFee": 4250,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-189",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-software-development",
    "language": "tr",
    "tuitionFee": 4250,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-190",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-logistics-management",
    "language": "en",
    "tuitionFee": 4250,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-191",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-jewelry-technology-and-design",
    "language": "tr",
    "tuitionFee": 4250,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-192",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-international-relations-altinbas-university",
    "language": "en",
    "tuitionFee": 4250,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-193",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-international-trade-law",
    "language": "tr",
    "tuitionFee": 5865,
    "originalFee": 6900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-194",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-international-taxation",
    "language": "en",
    "tuitionFee": 5865,
    "originalFee": 6900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-195",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-financial-economics",
    "language": "tr",
    "tuitionFee": 5865,
    "originalFee": 6900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-196",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-accounting-and-auditing",
    "language": "tr",
    "tuitionFee": 5865,
    "originalFee": 6900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-197",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-international-relations-joint",
    "language": "en",
    "tuitionFee": 9900,
    "originalFee": 19800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-198",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-arts-and-design",
    "language": "tr",
    "tuitionFee": 5865,
    "originalFee": 6900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-199",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-strategic-marketing-and-brand-management",
    "language": "tr",
    "tuitionFee": 5865,
    "originalFee": 6900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-200",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-data-analytics",
    "language": "en",
    "tuitionFee": 5865,
    "originalFee": 6900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-201",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-information-technology",
    "language": "en",
    "tuitionFee": 5865,
    "originalFee": 6900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-202",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-pediatric-dentistry",
    "language": "tr",
    "tuitionFee": 16200,
    "originalFee": 17820,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-203",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-histology-and-embryology",
    "language": "tr",
    "tuitionFee": 6900,
    "originalFee": 7590,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-204",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-clinical-periodontology",
    "language": "en",
    "tuitionFee": 16200,
    "originalFee": 17200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-205",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-aesthetic-dentistry",
    "language": "en",
    "tuitionFee": 16200,
    "originalFee": 17200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-206",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-biomedical-sciences",
    "language": "en",
    "tuitionFee": 6900,
    "originalFee": 7590,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-207",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-periodontology",
    "language": "tr",
    "tuitionFee": 19800,
    "originalFee": 21780,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-208",
    "universityId": "u-altinbas",
    "programId": "p-u-altinbas-pharmaceutical-sciences",
    "language": "tr",
    "tuitionFee": 19800,
    "originalFee": 21780,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-209",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-sports-physiotherapy",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-210",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-bioengineering",
    "language": "en",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-211",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-financial-technology",
    "language": "tr",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-212",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-executive-business-adminstration",
    "language": "en",
    "tuitionFee": 18000,
    "originalFee": 19000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-213",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-engineering-management",
    "language": "en",
    "tuitionFee": 40000,
    "originalFee": 41000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-214",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-english-language-teaching",
    "language": "en",
    "tuitionFee": 40000,
    "originalFee": 41000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-215",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-educational-technology",
    "language": "en",
    "tuitionFee": 40000,
    "originalFee": 44000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-216",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-guidance-and-counselling",
    "language": "tr",
    "tuitionFee": 40000,
    "originalFee": 41000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-217",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-accounting-and-international-reporting",
    "language": "tr",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-218",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-game-design",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-219",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-marketing-communication-and-public-relations",
    "language": "tr",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-220",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-global-affairs",
    "language": "en",
    "tuitionFee": 12000,
    "originalFee": 13200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-221",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-capital-markets-and-finance",
    "language": "en",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-222",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-film-and-television",
    "language": "en",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-223",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-information-system-management",
    "language": "tr",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-224",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-big-data-analytic-and-management",
    "language": "en",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-225",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-construction-management",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-226",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-energy-systems-operation-and-technology",
    "language": "en",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-227",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-risk-engineering-and-management",
    "language": "en",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-228",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-sound-technology",
    "language": "tr",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-229",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-industry-4-0",
    "language": "en",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-230",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-family-counselling",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-231",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-tissue-engineering-and-regenerative-medicine",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-232",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-chiropractic",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-233",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-health-informatics",
    "language": "tr",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-234",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-social-work",
    "language": "tr",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-235",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-neuroscience",
    "language": "en",
    "tuitionFee": 14000,
    "originalFee": 15400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-236",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-english-language-teaching-dl",
    "language": "en",
    "tuitionFee": 7000,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-237",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-english-language-education",
    "language": "en",
    "tuitionFee": 14000,
    "originalFee": 15400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-238",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-educational-administration-and-planning",
    "language": "tr",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-239",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-educational-design-and-evaluation",
    "language": "tr",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-240",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-early-childhood-education",
    "language": "tr",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-241",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-gifted-and-talented-education",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-242",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-psycological-guidance-and-counselling",
    "language": "en",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-243",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-information-technology-law",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-244",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-digital-media-management",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-245",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-gastronomy",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-246",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-migration-studies",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-247",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-advanced-acting",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-248",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-communication-design",
    "language": "en",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-249",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-human-resource-management-dl",
    "language": "tr",
    "tuitionFee": 7000,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-250",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-political-science-and-international-relation-dl",
    "language": "tr",
    "tuitionFee": 7000,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-251",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-game-development-technology",
    "language": "tr",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-252",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-instructional-technolog-dl",
    "language": "tr",
    "tuitionFee": 7000,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-253",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-marketing-dl",
    "language": "tr",
    "tuitionFee": 6000,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-254",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-mathematical-engineering",
    "language": "en",
    "tuitionFee": 8200,
    "originalFee": 9200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-255",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-management-engineering",
    "language": "en",
    "tuitionFee": 9000,
    "originalFee": 10000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-256",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-pre-school-education",
    "language": "en",
    "tuitionFee": 5950,
    "originalFee": 6545,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-257",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-artificial-intelligence-engineering",
    "language": "en",
    "tuitionFee": 12000,
    "originalFee": 13200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-258",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-international-trade-and-management",
    "language": "en",
    "tuitionFee": 8500,
    "originalFee": 9500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-259",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-international-finance",
    "language": "en",
    "tuitionFee": 8500,
    "originalFee": 9350,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-260",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-computer-education-and-instructional-technology",
    "language": "en",
    "tuitionFee": 5740,
    "originalFee": 6740,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-261",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-music-technology",
    "language": "tr",
    "tuitionFee": 5950,
    "originalFee": 6545,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-262",
    "universityId": "u-bahcesehir",
    "programId": "p-u-bahcesehir-vocal-training",
    "language": "tr",
    "tuitionFee": 5950,
    "originalFee": 6545,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-263",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-nanotechnology-engineering",
    "language": "tr",
    "tuitionFee": 1800,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-264",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-metallurgy-and-materials-engineering",
    "language": "tr",
    "tuitionFee": 1800,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-265",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-coaching-education",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-266",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-physical-education-and-sports-teaching",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-267",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-media-and-communication",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-268",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-public-administration-and-applied-sciences",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-269",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-first-aid-and-emergency",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-270",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-cybersecurity-technology",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-271",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-electricity",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-272",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-mechanical-technology",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-273",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-chemical-technology",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-274",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-machinery",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-275",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-mechatronics",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-276",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-underwater-technology",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-277",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-non-destructive-testing",
    "language": "tr",
    "tuitionFee": 1500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-278",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-statistics-and-data-science",
    "language": "tr",
    "tuitionFee": 3200,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-279",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-physical-education-and-sports-sciences",
    "language": "tr",
    "tuitionFee": 2700,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-280",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-obstetrics-and-gynecology",
    "language": "tr",
    "tuitionFee": 2700,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-281",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-electrical-electronic-engineering",
    "language": "tr",
    "tuitionFee": 2700,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-282",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-defense-technologies",
    "language": "tr",
    "tuitionFee": 2700,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-283",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-business-administration-mba",
    "language": "en",
    "tuitionFee": 3000,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-284",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-industrial-engineering-mba",
    "language": "en",
    "tuitionFee": 3000,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-285",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-business-administration-executive-mba",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-286",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-business-administration-distance-education",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-287",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-management-and-organization",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-288",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-international-financial-reporting-and-auditing",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-289",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-organizational-psychology",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-290",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-occupational-health-and-safety-distance-education",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-291",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-disaster-management",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-292",
    "universityId": "u-istanbul-gedik",
    "programId": "p-u-istanbul-gedik-product-development-and-design-engineering",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-293",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-court-and-office-services",
    "language": "tr",
    "tuitionFee": 1300,
    "originalFee": 2300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-294",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-information-systems-and-technologies",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 4250,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-295",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-tourism-administration",
    "language": "tr",
    "tuitionFee": 2950,
    "originalFee": 3245,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-296",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-accounting-and-finance-management",
    "language": "tr",
    "tuitionFee": 2950,
    "originalFee": 3245,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-297",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-unmanned-vehicle-technician",
    "language": "tr",
    "tuitionFee": 1950,
    "originalFee": 2950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-298",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-department-of-software-development",
    "language": "tr",
    "tuitionFee": 1950,
    "originalFee": 2950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-299",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-marina-and-yacht-management",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 1760,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-300",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-electronics-technology",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 1760,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-301",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-green-and-ecological-building-technician",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 1760,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-302",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-mobile-technologies",
    "language": "tr",
    "tuitionFee": 1950,
    "originalFee": 2145,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-303",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-internet-and-web-technologies",
    "language": "tr",
    "tuitionFee": 1950,
    "originalFee": 2950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-304",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-photography-and-camera-operation",
    "language": "tr",
    "tuitionFee": 1300,
    "originalFee": 2300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-305",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-medical-data-processing-technician",
    "language": "tr",
    "tuitionFee": 1950,
    "originalFee": 2145,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-306",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-digital-health-services-technician",
    "language": "tr",
    "tuitionFee": 1950,
    "originalFee": 2145,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-307",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-movement-and-exercise-sciences",
    "language": "tr",
    "tuitionFee": 6600,
    "originalFee": 7260,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-308",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-local-governments",
    "language": "tr",
    "tuitionFee": 3850,
    "originalFee": 4850,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-309",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-music-and-performing-arts",
    "language": "tr",
    "tuitionFee": 3100,
    "originalFee": 3410,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-310",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-public-relations-and-promotion",
    "language": "tr",
    "tuitionFee": 1950,
    "originalFee": 2145,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-311",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-exercise-and-sport-science",
    "language": "tr",
    "tuitionFee": 3850,
    "originalFee": 4850,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-312",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-international-business-international-business-management",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-313",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-international-business-international-business-management-dl",
    "language": "tr",
    "tuitionFee": 3300,
    "originalFee": 4300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-314",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-banking-and-finance-dl",
    "language": "tr",
    "tuitionFee": 3300,
    "originalFee": 4300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-315",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-aviation-electrical-and-electronics",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 4250,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-316",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-public-relations-and-presentation",
    "language": "tr",
    "tuitionFee": 1950,
    "originalFee": 2950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-317",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-business-administration-dl",
    "language": "tr",
    "tuitionFee": 3300,
    "originalFee": 4300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-318",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-architecture-design",
    "language": "tr",
    "tuitionFee": 3850,
    "originalFee": 4850,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-319",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-advertising-and-brand-communication-dl",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-320",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-accounting-and-auditing-dl",
    "language": "tr",
    "tuitionFee": 3300,
    "originalFee": 4300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-321",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-banking-and-finance",
    "language": "tr",
    "tuitionFee": 6000,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-322",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-aircraft-maintenance-and-repair",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-323",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-biotechnology",
    "language": "tr",
    "tuitionFee": 3100,
    "originalFee": 3410,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-324",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-new-media-communication-and-journalism",
    "language": "tr",
    "tuitionFee": 3300,
    "originalFee": 7481,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-325",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-advertising-and-brand-communication",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 7481,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-326",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-public-affairs",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 4676,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-327",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-pathology-laboratory",
    "language": "tr",
    "tuitionFee": 1950,
    "originalFee": 2950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-328",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-sports-trainer-education",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 4676,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-329",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-maritime-and-port-management",
    "language": "tr",
    "tuitionFee": 1400,
    "originalFee": 1500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-330",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-management",
    "language": "tr",
    "tuitionFee": 8000,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-331",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-flight-training",
    "language": "en",
    "tuitionFee": 10000,
    "originalFee": 11000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-332",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-air-traffic-control",
    "language": "tr",
    "tuitionFee": 8000,
    "originalFee": 8800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-333",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-interpretation-translation-english",
    "language": "en",
    "tuitionFee": 3800,
    "originalFee": 7481,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-334",
    "universityId": "u-istanbul-nisantasi",
    "programId": "p-u-istanbul-nisantasi-textile-and-fashion",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 7481,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-335",
    "universityId": "u-fenerbahce",
    "programId": "p-u-fenerbahce-sports-coaching",
    "language": "tr",
    "tuitionFee": 2835,
    "originalFee": 6300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-336",
    "universityId": "u-fenerbahce",
    "programId": "p-u-fenerbahce-sports-sciences",
    "language": "tr",
    "tuitionFee": 4000,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-337",
    "universityId": "u-fenerbahce",
    "programId": "p-u-fenerbahce-clinical-pharmacy",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-338",
    "universityId": "u-fenerbahce",
    "programId": "p-u-fenerbahce-internal-diseases-nursing",
    "language": "tr",
    "tuitionFee": 3600,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-339",
    "universityId": "u-fenerbahce",
    "programId": "p-u-fenerbahce-organizational-behavior",
    "language": "tr",
    "tuitionFee": 4000,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-340",
    "universityId": "u-fenerbahce",
    "programId": "p-u-fenerbahce-exercise-and-sport-psychology",
    "language": "tr",
    "tuitionFee": 3600,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-341",
    "universityId": "u-fenerbahce",
    "programId": "p-u-fenerbahce-applied-data-science",
    "language": "en",
    "tuitionFee": 2700,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-342",
    "universityId": "u-ankara-bilim",
    "programId": "p-u-ankara-bilim-film-design-and-direction",
    "language": "en",
    "tuitionFee": 3000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-343",
    "universityId": "u-ankara-bilim",
    "programId": "p-u-ankara-bilim-english-translation-and-interpretation",
    "language": "en",
    "tuitionFee": 3000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-344",
    "universityId": "u-ankara-bilim",
    "programId": "p-u-ankara-bilim-film-design-and-new-media",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-345",
    "universityId": "u-ankara-bilim",
    "programId": "p-u-ankara-bilim-industrial-literature-design",
    "language": "tr",
    "tuitionFee": 4000,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-346",
    "universityId": "u-ankara-bilim",
    "programId": "p-u-ankara-bilim-e-commerce-and-marketing",
    "language": "tr",
    "tuitionFee": 1000,
    "originalFee": 2000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-347",
    "universityId": "u-ankara-bilim",
    "programId": "p-u-ankara-bilim-web-design-and-programming",
    "language": "tr",
    "tuitionFee": 1000,
    "originalFee": 2000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-348",
    "universityId": "u-ankara-bilim",
    "programId": "p-u-ankara-bilim-unmanned-aerial-vehicle-technology-and-operator",
    "language": "tr",
    "tuitionFee": 1000,
    "originalFee": 2000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-349",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-pharmacology",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-350",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-media-and-cultural-studies",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-351",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-cosmetics-technology",
    "language": "tr",
    "tuitionFee": 1300,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-352",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-elderly-care",
    "language": "tr",
    "tuitionFee": 1300,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-353",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-international-trade-and-business",
    "language": "en",
    "tuitionFee": 2900,
    "originalFee": 5800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-354",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-economy-and-finance",
    "language": "en",
    "tuitionFee": 2900,
    "originalFee": 5800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-355",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-pedodontics",
    "language": "tr",
    "tuitionFee": 20000,
    "originalFee": 25000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-356",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-oral-and-maxillofacial-surgery",
    "language": "tr",
    "tuitionFee": 29750,
    "originalFee": 35000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-357",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-restorative-dentistry",
    "language": "tr",
    "tuitionFee": 20000,
    "originalFee": 25000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-358",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-international-business-international-business-managment",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-359",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-hair-care-and-beauty-services",
    "language": "tr",
    "tuitionFee": 1300,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-360",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-first-aid-and-emergency-care",
    "language": "tr",
    "tuitionFee": 1300,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-361",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-digital-health-systems-technology",
    "language": "tr",
    "tuitionFee": 1300,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-362",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-medical-data-processing-technology",
    "language": "tr",
    "tuitionFee": 1300,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-363",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-telehealth-technology",
    "language": "tr",
    "tuitionFee": 1300,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-364",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-court-office-services",
    "language": "tr",
    "tuitionFee": 1300,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-365",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-international-business-administration",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-366",
    "universityId": "u-istanbul-kent",
    "programId": "p-u-istanbul-kent-public-health-nursing",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-367",
    "universityId": "u-ankara-medipol",
    "programId": "p-u-ankara-medipol-health-tourism-management",
    "language": "tr",
    "tuitionFee": 2250,
    "originalFee": 2475,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-368",
    "universityId": "u-antalya-belek",
    "programId": "p-u-antalya-belek-communication-and-design",
    "language": "tr",
    "tuitionFee": 5672,
    "originalFee": 8103,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-369",
    "universityId": "u-antalya-belek",
    "programId": "p-u-antalya-belek-radio-television-and-cinema-antalya-belek-university",
    "language": "tr",
    "tuitionFee": 5672,
    "originalFee": 8103,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-370",
    "universityId": "u-antalya-belek",
    "programId": "p-u-antalya-belek-international-trade-and-business-administration",
    "language": "tr",
    "tuitionFee": 6673,
    "originalFee": 9533,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-371",
    "universityId": "u-antalya-belek",
    "programId": "p-u-antalya-belek-tourist-guiding",
    "language": "tr",
    "tuitionFee": 4838,
    "originalFee": 6911,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-372",
    "universityId": "u-alanya",
    "programId": "p-u-alanya-cartoon-and-animation",
    "language": "tr",
    "tuitionFee": 3250,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-373",
    "universityId": "u-alanya",
    "programId": "p-u-alanya-cookery",
    "language": "tr",
    "tuitionFee": 2925,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-374",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-medical-genetics",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-375",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-clinical-anatomy",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-376",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-perfusion",
    "language": "tr",
    "tuitionFee": 4400,
    "originalFee": 4840,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-377",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-family-counseling",
    "language": "tr",
    "tuitionFee": 4800,
    "originalFee": 5280,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-378",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-molecular-biology",
    "language": "tr",
    "tuitionFee": 4400,
    "originalFee": 4840,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-379",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-forensic-science",
    "language": "tr",
    "tuitionFee": 7800,
    "originalFee": 8580,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-380",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-criminal-justice",
    "language": "tr",
    "tuitionFee": 4400,
    "originalFee": 4840,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-381",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-biosecurity",
    "language": "tr",
    "tuitionFee": 4800,
    "originalFee": 5280,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-382",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-bioinformatics",
    "language": "tr",
    "tuitionFee": 4800,
    "originalFee": 5280,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-383",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-physiology",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-384",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-women-s-health-and-diseases-nursing",
    "language": "tr",
    "tuitionFee": 3300,
    "originalFee": 4300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-385",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-psychiatric-nursing",
    "language": "tr",
    "tuitionFee": 2900,
    "originalFee": 3900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-386",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-occupational-therapy",
    "language": "tr",
    "tuitionFee": 4400,
    "originalFee": 4840,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-387",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-anatomy",
    "language": "tr",
    "tuitionFee": 8095,
    "originalFee": 9095,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-388",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-addiction-consultancy-and-rehabilitation",
    "language": "tr",
    "tuitionFee": 3705,
    "originalFee": 3900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-389",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-islamic-civilization-thought-history-and-literature",
    "language": "tr",
    "tuitionFee": 10355,
    "originalFee": 10900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-390",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-tasawwuf-sufi-culture-and-literature",
    "language": "tr",
    "tuitionFee": 5985,
    "originalFee": 6300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-391",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-neuromarketing",
    "language": "tr",
    "tuitionFee": 4400,
    "originalFee": 4840,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-392",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-applied-psychology",
    "language": "tr",
    "tuitionFee": 6300,
    "originalFee": 6930,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-393",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-work-health-and-safety",
    "language": "tr",
    "tuitionFee": 2660,
    "originalFee": 2800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-394",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-social-safety",
    "language": "tr",
    "tuitionFee": 2800,
    "originalFee": 3080,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-395",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-nuclear-technology-and-radiation-safety",
    "language": "tr",
    "tuitionFee": 2800,
    "originalFee": 3080,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-396",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-medicinal-and-aromatic-plants",
    "language": "tr",
    "tuitionFee": 2800,
    "originalFee": 3080,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-397",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-medical-promotion-and-marketing",
    "language": "tr",
    "tuitionFee": 2800,
    "originalFee": 3080,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-398",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-laboratory-technology",
    "language": "tr",
    "tuitionFee": 2660,
    "originalFee": 2800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-399",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-home-care-services",
    "language": "tr",
    "tuitionFee": 2660,
    "originalFee": 2800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-400",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-health-information-system-technics",
    "language": "tr",
    "tuitionFee": 2800,
    "originalFee": 3080,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-401",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-food-technology",
    "language": "tr",
    "tuitionFee": 2660,
    "originalFee": 2800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-402",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-environmental-health",
    "language": "tr",
    "tuitionFee": 2800,
    "originalFee": 3080,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-403",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-emergency-and-disaster-management",
    "language": "tr",
    "tuitionFee": 2800,
    "originalFee": 3080,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-404",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-dental-technology",
    "language": "tr",
    "tuitionFee": 2660,
    "originalFee": 2800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-405",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-child-protective-and-nursing-services",
    "language": "tr",
    "tuitionFee": 2800,
    "originalFee": 3080,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-406",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-care-and-rehablitation-of-people-with-disabilities",
    "language": "tr",
    "tuitionFee": 2660,
    "originalFee": 2800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-407",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-autopsy-assistanship",
    "language": "tr",
    "tuitionFee": 2660,
    "originalFee": 2800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-408",
    "universityId": "u-uskudar",
    "programId": "p-u-uskudar-translation-and-interpretation",
    "language": "en",
    "tuitionFee": 4180,
    "originalFee": 4400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-409",
    "universityId": "u-istanbul-rumeli",
    "programId": "p-u-istanbul-rumeli-civil-air-transportation-management",
    "language": "tr",
    "tuitionFee": 1200,
    "originalFee": 2200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-410",
    "universityId": "u-istanbul-rumeli",
    "programId": "p-u-istanbul-rumeli-pastry-and-breadmaking",
    "language": "tr",
    "tuitionFee": 1200,
    "originalFee": 2200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-411",
    "universityId": "u-istanbul-rumeli",
    "programId": "p-u-istanbul-rumeli-dental-prosthesis-technology",
    "language": "tr",
    "tuitionFee": 1200,
    "originalFee": 2200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-412",
    "universityId": "u-istanbul-rumeli",
    "programId": "p-u-istanbul-rumeli-home-patient-care",
    "language": "tr",
    "tuitionFee": 1200,
    "originalFee": 2200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-413",
    "universityId": "u-istanbul-rumeli",
    "programId": "p-u-istanbul-rumeli-first-and-emergency-aid",
    "language": "tr",
    "tuitionFee": 1200,
    "originalFee": 2200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-414",
    "universityId": "u-istanbul-rumeli",
    "programId": "p-u-istanbul-rumeli-exercise-and-sports-sciences",
    "language": "tr",
    "tuitionFee": 4800,
    "originalFee": 5800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-415",
    "universityId": "u-istanbul-rumeli",
    "programId": "p-u-istanbul-rumeli-exercise-and-sports-sciences-for-the-disabled",
    "language": "tr",
    "tuitionFee": 4800,
    "originalFee": 5800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-416",
    "universityId": "u-dogus",
    "programId": "p-u-dogus-foreign-trade-ep",
    "language": "tr",
    "tuitionFee": 1938,
    "originalFee": 2938,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-417",
    "universityId": "u-dogus",
    "programId": "p-u-dogus-graphic",
    "language": "tr",
    "tuitionFee": 2463,
    "originalFee": 3463,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-418",
    "universityId": "u-dogus",
    "programId": "p-u-dogus-basic-sciences",
    "language": "tr",
    "tuitionFee": 2988,
    "originalFee": 3988,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-419",
    "universityId": "u-dogus",
    "programId": "p-u-dogus-communication-science",
    "language": "tr",
    "tuitionFee": 2463,
    "originalFee": 3463,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-420",
    "universityId": "u-dogus",
    "programId": "p-u-dogus-computer-and-information-sciences",
    "language": "tr",
    "tuitionFee": 3100,
    "originalFee": 4100,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-421",
    "universityId": "u-dogus",
    "programId": "p-u-dogus-surgical-disease-nursing",
    "language": "tr",
    "tuitionFee": 3100,
    "originalFee": 6200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-422",
    "universityId": "u-dogus",
    "programId": "p-u-dogus-engineering-and-technology-management",
    "language": "tr",
    "tuitionFee": 3100,
    "originalFee": 6200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-423",
    "universityId": "u-dogus",
    "programId": "p-u-dogus-global-relations-an-the-european-union",
    "language": "tr",
    "tuitionFee": 3100,
    "originalFee": 6200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-424",
    "universityId": "u-dogus",
    "programId": "p-u-dogus-logistics-and-supply-chain-management",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 10000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-425",
    "universityId": "u-atilim",
    "programId": "p-u-atilim-tunneling-and-underground-structures",
    "language": "tr",
    "tuitionFee": 8000,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-426",
    "universityId": "u-atilim",
    "programId": "p-u-atilim-translation-studies",
    "language": "en",
    "tuitionFee": 6700,
    "originalFee": 7370,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-427",
    "universityId": "u-atilim",
    "programId": "p-u-atilim-political-economy",
    "language": "tr",
    "tuitionFee": 20500,
    "originalFee": 22550,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-428",
    "universityId": "u-atilim",
    "programId": "p-u-atilim-modeling-and-design-of-engineering-systems-modes",
    "language": "en",
    "tuitionFee": 21600,
    "originalFee": 22600,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-429",
    "universityId": "u-atilim",
    "programId": "p-u-atilim-metallurgy-and-material-engineering",
    "language": "en",
    "tuitionFee": 8000,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-430",
    "universityId": "u-atilim",
    "programId": "p-u-atilim-manufacturing-engineering",
    "language": "en",
    "tuitionFee": 8200,
    "originalFee": 9020,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-431",
    "universityId": "u-atilim",
    "programId": "p-u-atilim-european-union",
    "language": "tr",
    "tuitionFee": 6500,
    "originalFee": 7500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-432",
    "universityId": "u-atilim",
    "programId": "p-u-atilim-english-literature-and-culture",
    "language": "en",
    "tuitionFee": 13000,
    "originalFee": 14000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-433",
    "universityId": "u-atilim",
    "programId": "p-u-atilim-applied-physics",
    "language": "en",
    "tuitionFee": 8200,
    "originalFee": 9020,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-434",
    "universityId": "u-atilim",
    "programId": "p-u-atilim-applied-economics",
    "language": "tr",
    "tuitionFee": 6700,
    "originalFee": 7370,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-435",
    "universityId": "u-atilim",
    "programId": "p-u-atilim-applied-chemistry",
    "language": "en",
    "tuitionFee": 8600,
    "originalFee": 9600,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-436",
    "universityId": "u-atilim",
    "programId": "p-u-atilim-industrial-products-design",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-437",
    "universityId": "u-atilim",
    "programId": "p-u-atilim-avioincs",
    "language": "en",
    "tuitionFee": 11000,
    "originalFee": 12000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-438",
    "universityId": "u-atilim",
    "programId": "p-u-atilim-airframe-and-powerplant-maintenance",
    "language": "en",
    "tuitionFee": 11000,
    "originalFee": 12000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-439",
    "universityId": "u-ozyegin",
    "programId": "p-u-ozyegin-artificial-intelligence-and-data-engineering",
    "language": "en",
    "tuitionFee": 25000,
    "originalFee": 27500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-440",
    "universityId": "u-ozyegin",
    "programId": "p-u-ozyegin-technology-and-society",
    "language": "en",
    "tuitionFee": 10925,
    "originalFee": 11925,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-441",
    "universityId": "u-ozyegin",
    "programId": "p-u-ozyegin-industrial-and-organizational-psychology",
    "language": "en",
    "tuitionFee": 12500,
    "originalFee": 13500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-442",
    "universityId": "u-ozyegin",
    "programId": "p-u-ozyegin-financial-engineering",
    "language": "en",
    "tuitionFee": 15277,
    "originalFee": 16277,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-443",
    "universityId": "u-ozyegin",
    "programId": "p-u-ozyegin-city-and-architecture",
    "language": "en",
    "tuitionFee": 15277,
    "originalFee": 16277,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-444",
    "universityId": "u-ozyegin",
    "programId": "p-u-ozyegin-entrepreneurship",
    "language": "en",
    "tuitionFee": 25000,
    "originalFee": 26000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-445",
    "universityId": "u-ozyegin",
    "programId": "p-u-ozyegin-professional-flight",
    "language": "en",
    "tuitionFee": 16500,
    "originalFee": 18150,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-446",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-harp",
    "language": "tr",
    "tuitionFee": 25000,
    "originalFee": 26500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-447",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-composition-and-music-theory",
    "language": "tr",
    "tuitionFee": 25000,
    "originalFee": 26500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-448",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-guitar",
    "language": "tr",
    "tuitionFee": 25000,
    "originalFee": 26500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-449",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-opera",
    "language": "tr",
    "tuitionFee": 25000,
    "originalFee": 26500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-450",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-piano",
    "language": "tr",
    "tuitionFee": 25000,
    "originalFee": 26500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-451",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-string-instruments",
    "language": "tr",
    "tuitionFee": 25000,
    "originalFee": 26500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-452",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-primary-school-mathematics-teaching",
    "language": "tr",
    "tuitionFee": 17000,
    "originalFee": 18500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-453",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-preschool-teaching",
    "language": "tr",
    "tuitionFee": 17000,
    "originalFee": 18500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-454",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-guidance-and-psychological-counseling",
    "language": "tr",
    "tuitionFee": 17000,
    "originalFee": 18500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-455",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-classroom-teaching",
    "language": "tr",
    "tuitionFee": 17000,
    "originalFee": 18500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-456",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-turkish-language-teaching",
    "language": "tr",
    "tuitionFee": 17000,
    "originalFee": 18500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-457",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-american-culture-and-literature",
    "language": "tr",
    "tuitionFee": 19000,
    "originalFee": 20500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-458",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-cartoons-and-animations",
    "language": "tr",
    "tuitionFee": 19000,
    "originalFee": 20500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-459",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-economy",
    "language": "tr",
    "tuitionFee": 20000,
    "originalFee": 21500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-460",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-technology-and-information-management",
    "language": "tr",
    "tuitionFee": 20000,
    "originalFee": 21500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-461",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-accounting-and-financial-management",
    "language": "tr",
    "tuitionFee": 19000,
    "originalFee": 20500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-462",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-insurance",
    "language": "tr",
    "tuitionFee": 19000,
    "originalFee": 20500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-463",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-international-finance-and-banking",
    "language": "tr",
    "tuitionFee": 19000,
    "originalFee": 20500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-464",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-computer-and-educational-technologies",
    "language": "tr",
    "tuitionFee": 3100,
    "originalFee": 6200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-465",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-curriculum-and-instruction",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-466",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-educational-administration-and-supervision",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-467",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-mathematics-education",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-468",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-turkish-education",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-469",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-teaching-turkish-as-a-foreign-language",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-470",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-primary-school-mathematics-education",
    "language": "tr",
    "tuitionFee": 22000,
    "originalFee": 23000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-471",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-computer-and-educational-technologies-distance-education",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-472",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-educational-administration-distance-education",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-473",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-energy-engineering",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-474",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-information-technologies-and-systems-management",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-475",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-quality-engineering",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-476",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-healthcare-institutions-management-distance-education",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-477",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-defense-electronics-and-software",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-478",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-defense-platforms",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-479",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-information-technologies-and-system-management",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-480",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-defense-technologies-and-systems",
    "language": "tr",
    "tuitionFee": 22000,
    "originalFee": 23000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-481",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-exercise-and-sports-performance",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-482",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-traditional-and-complementary-medicine-interdisciplinary",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-483",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-public-health",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-484",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-pharmaceutical-research-and-production-technologies",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-485",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-cardiology-intensive-care",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-486",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-stem-cell-and-regenerative-medicine",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-487",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-audiology-and-speech-disorders",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-488",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-medical-biology",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-489",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-medical-microbiology",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-490",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-anatomy-and-clinical-anatomy",
    "language": "tr",
    "tuitionFee": 22000,
    "originalFee": 23000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-491",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-doctoral-in-dental-disease-treatment-and-endodontics",
    "language": "tr",
    "tuitionFee": 22000,
    "originalFee": 23000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-492",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-periodontics",
    "language": "tr",
    "tuitionFee": 22000,
    "originalFee": 23000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-493",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-prosthetic-dentistry",
    "language": "tr",
    "tuitionFee": 22000,
    "originalFee": 23000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-494",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-accounting-and-finance",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-495",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-museology",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-496",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-music-department-performance",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-497",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-music-and-performing-arts-in-composition",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-498",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-music-and-performing-arts-in-musicology",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-499",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-performance",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-500",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-master-s-in-healthcare-institutions-management",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-501",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-capital-markets",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-502",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-insurance-and-risk-management",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-503",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-social-psychology",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-504",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-international-trade-and-marketing",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-505",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-banking-and-finance-distance-education",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-506",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-economic-law",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-507",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-museum-studies",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-508",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-music-and-stage-arts",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-509",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-health-law",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-510",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-health-management-distance-education",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-511",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-capital-markets-distance-education",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-512",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-insurance-and-risk-management-distance-education",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-513",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-business-administration-for-managers",
    "language": "tr",
    "tuitionFee": 13200,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-514",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-management-organization",
    "language": "tr",
    "tuitionFee": 22000,
    "originalFee": 23000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-515",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-first-and-emergency-aid-secondary-education",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-516",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-office-management-and-executive-assistant",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-517",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-photography-and-videography",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-518",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-accounting-and-tax-practices",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-519",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-radio-and-television",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-520",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-health-information-systems-technician",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-521",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-electronic-technology",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-522",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-industrial-raw-materials-processing-technology",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-523",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-food-quality-control-and-analysis",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-524",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-control-and-automation-technology",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-525",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-machine",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-526",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-electronic-communication-technology",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-527",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-industrial-molding",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-528",
    "universityId": "u-baskent",
    "programId": "p-u-baskent-unmanned-aerial-vehicle-technology-and-operation",
    "language": "tr",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-529",
    "universityId": "u-ted",
    "programId": "p-u-ted-urban-design",
    "language": "en",
    "tuitionFee": 8000,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-530",
    "universityId": "u-ted",
    "programId": "p-u-ted-guidance-and-psychological-counselling",
    "language": "en",
    "tuitionFee": 3750,
    "originalFee": 4750,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-531",
    "universityId": "u-ted",
    "programId": "p-u-ted-primary-education",
    "language": "en",
    "tuitionFee": 3750,
    "originalFee": 4750,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-532",
    "universityId": "u-ted",
    "programId": "p-u-ted-city-and-regional-planning",
    "language": "en",
    "tuitionFee": 5900,
    "originalFee": 6900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-533",
    "universityId": "u-istinye",
    "programId": "p-u-istinye-pharmaceutical-chemistry",
    "language": "tr",
    "tuitionFee": 12500,
    "originalFee": 13500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-534",
    "universityId": "u-istinye",
    "programId": "p-u-istinye-molecular-oncology",
    "language": "tr",
    "tuitionFee": 12500,
    "originalFee": 13750,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-535",
    "universityId": "u-istinye",
    "programId": "p-u-istinye-medical-biology-and-genetics",
    "language": "tr",
    "tuitionFee": 12500,
    "originalFee": 13750,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-536",
    "universityId": "u-istinye",
    "programId": "p-u-istinye-stem-cell-and-tissue-engineering",
    "language": "tr",
    "tuitionFee": 12500,
    "originalFee": 13750,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-537",
    "universityId": "u-istinye",
    "programId": "p-u-istinye-obstetrics-and-gynaecologic-nursing",
    "language": "tr",
    "tuitionFee": 12500,
    "originalFee": 13500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-538",
    "universityId": "u-istinye",
    "programId": "p-u-istinye-cancer-biology-and-pharmacology",
    "language": "tr",
    "tuitionFee": 8500,
    "originalFee": 9500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-539",
    "universityId": "u-istinye",
    "programId": "p-u-istinye-justice-ep",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-540",
    "universityId": "u-beykoz",
    "programId": "p-u-beykoz-big-data-analytics",
    "language": "tr",
    "tuitionFee": 1700,
    "originalFee": 3400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-541",
    "universityId": "u-beykoz",
    "programId": "p-u-beykoz-foreign-trade-distance-education",
    "language": "tr",
    "tuitionFee": 1700,
    "originalFee": 3400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-542",
    "universityId": "u-beykoz",
    "programId": "p-u-beykoz-logistics-distance-education",
    "language": "tr",
    "tuitionFee": 1700,
    "originalFee": 3400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-543",
    "universityId": "u-beykoz",
    "programId": "p-u-beykoz-rail-systems-management",
    "language": "tr",
    "tuitionFee": 1700,
    "originalFee": 3400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-544",
    "universityId": "u-beykoz",
    "programId": "p-u-beykoz-mba-distance-education",
    "language": "tr",
    "tuitionFee": 2100,
    "originalFee": 4200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-545",
    "universityId": "u-beykoz",
    "programId": "p-u-beykoz-international-trade-and-logistics-distance-education",
    "language": "tr",
    "tuitionFee": 2100,
    "originalFee": 4200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-546",
    "universityId": "u-beykoz",
    "programId": "p-u-beykoz-work-and-organizational-psychology",
    "language": "tr",
    "tuitionFee": 2600,
    "originalFee": 5200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-547",
    "universityId": "u-beykoz",
    "programId": "p-u-beykoz-visual-arts-and-visual-communication-design",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-548",
    "universityId": "u-beykoz",
    "programId": "p-u-beykoz-entrepreneurship-and-innovation-management",
    "language": "en",
    "tuitionFee": 3000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-549",
    "universityId": "u-beykoz",
    "programId": "p-u-beykoz-marketing-and-brand-management",
    "language": "en",
    "tuitionFee": 2600,
    "originalFee": 5200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-550",
    "universityId": "u-beykoz",
    "programId": "p-u-beykoz-technology-and-innovation-management",
    "language": "en",
    "tuitionFee": 3500,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-551",
    "universityId": "u-halic",
    "programId": "p-u-halic-opera-and-concert-singing",
    "language": "tr",
    "tuitionFee": 4000,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-552",
    "universityId": "u-halic",
    "programId": "p-u-halic-management-and-information-systems",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-553",
    "universityId": "u-halic",
    "programId": "p-u-halic-hospital-and-health-facilities-management",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-554",
    "universityId": "u-halic",
    "programId": "p-u-halic-electronics-and-communication-engineering",
    "language": "tr",
    "tuitionFee": 7500,
    "originalFee": 8500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-555",
    "universityId": "u-halic",
    "programId": "p-u-halic-computational-science-and-engineering",
    "language": "tr",
    "tuitionFee": 7500,
    "originalFee": 8500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-556",
    "universityId": "u-halic",
    "programId": "p-u-halic-applied-mathematics",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-557",
    "universityId": "u-istanbul-commerce",
    "programId": "p-u-istanbul-commerce-statistics",
    "language": "tr",
    "tuitionFee": 6000,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-558",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-directorship",
    "language": "tr",
    "tuitionFee": 4550,
    "originalFee": 5005,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-559",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-urbanization",
    "language": "tr",
    "tuitionFee": 5200,
    "originalFee": 5720,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-560",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-architectural-engineering",
    "language": "tr",
    "tuitionFee": 5200,
    "originalFee": 5720,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-561",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-structure",
    "language": "tr",
    "tuitionFee": 5200,
    "originalFee": 5720,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-562",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-geotechnics",
    "language": "tr",
    "tuitionFee": 3120,
    "originalFee": 4120,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-563",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-interior-architecture-and-enviromental-design",
    "language": "tr",
    "tuitionFee": 2275,
    "originalFee": 3275,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-564",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-educational-programs-and-teaching",
    "language": "tr",
    "tuitionFee": 2600,
    "originalFee": 3600,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-565",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-flight-operations-management",
    "language": "tr",
    "tuitionFee": 2250,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-566",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-aviation-logistics",
    "language": "tr",
    "tuitionFee": 2250,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-567",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-special-education-teacher",
    "language": "tr",
    "tuitionFee": 2975,
    "originalFee": 3975,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-568",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-geomatics",
    "language": "tr",
    "tuitionFee": 7800,
    "originalFee": 8800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-569",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-project-management",
    "language": "tr",
    "tuitionFee": 7800,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-570",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-monetary-and-capital-markets",
    "language": "tr",
    "tuitionFee": 5200,
    "originalFee": 5720,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-571",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-sports-law",
    "language": "tr",
    "tuitionFee": 4550,
    "originalFee": 5550,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-572",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-history-of-architecture-and-restoration",
    "language": "tr",
    "tuitionFee": 5200,
    "originalFee": 5720,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-573",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-construction-management-and-technology",
    "language": "tr",
    "tuitionFee": 2600,
    "originalFee": 3600,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-574",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-real-estate-development",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-575",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-geotechnical-engineering",
    "language": "tr",
    "tuitionFee": 2400,
    "originalFee": 3400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-576",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-enviromental-design",
    "language": "tr",
    "tuitionFee": 2600,
    "originalFee": 3600,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-577",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-innovation-management",
    "language": "tr",
    "tuitionFee": 5200,
    "originalFee": 5720,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-578",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-management-economics",
    "language": "tr",
    "tuitionFee": 4550,
    "originalFee": 5005,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-579",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-production-economics",
    "language": "tr",
    "tuitionFee": 4550,
    "originalFee": 5005,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-580",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-international-economics-and-finance",
    "language": "en",
    "tuitionFee": 5200,
    "originalFee": 5720,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-581",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-art-management",
    "language": "tr",
    "tuitionFee": 4550,
    "originalFee": 5005,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-582",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-quality-and-production-management",
    "language": "tr",
    "tuitionFee": 4550,
    "originalFee": 5005,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-583",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-communication-arts",
    "language": "tr",
    "tuitionFee": 5200,
    "originalFee": 5720,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-584",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-education-management-and-planning",
    "language": "tr",
    "tuitionFee": 2340,
    "originalFee": 3340,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-585",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-human-rights",
    "language": "tr",
    "tuitionFee": 5200,
    "originalFee": 5720,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-586",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-european-human-rights",
    "language": "tr",
    "tuitionFee": 5200,
    "originalFee": 6200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-587",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-mathematics-and-computer-science",
    "language": "tr",
    "tuitionFee": 5200,
    "originalFee": 5720,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-588",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-alternative-energy-sources",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 2600,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-589",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-air-conditioning-and-cooling",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 2600,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-590",
    "universityId": "u-istanbul-kultur",
    "programId": "p-u-istanbul-kultur-elementary-school-teacher-education",
    "language": "tr",
    "tuitionFee": 2975,
    "originalFee": 3975,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-591",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-finance-and-banking",
    "language": "en",
    "tuitionFee": 2500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-592",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-information-systems-technologies",
    "language": "tr",
    "tuitionFee": 2500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-593",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-russian-translation-and-interpreting",
    "language": "en",
    "tuitionFee": 2500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-594",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-cnc-programming-and-operation",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-595",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-environmental-measurement-and-monitoring-systems-technology",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-596",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-dental-prosthetic-technology",
    "language": "tr",
    "tuitionFee": 1900,
    "originalFee": 3800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-597",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-energy-plant-management",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-598",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-hybrid-and-electric-vehicles-technology",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-599",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-optometry",
    "language": "tr",
    "tuitionFee": 1900,
    "originalFee": 3800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-600",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-orthopaedic-prosthetics-and-orthotics",
    "language": "tr",
    "tuitionFee": 1900,
    "originalFee": 3800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-601",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-game-development-and-programming",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-602",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-water-and-waste-management-technician",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-603",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-textile-technology",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-604",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-tourism-and-travel-services",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-605",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-artificial-intelligence-operator",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-606",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-building-insulation-technology",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-607",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-earthquake-risky-structures-and-urban-transportation",
    "language": "tr",
    "tuitionFee": 2100,
    "originalFee": 3365,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-608",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-industrial-policy-and-technology-management",
    "language": "tr",
    "tuitionFee": 2100,
    "originalFee": 3365,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-609",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-hospital-and-health-institutions-management",
    "language": "tr",
    "tuitionFee": 2100,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-610",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-communication-arts-design",
    "language": "tr",
    "tuitionFee": 2100,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-611",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-media-and-communication-systems",
    "language": "tr",
    "tuitionFee": 2100,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-612",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-cinema-and-tv",
    "language": "tr",
    "tuitionFee": 2100,
    "originalFee": 3200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-613",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-human-resources-and-organizational-change",
    "language": "tr",
    "tuitionFee": 2100,
    "originalFee": 3365,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-614",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-architectural-design",
    "language": "tr",
    "tuitionFee": 1600,
    "originalFee": 2800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-615",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-health-institutions-management-distance-education",
    "language": "tr",
    "tuitionFee": 1400,
    "originalFee": 3365,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-616",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-management-information-systems-distance-education",
    "language": "tr",
    "tuitionFee": 1400,
    "originalFee": 3365,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-617",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-human-resources-and-organizational-change-distance-education",
    "language": "tr",
    "tuitionFee": 1400,
    "originalFee": 3365,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-618",
    "universityId": "u-istanbul-beykent",
    "programId": "p-u-istanbul-beykent-cinema-and-tv-arts-competency",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-619",
    "universityId": "u-ostim-technical",
    "programId": "p-u-ostim-technical-quality-control-in-production",
    "language": "tr",
    "tuitionFee": 2250,
    "originalFee": 2700,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-620",
    "universityId": "u-ostim-technical",
    "programId": "p-u-ostim-technical-international-business",
    "language": "en",
    "tuitionFee": 3400,
    "originalFee": 4080,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-621",
    "universityId": "u-ostim-technical",
    "programId": "p-u-ostim-technical-industrial-policies-and-technology-management",
    "language": "en",
    "tuitionFee": 4080,
    "originalFee": 8500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-622",
    "universityId": "u-ostim-technical",
    "programId": "p-u-ostim-technical-uav-technologies-and-operations",
    "language": "tr",
    "tuitionFee": 2700,
    "originalFee": 7500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-623",
    "universityId": "u-ostim-technical",
    "programId": "p-u-ostim-technical-weapons-industry-technician",
    "language": "tr",
    "tuitionFee": 2250,
    "originalFee": 2700,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-624",
    "universityId": "u-ostim-technical",
    "programId": "p-u-ostim-technical-hybrid-and-electric-vehicle-technology",
    "language": "tr",
    "tuitionFee": 2700,
    "originalFee": 7500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-625",
    "universityId": "u-ostim-technical",
    "programId": "p-u-ostim-technical-material-sciences-and-engineering",
    "language": "en",
    "tuitionFee": 3300,
    "originalFee": 4125,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-626",
    "universityId": "u-bezmi-alem",
    "programId": "p-u-bezmi-alem-orthopedic-prosthetics-and-orthotics",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-627",
    "universityId": "u-bezmi-alem",
    "programId": "p-u-bezmi-alem-aromatherapy",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-628",
    "universityId": "u-bezmi-alem",
    "programId": "p-u-bezmi-alem-analytical-chemistry",
    "language": "en",
    "tuitionFee": 4000,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-629",
    "universityId": "u-bezmi-alem",
    "programId": "p-u-bezmi-alem-experimental-and-applied-endocrinology",
    "language": "tr",
    "tuitionFee": 2000,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-630",
    "universityId": "u-bezmi-alem",
    "programId": "p-u-bezmi-alem-pharmacognosy-and-natural-products-chemistry",
    "language": "tr",
    "tuitionFee": 4000,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-631",
    "universityId": "u-bezmi-alem",
    "programId": "p-u-bezmi-alem-player-care-in-football",
    "language": "tr",
    "tuitionFee": 4000,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-632",
    "universityId": "u-bezmi-alem",
    "programId": "p-u-bezmi-alem-drug-discovery-and-development",
    "language": "en",
    "tuitionFee": 4000,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-633",
    "universityId": "u-bezmi-alem",
    "programId": "p-u-bezmi-alem-disaster-medicine",
    "language": "tr",
    "tuitionFee": 7500,
    "originalFee": 8500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-634",
    "universityId": "u-bezmi-alem",
    "programId": "p-u-bezmi-alem-cardiopulmonary-physiotherapy-and-rehabilitation",
    "language": "tr",
    "tuitionFee": 7500,
    "originalFee": 8500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-635",
    "universityId": "u-bezmi-alem",
    "programId": "p-u-bezmi-alem-medical-biochemistry",
    "language": "tr",
    "tuitionFee": 7500,
    "originalFee": 8500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-636",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-primary-school-teaching",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-637",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-arabic-language-teaching",
    "language": "ar",
    "tuitionFee": 3500,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-638",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-music-teaching",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-639",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-islamic-sciences",
    "language": "ar",
    "tuitionFee": 3500,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-640",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-islamic-economics-and-finance",
    "language": "en",
    "tuitionFee": 3500,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-641",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-electrical-electronics-engineering",
    "language": "en",
    "tuitionFee": 3500,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-642",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-family-counseling-and-education",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-643",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-computer-science-and-engineering",
    "language": "en",
    "tuitionFee": 6300,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-644",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-big-data-and-business-analytics",
    "language": "tr",
    "tuitionFee": 6300,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-645",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-communication-and-proclamation-in-religious-services",
    "language": "tr",
    "tuitionFee": 6300,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-646",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-education-management",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-647",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-philosophy-and-religious-sciences",
    "language": "tr",
    "tuitionFee": 6300,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-648",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-food-nutrition",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-649",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-internal-medicine-nursing",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-650",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-islamic-economics-and-law",
    "language": "ar",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-651",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-islamic-history-and-arts",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-652",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-urban-studies-and-management",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-653",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-spiritual-counseling-and-guidance",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-654",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-history-and-civilization-studies",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-655",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-fundamental-islamic-sciences",
    "language": "tr",
    "tuitionFee": 6300,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-656",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-international-finance-and-participation-banking",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-657",
    "universityId": "u-istanbul-sabahattin-zaim",
    "programId": "p-u-istanbul-sabahattin-zaim-urbanism-and-urban-transformation",
    "language": "tr",
    "tuitionFee": 12000,
    "originalFee": 13200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-658",
    "universityId": "u-biruni",
    "programId": "p-u-biruni-robotics-and-artificial-intelligence",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-659",
    "universityId": "u-biruni",
    "programId": "p-u-biruni-disaster-and-emergency-management",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-660",
    "universityId": "u-biruni",
    "programId": "p-u-biruni-software-development-program",
    "language": "tr",
    "tuitionFee": 3600,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-661",
    "universityId": "u-biruni",
    "programId": "p-u-biruni-biostatistics",
    "language": "tr",
    "tuitionFee": 4000,
    "originalFee": 4400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-662",
    "universityId": "u-biruni",
    "programId": "p-u-biruni-molecular-and-medical-genetics",
    "language": "en",
    "tuitionFee": 6000,
    "originalFee": 6600,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-663",
    "universityId": "u-biruni",
    "programId": "p-u-biruni-pharmaceutical-design-and-development",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-664",
    "universityId": "u-biruni",
    "programId": "p-u-biruni-pharmaceuticals-technology",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-665",
    "universityId": "u-biruni",
    "programId": "p-u-biruni-obstetrics-and-gynecology-nursing",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-666",
    "universityId": "u-biruni",
    "programId": "p-u-biruni-endodontics",
    "language": "tr",
    "tuitionFee": 10000,
    "originalFee": 11000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-667",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-teacher-training-in-arabic",
    "language": "ar",
    "tuitionFee": 5000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-668",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-teacher-training-in-mathematics-at-primary-school-level",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-669",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-teacher-training-in-english",
    "language": "en",
    "tuitionFee": 5000,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-670",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-teacher-training-at-pre-school-level",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-671",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-guidance-and-psychology-counseling",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-672",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-teacher-training-at-primary-school-level",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-673",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-teacher-training-in-turkish",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-674",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-digital-gaming-design",
    "language": "en",
    "tuitionFee": 5000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-675",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-drama-and-acting",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-676",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-television-news-and-programming",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-677",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-printing-and-publication-technologies",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 3300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-678",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-jewelry-and-jewelry-design",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-679",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-hair-care-beauty-services",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-680",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-tourist-guide",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-681",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-air-logistics",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 3300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-682",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-construction-inspection",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 3300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-683",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-local-administrations",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 3300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-684",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-operation-room-services",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-685",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-perfusion-techniques",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 3300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-686",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-arabic-language-training",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-687",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-international-economy",
    "language": "en",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-688",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-e-business-management",
    "language": "tr",
    "tuitionFee": 8000,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-689",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-digital-marketing",
    "language": "tr",
    "tuitionFee": 8000,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-690",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-business-management-for-business-manager",
    "language": "en",
    "tuitionFee": 8000,
    "originalFee": 8800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-691",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-quality-management-and-quality-assurance-systems",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-692",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-measurement-and-evaluation-in-education",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 10000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-693",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-educational-technology-and-educational-design",
    "language": "tr",
    "tuitionFee": 8000,
    "originalFee": 8800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-694",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-visual-arts",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-695",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-public-relations-and-publicity",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-696",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-elementary-education",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-697",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-psychological-counseling-and-guidance",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 10000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-698",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-local-governments-and-decentralization",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 10000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-699",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-international-relations-and-intelligence-studies",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-700",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-international-relations-and-terrorism-researches",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 10000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-701",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-television-and-film",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-702",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-energy-technologies",
    "language": "en",
    "tuitionFee": 12000,
    "originalFee": 13200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-703",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-food-safety",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-704",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-earthquake-and-structural-engineering",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-705",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-civil-engineering-construction-and-project-management",
    "language": "tr",
    "tuitionFee": 8000,
    "originalFee": 8800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-706",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-urban-renewal",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-707",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-artificial-intelligence-and-data-science",
    "language": "en",
    "tuitionFee": 12000,
    "originalFee": 13200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-708",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-surgical-diseases-nursing",
    "language": "tr",
    "tuitionFee": 10000,
    "originalFee": 11000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-709",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-athlete-nutrition",
    "language": "tr",
    "tuitionFee": 10000,
    "originalFee": 11000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-710",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-social-service",
    "language": "tr",
    "tuitionFee": 10000,
    "originalFee": 11000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-711",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-health-physics",
    "language": "tr",
    "tuitionFee": 10000,
    "originalFee": 11000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-712",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-medical-pharmacology",
    "language": "tr",
    "tuitionFee": 10000,
    "originalFee": 11000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-713",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-graphic-design-art-qualification",
    "language": "tr",
    "tuitionFee": 12000,
    "originalFee": 13200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-714",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-television-and-cinema",
    "language": "tr",
    "tuitionFee": 12000,
    "originalFee": 13200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-715",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-mouth-teeth-and-jaw-surgery",
    "language": "tr",
    "tuitionFee": 20000,
    "originalFee": 22000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-716",
    "universityId": "u-istanbul-aydin",
    "programId": "p-u-istanbul-aydin-prosthodontics",
    "language": "tr",
    "tuitionFee": 20000,
    "originalFee": 22000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-717",
    "universityId": "u-istanbul-atlas",
    "programId": "p-u-istanbul-atlas-surgical-services",
    "language": "tr",
    "tuitionFee": 2465,
    "originalFee": 2900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-718",
    "universityId": "u-istanbul-atlas",
    "programId": "p-u-istanbul-atlas-telehealth-technician",
    "language": "tr",
    "tuitionFee": 2610,
    "originalFee": 2900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-719",
    "universityId": "u-istanbul-atlas",
    "programId": "p-u-istanbul-atlas-cognitive-rehabilitation",
    "language": "tr",
    "tuitionFee": 4766,
    "originalFee": 5295,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-720",
    "universityId": "u-istanbul-atlas",
    "programId": "p-u-istanbul-atlas-technology-and-inovasion",
    "language": "en",
    "tuitionFee": 4500,
    "originalFee": 5295,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-721",
    "universityId": "u-istanbul-atlas",
    "programId": "p-u-istanbul-atlas-artificial-intelligence-and-smart-systems",
    "language": "en",
    "tuitionFee": 4995,
    "originalFee": 5550,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-722",
    "universityId": "u-istanbul-arel",
    "programId": "p-u-istanbul-arel-office-management-and-executive-assistance",
    "language": "tr",
    "tuitionFee": 2600,
    "originalFee": 2860,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-723",
    "universityId": "u-istanbul-arel",
    "programId": "p-u-istanbul-arel-urban-systems-engineering",
    "language": "tr",
    "tuitionFee": 3200,
    "originalFee": 3700,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-724",
    "universityId": "u-yasar",
    "programId": "p-u-yasar-agricultural-machinery-and-technologies-engineering",
    "language": "en",
    "tuitionFee": 2000,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-725",
    "universityId": "u-yasar",
    "programId": "p-u-yasar-agricultural-economics",
    "language": "en",
    "tuitionFee": 2000,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-726",
    "universityId": "u-yasar",
    "programId": "p-u-yasar-proficiency-in-art",
    "language": "en",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-727",
    "universityId": "u-yasar",
    "programId": "p-u-yasar-agricultural-trade-and-management",
    "language": "tr",
    "tuitionFee": 7200,
    "originalFee": 8200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-728",
    "universityId": "u-yasar",
    "programId": "p-u-yasar-culture-and-arts-administration",
    "language": "en",
    "tuitionFee": 7200,
    "originalFee": 8200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-729",
    "universityId": "u-yasar",
    "programId": "p-u-yasar-international-logistics-management",
    "language": "en",
    "tuitionFee": 4000,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-730",
    "universityId": "u-yasar",
    "programId": "p-u-yasar-business-engineering",
    "language": "en",
    "tuitionFee": 7200,
    "originalFee": 8200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-731",
    "universityId": "u-yasar",
    "programId": "p-u-yasar-logistics-engineering",
    "language": "en",
    "tuitionFee": 7200,
    "originalFee": 8200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-732",
    "universityId": "u-yasar",
    "programId": "p-u-yasar-business-administration-mba-distance-education",
    "language": "tr",
    "tuitionFee": 7200,
    "originalFee": 8200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-733",
    "universityId": "u-yasar",
    "programId": "p-u-yasar-music-and-performance-arts",
    "language": "en",
    "tuitionFee": 7200,
    "originalFee": 8200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-734",
    "universityId": "u-cag",
    "programId": "p-u-cag-healthcare-institutions-management",
    "language": "tr",
    "tuitionFee": 4761,
    "originalFee": 9523,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-735",
    "universityId": "u-cag",
    "programId": "p-u-cag-international-relations-and-globalization",
    "language": "tr",
    "tuitionFee": 4761,
    "originalFee": 9523,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-736",
    "universityId": "u-cag",
    "programId": "p-u-cag-healthcare-administration",
    "language": "tr",
    "tuitionFee": 4761,
    "originalFee": 9523,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-737",
    "universityId": "u-istanbul-gelisim",
    "programId": "p-u-istanbul-gelisim-e-commerce-and-management",
    "language": "tr",
    "tuitionFee": 4000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-738",
    "universityId": "u-istanbul-gelisim",
    "programId": "p-u-istanbul-gelisim-aircraft-engineering",
    "language": "tr",
    "tuitionFee": 6000,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-739",
    "universityId": "u-istanbul-gelisim",
    "programId": "p-u-istanbul-gelisim-pastry-and-bakery",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 3300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-740",
    "universityId": "u-istanbul-gelisim",
    "programId": "p-u-istanbul-gelisim-exercise-and-training-sciences",
    "language": "tr",
    "tuitionFee": 6000,
    "originalFee": 6600,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-741",
    "universityId": "u-istanbul-gelisim",
    "programId": "p-u-istanbul-gelisim-international-logistics-and-transportation",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-742",
    "universityId": "u-istanbul-gelisim",
    "programId": "p-u-istanbul-gelisim-psychosocial-fields-of-sports",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-743",
    "universityId": "u-istanbul-gelisim",
    "programId": "p-u-istanbul-gelisim-addiction-psychology",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 9900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-744",
    "universityId": "u-istanbul-gelisim",
    "programId": "p-u-istanbul-gelisim-flight-operation-management",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-745",
    "universityId": "u-istanbul-gelisim",
    "programId": "p-u-istanbul-gelisim-security-studies",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-746",
    "universityId": "u-istanbul-gelisim",
    "programId": "p-u-istanbul-gelisim-television-reporting-and-programming",
    "language": "tr",
    "tuitionFee": 4000,
    "originalFee": 4400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-747",
    "universityId": "u-istanbul-gelisim",
    "programId": "p-u-istanbul-gelisim-exercise-and-sport-for-disabled",
    "language": "tr",
    "tuitionFee": 4000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-748",
    "universityId": "u-istanbul-gelisim",
    "programId": "p-u-istanbul-gelisim-aeronautical-engineering",
    "language": "en",
    "tuitionFee": 4500,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-749",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-basic-islamic-sciences",
    "language": "ar",
    "tuitionFee": 6000,
    "originalFee": 6600,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-750",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-architectureitecture",
    "language": "en",
    "tuitionFee": 3500,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-751",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-ai-and-data-engineering",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-752",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-turkish-language-teaching-for-foreigners",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-753",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-traditional-turkish-arts",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 3300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-754",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-psychological-counseling-guidance",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-755",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-preschool-education",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 3300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-756",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-interior-architectureitecture",
    "language": "en",
    "tuitionFee": 3000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-757",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-history-of-science",
    "language": "en",
    "tuitionFee": 3000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-758",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-cultural-heritage-conservation-management",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-759",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-architectureitectural-conservation-and-restoration",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-760",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-arabic-language-teaching-fatih-sultan-mehmet-university",
    "language": "ar",
    "tuitionFee": 3000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-761",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-psychological-counseling-guidance-fatih-sultan-mehmet-university",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-762",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-history-of-science-in-islam",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-763",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-islamic-science",
    "language": "ar",
    "tuitionFee": 6000,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-764",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-architectureitectural-restoration",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-765",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-shadow-education-for-special-needs",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-766",
    "universityId": "u-fatih-sultan-mehmet",
    "programId": "p-u-fatih-sultan-mehmet-packaging-arts",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-767",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-translation-and-interpreting-studies",
    "language": "en",
    "tuitionFee": 10000,
    "originalFee": 20000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-768",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-russian-language-and-literature",
    "language": "ru",
    "tuitionFee": 8000,
    "originalFee": 16000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-769",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-international-management",
    "language": "en",
    "tuitionFee": 18000,
    "originalFee": 19000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-770",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-european-studies",
    "language": "en",
    "tuitionFee": 8750,
    "originalFee": 9750,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-771",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-plastic-arts-and-painting",
    "language": "en",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-772",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-modern-turkish-literature",
    "language": "en",
    "tuitionFee": 10000,
    "originalFee": 11000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-773",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-local-authorities-and-governance",
    "language": "en",
    "tuitionFee": 8750,
    "originalFee": 9750,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-774",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-agribusiness-and-management",
    "language": "en",
    "tuitionFee": 8750,
    "originalFee": 9750,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-775",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-media-and-communication-management",
    "language": "en",
    "tuitionFee": 8750,
    "originalFee": 9750,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-776",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-comparative-literature",
    "language": "en",
    "tuitionFee": 8000,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-777",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-interaction-design",
    "language": "en",
    "tuitionFee": 9500,
    "originalFee": 10500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-778",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-cognitive-sciences",
    "language": "en",
    "tuitionFee": 8000,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-779",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-biological-anthropology",
    "language": "en",
    "tuitionFee": 8000,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-780",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-animation-design",
    "language": "en",
    "tuitionFee": 9500,
    "originalFee": 10500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-781",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-dentomaxillofacial-radiology",
    "language": "en",
    "tuitionFee": 25000,
    "originalFee": 26000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-782",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-oral-implantology",
    "language": "en",
    "tuitionFee": 30250,
    "originalFee": 31250,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-783",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-physiopathology",
    "language": "en",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-784",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-pharmaceutical-toxicology",
    "language": "en",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-785",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-pharmacognosy",
    "language": "en",
    "tuitionFee": 14000,
    "originalFee": 15000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-786",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-drug-and-cosmetic-production-technologies",
    "language": "en",
    "tuitionFee": 8000,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-787",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-cosmetology",
    "language": "en",
    "tuitionFee": 8000,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-788",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-phytotheraphy",
    "language": "en",
    "tuitionFee": 8000,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-789",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-pharmacoeconomics-and-pharmacoepidemiology",
    "language": "en",
    "tuitionFee": 8000,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-790",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-myology",
    "language": "en",
    "tuitionFee": 9000,
    "originalFee": 10000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-791",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-medical-physics",
    "language": "en",
    "tuitionFee": 9000,
    "originalFee": 10000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-792",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-medical-microbiolog",
    "language": "en",
    "tuitionFee": 9000,
    "originalFee": 10000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-793",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-healthcare-management-in-emergencies-and-natural-disaster",
    "language": "en",
    "tuitionFee": 6000,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-794",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-materials-science-and-nanotechnology-engineering",
    "language": "en",
    "tuitionFee": 25000,
    "originalFee": 26000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-795",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-industrial-and-systems-engineering",
    "language": "en",
    "tuitionFee": 25000,
    "originalFee": 26000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-796",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-sustainable-built-environment",
    "language": "en",
    "tuitionFee": 13500,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-797",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-design-and-innovation-for-sustainable-food-systems",
    "language": "en",
    "tuitionFee": 13500,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-798",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-sustainable-energy",
    "language": "en",
    "tuitionFee": 13500,
    "originalFee": 14500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-799",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-educational-economy-and-planning",
    "language": "en",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-800",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-information-technologies-and-social-media-education",
    "language": "en",
    "tuitionFee": 12000,
    "originalFee": 13000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-801",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-customs-management",
    "language": "en",
    "tuitionFee": 4675,
    "originalFee": 9350,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-802",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-real-estate-development-and-management",
    "language": "en",
    "tuitionFee": 4675,
    "originalFee": 9350,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-803",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-international-transportation-systems",
    "language": "en",
    "tuitionFee": 5775,
    "originalFee": 11550,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-804",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-advertisement-design-and-communication",
    "language": "en",
    "tuitionFee": 9000,
    "originalFee": 18000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-805",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-radio-television-and-film-studies",
    "language": "en",
    "tuitionFee": 9000,
    "originalFee": 18000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-806",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-arts-and-culture-management",
    "language": "en",
    "tuitionFee": 8000,
    "originalFee": 16000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-807",
    "universityId": "u-yeditepe",
    "programId": "p-u-yeditepe-mathematics-teaching-for-elementary-schools",
    "language": "en",
    "tuitionFee": 8000,
    "originalFee": 16000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-808",
    "universityId": "u-cappadocia",
    "programId": "p-u-cappadocia-artificial-intelligence-and-machine-learning",
    "language": "tr",
    "tuitionFee": 7857,
    "originalFee": 8857,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-809",
    "universityId": "u-cappadocia",
    "programId": "p-u-cappadocia-urban-and-regional-planning",
    "language": "tr",
    "tuitionFee": 5893,
    "originalFee": 6893,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-810",
    "universityId": "u-cappadocia",
    "programId": "p-u-cappadocia-aircraft-fuselage-and-engine-maintenance",
    "language": "tr",
    "tuitionFee": 8839,
    "originalFee": 9839,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-811",
    "universityId": "u-cappadocia",
    "programId": "p-u-cappadocia-computer-science-distance-learning",
    "language": "tr",
    "tuitionFee": 3536,
    "originalFee": 4536,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-812",
    "universityId": "u-cappadocia",
    "programId": "p-u-cappadocia-computer-security-technology",
    "language": "tr",
    "tuitionFee": 5238,
    "originalFee": 6238,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-813",
    "universityId": "u-cappadocia",
    "programId": "p-u-cappadocia-cloud-computing-operation",
    "language": "tr",
    "tuitionFee": 5238,
    "originalFee": 6238,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-814",
    "universityId": "u-cappadocia",
    "programId": "p-u-cappadocia-penal-enforcement-and-security-services",
    "language": "tr",
    "tuitionFee": 5500,
    "originalFee": 6500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-815",
    "universityId": "u-cappadocia",
    "programId": "p-u-cappadocia-digital-transformation-electronics",
    "language": "tr",
    "tuitionFee": 5238,
    "originalFee": 6238,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-816",
    "universityId": "u-cappadocia",
    "programId": "p-u-cappadocia-corporate-it-expertise",
    "language": "tr",
    "tuitionFee": 5238,
    "originalFee": 6238,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-817",
    "universityId": "u-cappadocia",
    "programId": "p-u-cappadocia-autonomous-systems-technician",
    "language": "tr",
    "tuitionFee": 5238,
    "originalFee": 6238,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-818",
    "universityId": "u-cappadocia",
    "programId": "p-u-cappadocia-tourist-guide-distance-learning",
    "language": "tr",
    "tuitionFee": 4272,
    "originalFee": 5272,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-819",
    "universityId": "u-cappadocia",
    "programId": "p-u-cappadocia-city-environment-and-local-governments",
    "language": "tr",
    "tuitionFee": 1937,
    "originalFee": 2937,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-820",
    "universityId": "u-cappadocia",
    "programId": "p-u-cappadocia-cultural-studies",
    "language": "tr",
    "tuitionFee": 1937,
    "originalFee": 2937,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-821",
    "universityId": "u-cappadocia",
    "programId": "p-u-cappadocia-sustainable-tourism-management",
    "language": "tr",
    "tuitionFee": 1937,
    "originalFee": 2937,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-822",
    "universityId": "u-hasan-kalyoncu",
    "programId": "p-u-hasan-kalyoncu-economy-finance",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-823",
    "universityId": "u-isik",
    "programId": "p-u-isik-opticianry-ep",
    "language": "tr",
    "tuitionFee": 1400,
    "originalFee": 1800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-824",
    "universityId": "u-isik",
    "programId": "p-u-isik-science-of-art",
    "language": "tr",
    "tuitionFee": 11400,
    "originalFee": 22800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-825",
    "universityId": "u-isik",
    "programId": "p-u-isik-electronics-engineering",
    "language": "en",
    "tuitionFee": 7500,
    "originalFee": 11400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-826",
    "universityId": "u-isik",
    "programId": "p-u-isik-contemporary-business",
    "language": "en",
    "tuitionFee": 7500,
    "originalFee": 11400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-827",
    "universityId": "u-isik",
    "programId": "p-u-isik-contemporary-engineering",
    "language": "en",
    "tuitionFee": 11400,
    "originalFee": 22800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-828",
    "universityId": "u-isik",
    "programId": "p-u-isik-executive-business-administration",
    "language": "en",
    "tuitionFee": 3500,
    "originalFee": 5700,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-829",
    "universityId": "u-bilkent",
    "programId": "p-u-bilkent-fine-arts",
    "language": "en",
    "tuitionFee": 17600,
    "originalFee": 19100,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-830",
    "universityId": "u-bilkent",
    "programId": "p-u-bilkent-archaeology",
    "language": "en",
    "tuitionFee": 17600,
    "originalFee": 19100,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-831",
    "universityId": "u-bilkent",
    "programId": "p-u-bilkent-conference-interpreting",
    "language": "en",
    "tuitionFee": 17600,
    "originalFee": 19100,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-832",
    "universityId": "u-bilkent",
    "programId": "p-u-bilkent-media-and-design",
    "language": "en",
    "tuitionFee": 17600,
    "originalFee": 19100,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-833",
    "universityId": "u-bilkent",
    "programId": "p-u-bilkent-media-and-visual-studies",
    "language": "en",
    "tuitionFee": 17600,
    "originalFee": 19100,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-834",
    "universityId": "u-bilkent",
    "programId": "p-u-bilkent-turkish-literature",
    "language": "en",
    "tuitionFee": 17600,
    "originalFee": 19100,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-835",
    "universityId": "u-bilkent",
    "programId": "p-u-bilkent-curriculum-and-instruction-with-ib-teaching-and-learning",
    "language": "en",
    "tuitionFee": 17600,
    "originalFee": 19100,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-836",
    "universityId": "u-bilkent",
    "programId": "p-u-bilkent-teaching-english-as-a-foreign-language",
    "language": "en",
    "tuitionFee": 17600,
    "originalFee": 19100,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-837",
    "universityId": "u-bilkent",
    "programId": "p-u-bilkent-materials-science-and-nanotechnology",
    "language": "en",
    "tuitionFee": 17600,
    "originalFee": 19100,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-838",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-geomatics-engineering",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 5500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-839",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-flight-training-pilotage",
    "language": "en",
    "tuitionFee": 7600,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-840",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-textile-and-fashion-design",
    "language": "tr",
    "tuitionFee": 4275,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-841",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-chinese-translation-and-interpreting",
    "language": "en",
    "tuitionFee": 4275,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-842",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-theater",
    "language": "tr",
    "tuitionFee": 4275,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-843",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-accounting-and-auditing-distance-education",
    "language": "tr",
    "tuitionFee": 3325,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-844",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-advanced-electronics-and-communication-technology",
    "language": "en",
    "tuitionFee": 6000,
    "originalFee": 6600,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-845",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-aesthetic-restorative",
    "language": "tr",
    "tuitionFee": 4275,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-846",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-automotive-mechatronics-and-intelligent-vehicles",
    "language": "en",
    "tuitionFee": 6000,
    "originalFee": 6600,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-847",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-banking",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 4950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-848",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-banking-distance-education",
    "language": "tr",
    "tuitionFee": 3325,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-849",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-child-development-and-education",
    "language": "tr",
    "tuitionFee": 4275,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-850",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-economy-law",
    "language": "tr",
    "tuitionFee": 4275,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-851",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-explosives-engineering",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 4950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-852",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-international-logistics",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 4950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-853",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-logistics-management-distance-education",
    "language": "tr",
    "tuitionFee": 3325,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-854",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-oral-and-maxillofacial-radiology",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 4950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-855",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-power-electronics-and-clean-energy-systems",
    "language": "en",
    "tuitionFee": 6000,
    "originalFee": 6600,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-856",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-quality-management-in-healthcare",
    "language": "tr",
    "tuitionFee": 4275,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-857",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-real-estate-finance-and-valuation-distance-education",
    "language": "tr",
    "tuitionFee": 3325,
    "originalFee": 3500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-858",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-sales-and-marketing",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 4950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-859",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-social-and-cultural-studies",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 4950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-860",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-sports-physiology",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 4950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-861",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-tourism-and-hospitality",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 4950,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-862",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-land-planning-and-management",
    "language": "tr",
    "tuitionFee": 7000,
    "originalFee": 7700,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-863",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-smart-infrastructure-technology",
    "language": "tr",
    "tuitionFee": 2250,
    "originalFee": 2475,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-864",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-natural-gas-and-installation-technology",
    "language": "tr",
    "tuitionFee": 2250,
    "originalFee": 2475,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-865",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-heating-ventilation-and-air-conditioning-technology",
    "language": "tr",
    "tuitionFee": 2025,
    "originalFee": 3025,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-866",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-construction-equipment-operations",
    "language": "tr",
    "tuitionFee": 2250,
    "originalFee": 2475,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-867",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-artificial-intelligence-operation",
    "language": "tr",
    "tuitionFee": 2250,
    "originalFee": 2475,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-868",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-surveying-and-cadaster",
    "language": "tr",
    "tuitionFee": 2250,
    "originalFee": 3250,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-869",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-mobile-technology",
    "language": "tr",
    "tuitionFee": 2250,
    "originalFee": 3250,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-870",
    "universityId": "u-istanbul-okan",
    "programId": "p-u-istanbul-okan-mechanical",
    "language": "tr",
    "tuitionFee": 2250,
    "originalFee": 3250,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-871",
    "universityId": "u-kadir-has",
    "programId": "p-u-kadir-has-gender-studies",
    "language": "en",
    "tuitionFee": 15000,
    "originalFee": 30000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-872",
    "universityId": "u-kadir-has",
    "programId": "p-u-kadir-has-user-experience-design",
    "language": "en",
    "tuitionFee": 15000,
    "originalFee": 30000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-873",
    "universityId": "u-kadir-has",
    "programId": "p-u-kadir-has-business-intelligence-and-analytic",
    "language": "en",
    "tuitionFee": 15000,
    "originalFee": 30000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-874",
    "universityId": "u-kadir-has",
    "programId": "p-u-kadir-has-design",
    "language": "en",
    "tuitionFee": 15000,
    "originalFee": 30000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-875",
    "universityId": "u-kadir-has",
    "programId": "p-u-kadir-has-international-political-economy",
    "language": "en",
    "tuitionFee": 15000,
    "originalFee": 30000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-876",
    "universityId": "u-ibn-haldun",
    "programId": "p-u-ibn-haldun-civilization-studies",
    "language": "tr",
    "tuitionFee": 5600,
    "originalFee": 32000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-877",
    "universityId": "u-ibn-haldun",
    "programId": "p-u-ibn-haldun-artificial-intelligence-technologies-in-education",
    "language": "tr",
    "tuitionFee": 5600,
    "originalFee": 32000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-878",
    "universityId": "u-ibn-haldun",
    "programId": "p-u-ibn-haldun-middle-east-studies",
    "language": "en",
    "tuitionFee": 5600,
    "originalFee": 32000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-879",
    "universityId": "u-ibn-haldun",
    "programId": "p-u-ibn-haldun-air-transport-management",
    "language": "en",
    "tuitionFee": 18200,
    "originalFee": 20020,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-880",
    "universityId": "u-ibn-haldun",
    "programId": "p-u-ibn-haldun-international-and-comparative-law",
    "language": "tr",
    "tuitionFee": 7280,
    "originalFee": 20800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-881",
    "universityId": "u-ibn-haldun",
    "programId": "p-u-ibn-haldun-philosophical-social-and-historical-foundations-of-education",
    "language": "en",
    "tuitionFee": 5600,
    "originalFee": 32000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-882",
    "universityId": "u-ibn-haldun",
    "programId": "p-u-ibn-haldun-religious-studies",
    "language": "en",
    "tuitionFee": 5600,
    "originalFee": 32000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-883",
    "universityId": "u-ibn-haldun",
    "programId": "p-u-ibn-haldun-psychological-guidance-and-counselling",
    "language": "en",
    "tuitionFee": 5600,
    "originalFee": 32000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-884",
    "universityId": "u-ibn-haldun",
    "programId": "p-u-ibn-haldun-turkish-studies",
    "language": "en",
    "tuitionFee": 7280,
    "originalFee": 20800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-885",
    "universityId": "u-istanbul-galata",
    "programId": "p-u-istanbul-galata-media-and-communication-studies",
    "language": "tr",
    "tuitionFee": 2250,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-886",
    "universityId": "u-istanbul-galata",
    "programId": "p-u-istanbul-galata-front-end-software-development",
    "language": "tr",
    "tuitionFee": 1700,
    "originalFee": 3000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-887",
    "universityId": "u-istanbul-galata",
    "programId": "p-u-istanbul-galata-interior-design-and-environmental-design",
    "language": "tr",
    "tuitionFee": 2250,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-888",
    "universityId": "u-tobb-university-of-economics-and-technology",
    "programId": "p-u-tobb-university-of-economics-and-technology-material-science-and-nanotechnology-engineering",
    "language": "en",
    "tuitionFee": 8250,
    "originalFee": 16500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-889",
    "universityId": "u-tobb-university-of-economics-and-technology",
    "programId": "p-u-tobb-university-of-economics-and-technology-international-entrepreneurship",
    "language": "en",
    "tuitionFee": 8250,
    "originalFee": 16500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-890",
    "universityId": "u-tobb-university-of-economics-and-technology",
    "programId": "p-u-tobb-university-of-economics-and-technology-micro-and-nanotechnology-engineering",
    "language": "en",
    "tuitionFee": 8250,
    "originalFee": 16500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-891",
    "universityId": "u-izmir-kavram-vocational-school",
    "programId": "p-u-izmir-kavram-vocational-school-environmental-health-and-environmental-risk-management-technician",
    "language": "tr",
    "tuitionFee": 5941,
    "originalFee": 6941,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-892",
    "universityId": "u-izmir-kavram-vocational-school",
    "programId": "p-u-izmir-kavram-vocational-school-welding-technology",
    "language": "tr",
    "tuitionFee": 5941,
    "originalFee": 6941,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-893",
    "universityId": "u-izmir-kavram-vocational-school",
    "programId": "p-u-izmir-kavram-vocational-school-medical-documentation-and-secretarial-services",
    "language": "tr",
    "tuitionFee": 4308,
    "originalFee": 5308,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-894",
    "universityId": "u-izmir-econ",
    "programId": "p-u-izmir-econ-legal-office-management-and-secretariat",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-895",
    "universityId": "u-izmir-econ",
    "programId": "p-u-izmir-econ-civil-aviation-transport-management",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-896",
    "universityId": "u-izmir-econ",
    "programId": "p-u-izmir-econ-paramedic",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-897",
    "universityId": "u-izmir-econ",
    "programId": "p-u-izmir-econ-gastronomy-and-cultural-arts",
    "language": "en",
    "tuitionFee": 5000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-898",
    "universityId": "u-izmir-econ",
    "programId": "p-u-izmir-econ-physical",
    "language": "en",
    "tuitionFee": 11500,
    "originalFee": 12500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-899",
    "universityId": "u-izmir-econ",
    "programId": "p-u-izmir-econ-maths",
    "language": "en",
    "tuitionFee": 11500,
    "originalFee": 12500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-900",
    "universityId": "u-izmir-econ",
    "programId": "p-u-izmir-econ-surgical-nursing",
    "language": "tr",
    "tuitionFee": 11500,
    "originalFee": 12500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-901",
    "universityId": "u-izmir-econ",
    "programId": "p-u-izmir-econ-experimental-psychology",
    "language": "en",
    "tuitionFee": 11500,
    "originalFee": 12500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-902",
    "universityId": "u-izmir-econ",
    "programId": "p-u-izmir-econ-healthcare-quality-and-patient-safety",
    "language": "tr",
    "tuitionFee": 11500,
    "originalFee": 12500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-903",
    "universityId": "u-izmir-econ",
    "programId": "p-u-izmir-econ-design-studies",
    "language": "en",
    "tuitionFee": 11500,
    "originalFee": 12500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-904",
    "universityId": "u-izmir-econ",
    "programId": "p-u-izmir-econ-business-administration-distance-education-e-mba",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 10000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-905",
    "universityId": "u-izmir-econ",
    "programId": "p-u-izmir-econ-brand-communication",
    "language": "tr",
    "tuitionFee": 9000,
    "originalFee": 10000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-906",
    "universityId": "u-izmir-econ",
    "programId": "p-u-izmir-econ-marketing-communications-and-public-relations",
    "language": "en",
    "tuitionFee": 9000,
    "originalFee": 10000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-907",
    "universityId": "u-toros",
    "programId": "p-u-toros-electrical-electronics-engineering-toros-university",
    "language": "tr",
    "tuitionFee": 5986,
    "originalFee": 11971,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-908",
    "universityId": "u-toros",
    "programId": "p-u-toros-computering",
    "language": "tr",
    "tuitionFee": 6530,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-909",
    "universityId": "u-maltepe",
    "programId": "p-u-maltepe-ship-and-yacht-design",
    "language": "tr",
    "tuitionFee": 6000,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-910",
    "universityId": "u-maltepe",
    "programId": "p-u-maltepe-bow-instruments",
    "language": "tr",
    "tuitionFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": false
  },
  {
    "id": "up-911",
    "universityId": "u-lokman-hekim",
    "programId": "p-u-lokman-hekim-coaching",
    "language": "tr",
    "tuitionFee": 4000,
    "originalFee": 4400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-912",
    "universityId": "u-demiroglu-bilim",
    "programId": "p-u-demiroglu-bilim-telehealth",
    "language": "tr",
    "tuitionFee": 4153,
    "originalFee": 5153,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-913",
    "universityId": "u-demiroglu-bilim",
    "programId": "p-u-demiroglu-bilim-medical-documentation-and-secreterial-services",
    "language": "tr",
    "tuitionFee": 4153,
    "originalFee": 5153,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-914",
    "universityId": "u-istanbul-vocational-school-of-health-and-social-sciences",
    "programId": "p-u-istanbul-vocational-school-of-health-and-social-sciences-medical-laboratory-technician",
    "language": "tr",
    "tuitionFee": 3500,
    "originalFee": 4500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-915",
    "universityId": "u-istanbul-sisli-vocational-school",
    "programId": "p-u-istanbul-sisli-vocational-school-civil-aviation-and-cabin-services",
    "language": "en",
    "tuitionFee": 1787,
    "originalFee": 3575,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-916",
    "universityId": "u-istanbul-29-mayis",
    "programId": "p-u-istanbul-29-mayis-arabic-translation-and-interpreting",
    "language": "ar",
    "tuitionFee": 3988,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-917",
    "universityId": "u-istanbul-29-mayis",
    "programId": "p-u-istanbul-29-mayis-information-and-document-management",
    "language": "tr",
    "tuitionFee": 3988,
    "originalFee": 5000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-918",
    "universityId": "u-izmir-tinaztepe",
    "programId": "p-u-izmir-tinaztepe-autopsy-assistant",
    "language": "tr",
    "tuitionFee": 7556,
    "originalFee": 8556,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-919",
    "universityId": "u-avrasya",
    "programId": "p-u-avrasya-cartography-and-cadastre",
    "language": "tr",
    "tuitionFee": 1835,
    "originalFee": 3670,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-920",
    "universityId": "u-avrasya",
    "programId": "p-u-avrasya-aviation-cabin-services",
    "language": "tr",
    "tuitionFee": 2359,
    "originalFee": 4719,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-921",
    "universityId": "u-avrasya",
    "programId": "p-u-avrasya-dental-health",
    "language": "tr",
    "tuitionFee": 2359,
    "originalFee": 4719,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-922",
    "universityId": "u-avrasya",
    "programId": "p-u-avrasya-work-and-activity-therapy",
    "language": "tr",
    "tuitionFee": 2359,
    "originalFee": 4719,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-923",
    "universityId": "u-istanbul-health-and-technology",
    "programId": "p-u-istanbul-health-and-technology-industrial-design-engineering",
    "language": "tr",
    "tuitionFee": 3000,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-924",
    "universityId": "u-istanbul-health-and-technology",
    "programId": "p-u-istanbul-health-and-technology-mechatronic-engineering",
    "language": "en",
    "tuitionFee": 3000,
    "originalFee": 4000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-925",
    "universityId": "u-istanbul-health-and-technology",
    "programId": "p-u-istanbul-health-and-technology-pharmaceutical-technology",
    "language": "tr",
    "tuitionFee": 3527,
    "originalFee": 4527,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-926",
    "universityId": "u-istanbul-health-and-technology",
    "programId": "p-u-istanbul-health-and-technology-drug-research-and-development",
    "language": "tr",
    "tuitionFee": 3061,
    "originalFee": 4061,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-927",
    "universityId": "u-piri-reis",
    "programId": "p-u-piri-reis-maritime-business-management",
    "language": "tr",
    "tuitionFee": 16837,
    "originalFee": 17837,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-928",
    "universityId": "u-piri-reis",
    "programId": "p-u-piri-reis-naval-architecture-and-marine-engineering",
    "language": "tr",
    "tuitionFee": 16837,
    "originalFee": 17837,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-929",
    "universityId": "u-piri-reis",
    "programId": "p-u-piri-reis-maritime-transportation-management-engineering",
    "language": "tr",
    "tuitionFee": 16837,
    "originalFee": 17837,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-930",
    "universityId": "u-piri-reis",
    "programId": "p-u-piri-reis-ship-machinery-management-engineering",
    "language": "tr",
    "tuitionFee": 16837,
    "originalFee": 17837,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-931",
    "universityId": "u-piri-reis",
    "programId": "p-u-piri-reis-maritime-brokerage",
    "language": "en",
    "tuitionFee": 11009,
    "originalFee": 12009,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-932",
    "universityId": "u-piri-reis",
    "programId": "p-u-piri-reis-maritime-transportation-management",
    "language": "en",
    "tuitionFee": 11009,
    "originalFee": 12009,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-933",
    "universityId": "u-piri-reis",
    "programId": "p-u-piri-reis-hybrid-and-electric-vehicles",
    "language": "tr",
    "tuitionFee": 11009,
    "originalFee": 12009,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-934",
    "universityId": "u-piri-reis",
    "programId": "p-u-piri-reis-ship-machinery-management",
    "language": "en",
    "tuitionFee": 11009,
    "originalFee": 12009,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-935",
    "universityId": "u-piri-reis",
    "programId": "p-u-piri-reis-shipbuilding",
    "language": "en",
    "tuitionFee": 11009,
    "originalFee": 12009,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-936",
    "universityId": "u-piri-reis",
    "programId": "p-u-piri-reis-maritime-engineering",
    "language": "en",
    "tuitionFee": 4500,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-937",
    "universityId": "u-piri-reis",
    "programId": "p-u-piri-reis-maritime-law",
    "language": "tr",
    "tuitionFee": 4500,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-938",
    "universityId": "u-piri-reis",
    "programId": "p-u-piri-reis-naval-architecture-and-marine-engineering-advanced-ocean-platforms",
    "language": "en",
    "tuitionFee": 4500,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-939",
    "universityId": "u-piri-reis",
    "programId": "p-u-piri-reis-maritime-transportation-and-management-engineering",
    "language": "en",
    "tuitionFee": 4500,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-940",
    "universityId": "u-piri-reis",
    "programId": "p-u-piri-reis-maritime-and-business-economics",
    "language": "en",
    "tuitionFee": 4500,
    "originalFee": 9000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-941",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-arabic-turkish-translation-and-interpreting",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-942",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-energy-management",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-943",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-english-turkish-translation-and-interpreting",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-944",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-insurance-and-social-security",
    "language": "tr",
    "tuitionFee": 5000,
    "originalFee": 6000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-945",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-digital-factory-technologies",
    "language": "tr",
    "tuitionFee": 3560,
    "originalFee": 4560,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-946",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-weapon-industry-technology",
    "language": "tr",
    "tuitionFee": 3560,
    "originalFee": 4560,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-947",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-pilot-training",
    "language": "tr",
    "tuitionFee": 18000,
    "originalFee": 19000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-948",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-computer-forensic-engineering",
    "language": "tr",
    "tuitionFee": 2400,
    "originalFee": 3400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-949",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-interdisciplinary-family-counseling",
    "language": "tr",
    "tuitionFee": 3200,
    "originalFee": 4200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-950",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-electrical-and-computer-engineering-graduate",
    "language": "tr",
    "tuitionFee": 2900,
    "originalFee": 3900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-951",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-mechatronics-engineering-science",
    "language": "tr",
    "tuitionFee": 2400,
    "originalFee": 3400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-952",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-mental-health-and-disease-nursing",
    "language": "tr",
    "tuitionFee": 3200,
    "originalFee": 4200,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-953",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-human-resources-and-social-security",
    "language": "tr",
    "tuitionFee": 2900,
    "originalFee": 3900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-954",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-department-of-civil-engineering",
    "language": "tr",
    "tuitionFee": 2900,
    "originalFee": 3900,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-955",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-architecture-graduate-program",
    "language": "tr",
    "tuitionFee": 2400,
    "originalFee": 3400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-956",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-mechanical-engineering-graduate",
    "language": "tr",
    "tuitionFee": 2400,
    "originalFee": 3400,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-957",
    "universityId": "u-kto-karatay",
    "programId": "p-u-kto-karatay-interdisciplinary-occupational-health-and-safety",
    "language": "tr",
    "tuitionFee": 4300,
    "originalFee": 5300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-958",
    "universityId": "u-cankaya",
    "programId": "p-u-cankaya-materials-science-and-engineering",
    "language": "tr",
    "tuitionFee": 13760,
    "originalFee": 14760,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-959",
    "universityId": "u-cankaya",
    "programId": "p-u-cankaya-building-technologies",
    "language": "tr",
    "tuitionFee": 1845,
    "originalFee": 2845,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-960",
    "universityId": "u-cankaya",
    "programId": "p-u-cankaya-english-literature-and-cultural-studies",
    "language": "en",
    "tuitionFee": 6355,
    "originalFee": 7355,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-961",
    "universityId": "u-cankaya",
    "programId": "p-u-cankaya-computer-sciences-and-engineering",
    "language": "en",
    "tuitionFee": 2960,
    "originalFee": 3960,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-962",
    "universityId": "u-konya",
    "programId": "p-u-konya-plant-production-and-technologies",
    "language": "en",
    "tuitionFee": 1619,
    "originalFee": 3238,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-963",
    "universityId": "u-mef",
    "programId": "p-u-mef-mechatronics-and-robotics-engineering",
    "language": "en",
    "tuitionFee": 7000,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-964",
    "universityId": "u-mef",
    "programId": "p-u-mef-learning-sciences",
    "language": "en",
    "tuitionFee": 7000,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-965",
    "universityId": "u-mef",
    "programId": "p-u-mef-human-rights-law",
    "language": "tr",
    "tuitionFee": 7000,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-966",
    "universityId": "u-mef",
    "programId": "p-u-mef-international-security-and-strategy-studies",
    "language": "tr",
    "tuitionFee": 7000,
    "originalFee": 8000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-967",
    "universityId": "u-mef",
    "programId": "p-u-mef-information-technologies",
    "language": "en",
    "tuitionFee": 6000,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-968",
    "universityId": "u-mef",
    "programId": "p-u-mef-construction-project-management",
    "language": "tr",
    "tuitionFee": 6000,
    "originalFee": 7000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-969",
    "universityId": "u-sanko",
    "programId": "p-u-sanko-biological-and-biomedical-sciences",
    "language": "tr",
    "tuitionFee": 2850,
    "originalFee": 3850,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-970",
    "universityId": "u-nuh-naci-yazgan",
    "programId": "p-u-nuh-naci-yazgan-electric",
    "language": "tr",
    "tuitionFee": 5598,
    "originalFee": 7857,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-971",
    "universityId": "u-turkish-aeronautical-association",
    "programId": "p-u-turkish-aeronautical-association-space-engineering",
    "language": "en",
    "tuitionFee": 8687,
    "originalFee": 17374,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-972",
    "universityId": "u-turkish-aeronautical-association",
    "programId": "p-u-turkish-aeronautical-association-aircraft-manufacturing-technologies",
    "language": "tr",
    "tuitionFee": 11119,
    "originalFee": 12119,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-973",
    "universityId": "u-turkish-aeronautical-association",
    "programId": "p-u-turkish-aeronautical-association-civil-aviation-operations-management",
    "language": "tr",
    "tuitionFee": 8339,
    "originalFee": 11119,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-974",
    "universityId": "u-koc",
    "programId": "p-u-koc-archaeology-and-history-of-art",
    "language": "en",
    "tuitionFee": 19000,
    "originalFee": 38000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-975",
    "universityId": "u-koc",
    "programId": "p-u-koc-chemical-and-biological-engineering",
    "language": "en",
    "tuitionFee": 19000,
    "originalFee": 38000,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-976",
    "universityId": "u-koc",
    "programId": "p-u-koc-biomedical-sciences-and-engineering",
    "language": "en",
    "tuitionFee": 24300,
    "originalFee": 25300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-977",
    "universityId": "u-koc",
    "programId": "p-u-koc-computational-sciences-and-engineering",
    "language": "en",
    "tuitionFee": 24300,
    "originalFee": 25300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-978",
    "universityId": "u-koc",
    "programId": "p-u-koc-industrial-engineering-and-management",
    "language": "en",
    "tuitionFee": 24300,
    "originalFee": 25300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-979",
    "universityId": "u-koc",
    "programId": "p-u-koc-design-technology-and-society",
    "language": "en",
    "tuitionFee": 24300,
    "originalFee": 25300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-980",
    "universityId": "u-koc",
    "programId": "p-u-koc-comparative-history-and-society",
    "language": "en",
    "tuitionFee": 24300,
    "originalFee": 25300,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-981",
    "universityId": "u-koc",
    "programId": "p-u-koc-intensive-care-nursing",
    "language": "en",
    "tuitionFee": 30800,
    "originalFee": 31800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-982",
    "universityId": "u-koc",
    "programId": "p-u-koc-medical-physiology",
    "language": "en",
    "tuitionFee": 30800,
    "originalFee": 31800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-983",
    "universityId": "u-koc",
    "programId": "p-u-koc-reproductive-biology",
    "language": "en",
    "tuitionFee": 30800,
    "originalFee": 31800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-984",
    "universityId": "u-koc",
    "programId": "p-u-koc-cellular-and-molecular-medicine",
    "language": "en",
    "tuitionFee": 30800,
    "originalFee": 31800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-985",
    "universityId": "u-koc",
    "programId": "p-u-koc-immunology",
    "language": "en",
    "tuitionFee": 30800,
    "originalFee": 31800,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-986",
    "universityId": "u-koc",
    "programId": "p-u-koc-reproductive-medicine",
    "language": "en",
    "tuitionFee": 25500,
    "originalFee": 26500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-987",
    "universityId": "u-sabanci",
    "programId": "p-u-sabanci-molecular-biology-genetics-and-bioengineering",
    "language": "en",
    "tuitionFee": 36500,
    "originalFee": 37500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-988",
    "universityId": "u-sabanci",
    "programId": "p-u-sabanci-energy-technologies-and-management",
    "language": "en",
    "tuitionFee": 36500,
    "originalFee": 37500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-989",
    "universityId": "u-sabanci",
    "programId": "p-u-sabanci-materials-science-and-nano-engineering",
    "language": "en",
    "tuitionFee": 36500,
    "originalFee": 37500,
    "currency": "USD",
    "scholarshipAvailable": true
  },
  {
    "id": "up-990",
    "universityId": "u-sabanci",
    "programId": "p-u-sabanci-production-engineering",
    "language": "en",
    "tuitionFee": 36500,
    "originalFee": 37500,
    "currency": "USD",
    "scholarshipAvailable": true
  }
];

/**
 * New cities discovered in the catalog (cityName not in seedCities).
 * Empty today: every catalog city already exists in src/lib/seed/cities.ts.
 */
export const studyLeoCities: City[] = [];

/** Scraped logo file paths keyed by university slug (for local asset use). */
export const studyLeoLogoImages: Record<string, string> = {};
