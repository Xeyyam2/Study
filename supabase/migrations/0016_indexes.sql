-- 0016_indexes.sql — Performance indexes for filtering and search (FAZA 4.5)
create index if not exists idx_university_programs_category_slug
  on public.university_programs (program_id);
create index if not exists idx_university_programs_tuition_fee
  on public.university_programs (tuition_fee);
create index if not exists idx_programs_name_en_trgm
  on public.programs using gin (name_i18n ->> 'en' gin_trgm_ops);
create index if not exists idx_university_programs_university_id
  on public.university_programs (university_id);
