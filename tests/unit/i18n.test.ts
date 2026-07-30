import { describe, it, expect } from 'vitest';
import { isLocale, isRtl, routing } from '@/i18n/routing';

describe('isLocale', () => {
  it('accepts configured locales', () => {
    for (const l of routing.locales) {
      expect(isLocale(l)).toBe(true);
    }
  });

  it('rejects unknown codes', () => {
    expect(isLocale('xx')).toBe(false);
    expect(isLocale('')).toBe(false);
  });
});

describe('isRtl', () => {
  it('flags Arabic and Persian as RTL', () => {
    expect(isRtl('ar')).toBe(true);
    expect(isRtl('fa')).toBe(true);
  });

  it('treats current locales as LTR', () => {
    for (const l of routing.locales) {
      expect(isRtl(l)).toBe(false);
    }
  });
});
