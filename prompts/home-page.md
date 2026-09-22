# Implement the Vertex Home Page

## Goal

Build the `/` route from `design/vertex-home.png`: top nav (with auth affordances), hero section with headline, subheadline, "Explore Courses" CTA, and a search input; an "All Courses" section showing 3 course cards with a "View all courses" link; and a footer strip ("New courses and lessons added every week.") with a decorative gradient bar-chart graphic at the bottom.

## Skills / references read

- AGENTS.md section 3 (UI work — reproduce reference exactly, responsive down to mobile, reuse existing components) and section 7 (search is a full results page reached via this search bar, not a chatbox — the home page only hosts the entry point, not results).
- No Sanity/Clerk/PostHog skill needed for this static page; those wire in later tasks (course data, auth state, search backend) per AGENTS.md section 5 boundaries.

## Current state inspected

- `app/page.tsx` currently renders a placeholder ("home page is coming soon").
- Design system already implemented (`prompts/design-system.md`): tokens in `app/globals.css`, primitives in `app/components/ui/` (Button, Input, Badge, Logo, ProgressBar, Select, StatusIndicator) and `app/components/cards/CourseCard.tsx`, plus `app/components/nav/NavBar.tsx`.
- `NavBar` currently renders only Logo + Courses/My Learning links — the reference shows a bell icon and a user avatar circle on the right, which don't exist yet. Clerk auth isn't wired up yet (that's a separate task), so I'll add a presentational bell + avatar placeholder to `NavBar` now, matching the reference, without real auth/notification logic — this matches AGENTS.md's note that the notifications bell is presentational-only (section 7) and that pages are read-only until their dedicated backend task.
- `CourseCard` already matches the reference shape (avatar/icon block, title, description, level/duration/modules meta row) — reuse as-is, just feed it the 3 sample courses shown (Next.js for Production, Docker Essentials, TypeScript Deep Dive).
- `Input` component already has the search-icon + `⌘K` shortcut hint pattern needed for the hero search bar — reuse as-is.
- `Button` component already supports primary variant with an icon (arrow) — reuse for "Explore Courses".
- No course data source exists yet (Sanity isn't wired). Since this is a static page task and AGENTS.md says build nothing beyond what's asked, I will hardcode the 3 sample courses shown in the reference image directly in `page.tsx` as local data, not fetch from Sanity. This will be replaced once the catalog/Sanity integration task happens.
- No routes exist yet for `/courses`, `/courses/[slug]`, or search — the CTA, "View all courses" link, and search bar will link to `/courses` and a `/search` route respectively (paths only, pages not built here); the search input on hover/Enter is out of scope for this task (no live search wiring) since AGENTS.md section 5 says the search route/UI is a distinct backend+frontend task. I will make the search input a form that navigates to `/search?q=...` on submit, matching the intended destination without building the search page itself.

## Decisions & assumptions

1. **Course data**: hardcode the 3 courses from the reference (title, one-line description, level, duration, module count, and an icon/avatar). The reference shows brand-style icons (Next.js "N" mark, Docker whale, TypeScript "TS" logo) rather than plain letter avatars — I'll approximate with colored badges matching the reference (black "N", blue Docker whale emoji/icon via lucide fallback isn't available, so I'll use simple colored square + text/icon blocks matching background colors shown: black/white "N", blue whale-ish via an inline icon or just "TS"-style blocks) since `CourseCard`'s `avatarLabel` prop only supports text. I will extend nothing structurally — I'll pass single/double character labels ("N", "TS") and for Docker use a simple whale silhouette isn't in lucide; I'll use the "Container" or "Box" lucide icon on a blue background as the closest reasonable stand-in, documented as an approximation since no real asset exists.
2. **NavBar update**: add a bell icon button (lucide `Bell`) and a circular user avatar image placeholder (initials fallback, since no Clerk user session exists yet) to the right side of `NavBar`, matching the reference's right-aligned icon+avatar cluster. This changes the shared `NavBar` component, so it affects every page that uses it — acceptable since it's a straight visual match to the reference and doesn't add real auth logic.
3. **Hero copy**: reproduce exactly — eyebrow badge "INTELLIGENT LEARNING", Playfair Display headline "Search your learning in plain English." (two lines as shown), Inter subheadline, primary CTA "Explore Courses" with arrow icon, then the search bar below with placeholder "Ask anything about your learning..." and a "⌘K" hint.
4. **Section header**: "All Courses" (Playfair, Display-2-ish per existing heading scale) with a "View all courses" text link + arrow on the right, matching existing `Button` `text` variant or a plain link — I'll use a plain styled `Link` with an arrow icon to match the orange text-link style shown (not the `Button` `text` variant, which is black; I'll add an inline orange link style consistent with existing token usage, no new component needed).
5. **Footer strip**: a horizontal-rule-flanked line with a star icon and "New courses and lessons added every week." centered, then a decorative gradient bar-chart graphic spanning the bottom edge. I'll build the bars as a row of divs with varying heights and a orange-to-transparent gradient (using existing primitive-300/500 tokens), purely decorative (`aria-hidden`), no new dependency (no chart lib) since it's static decoration, not data visualization.
6. **Responsiveness**: stack the 3 course cards to 1 column on mobile, keep hero text/CTA/search centered and full-width with padding, keep nav's right cluster (bell+avatar) visible but shrink link spacing if needed. No mobile reference exists so I'll follow AGENTS.md section 3's general instruction (stack columns, sensible collapse).
7. **New route stubs**: I will NOT create `/courses`, `/courses/[slug]`, `/search`, or `/my-learning` pages — only link to their paths. Not creating placeholder pages keeps scope to "home page" as requested; broken links to not-yet-built routes are expected and acceptable at this stage of the project.

## Files expected to touch

- `app/page.tsx` — rewrite with hero, search bar, courses section, footer strip.
- `app/components/nav/NavBar.tsx` — add bell icon + avatar placeholder on the right.
- Possibly a new small local component for the hero/footer decorative bars if `page.tsx` gets too large — likely kept inline since this is a single page composition, not a reusable primitive.

## Requirements (from the reference image)

- Nav: logo left, "Courses"/"My Learning" links center-left, bell icon + circular avatar photo on the right, bottom border, white background.
- Hero (centered, max-width constrained, generous vertical padding): small pill badge "INTELLIGENT LEARNING" (orange-tinted), large two-line Playfair headline, gray subheadline (2 lines), orange primary button "Explore Courses" with right arrow, search input below (full width within a constrained max-width) with left search icon, placeholder text, and right-aligned "⌘K" hint pill.
- "All Courses" section: Playfair section heading left, orange "View all courses →" link right, 3-column card grid below (course cards as already built), divider rule above the section.
- Footer strip: divider rule, centered row with star icon (outline, orange) + gray text "New courses and lessons added every week.", divider rule; below that a full-width decorative gradient bar chart (orange bars of varying height fading to transparent/white at top), bleeding to the container edges.
- Background is the app's neutral-50 off-white throughout.

## Security considerations

None — static presentational page, no data fetching, no user input persisted (search form only navigates), no secrets involved.

## Acceptance criteria

- `/` visually matches `design/vertex-home.png` at desktop width: nav, hero copy/CTA/search, 3 course cards with correct sample data, footer strip and gradient bars.
- Responsive down to ~375px: no horizontal scroll, cards stack to 1 column, hero and search remain usable and centered.
- Uses only existing design-system primitives/tokens (Button, Input, CourseCard, Logo) plus lucide-react icons already in use; no new hardcoded hex colors.
- Search form submit navigates to `/search?q=<query>` without erroring (target page not built yet, so this will 404 until that task — acceptable per scope).
- Typecheck, lint, and build pass.

## Checks to run

- `pnpm lint`
- `pnpm exec tsc --noEmit`
- `pnpm build`
- `pnpm dev` and manually verify `/` in the browser against the reference image.

## Manual test steps

1. Run `pnpm dev`, open `http://localhost:3000/`.
2. Compare against `design/vertex-home.png`: nav layout (bell + avatar present), hero headline/subhead/CTA/search bar, "All Courses" heading + "View all courses" link, 3 course cards with matching titles/descriptions/meta, footer strip with star + text, gradient bar graphic at the very bottom.
3. Click "Explore Courses" and confirm it links toward `/courses` (404 expected, route not built yet).
4. Type a query into the search input and press Enter; confirm the URL becomes `/search?q=<query>` (404 expected, route not built yet).
5. Resize the browser to ~375px width and confirm no horizontal scroll, course cards stack to one column, hero/search remain centered and readable.
6. Run `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm build`, confirming all three succeed.
