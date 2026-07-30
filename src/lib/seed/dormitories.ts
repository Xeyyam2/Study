import type { Dormitory } from '@/types';
import { seedImages } from './images';

export const seedDormitories: Dormitory[] = [
  {
    id: 'd-1',
    universityId: 'u-bahcesehir',
    capacity: 1200,
    pricePerMonth: 350,
    currency: 'USD',
    photos: [seedImages.dorm, seedImages.dorm2],
  },
  {
    id: 'd-2',
    universityId: 'u-metu',
    capacity: 4000,
    pricePerMonth: 150,
    currency: 'USD',
    photos: [seedImages.dorm2, seedImages.dorm],
  },
  {
    id: 'd-3',
    universityId: 'u-bogazici',
    capacity: 2500,
    pricePerMonth: 200,
    currency: 'USD',
    photos: [seedImages.dorm, seedImages.campusBuilding],
  },
  {
    id: 'd-4',
    universityId: 'u-izmir-econ',
    capacity: 900,
    pricePerMonth: 320,
    currency: 'USD',
    photos: [seedImages.dorm2, seedImages.dorm],
  },
  {
    id: 'd-5',
    universityId: 'u-itu',
    capacity: 3000,
    pricePerMonth: 160,
    currency: 'USD',
    photos: [seedImages.dorm, seedImages.dorm2],
  },
];
