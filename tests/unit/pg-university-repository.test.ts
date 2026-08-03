import { describe, expect, it, vi } from 'vitest';
import type { Pool } from 'pg';
import { createPgDataLayer } from '@/lib/data/pg-data-repository';

describe('Postgres university listing metadata', () => {
  it('limits tuition and review aggregates to requested university IDs', async () => {
    const query = vi.fn().mockResolvedValue({ rows: [] });
    const repository = createPgDataLayer(() => ({ query } as unknown as Pool)).universities;

    await repository.getListingMetadata(['u-1', 'u-2']);

    const [sql, params] = query.mock.calls[0] as [string, string[][]];
    expect(sql).toMatch(
      /from public\.university_programs\s+where university_id = any\(\$1::text\[\]\)/i,
    );
    expect(sql).toMatch(
      /from public\.reviews\s+where university_id = any\(\$1::text\[\]\)/i,
    );
    expect(params).toEqual([['u-1', 'u-2']]);
  });

  it('does not query Postgres for an empty ID batch', async () => {
    const query = vi.fn();
    const repository = createPgDataLayer(() => ({ query } as unknown as Pool)).universities;

    expect(await repository.getListingMetadata([])).toEqual(new Map());
    expect(query).not.toHaveBeenCalled();
  });

  it('omits requested IDs with no metadata rows', async () => {
    const query = vi.fn().mockResolvedValue({ rows: [{ id: 'u-1' }] });
    const repository = createPgDataLayer(() => ({ query } as unknown as Pool)).universities;

    const metadata = await repository.getListingMetadata(['u-1', 'u-missing']);

    expect(metadata.has('u-1')).toBe(true);
    expect(metadata.has('u-missing')).toBe(false);
  });
});
