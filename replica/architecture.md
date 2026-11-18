# Architecture: Studdy AI clone (a rebuild of Studdy AI's core features)

## Stack

| layer | choice | why |
| --- | --- | --- |
| web | Next.js (App Router) + TypeScript | managed, documented, cheap at zero users, good Server Actions for mutations |
| styling | Tailwind CSS + design tokens from replica-design | consistent component system, easy dark mode |
| database | Postgres on Neon | serverless Postgres, generous free tier, good Drizzle support |
| ORM | Drizzle ORM | type-safe, close to SQL, good Postgres JSONB support |
| auth | Auth.js (NextAuth) | self-hosted, email + Google providers, no vendor lock-in |
| payments | Stripe Checkout + Billing | only if a paid tier is added later; not in MVP must-haves |
| email | Resend | transactional emails (welcome, reset, lesson ready) |
| jobs | Vercel Cron + Inngest (or Next.js background tasks) | lesson generation, question generation, cleanup |
| files | Supabase Storage or Cloudflare R2 | user uploads (PDFs, images) |
| hosting | Vercel | zero-config for Next.js |

One database, no microservices. The clone needs Studdy's features, not Studdy's architecture.

## Schema

Tables: 7 (users, materials, lessons, steps, messages, questions, uploads). Access rules: data-layer authorization checks (every query filters by `user_id`); RLS can be added later on Supabase.

See `replica/schema.sql`.

## API

| method path | does | who | input | output | flow |
| --- | --- | --- | --- | --- | --- |
| POST /api/auth/... | Auth.js handlers (sign in, sign out, callback) | guest | credentials/provider | session | F02 |
| POST /api/upload | start an upload (presigned URL or direct) | authenticated user | file, type | upload url, upload id | F01 |
| POST /api/materials | register uploaded material | authenticated user | upload id, title, file_type | material | F01 |
| POST /api/lessons | request lesson generation from a material | authenticated user | material_id | lesson (pending) | F01 |
| GET /api/lessons/:id | get lesson + steps | lesson owner | lesson id | lesson, steps[] | F01 |
| POST /api/lessons/:id/steps/:step/regenerate | ask "explain again" for a step | lesson owner | step id | regenerated step content | F01 |
| POST /api/messages | send follow-up question | lesson owner | lesson_id, content | assistant message | F01 |
| GET /api/lessons/:id/questions | list practice questions | lesson owner | lesson id | questions[] | F01 |
| POST /api/questions/:id/answer | submit an answer, get correctness + explanation | question owner | question id, answer | is_correct, explanation | F01 |
| POST /api/webhooks/resend | email delivery webhook (bounce, etc.) | system | Resend event | 200 | — |

Webhooks in: Resend (bounce/delivery). Webhooks out: none.
Jobs: `generate-lesson` (on lesson creation), `generate-questions` (on lesson done), `cleanup-uploads` (daily, delete orphan uploads older than 24h).

## The parts that bite

- **time zones:** not core to this MVP (no scheduling); store all timestamps as `timestamptz` in UTC anyway.
- **idempotency:** lesson/question generation jobs must be idempotent — a retry must not duplicate steps or questions (use a `generation_job_id` unique key).
- **races:** two concurrent "regenerate step" requests could diverge; serialize per lesson with an advisory lock or a `status` transition guard.
- **file size limits:** cap uploads at 20 MB, reject non-PDF/image types at the API layer.
- **realtime:** none required for MVP; whiteboard is a read-only rendered canvas (step-by-step, not collaborative drawing).
- **offline:** none for MVP.
- **email deliverability:** welcome + password reset via Resend; monitor bounces.
- **multi-tenancy:** not needed (single-user app, `user_id` scoping only).
- **GDPR deletion:** `DELETE /api/account` cascades user data (materials, lessons, steps, messages, questions, uploads) via `on delete cascade`.

## Build order

1. **Vertical slice:** S01 (landing), S02 (sign up), S03 (upload), S04 (whiteboard lesson) — tables: users, materials, lessons, steps — routes: auth, upload, materials, lessons, get lesson. Proves the stack end to end.
2. **Must-haves:** S05 follow-up chat (messages), S06 practice questions (questions, answer submit), email notifications.
3. **Should-haves:** mobile photo flow (S07) via web camera upload, grade-level/subject selection.
4. **Could-haves:** analytics dashboard, Stripe payments, embeddable widget (S08).
5. **Fixes from replica-entrepreneur:** applied once that skill has run.

## Next step

Run `/replica-design` to turn this into design tokens and component specs, then `/replica-build` for the screens.
