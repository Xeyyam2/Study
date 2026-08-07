import { Pool } from 'pg';
const cs = process.env.DATABASE_URL || 'postgresql://study:study@localhost:5433/study_crm';
const pool = new Pool({ connectionString: cs, max: 2 });
const T0 = Date.now();
const log = (m: string) => console.log(`[+${Date.now()-T0}ms] ${m}`);
(async () => {
  log('pool created max=2');
  const p = Promise.all([
    pool.query('select u.* from public.universities u order by u.name'),
    pool.query('select * from public.cities order by slug'),
  ]);
  const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('TIMEOUT 15s')), 15000));
  try {
    const [u, c] = (await Promise.race([p, timeout])) as [{rows: unknown[]},{rows: unknown[]}];
    log(`OK unis=${u.rows.length} cities=${c.rows.length}`);
  } catch (e) { log('FAILED: ' + (e as Error).message); }
  await pool.end(); process.exit(0);
})().catch(e => { log('TOP ERR: ' + e.message); process.exit(1); });
