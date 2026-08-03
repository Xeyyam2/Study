import { describe, expect, test } from 'vitest';
import type { University } from '@/types';
import { parseListingQuery, sortUniversities } from '@/lib/universities/listing-query';

const university = (id: string, name: string, ranking: number): University => ({
  id,
  name,
  slug: id,
  cityId: 'istanbul',
  foundedYear: 2000,
  studentCount: 1000,
  ranking,
  accreditation: 'accredited',
  isState: true,
  logoText: name,
  heroImage: '',
  gallery: [],
  tagline: {},
  description: {},
  languages: ['en'],
});

describe('parseListingQuery', () => {
  test('parses supported listing filters, tuition, and sort', () => {
    expect(
      parseListingQuery({
        city: 'istanbul',
        degree: 'master',
        language: 'en',
        type: 'private',
        search: 'engineering',
        maxTuition: '12500',
        sort: 'tuition',
      }),
    ).toEqual({
      filters: {
        citySlug: 'istanbul',
        degreeLevel: 'master',
        language: 'en',
        isState: false,
        search: 'engineering',
        maxTuitionUSD: 12500,
      },
      sort: 'tuition',
    });
  });

  test('falls back for invalid filters, tuition, and sort values', () => {
    expect(
      parseListingQuery({
        degree: 'doctorate',
        language: 'de',
        type: 'public',
        maxTuition: '-1',
        sort: 'popular',
      }),
    ).toEqual({ filters: {}, sort: 'relevance' });

    expect(parseListingQuery({ maxTuition: 'Infinity' })).toEqual({
      filters: {},
      sort: 'relevance',
    });

    expect(parseListingQuery({ maxTuition: '0' })).toEqual({
      filters: {},
      sort: 'relevance',
    });
  });
});

describe('sortUniversities', () => {
  const universities = [
    university('u2', 'Beta University', 20),
    university('u3', 'Alpha University', 30),
    university('u1', 'Alpha University', 10),
  ];

  test('sorts by name ascending', () => {
    expect(sortUniversities(universities, 'name').map((u) => u.id)).toEqual([
      'u3',
      'u1',
      'u2',
    ]);
  });

  test('sorts by ranking ascending', () => {
    expect(sortUniversities(universities, 'ranking').map((u) => u.id)).toEqual([
      'u1',
      'u2',
      'u3',
    ]);
  });

  test('sorts by tuition ascending using the supplied map', () => {
    expect(
      sortUniversities(universities, 'tuition', {
        u1: 9000,
        u2: 3000,
        u3: 5000,
      }).map((u) => u.id),
    ).toEqual(['u2', 'u3', 'u1']);
  });

  test('sorts universities with unknown tuition after known tuition', () => {
    expect(
      sortUniversities(universities, 'tuition', {
        u1: 9000,
        u2: 3000,
        u3: 0,
      }).map((u) => u.id),
    ).toEqual(['u2', 'u1', 'u3']);
  });

  test('preserves relevance order and does not mutate the input', () => {
    const result = sortUniversities(universities, 'relevance');

    expect(result.map((u) => u.id)).toEqual(['u2', 'u3', 'u1']);
    expect(result).not.toBe(universities);
    expect(universities.map((u) => u.id)).toEqual(['u2', 'u3', 'u1']);
  });
});
