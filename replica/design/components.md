# Component specs — Studdy AI clone

Icons: Lucide React (MIT). Fonts: Inter (open). No Studdy logos, icons or copy are reused.

## Button
- variants: primary, secondary, ghost, danger
- sizes: sm (32px), md (40px), lg (48px)
- states: default, hover, active, focus-visible (2px ring, accent), disabled, loading
- tokens: bg/accent (primary), text/on-accent, radius md, font sm/600
- a11y: real `<button>`, visible focus ring, loading keeps the label for screen readers
- used on: S01 (download, get started), S02 (sign in), S04 (regenerate step)

## Input
- variants: default, error
- states: default, focus (border accent + ring), disabled, error
- tokens: border/border-input, bg/surface, text, radius md
- a11y: associated `<label>`, `aria-invalid` on error, error text via `aria-describedby`
- used on: S02 (email, password), S05 (chat input)

## FilePicker / UploadZone
- variants: drag-zone, camera-button, browse-button
- states: empty, uploading, error
- tokens: border dashed, surface bg, accent on hover
- a11y: role="button" on drag zone, accept attributes, error announced
- used on: S03

## WhiteboardCanvas
- variants: infinite, step-locked
- states: default, drawing, loading, error
- tokens: bg surface, border, shadow card
- a11y: role="region" with aria-label, keyboard navigation between steps announced
- used on: S04, S07

## StepCard
- variants: pending, done, failed
- states: default, active (current step being taught)
- tokens: bg surface, border, shadow card, radius lg
- used on: S04

## TutorMessage / MessageBubble
- variants: ai, student
- states: default, typing, loading
- tokens: bg (ai: surface, student: accent), text (ai: text, student: on-accent), radius lg
- a11y: role="message" or aria-live="polite" for AI updates
- used on: S04, S05

## QuestionCard
- variants: multiple-choice, free-answer
- states: unanswered, correct, wrong, revealed
- tokens: border, bg surface, danger (wrong), success (correct), text
- a11y: role="radio" group for options, announced correctness
- used on: S06

## TestimonialCard
- variants: default
- states: default
- tokens: bg surface, border, text-muted for attribution
- used on: S01

## NavBar
- variants: mobile, desktop
- states: default, scrolled, open menu
- tokens: bg, border, text, shadow card
- a11y: aria-expanded on mobile menu toggle, trap focus when open
- used on: all

## EmptyState
- variants: no-materials, no-lessons, error
- states: default
- tokens: text-muted, icon accent-muted
- used on: S03, S04, S06

## Toast
- variants: success, error, info
- states: default, auto-dismiss
- tokens: bg surface, border, text, danger/success accents
- a11y: role="alert", announced
- used on: S03, S04, S06

## Contrast report
Run: `python3 contrast.py replica/design/tokens.json` — zero AA failures expected
(see `replica/design/contrast-report.txt`).
