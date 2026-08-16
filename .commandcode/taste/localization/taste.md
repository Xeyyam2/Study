# Taste

## Localization (i18n/l10n)

- When localizing files: only translate string values; never change key names, hierarchy, or array/object structure; preserve placeholders ({name}, {count}) verbatim. Confidence: 0.9
- Treats a designated reference locale file (e.g. en.json) as the source of truth and compares key-by-key (deep) to find missing, empty, or untranslated values. Confidence: 0.8
- Translates to natural, native-speaker-quality language matching the marketing/UI context, not literal word-for-word translation. Confidence: 0.85
- Validates each edited file (JSON parse check) before moving on to the next. Confidence: 0.8
- Multilingual marketing/content copy (taglines, descriptions, blog posts) should be authored as natural, SEO-friendly text in each language — not machine-translated — keyword-rich without stuffing, and meeting minimum length requirements (e.g. descriptions 40-50+ words, articles 300+ words). Confidence: 0.85
- All site content (universities, programs, countries, cities, categories, scholarships, FAQs, reviews, blog posts) must be fully translated into EVERY language the site supports — not just a core subset like en/tr/az/ru; content falling back to a default language (e.g. English via the lx() helper) is not acceptable to the user. Confidence: 0.9
- New content additions (programs, blog posts, universities) must be authored/translated in all supported site languages from the start, mirroring the existing content's full language coverage. Confidence: 0.8
- Terminology for accommodation/dormitory should be the natural localized word in each language (Azerbaijani "yataqxana", English "Dormitory"), matching the reference site (StudyLeo)'s wording rather than a generic or machine-translated term. Confidence: 0.7
