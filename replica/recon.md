# Recon map: Studdy AI (web + iOS + Android)

Scope: the AI whiteboard tutor core loop — a student uploads study material, an AI tutor teaches it step-by-step on an interactive whiteboard, and the student asks follow-up questions and gets practice questions generated from their own material.

For: a user building their own AI tutoring product (students from middle school through college, any subject).

Date: 2026-11-18

## Sources

| # | source | URL | notes |
| --- | --- | --- | --- |
| 1 | marketing site (homepage) | https://studdyai.com | pitch, use cases, three-step flow, testimonials, university trust bar |
| 2 | mobile app page | https://studdyai.com/mobile-app | App Store / Google Play links, ratings, app screenshots, user reviews |
| 3 | partnerships page | https://studdyai.com/partnerships | B2B angle: widget integration, white-label, schools/LMS/publishers/tutoring centers |
| 4 | contact page | https://studdyai.com/contact | support emails, no feature data |
| 5 | App Store / Google Play listings | app stores (not fully fetchable) | 10+ million problems explained, 4.8 rating, 500K+ downloads, photo-of-problem flow |

## Core loop

A student uploads notes, slides, a textbook page or a photo of a homework problem → Studdy's AI tutor builds and teaches a lesson step-by-step on an interactive whiteboard → the student interrupts, asks for another explanation, or gets practice questions generated from their own material.

## Screens

| ID | screen | route / how to reach | purpose | key components | states seen |
| --- | --- | --- | --- | --- | --- |
| S01 | Landing / homepage | / | explain value, drive sign-up / app download | hero, use-case cards, trust bar (universities), testimonials, download buttons | empty, filled |
| S02 | Get Started / sign-up | /sign-in | create account (email or Google) | auth form, social buttons | empty, loading, error |
| S03 | Upload | in-app (after sign-in) | upload notes, textbook, homework photo/PDF | file picker, camera, drag zone | empty, loading, error |
| S04 | Whiteboard lesson | in-app, after upload | AI teaches material step by step on infinite canvas | whiteboard canvas, step cards, diagram/graph renderer, tutor message bubble | empty, loading, filled, error |
| S05 | Ask follow-up / chat | overlay on whiteboard | ask a question, request another example | chat input, message list | empty, loading |
| S06 | Practice questions | in-app, from lesson | AI-generated questions from the user's material | question card, answer input, explanation reveal | empty, filled, correct/wrong |
| S07 | Mobile app (photo of problem) | iOS / Android app | snap a photo of a problem, get step-by-step breakdown | camera, photo review, result whiteboard | empty, loading, filled |
| S08 | B2B widget embed | partner site/LMS | embedded Studdy tutor widget | StuddyWidget mount, iframe | empty, filled |

## Flows

```
F01 Student learns from their own material
    S02 sign up -> S03 upload -> S04 whiteboard lesson -> S05 ask follow-up -> S06 practice questions
    happy path clicks: ~6
    edge: upload fails / unsupported file, no slots (N/A), AI refuses to answer (safety guardrail), photo too blurry

F02 Guest tries the app without signing up
    S01 landing -> (CTA) -> S02 sign up (gate)
    happy path clicks: ~2
    edge: sign-up required before any lesson

F03 School embeds the tutor widget
    S08 widget on partner page -> student asks question -> whiteboard lesson
    happy path clicks: ~3
    edge: API key missing, context not passed
```

## Components

| component | variants | states | used on |
| --- | --- | --- | --- |
| Whiteboard canvas | infinite, step-locked | default, drawing, loading, error | S04, S07 |
| Tutor message bubble | AI, student | default, typing, loading | S04, S05 |
| File picker / upload zone | drag, camera, browse | empty, uploading, error | S03 |
| Question card | multiple choice, free answer | unanswered, correct, wrong, revealed | S06 |
| Download / store button | App Store, Google Play | default, hover | S01 |
| Testimonial card | quote, student name/role | default | S01 |
| Nav bar | mobile, desktop | default, scrolled, open menu | all |

## Inferred data model

```
User  id, email, name, password_hash, provider (email | google), plan (free | pro), grade_level, created_at
      evidence: S02 sign up, partnerships page (school accounts)
      confidence: medium
Material  id, user_id, file_url, file_type (pdf | image | text), title, uploaded_at, page_count
          evidence: S03 upload, S04 lesson built from material
          confidence: high
Lesson  id, material_id, user_id, topic, steps (json), status (pending | done | failed), created_at
        evidence: S04 whiteboard lesson
        confidence: high
Step  id, lesson_id, order_index, content, diagram_url, explanation, status
      evidence: S04 step-by-step whiteboard
      confidence: medium
Question  id, lesson_id, user_id, prompt, options (json), correct_answer, explanation, attempted_at, is_correct
          evidence: S06 practice questions
          confidence: medium
Message  id, lesson_id, user_id, role (user | assistant), content, created_at
         evidence: S05 follow-up chat
         confidence: high
```

Relationships: User 1-n Material, Material 1-n Lesson, Lesson 1-n Step, Lesson 1-n Question, Lesson 1-n Message, User 1-n Lesson/Question/Message

## Feature matrix

See `features.csv`. Must: 9, should: 5, could: 4, skip: 1.

## Out of scope (cannot or should not be cloned)

- Studdy's trained models and the underlying AI tutor (third-party/proprietary AI — use your own model or provider instead)
- The partner/school network and white-label deals (B2B relationships, not product features)
- Licensed textbook / curriculum content
- App Store / Google Play review content and ratings (belong to Studdy)

## Size

Screens: 8, flows: 3, entities: 6. Hard parts: real-time whiteboard rendering, AI-generated step-by-step lessons from arbitrary uploads, practice-question generation from user material, mobile photo capture + OCR-ish problem extraction. Size: M (a few weeks for the web MVP; L if including native mobile apps).

## Next step

Run `/replica-architect` to turn this recon map into a stack choice, SQL schema and API plan.
