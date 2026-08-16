/**
 * Local university imagery downloaded from StudyLeo's public CDN.
 *
 * StudyLeo's featured images are used as the campus hero for the matching
 * universities (same institution, real building photos instead of generic
 * stock). Files live at:
 *   public/images/universities/{slug}/hero.webp
 *   public/images/universities/{slug}/logo.svg
 *
 * A university whose slug is NOT in these maps keeps its stock seedImages hero
 * and its `logoText` fallback.
 */
export const universityHeroImages: Record<string, string> = {
  "istanbul-technical-university":
    "/images/universities/istanbul-technical-university/hero.webp",
  "bogazici-university": "/images/universities/bogazici-university/hero.webp",
  "middle-east-technical-university":
    "/images/universities/middle-east-technical-university/hero.webp",
  "ankara-university": "/images/universities/ankara-university/hero.webp",
  "yildiz-technical-university":
    "/images/universities/yildiz-technical-university/hero.webp",
  "bahcesehir-university":
    "/images/universities/bahcesehir-university/hero.webp",
  "izmir-university-of-economics":
    "/images/universities/izmir-university-of-economics/hero.webp",
  "antalya-bilim-university":
    "/images/universities/antalya-bilim-university/hero.webp",
  "konya-food-and-agriculture-university":
    "/images/universities/konya-food-and-agriculture-university/hero.webp",
  "istanbul-medipol-university":
    "/images/universities/istanbul-medipol-university/hero.webp",
  "istanbul-topkapi-university":
    "/images/universities/istanbul-topkapi-university/hero.webp",
  "halic-university": "/images/universities/halic-university/hero.webp",
  "istanbul-yeni-yuzyil-university":
    "/images/universities/istanbul-yeni-yuzyil-university/hero.webp",
  "istanbul-esenyurt-university":
    "/images/universities/istanbul-esenyurt-university/hero.webp",
  "istanbul-nisantasi-university":
    "/images/universities/istanbul-nisantasi-university/hero.webp",
  "uskudar-university": "/images/universities/uskudar-university/hero.webp",
  "biruni-university": "/images/universities/biruni-university/hero.webp",
  "altinbas-university": "/images/universities/altinbas-university/hero.webp",
  "istinye-university": "/images/universities/istinye-university/hero.webp",
  "istanbul-gelisim-university":
    "/images/universities/istanbul-gelisim-university/hero.webp",
  "istanbul-aydin-university":
    "/images/universities/istanbul-aydin-university/hero.webp",
  "istanbul-gedik-university":
    "/images/universities/istanbul-gedik-university/hero.webp",
  "sabanci-university": "/images/universities/sabanci-university/hero.webp",
  "koc-university": "/images/universities/koc-university/hero.webp",
  "atasehir-adiguzel-vocational-school":
    "/images/universities/atasehir-adiguzel-vocational-school/hero.webp",
  "mef-university": "/images/universities/mef-university/hero.webp",
  "istanbul-health-and-technology-university":
    "/images/universities/istanbul-health-and-technology-university/hero.webp",
  "istanbul-29-mayis-university":
    "/images/universities/istanbul-29-mayis-university/hero.webp",
  "istanbul-sisli-vocational-school":
    "/images/universities/istanbul-sisli-vocational-school/hero.webp",
  "istanbul-vocational-school-of-health-and-social-sciences":
    "/images/universities/istanbul-vocational-school-of-health-and-social-sciences/hero.webp",
  "demiroglu-bilim-university":
    "/images/universities/demiroglu-bilim-university/hero.webp",
  "maltepe-university": "/images/universities/maltepe-university/hero.webp",
  "istanbul-galata-university":
    "/images/universities/istanbul-galata-university/hero.webp",
  "ibn-haldun-university":
    "/images/universities/ibn-haldun-university/hero.webp",
  "kadir-has-university": "/images/universities/kadir-has-university/hero.webp",
  "istanbul-okan-university":
    "/images/universities/istanbul-okan-university/hero.webp",
  "isik-university": "/images/universities/isik-university/hero.webp",
  "yeditepe-university": "/images/universities/yeditepe-university/hero.webp",
  "fatih-sultan-mehmet-university":
    "/images/universities/fatih-sultan-mehmet-university/hero.webp",
  "istanbul-arel-university":
    "/images/universities/istanbul-arel-university/hero.webp",
  "istanbul-atlas-university":
    "/images/universities/istanbul-atlas-university/hero.webp",
  "istanbul-sabahattin-zaim-university":
    "/images/universities/istanbul-sabahattin-zaim-university/hero.webp",
  "bezmi-alem-university":
    "/images/universities/bezmi-alem-university/hero.webp",
  "istanbul-beykent-university":
    "/images/universities/istanbul-beykent-university/hero.webp",
  "istanbul-kultur-university":
    "/images/universities/istanbul-kultur-university/hero.webp",
  "istanbul-commerce-university":
    "/images/universities/istanbul-commerce-university/hero.webp",
  "beykoz-university": "/images/universities/beykoz-university/hero.webp",
  "ozyegin-university": "/images/universities/ozyegin-university/hero.webp",
  "dogus-university": "/images/universities/dogus-university/hero.webp",
  "istanbul-rumeli-university":
    "/images/universities/istanbul-rumeli-university/hero.webp",
  "istanbul-kent-university":
    "/images/universities/istanbul-kent-university/hero.webp",
  "fenerbahce-university":
    "/images/universities/fenerbahce-university/hero.webp",
  "acibadem-mehmet-ali-aydinlar-university":
    "/images/universities/acibadem-mehmet-ali-aydinlar-university/hero.webp",
  "piri-reis-university": "/images/universities/piri-reis-university/hero.webp",
  "ankara-medipol-university":
    "/images/universities/ankara-medipol-university/hero.webp",
  "turkish-aeronautical-association-university":
    "/images/universities/turkish-aeronautical-association-university/hero.webp",
  "ufuk-university": "/images/universities/ufuk-university/hero.webp",
  "cankaya-university": "/images/universities/cankaya-university/hero.webp",
  "yuksek-ihtisas-university":
    "/images/universities/yuksek-ihtisas-university/hero.webp",
  "lokman-hekim-university":
    "/images/universities/lokman-hekim-university/hero.webp",
  "tobb-university-of-economics-and-technology":
    "/images/universities/tobb-university-of-economics-and-technology/hero.webp",
  "bilkent-university": "/images/universities/bilkent-university/hero.webp",
  "ostim-technical-university":
    "/images/universities/ostim-technical-university/hero.webp",
  "ted-university": "/images/universities/ted-university/hero.webp",
  "baskent-university": "/images/universities/baskent-university/hero.webp",
  "atilim-university": "/images/universities/atilim-university/hero.webp",
  "ankara-bilim-university":
    "/images/universities/ankara-bilim-university/hero.webp",
  "izmir-tinaztepe-university":
    "/images/universities/izmir-tinaztepe-university/hero.webp",
  "izmir-kavram-vocational-school":
    "/images/universities/izmir-kavram-vocational-school/hero.webp",
  "yasar-university": "/images/universities/yasar-university/hero.webp",
  "antalya-belek-university":
    "/images/universities/antalya-belek-university/hero.webp",
  "alanya-university": "/images/universities/alanya-university/hero.webp",
  "kto-karatay-university":
    "/images/universities/kto-karatay-university/hero.webp",
  "avrasya-university": "/images/universities/avrasya-university/hero.webp",
  "toros-university": "/images/universities/toros-university/hero.webp",
  "cag-university": "/images/universities/cag-university/hero.webp",
  "sanko-university": "/images/universities/sanko-university/hero.webp",
  "hasan-kalyoncu-university":
    "/images/universities/hasan-kalyoncu-university/hero.webp",
  "nuh-naci-yazgan-university":
    "/images/universities/nuh-naci-yazgan-university/hero.webp",
  "cappadocia-university":
    "/images/universities/cappadocia-university/hero.webp",
  "kocaeli-university-of-health-and-technology":
    "/images/universities/kocaeli-university-of-health-and-technology/hero.webp",
};

/**
 * University logo files downloaded from StudyLeo. A slug present here gets
 * its `logoImage` set; others fall back to `logoText`. Files are SVG or WebP.
 */
export const universityLogoImages: Record<string, string> = {
  "akdeniz-university": "/images/universities/akdeniz-university/logo.webp",
  "ankara-university": "/images/universities/ankara-university/logo.webp",
  "bogazici-university": "/images/universities/bogazici-university/logo.webp",
  "bursa-uludag-university":
    "/images/universities/bursa-uludag-university/logo.webp",
  "bursa-technical-university":
    "/images/universities/bursa-technical-university/logo.webp",
  "cappadocia-university":
    "/images/universities/cappadocia-university/logo.webp",
  "ege-university": "/images/universities/ege-university/logo.webp",
  "erciyes-university": "/images/universities/erciyes-university/logo.webp",
  "gaziantep-university": "/images/universities/gaziantep-university/logo.webp",
  "istanbul-cerrahpasa-university":
    "/images/universities/istanbul-cerrahpasa-university/logo.webp",
  "istanbul-technical-university":
    "/images/universities/istanbul-technical-university/logo.webp",
  "istanbul-vocational-school-of-health-and-social-sciences":
    "/images/universities/istanbul-vocational-school-of-health-and-social-sciences/logo.webp",
  "karadeniz-technical-university":
    "/images/universities/karadeniz-technical-university/logo.webp",
  "kocaeli-university": "/images/universities/kocaeli-university/logo.webp",
  "marmara-university": "/images/universities/marmara-university/logo.webp",
  "mersin-university": "/images/universities/mersin-university/logo.webp",
  "middle-east-technical-university":
    "/images/universities/middle-east-technical-university/logo.webp",
  "yildiz-technical-university":
    "/images/universities/yildiz-technical-university/logo.webp",
  "acibadem-mehmet-ali-aydinlar-university":
    "/images/universities/acibadem-mehmet-ali-aydinlar-university/logo.svg",
  "alanya-university": "/images/universities/alanya-university/logo.webp",
  "altinbas-university": "/images/universities/altinbas-university/logo.webp",
  "ankara-bilim-university":
    "/images/universities/ankara-bilim-university/logo.svg",
  "ankara-medipol-university":
    "/images/universities/ankara-medipol-university/logo.webp",
  "antalya-belek-university":
    "/images/universities/antalya-belek-university/logo.webp",
  "antalya-bilim-university":
    "/images/universities/antalya-bilim-university/logo.svg",
  "atasehir-adiguzel-vocational-school":
    "/images/universities/atasehir-adiguzel-vocational-school/logo.svg",
  "atilim-university": "/images/universities/atilim-university/logo.webp",
  "avrasya-university": "/images/universities/avrasya-university/logo.svg",
  "bahcesehir-university":
    "/images/universities/bahcesehir-university/logo.svg",
  "baskent-university": "/images/universities/baskent-university/logo.webp",
  "beykoz-university": "/images/universities/beykoz-university/logo.webp",
  "bezmi-alem-university":
    "/images/universities/bezmi-alem-university/logo.webp",
  "bilkent-university": "/images/universities/bilkent-university/logo.svg",
  "biruni-university": "/images/universities/biruni-university/logo.webp",
  "cag-university": "/images/universities/cag-university/logo.webp",
  "cankaya-university": "/images/universities/cankaya-university/logo.svg",
  "demiroglu-bilim-university":
    "/images/universities/demiroglu-bilim-university/logo.svg",
  "dogus-university": "/images/universities/dogus-university/logo.webp",
  "fatih-sultan-mehmet-university":
    "/images/universities/fatih-sultan-mehmet-university/logo.webp",
  "fenerbahce-university":
    "/images/universities/fenerbahce-university/logo.webp",
  "halic-university": "/images/universities/halic-university/logo.svg",
  "hasan-kalyoncu-university":
    "/images/universities/hasan-kalyoncu-university/logo.webp",
  "ibn-haldun-university":
    "/images/universities/ibn-haldun-university/logo.svg",
  "isik-university": "/images/universities/isik-university/logo.webp",
  "istanbul-29-mayis-university":
    "/images/universities/istanbul-29-mayis-university/logo.svg",
  "istanbul-arel-university":
    "/images/universities/istanbul-arel-university/logo.svg",
  "istanbul-atlas-university":
    "/images/universities/istanbul-atlas-university/logo.svg",
  "istanbul-aydin-university":
    "/images/universities/istanbul-aydin-university/logo.svg",
  "istanbul-beykent-university":
    "/images/universities/istanbul-beykent-university/logo.svg",
  "istanbul-commerce-university":
    "/images/universities/istanbul-commerce-university/logo.svg",
  "istanbul-esenyurt-university":
    "/images/universities/istanbul-esenyurt-university/logo.webp",
  "istanbul-galata-university":
    "/images/universities/istanbul-galata-university/logo.svg",
  "istanbul-gedik-university":
    "/images/universities/istanbul-gedik-university/logo.webp",
  "istanbul-gelisim-university":
    "/images/universities/istanbul-gelisim-university/logo.svg",
  "istanbul-health-and-technology-university":
    "/images/universities/istanbul-health-and-technology-university/logo.svg",
  "istanbul-kent-university":
    "/images/universities/istanbul-kent-university/logo.webp",
  "istanbul-kultur-university":
    "/images/universities/istanbul-kultur-university/logo.svg",
  "istanbul-medipol-university":
    "/images/universities/istanbul-medipol-university/logo.webp",
  "istanbul-nisantasi-university":
    "/images/universities/istanbul-nisantasi-university/logo.webp",
  "istanbul-okan-university":
    "/images/universities/istanbul-okan-university/logo.svg",
  "istanbul-rumeli-university":
    "/images/universities/istanbul-rumeli-university/logo.webp",
  "istanbul-sabahattin-zaim-university":
    "/images/universities/istanbul-sabahattin-zaim-university/logo.webp",
  "istanbul-sisli-vocational-school":
    "/images/universities/istanbul-sisli-vocational-school/logo.svg",
  "istanbul-topkapi-university":
    "/images/universities/istanbul-topkapi-university/logo.webp",
  "istanbul-yeni-yuzyil-university":
    "/images/universities/istanbul-yeni-yuzyil-university/logo.webp",
  "istinye-university": "/images/universities/istinye-university/logo.webp",
  "izmir-kavram-vocational-school":
    "/images/universities/izmir-kavram-vocational-school/logo.svg",
  "izmir-tinaztepe-university":
    "/images/universities/izmir-tinaztepe-university/logo.svg",
  "izmir-university-of-economics":
    "/images/universities/izmir-university-of-economics/logo.svg",
  "kadir-has-university": "/images/universities/kadir-has-university/logo.svg",
  "koc-university": "/images/universities/koc-university/logo.svg",
  "kocaeli-university-of-health-and-technology":
    "/images/universities/kocaeli-university-of-health-and-technology/logo.webp",
  "konya-food-and-agriculture-university":
    "/images/universities/konya-food-and-agriculture-university/logo.svg",
  "kto-karatay-university":
    "/images/universities/kto-karatay-university/logo.webp",
  "lokman-hekim-university":
    "/images/universities/lokman-hekim-university/logo.svg",
  "maltepe-university": "/images/universities/maltepe-university/logo.svg",
  "mef-university": "/images/universities/mef-university/logo.svg",
  "nuh-naci-yazgan-university":
    "/images/universities/nuh-naci-yazgan-university/logo.webp",
  "ostim-technical-university":
    "/images/universities/ostim-technical-university/logo.webp",
  "ozyegin-university": "/images/universities/ozyegin-university/logo.webp",
  "piri-reis-university": "/images/universities/piri-reis-university/logo.svg",
  "sabanci-university": "/images/universities/sabanci-university/logo.svg",
  "sanko-university": "/images/universities/sanko-university/logo.svg",
  "ted-university": "/images/universities/ted-university/logo.webp",
  "tobb-university-of-economics-and-technology":
    "/images/universities/tobb-university-of-economics-and-technology/logo.svg",
  "toros-university": "/images/universities/toros-university/logo.svg",
  "turkish-aeronautical-association-university":
    "/images/universities/turkish-aeronautical-association-university/logo.webp",
  "ufuk-university": "/images/universities/ufuk-university/logo.svg",
  "uskudar-university": "/images/universities/uskudar-university/logo.webp",
  "yasar-university": "/images/universities/yasar-university/logo.webp",
  "yeditepe-university": "/images/universities/yeditepe-university/logo.webp",
  "yuksek-ihtisas-university":
    "/images/universities/yuksek-ihtisas-university/logo.svg",
};
