/**
 * Reusable stock imagery (Unsplash). Swap with real assets later.
 * Centralised so a single edit updates imagery across the site.
 */

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const seedImages = {
  campusLibrary: U('1562774053-701939374585'),
  campusBuilding: U('1541339907198-e08756dedf3f'),
  campusAerial: U('1568438350562-876d1b6c3c40'),
  students: U('1523050854058-8df90110c9f1'),
  istanbul: U('1524231757912-21f4fe3a7200'),
  istanbul2: U('1535926104757-8a7c6e1b1b3c'),
  ankara: U('1608245442837-4c762b03c9e3'),
  izmir: U('1580299687797-b2c4b3c4b3c3'),
  bursa: U('1605469058377-6f7c4c3c3c3c'),
  antalya: U('1591104604183-aca8c4c3c3c3'),
  konya: U('1605469058377-6f7c4c3c3c3d'),
  medicine: U('1538108149393-fbbd81895907'),
  engineering: U('1581092160562-40aa08e78837'),
  computer: U('1517694712202-14dd9538aa97'),
  business: U('1454165804606-c3d57bc86b40'),
  law: U('1505664194779-8beaceb93744'),
  architecture: U('1486325212027-8081e485255e'),
  dentistry: U('1606811841689-23dfddce3e95'),
  arts: U('1513364776144-60967b0f800f'),
  dorm: U('1555854877-bab0e564b8d5'),
  dorm2: U('1522771739844-6a9f6d5f14af'),
  graduation: U('1517486808906-6ca8b3f04846'),
  cityNight: U('1501293629406-3a3c1c1c1c1c'),
};

export const heroByCategory: Record<string, string> = {
  medicine: seedImages.medicine,
  engineering: seedImages.engineering,
  'computer-science': seedImages.computer,
  business: seedImages.business,
  law: seedImages.law,
  architecture: seedImages.architecture,
  dentistry: seedImages.dentistry,
  arts: seedImages.arts,
};

export const cityImage: Record<string, string> = {
  istanbul: seedImages.istanbul,
  ankara: seedImages.ankara,
  izmir: seedImages.izmir,
  bursa: seedImages.bursa,
  antalya: seedImages.antalya,
  konya: seedImages.konya,
};
