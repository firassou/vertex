# Implement Vertex Design System

## Goal

Establish the foundational design system for Vertex from `design/vertex-designsystem.png`: color tokens, typography, spacing, radius/shadows, icons, and the reusable primitives (buttons, inputs, badges, status indicators, progress bar, cards, nav/breadcrumbs/pagination) that every later page (catalog, course, lesson, search) will be built from. This prompt covers the system and its primitives, not the actual app pages — those come later against their own reference images (`vertex-home.png`, `vertex-course.png`, `vertex-lesson.png`, `vertex-search.png`).

## Skills / references read

- `AGENTS.md` section 3 (UI work: reproduce reference exactly, reuse patterns, responsive down to mobile) and section 6 (tech stack).
- No specialized skill applies directly (no Sanity/Clerk/PostHog involved) — this is pure Tailwind/Next.js frontend work per section 4's fallback ("follow package docs and existing patterns").

## Current state inspected

- Fresh `create-next-app` project at repo root (single `app/` workspace so far — the Studio/web split in AGENTS.md section 5 hasn't been done yet; out of scope for this prompt).
- `app/globals.css`: Tailwind v4 (`@import "tailwindcss"`), only `--background`/`--foreground` tokens, Geist fonts.
- `app/layout.tsx`: loads Geist Sans/Mono, generic metadata.
- `app/page.tsx`: default Next.js starter content — will be replaced.
- No component library, no icon package, no `prompts/` directory (created now) yet.
- Tailwind v4 default spacing scale already uses a 4px base (`1 = 4px`), so the spec's spacing scale (4/8/12/16/24/32/40/48/64) is Tailwind's default `1/2/3/4/6/8/10/12/16` — no custom spacing tokens needed, just documented usage.

## Decisions & assumptions

1. **Fonts**: replace Geist with `Playfair Display` (display) and `Inter` (body/UI) via `next/font/google`, both confirmed available. Expose as `--font-display` / `--font-sans` CSS variables.
2. **Tokens live in `app/globals.css`** using Tailwind v4's `@theme` (not a `tailwind.config.ts`, since v4 is CSS-first): primary 100–500, neutral 50–900 + white, the 8-step type scale as named font-size tokens with paired line-heights, radius tokens (xs/sm/md/lg/xl/full), and shadow tokens (sm/md/lg/xl) using the exact rgba values shown.
3. **Icons**: add `lucide-react`. Its default stroke icons (24×24, 2px stroke, rounded caps) match the spec's outline spec almost exactly, and it has every icon shown (bell, search, play, file-text, bookmark, bar-chart-2, clock, user, chevron-right, lock, check-circle, play-circle). I will not build a separate "filled" icon set — the spec shows filled as an alternate style, not a component that any listed pattern (buttons/badges/status/cards) actually needs; if a filled look is needed later I'll use `fill="currentColor"` on the specific lucide icon. Flagging this as a scope call, not silently skipping it.
4. **Component location**: `app/components/ui/` (Button, Input, Select, Badge, StatusIndicator, ProgressBar, Logo) and `app/components/cards/` (CourseCard, VideoLessonCard, LessonCard, ResourceCard), plus `app/components/nav/` (NavBar, Breadcrumbs, Pagination). Plain React/Tailwind, no headless-UI dependency added (none of these need one — select is a native `<select>` styled to spec).
5. **Logo**: the "V" triangle mark + "Vertex" wordmark has no source asset, so I'll build it as a small inline SVG component (`Logo`), matching the mark's proportions from the reference image.
6. **Verification page**: add a route at `/style-guide` that renders every token and primitive (colors swatches, type scale, buttons in all variants/states, inputs, badges, status indicators, progress bar, all four card types, nav/breadcrumbs/pagination) so the system can be visually diffed against `vertex-designsystem.png` in the browser. This route is scaffolding for this task, not a product page — I will note it's removable once real pages exist, but leaving it in is harmless and useful for future component QA, so I'll keep it unless told otherwise.
7. **Dark mode**: the reference is light-mode only and AGENTS.md says nothing about dark mode as a requirement. I will keep the app light-only and remove the starter's `prefers-color-scheme` dark overrides rather than maintain a dark palette nobody designed.
8. **No Tailwind config file**: stay CSS-first (v4 default already in this project), matching what's already set up.

## Files expected to touch

- `app/globals.css` — rewrite: font vars, color tokens, type-scale tokens, radius/shadow tokens, base body styles.
- `app/layout.tsx` — swap Geist for Playfair Display + Inter, update metadata (title "Vertex").
- `app/page.tsx` — replace starter content (will be superseded by the real home page later; for now, redirect or minimal placeholder isn't in scope — simplest is to leave it rendering the style guide's summary or just a minimal "Vertex" placeholder). **Decision**: leave `app/page.tsx` as a minimal placeholder (not the style guide) since `/style-guide` is the dedicated QA route and `/` will become the real catalog/home page in a later task.
- New: `app/components/ui/Button.tsx`, `Input.tsx`, `Select.tsx`, `Badge.tsx`, `StatusIndicator.tsx`, `ProgressBar.tsx`, `Logo.tsx`.
- New: `app/components/cards/CourseCard.tsx`, `VideoLessonCard.tsx`, `LessonCard.tsx`, `ResourceCard.tsx`.
- New: `app/components/nav/NavBar.tsx`, `Breadcrumbs.tsx`, `Pagination.tsx`.
- New: `app/style-guide/page.tsx` — demo page assembling everything for visual QA.
- `package.json` — add `lucide-react`.

## Requirements (from the reference image)

- **Colors**: Primary 500 `#F97316` … 100 `#FFEEE5`; Neutral 900 `#0F172A` … 50 `#FAFAFC`, plus white.
- **Type scale**: Display 1 48/56 Bold Playfair (page titles), Display 2 36/44 Bold Playfair (section titles), Heading 1 28/36 SemiBold Inter (card titles), Heading 2 22/30 SemiBold Inter (sub section), Heading 3 18/26 Medium Inter (small titles), Body Large 16/24 Regular Inter, Body 14/20 Regular Inter, Small 12/16 Regular Inter.
- **Radius**: xs 4, sm 8, md 12, lg 16, xl 24, full (circle).
- **Shadows**: sm `0 1px 2px 0 rgba(15,23,42,.05)`, md `0 4px 12px -2px rgba(15,23,42,.08)`, lg `0 12px 24px -4px rgba(15,23,42,.10)`, xl `0 20px 40px -8px rgba(15,23,42,.12)`.
- **Buttons**: Primary (solid orange), Secondary (orange outline), Tertiary (text + external-link icon), Text (underline-on-hover link with icon) — each with default/hover/disabled states. Height 44px, padding 16px(lg)/12px(md), radius 12px, font Inter Medium 14–16px.
- **Inputs**: search/text input with left search icon + `⌘K` hint on the right; select with chevron. Height 44px, radius 12px, border `1px solid #E2E8F0`, padding 16px, focus border `#FB923C`.
- **Badges**: VIDEO (dark/neutral solid), LESSON (light neutral outline/soft), POPULAR (orange soft) — small pill, uppercase, bold-ish small text.
- **Status indicators**: In Progress (orange ring/spinner), Completed (green check), Now Playing (orange play dot), Locked (gray lock) — icon + label.
- **Progress bar**: track + orange fill + percentage label ("35% complete").
- **Cards**: Course card (thumbnail/avatar block, title, description, level · duration · module-count meta row), Video Lesson card (VIDEO badge, title, description, "Lesson 5.1 · 12:45" meta + "Watch from 12:45" text-button), Lesson card (LESSON badge, title, description, "Module 5" meta + "View lesson" text-button), Resource card (file icon, title, description, "PDF · 1.2 MB" meta + download icon).
- **Nav**: logo + "Courses" / "My Learning" links (top nav bar). Breadcrumbs: "All Courses > Course name > Lesson name". Pagination: prev/next chevrons + numbered pages with ellipsis.

## Security considerations

None — static presentational primitives only, no data fetching, no secrets, no user input handling beyond controlled form elements.

## Acceptance criteria

- `/style-guide` renders all sections above and visually matches `vertex-designsystem.png` (colors, type scale, spacing, radius/shadow, buttons in every state, inputs, badges, status indicators, progress bar, all 4 card types, nav/breadcrumbs/pagination).
- All primitives are typed React components with sensible prop APIs (variant/size/state props, not one-off classNames scattered per usage).
- Site is responsive down to mobile width without breaking (nav collapses sensibly, cards stack).
- No hardcoded hex colors outside `globals.css` tokens — components reference Tailwind classes generated from the theme tokens.
- Typecheck and lint pass; production build succeeds.

## Checks to run

- `pnpm lint`
- `pnpm exec tsc --noEmit` (or `npx tsc --noEmit`)
- `pnpm build`
- `pnpm dev` and manually verify `/style-guide` in the browser against the reference image.

## Manual test steps

1. Run `pnpm dev`, open `http://localhost:3000/style-guide`.
2. Compare side-by-side with `design/vertex-designsystem.png`: color swatches, type scale samples, spacing scale, radius/shadow samples.
3. Check each button variant in default and disabled state; hover each to confirm hover styling; tab-focus an input to confirm the orange focus border.
4. Confirm badges (VIDEO/LESSON/POPULAR), status indicators (in progress/completed/now playing/locked), and the progress bar match colors and shapes.
5. Confirm all four card types render with correct badge, title (Playfair? — no, card titles are Heading 1/Inter per the scale), meta row, and action.
6. Resize the browser to ~375px width and confirm the nav, cards, and style-guide layout reflow without horizontal scroll or overlap.
7. Run `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build`, confirming all three succeed.
