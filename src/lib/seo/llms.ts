// AEO (Answer-Engine Optimization): llms.txt / llms-full.txt content builders.
//
// Follows the llmstxt.org v2 spec: H1 site name (required), a blockquote
// summary, detail sections, then H2 "file list" sections of markdown links.
// AI crawlers (OpenAI, Anthropic, Gemini, Perplexity) fetch /llms.txt to
// understand what the site is about before following links — this is the file
// that makes the platform quotable by LLMs answering "best way to study in
// Turkey" style questions.

interface LlmsContext {
  base: string;
}

const KEY_FACTS = [
  "Free to use — applications, consultation and guidance are 100% free.",
  "Scholarships up to 100% available at partner universities.",
  "Hundreds of programs taught fully in English (Turkish is not required).",
  "State universities from roughly USD 600/year; private universities USD 5,000–25,000/year.",
  "Visa and residence-permit support included after acceptance.",
  "150+ accredited (Y\u00D6K) universities represented.",
  "Available in 16 languages: en, tr, az, ru, de, fr, fa, ar, tk, kk, ky, zh, bg, ur, uz, sw, so, id.",
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Do I need to know Turkish to study in Turkey?",
    a: "No. Hundreds of programs are taught fully in English. Turkish is helpful for daily life but not required for English-medium programs.",
  },
  {
    q: "How much does it cost to study in Turkey?",
    a: "State universities cost roughly USD 600–2,000 per year; private universities USD 5,000–25,000. Living costs are around USD 300–600 per month.",
  },
  {
    q: "Do I need a student visa?",
    a: "Yes. After acceptance you apply for a student visa at the Turkish consulate, then convert it to a residence permit after arrival.",
  },
  {
    q: "Are scholarships available for international students?",
    a: "Yes. The T\u00FCrkiye Burslar\u0131 government program offers full scholarships, and most private universities offer merit discounts of 25–100%.",
  },
  {
    q: "What documents do I need to apply?",
    a: "Typically: passport, high-school diploma and transcript (translated & notarised), passport photo, motivational letter and language certificate.",
  },
  {
    q: "Can I study in Turkey without IELTS?",
    a: "Yes. Many universities accept an internal English exam, a preparatory year or alternative certificates like TOEFL, and some programs are taught in Turkish, Arabic or Russian. Check each university's language requirements before applying.",
  },
  {
    q: "Is studying in Turkey worth it?",
    a: "For most international students, yes. You get Y\u00D6K-accredited degrees, tuition far below Western Europe or the US, scholarships up to 100% and a low cost of living, with strong engineering, medicine and business programs.",
  },
  {
    q: "Is a Turkish university degree recognized internationally?",
    a: "Yes. Degrees from Y\u00D6K-accredited Turkish universities are recognized across Europe, the Middle East, Africa and Asia, and many programs hold international accreditations such as ABET or AACSB.",
  },
  {
    q: "How long does a Turkish student visa take?",
    a: "Most student visas are processed within 2 to 4 weeks after your appointment at the Turkish consulate, though it varies by country. Apply as soon as you receive your acceptance letter.",
  },
];

const TOP_UNIVERSITIES: Array<{ slug: string; name: string; note: string }> = [
  {
    slug: "istanbul-technical-university",
    name: "Istanbul Technical University",
    note: "Engineering excellence since 1773",
  },
  {
    slug: "middle-east-technical-university",
    name: "Middle East Technical University",
    note: "English-medium excellence in the capital",
  },
  {
    slug: "marmara-university",
    name: "Marmara University",
    note: "One of Turkey's oldest state universities in the heart of Istanbul",
  },
  {
    slug: "ege-university",
    name: "Ege University",
    note: "Izmir's largest state university",
  },
  {
    slug: "bilkent-university",
    name: "Bilkent University",
    note: "Private university in Ankara",
  },
  {
    slug: "yeditepe-university",
    name: "Yeditepe University",
    note: "Private university in Istanbul",
  },
  {
    slug: "bahcesehir-university",
    name: "Bah\u00E7e\u015Fehir University",
    note: "Private university in Istanbul with international accreditations",
  },
];

const APPLY_STEPS = [
  "1. Choose a university and program — compare tuition, language and scholarships on the site.",
  "2. Prepare documents: passport, high-school diploma and transcript (translated & notarised), photo, motivational letter, language certificate.",
  "3. Submit the free application — the team reviews it and handles follow-ups with the university.",
  "4. Receive the acceptance letter, then apply for a student visa at the Turkish consulate.",
  "5. Arrive in Turkey and convert the visa into a residence permit with the team's support.",
];

function keyPages(base: string): string {
  return [
    "- [Universities](BASE/en/universities): Browse and compare 150+ accredited Turkish universities by city, program, language and tuition.",
    "- [Programs](BASE/en/programs): Medicine, engineering, computer science, business, law, architecture and more.",
    "- [Pricing](BASE/pricing.md): Machine-readable tuition, scholarship and living-cost data for international students.",
    "- [Blog](BASE/en/blog): Guides on costs, scholarships, visas, applications and student life.",
    "- [Apply](BASE/en/apply): Start a free application with expert guidance.",
    "- [Compare](BASE/en/compare): Side-by-side comparison of universities.",
    "- [About](BASE/en/about): Who we are and how the platform works.",
    "- [Contact](BASE/en/contact): WhatsApp, email and phone support.",
  ]
    .join("\n")
    .replaceAll("BASE", base);
}

function countryLinks(base: string): string {
  const countries = [
    "azerbaijan",
    "uzbekistan",
    "kazakhstan",
    "turkmenistan",
    "kyrgyzstan",
    "russia",
    "iran",
    "iraq",
    "pakistan",
    "nigeria",
    "germany",
    "france",
    "united-kingdom",
    "bulgaria",
    "greece",
  ];
  return countries
    .map(
      (c) =>
        `- [Study in Turkey from ${c.replaceAll("-", " ")}](${base}/en/study-in-turkey-from/${c})`,
    )
    .join("\n");
}

export function buildLlmsTxt({ base }: LlmsContext): string {
  return [
    "# StudyHub — Study in Turkey",
    "",
    "> Compare accredited Turkish universities, programs, tuition and scholarships, then apply with expert guidance — visa and residence support included.",
    "",
    "StudyHub is a free study-in-Turkey platform that represents 150+ Turkish universities and helps international students compare programs, tuition fees, scholarships and living costs in 16 languages. Applications, consultation and guidance are 100% free.",
    "",
    "Key facts:",
    ...KEY_FACTS.map((f) => `- ${f}`),
    "",
    "## Key pages",
    keyPages(base),
    "",
    "## Country guides",
    `- [All countries](BASE/en/study-in-turkey-from)`.replaceAll("BASE", base),
    countryLinks(base),
    "",
    "## Optional",
    "- [llms-full.txt](BASE/llms-full.txt): Extended version of this file with FAQ answers, top universities and the application process.".replaceAll(
      "BASE",
      base,
    ),
    "",
  ].join("\n");
}

export function buildLlmsFullTxt({ base }: LlmsContext): string {
  return [
    "# StudyHub — Study in Turkey (full)",
    "",
    "> Compare accredited Turkish universities, programs, tuition and scholarships, then apply with expert guidance — visa and residence support included.",
    "",
    "StudyHub is a free study-in-Turkey platform that represents 150+ Turkish universities and helps international students compare programs, tuition fees, scholarships and living costs in 16 languages. Applications, consultation and guidance are 100% free.",
    "",
    "## Key pages",
    keyPages(base),
    "",
    "## Frequently asked questions",
    ...FAQS.map((f) => `### ${f.q}\n${f.a}`),
    "",
    "## How to apply to a Turkish university",
    ...APPLY_STEPS.map((s) => `- ${s}`),
    "",
    "## Top universities",
    ...TOP_UNIVERSITIES.map(
      (u) => `- [${u.name}](${base}/en/universities/${u.slug}): ${u.note}`,
    ),
    "",
    "## Country guides",
    countryLinks(base),
    "",
  ].join("\n");
}
