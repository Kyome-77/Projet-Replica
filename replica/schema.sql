-- Studdy AI clone schema (Postgres, Drizzle-friendly)
-- Run on Neon / Supabase Postgres. Access rules enforced in the data layer
-- (every query filters by user_id); RLS can be enabled later.

create table users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  password_hash text,
  provider text not null default 'email' check (provider in ('email','google')),
  plan text not null default 'free' check (plan in ('free','pro')),
  grade_level text,
  email_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table materials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  file_url text not null,
  file_type text not null check (file_type in ('pdf','image','text')),
  title text not null,
  page_count integer,
  status text not null default 'uploaded' check (status in ('uploaded','processed','failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on materials (user_id);
create index on materials (status);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  material_id uuid not null references materials(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  topic text not null,
  steps jsonb not null default '[]',
  status text not null default 'pending' check (status in ('pending','done','failed')),
  generation_job_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on lessons (user_id);
create index on lessons (material_id);
create index on lessons (status);

create table steps (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  order_index integer not null,
  content text not null,
  diagram_url text,
  explanation text,
  status text not null default 'done' check (status in ('pending','done','failed')),
  created_at timestamptz not null default now()
);
create index on steps (lesson_id, order_index);

create table messages (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  content text not null,
  created_at timestamptz not null default now()
);
create index on messages (lesson_id, created_at);
create index on messages (user_id);

create table questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  prompt text not null,
  options jsonb not null default '[]',
  correct_answer text not null,
  explanation text,
  status text not null default 'unanswered' check (status in ('unanswered','answered')),
  created_at timestamptz not null default now()
);
create index on questions (lesson_id);
create index on questions (user_id);

create table question_attempts (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references questions(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  answer text not null,
  is_correct boolean not null,
  attempted_at timestamptz not null default now()
);
create index on question_attempts (question_id, user_id);

create table uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  storage_key text not null unique,
  file_name text not null,
  file_size integer not null,
  mime_type text not null,
  status text not null default 'pending' check (status in ('pending','completed','failed')),
  created_at timestamptz not null default now()
);
create index on uploads (user_id);
create index on uploads (status);

-- GDPR: account deletion cascades through on delete cascade on user_id everywhere.
