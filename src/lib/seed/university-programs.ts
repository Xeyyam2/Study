import type { UniversityProgram } from '@/types';

/**
 * Links universities to programs with tuition fees.
 * Tuition in USD/year for comparability; TRY available for state programs.
 */
export const seedUniversityPrograms: UniversityProgram[] = [
  // Bahçeşehir (private, Istanbul)
  { id: 'up-1', universityId: 'u-bahcesehir', programId: 'p-med-bach', language: 'en', tuitionFee: 22500, currency: 'USD', scholarshipAvailable: true },
  { id: 'up-2', universityId: 'u-bahcesehir', programId: 'p-cs-bach', language: 'en', tuitionFee: 8000, currency: 'USD', scholarshipAvailable: true },
  { id: 'up-3', universityId: 'u-bahcesehir', programId: 'p-bus-bach', language: 'en', tuitionFee: 7000, currency: 'USD', scholarshipAvailable: true },
  { id: 'up-4', universityId: 'u-bahcesehir', programId: 'p-arch-bach', language: 'tr', tuitionFee: 7500, currency: 'USD', scholarshipAvailable: false },
  { id: 'up-5', universityId: 'u-bahcesehir', programId: 'p-ai-master', language: 'en', tuitionFee: 9500, currency: 'USD', scholarshipAvailable: true },

  // İTÜ (state, Istanbul)
  { id: 'up-6', universityId: 'u-itu', programId: 'p-eng-mech', language: 'tr', tuitionFee: 1200, currency: 'USD', scholarshipAvailable: false },
  { id: 'up-7', universityId: 'u-itu', programId: 'p-eng-elec', language: 'en', tuitionFee: 1400, currency: 'USD', scholarshipAvailable: false },
  { id: 'up-8', universityId: 'u-itu', programId: 'p-cs-bach', language: 'en', tuitionFee: 1500, currency: 'USD', scholarshipAvailable: true },
  { id: 'up-9', universityId: 'u-itu', programId: 'p-arch-bach', language: 'tr', tuitionFee: 1200, currency: 'USD', scholarshipAvailable: false },

  // Boğaziçi (state, Istanbul, English)
  { id: 'up-10', universityId: 'u-bogazici', programId: 'p-cs-bach', language: 'en', tuitionFee: 1000, currency: 'USD', scholarshipAvailable: false },
  { id: 'up-11', universityId: 'u-bogazici', programId: 'p-bus-bach', language: 'en', tuitionFee: 1000, currency: 'USD', scholarshipAvailable: false },
  { id: 'up-12', universityId: 'u-bogazici', programId: 'p-bus-irm', language: 'en', tuitionFee: 1000, currency: 'USD', scholarshipAvailable: false },
  { id: 'up-13', universityId: 'u-bogazici', programId: 'p-cs-master', language: 'en', tuitionFee: 1500, currency: 'USD', scholarshipAvailable: true },

  // METU (state, Ankara, English)
  { id: 'up-14', universityId: 'u-metu', programId: 'p-eng-elec', language: 'en', tuitionFee: 1300, currency: 'USD', scholarshipAvailable: false },
  { id: 'up-15', universityId: 'u-metu', programId: 'p-cs-bach', language: 'en', tuitionFee: 1300, currency: 'USD', scholarshipAvailable: true },
  { id: 'up-16', universityId: 'u-metu', programId: 'p-arch-bach', language: 'en', tuitionFee: 1300, currency: 'USD', scholarshipAvailable: false },
  { id: 'up-17', universityId: 'u-metu', programId: 'p-ai-master', language: 'en', tuitionFee: 1600, currency: 'USD', scholarshipAvailable: true },

  // Ankara University (state, Ankara)
  { id: 'up-18', universityId: 'u-ankara', programId: 'p-law-bach', language: 'tr', tuitionFee: 900, currency: 'USD', scholarshipAvailable: false },
  { id: 'up-19', universityId: 'u-ankara', programId: 'p-med-bach', language: 'tr', tuitionFee: 1100, currency: 'USD', scholarshipAvailable: true },
  { id: 'up-20', universityId: 'u-ankara', programId: 'p-bus-irm', language: 'en', tuitionFee: 1000, currency: 'USD', scholarshipAvailable: false },

  // Izmir Economics (private, Izmir)
  { id: 'up-21', universityId: 'u-izmir-econ', programId: 'p-bus-bach', language: 'en', tuitionFee: 6500, currency: 'USD', scholarshipAvailable: true },
  { id: 'up-22', universityId: 'u-izmir-econ', programId: 'p-arts-bach', language: 'en', tuitionFee: 7000, currency: 'USD', scholarshipAvailable: true },
  { id: 'up-23', universityId: 'u-izmir-econ', programId: 'p-bus-mba', language: 'en', tuitionFee: 9000, currency: 'USD', scholarshipAvailable: false },

  // Bursa Technical (state, Bursa)
  { id: 'up-24', universityId: 'u-btu', programId: 'p-eng-civil', language: 'tr', tuitionFee: 1100, currency: 'USD', scholarshipAvailable: false },
  { id: 'up-25', universityId: 'u-btu', programId: 'p-cs-bach', language: 'en', tuitionFee: 1200, currency: 'USD', scholarshipAvailable: true },
  { id: 'up-26', universityId: 'u-btu', programId: 'p-eng-elec', language: 'tr', tuitionFee: 1100, currency: 'USD', scholarshipAvailable: false },

  // Antalya Bilim (private, Antalya)
  { id: 'up-27', universityId: 'u-antalya-bilim', programId: 'p-bus-bach', language: 'en', tuitionFee: 6000, currency: 'USD', scholarshipAvailable: true },
  { id: 'up-28', universityId: 'u-antalya-bilim', programId: 'p-bus-irm', language: 'en', tuitionFee: 6000, currency: 'USD', scholarshipAvailable: true },
  { id: 'up-29', universityId: 'u-antalya-bilim', programId: 'p-arts-bach', language: 'tr', tuitionFee: 6500, currency: 'USD', scholarshipAvailable: false },

  // Konya Food & Agriculture (private, Konya)
  { id: 'up-30', universityId: 'u-konya', programId: 'p-arts-bach', language: 'tr', tuitionFee: 5500, currency: 'USD', scholarshipAvailable: true },
  { id: 'up-31', universityId: 'u-konya', programId: 'p-bus-bach', language: 'tr', tuitionFee: 5000, currency: 'USD', scholarshipAvailable: false },

  // Yıldız Technical (state, Istanbul)
  { id: 'up-32', universityId: 'u-ytu', programId: 'p-arch-bach', language: 'tr', tuitionFee: 1000, currency: 'USD', scholarshipAvailable: false },
  { id: 'up-33', universityId: 'u-ytu', programId: 'p-eng-mech', language: 'tr', tuitionFee: 1000, currency: 'USD', scholarshipAvailable: true },
  { id: 'up-34', universityId: 'u-ytu', programId: 'p-cs-bach', language: 'en', tuitionFee: 1100, currency: 'USD', scholarshipAvailable: false },
];
