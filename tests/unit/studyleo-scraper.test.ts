import { describe, it, expect } from 'vitest';
import { extractLanguages, normalizeLanguage } from '../../scripts/scrape-studyleo.mjs';

// Fixture mirrors the exact card markup observed on live StudyLeo pages:
// <div class="flex flex-col"><span class="text-grey text-xs">Languages</span>
// <div class="font-medium text-black-text text-sm flex flex-col"><span>English</span></div></div>
const CARD = (lang) =>
  `<div class="flex flex-col"><span class="text-grey text-xs">Languages</span><div class="font-medium text-black-text text-sm flex flex-col"><span>${lang}</span></div></div>`;

describe('extractLanguages', () => {
  it('pulls one language per card, in DOM order', () => {
    const html = CARD('English') + CARD('Turkish') + CARD('30% English');
    expect(extractLanguages(html)).toEqual(['English', 'Turkish', '30% English']);
  });

  it('ignores the Languages filter control (label + button, no card div)', () => {
    const html = `<label class="text-sm font-semibold text-black-text">Languages</label><button data-slot="popover-trigger">All Languages</button>` + CARD('English');
    expect(extractLanguages(html)).toEqual(['English']);
  });

  it('returns empty array when no card language labels', () => {
    expect(extractLanguages('<html><body>no languages here</body></html>')).toEqual([]);
  });
});

describe('normalizeLanguage', () => {
  it('maps the real StudyLeo labels to canonical codes', () => {
    expect(normalizeLanguage('English')).toBe('en');
    expect(normalizeLanguage('Turkish')).toBe('tr'); // note: starts with "tu", not "tr" — full-word match
    expect(normalizeLanguage('30% English')).toBe('en'); // Turkish-taught w/ partial English
  });

  it('maps other languages by prefix', () => {
    expect(normalizeLanguage('Arabic')).toBe('ar');
    expect(normalizeLanguage('Russian')).toBe('ru');
  });

  it('falls back to en for unknown languages', () => {
    expect(normalizeLanguage('German')).toBe('en');
    expect(normalizeLanguage('')).toBe('en');
    expect(normalizeLanguage(undefined)).toBe('en');
  });
});
