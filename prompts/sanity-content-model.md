# Implement the Sanity Content Model, Studio, and Server Read Layer

## Goal

Split the project into the two standalone workspaces AGENTS.md section 5 requires (`studio/` and `web/`), build the Sanity schema for course, module, lesson, instructor, and category (section 8), wire up Studio structure, and add the server-only Sanity read client, fetch helper, and GROQ queries in `web/`. Along the way, fix the runtime error caused by the current embedded-Studio setup. This prompt does not touch video documents, the agent context document, progress tracking, or any page's data (catalog/course/lesson pages keep their current static content) — those are separate, later tasks per AGENTS.md sections 4/9/10.

## Skills / references read

- `AGENTS.md` sections 2, 5, 6, 7, 8, 12, 13 — two-workspace architecture, tech stack, fixed data shape, the "never embed Studio" rule and why, checks to run.
- `sanity-best-practices` skill → `references/project-structure.md` (monorepo `studio/` + `web/` shape), `references/nextjs.md` (§1 and §5: why embedded Studio is wrong, exact migration steps, standalone Studio setup), `references/schema.md` (defineType/defineField/defineArrayMember, references vs nested objects, icons), `references/typegen.md` (cli config, monorepo typegen path).

## Current state inspected

- The repo is currently a **single embedded-Studio app**: root `package.json`/`app/`/`sanity.config.ts`/`sanity.cli.ts` are one Next.js project, with Studio mounted at `app/studio/[[...tool]]/page.tsx` via `NextStudio`. This directly violates AGENTS.md section 5 ("do not embed the Studio inside Next.js") and section 6/12.
- **Confirmed runtime error**: with `pnpm dev` running, `GET /studio` 500s. `.next/dev/logs/next-development.log` shows `Error: Clerk: auth() was called but Clerk can't detect usage of clerkMiddleware()`. Root cause: `app/layout.tsx` wraps every route (including the embedded `/studio` route) in `NavBar`, which calls Clerk's `<Show>` (i.e. `auth()`) on the server; the Studio route has `export const dynamic = 'force-static'`, so it's prerendered without middleware ever running, and Clerk can't detect its own middleware for that render. Excluding `/studio` from the Clerk matcher would silence the symptom but leaves the architecture violation in place. Moving Studio out to its own standalone workspace removes the route entirely and fixes this at the root.
- `sanity/schemaTypes/index.ts` currently exports `{ types: [] }` — no schema exists yet.
- `sanity/lib/client.ts`, `image.ts`, `live.ts`, `env.ts` exist but are client-shaped for the embedded setup (no read token, `defineLive` would need a `browserToken` exposed to the browser, which conflicts with section 5's "browser holds no token" rule).
- `pnpm-workspace.yaml` has no `packages:` field yet — pnpm doesn't actually treat this as a workspace today despite the filename.
- Sanity CLI is already authenticated (`npx sanity debug`) and the project exists: project id `3ivyge2t`, dataset `production`, CORS already allows `http://localhost:3000` and `http://localhost:3333`. No read API token exists yet.
- `.env.local` / `.env.example` currently hold Clerk vars + `NEXT_PUBLIC_SANITY_PROJECT_ID`/`NEXT_PUBLIC_SANITY_DATASET` at the repo root.
- `app/components/` (design system + cards + nav) and `app/page.tsx` (static hardcoded course data) are unaffected in content — they just move to `web/app/` as-is.

## Decisions & assumptions

1. **Two workspaces, `studio/` and `web/`**, matching the skill's recommended monorepo shape exactly. `web/` becomes the Next.js app (everything currently at repo root except Sanity Studio config), `studio/` becomes a standalone Vite-based Sanity Studio with its own `package.json`.
2. **Delete the embedded Studio route** (`app/studio/[[...tool]]/`) and the root `sanity.config.ts`/`sanity.cli.ts`. This is the actual fix for the runtime error, not a band-aid on the Clerk matcher.
3. **Scope of schema**: only `course`, `courseModule` (object, embedded — not a document, per section 8: "A module is an embedded object inside a course, not its own document"), `lesson`, `instructor`, `category`, plus two small supporting objects (`learningOutcome`, `lessonResource`) that section 8 calls out as structured sub-fields. No `video` document, no `agentContext` document, no progress schema — those belong to the video-ingestion, search-config, and progress tasks respectively and are out of scope here (AGENTS.md: "Build nothing beyond that").
4. **No stored ordinal/numbering fields.** Module and lesson numbers ("Module 5", "Lesson 5.1") are derived from array position at render time per section 8 — never stored.
5. **Lesson does not reference its course.** Per section 8, derive the parent course via a reverse GROQ lookup (`references(^._id)`). `LESSON_BY_SLUG_QUERY` includes this reverse lookup so a future lesson page can compute module/lesson numbering without a second round trip.
6. **Field type choices** (not fixed by AGENTS.md, chosen sensibly):
   - `course.level`: string with `options.list` (Beginner/Intermediate/Advanced) per the schema skill's "boolean vs list" guidance.
   - `course.price`: number.
   - `course.popular`: boolean (genuinely binary, matches the "optional popular flag" wording).
   - `lesson.duration`: string (e.g. `"12:45"`), matching how duration is displayed everywhere in section 11's card copy — not stored as raw seconds since nothing in scope needs arithmetic on it.
   - `lesson.notes`: Portable Text (`array of block`), no custom marks/blocks beyond Studio defaults — section 8 just says "rich text notes."
   - `lesson.keyPoints`: array of plain strings (a short bullet list, not a modeled sub-object — nothing in section 8 gives key points their own sub-fields).
   - `lessonResource.type`: string with `options.list` (`pdf`, `link`, `code`, `download`) as a reasonable closed set; `url` uses `type: 'url'` validation.
   - `instructor.expertise`: array of strings (tags), matches "expertise" as a short list, not a modeled object.
   - All images (`course.coverImage`, `lesson.poster`, `instructor.photo`) use `type: 'image'` with `options.hotspot: true` per the image skill's default guidance, and are optional (content will be filled in Studio later) except where AGENTS.md's phrasing implies it's core to the type — I'm not adding `validation.required()` to images/media so authors can create a document and fill it in incrementally; `title`/`slug` are required everywhere since nothing renders without them.
   - Every document and object gets an icon from `@sanity/icons` per the schema skill's UX guidance (`DocumentTextIcon` for course/lesson, `UserIcon` for instructor, `TagIcon` for category).
7. **Studio structure stays the default** (`S.documentTypeListItems()`). A custom structure isn't warranted yet — five types with per-type icons already read cleanly in the default list, and AGENTS.md says not to overbuild.
8. **TypeGen**: enabled in `studio/sanity.cli.ts` (`typegen.enabled: true`, `path: "../web/**/*.{ts,tsx}"`, `generates: "../web/sanity.types.ts"`) so `sanity dev`/`sanity build` regenerate automatically, per the typegen skill's recommended automatic workflow. I'll also run the manual extract+generate once during implementation so `web/sanity.types.ts` exists and is committed (Option A from the skill: commit generated types — simplest for a two-workspace repo where `web`'s build shouldn't depend on `studio` being present).
9. **Server-only read client**: `web/sanity/lib/client.ts` reads `SANITY_API_READ_TOKEN` (no `NEXT_PUBLIC_` prefix) and imports the `server-only` package as its first line, so any accidental import from a Client Component fails the build instead of silently shipping (or failing to ship) a token. `useCdn` is `false` when a token is present (correct pattern for authenticated/private-dataset reads), `true` otherwise.
10. **Dropping `defineLive`/`SanityLive`.** The existing `sanity/lib/live.ts` uses `next-sanity/live`, which needs a `browserToken` reaching the client for its live-update loader. That conflicts with AGENTS.md's "the browser holds no token" rule and isn't needed for read-only pages. I'm replacing it with a plain `sanityFetch` wrapper (query/params/revalidate/tags) per the Next.js skill's "Manual sanityFetch Helper" pattern — still server-only, no client token. Live/Visual Editing can be added later as its own task if wanted.
11. **Queries scope**: `web/sanity/lib/queries.ts` gets one query per read the fixed data model implies is needed by an eventual page — course list, course by slug (with modules→lessons and instructor/category expanded), lesson by slug (with the reverse course lookup), instructor by slug (with their courses), category list. No pages are wired to call them yet (out of scope — the catalog/course/lesson pages still render their current static data until their own tasks).
12. **Env files are per-workspace**, not a single root file, since `web/` (Next.js) and `studio/` (Vite) load env differently and AGENTS.md's "canonical list" reads naturally as "canonical for what actually consumes it." `web/.env.example` documents Clerk vars + `NEXT_PUBLIC_SANITY_PROJECT_ID`/`DATASET` + `SANITY_API_READ_TOKEN` (blank). `studio/.env.example` documents `SANITY_STUDIO_PROJECT_ID`/`SANITY_STUDIO_DATASET` (Sanity's Vite-exposed env prefix). Root `.env.local`/`.env.example` are removed; their values move into `web/.env.local` (Clerk keys + Sanity project id/dataset, already known) and `studio/.env.local` (project id/dataset only, not secret).
13. **`SANITY_API_READ_TOKEN` is left blank** in `web/.env.local`, with a comment on where to create it. Creating API tokens is an account-level credential action — I won't script that without you present to say yes, so this is called out under "Needs your attention" after implementation rather than done silently.
14. **`next.config.ts` gets `images.remotePatterns` for `cdn.sanity.io`.** Without it, any future `next/image` use of `urlFor()` output 400s at request time — this is exactly the class of "fix runtime errors" issue AGENTS.md section 13 asks me to catch now that the image helper is part of the data layer being stood up.
15. **Root `package.json` becomes a thin workspace orchestrator** (`pnpm --filter web ...` / `pnpm --filter studio ...` scripts), no direct dependencies of its own. `pnpm-workspace.yaml` gets `packages: ["web", "studio"]`.
16. **README.md** gets a short rewrite of "Getting Started" to reflect the two dev servers (`pnpm dev` for the web app, `pnpm dev:studio` for Studio) — small, in scope since the current README's instructions are now wrong.

## Files expected to touch

**New — `studio/` workspace**
- `studio/package.json`, `studio/sanity.config.ts`, `studio/sanity.cli.ts`, `studio/tsconfig.json`, `studio/.gitignore`, `studio/.env.local`, `studio/.env.example`
- `studio/structure.ts`
- `studio/schemaTypes/index.ts`
- `studio/schemaTypes/documents/course.ts`, `lesson.ts`, `instructor.ts`, `category.ts`
- `studio/schemaTypes/objects/courseModule.ts`, `learningOutcome.ts`, `lessonResource.ts`

**Moved into `web/` workspace** (git mv, content otherwise unchanged): `app/` (minus `app/studio/`), `public/`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json`, `proxy.ts`, `package.json`

**New/rewritten in `web/`**
- `web/sanity/env.ts` (moved, unchanged), `web/sanity/lib/image.ts` (moved, unchanged)
- `web/sanity/lib/client.ts` (rewritten — token + `server-only`)
- `web/sanity/lib/fetch.ts` (new — `sanityFetch` helper)
- `web/sanity/lib/queries.ts` (new — GROQ queries)
- `web/sanity.types.ts` (generated by TypeGen)
- `web/next.config.ts` (add `images.remotePatterns`)
- `web/.env.local`, `web/.env.example`
- `web/package.json` (drop `sanity`, `@sanity/vision`, `@sanity/icons`-adjacent Studio deps, `styled-components`; add `server-only`)

**Removed**
- `app/studio/[[...tool]]/`, root `sanity.config.ts`, root `sanity.cli.ts`, `sanity/lib/live.ts`, root `.env.local`, root `.env.example`

**Edited at repo root**
- `pnpm-workspace.yaml` (add `packages:`)
- `package.json` (rewritten as orchestrator)
- `README.md` (Getting Started section)

## Requirements

- `web/` and `studio/` are independent `pnpm` packages under one `pnpm-workspace.yaml`; neither imports the other's app code.
- Studio has no dependency on Clerk, Next.js, or the web app's components.
- Web app has no Sanity Studio dependency (`sanity`, `@sanity/vision`) in its `package.json`.
- Schema matches AGENTS.md section 8 exactly for the five in-scope types: field names, reference vs. embedded-object shape (module embedded in course, lesson/instructor/category as their own documents), and the "lesson doesn't store its course" rule.
- The Sanity read client lives only in `web/sanity/lib/client.ts`, is marked `server-only`, and is the only place `SANITY_API_READ_TOKEN` is read.
- `pnpm dev` (web) and `pnpm dev:studio` (root, running Studio) both start cleanly with no runtime errors; visiting the web app produces no Clerk/middleware error in the server log.

## Security considerations

- Read token stays server-only (`server-only` import guard + no `NEXT_PUBLIC_` prefix); never read from a Client Component.
- No write token is introduced anywhere in this task — this is a read-only data layer, consistent with AGENTS.md ("any write... goes through a server route" is a later task).
- `.env.local` files stay gitignored in both workspaces; only `.env.example` is committed.
- I will not generate a new Sanity API token programmatically — that's an account-credential action you should take deliberately (flagged below).

## Acceptance criteria

- `pnpm install` succeeds at the repo root and resolves both workspaces.
- `pnpm --filter web build` (production build) succeeds.
- `pnpm --filter web exec tsc --noEmit` and `pnpm --filter web lint` pass.
- `pnpm dev` (web) serves `/` with no Clerk/middleware error in server logs (the bug that's being fixed).
- `pnpm dev:studio` starts Studio on `localhost:3333` and shows Course, Lesson, Instructor, Category document types with the right fields, each with an icon.
- Creating a Course document in Studio, adding a module with lessons by reference, and adding an Instructor/Category reference all work without validation errors, once required fields are filled.
- `studio deploy` succeeds (project already has a linked Sanity project + auth), producing a hosted Studio — required later for the Context MCP per section 12.
- `web/sanity.types.ts` exists and contains generated types for the new queries.

## Checks to run

- `pnpm install` (root)
- In `web/`: `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`
- In `studio/`: `npx sanity schemas extract --force && npx sanity typegen generate` (confirms schema is valid and produces `web/sanity.types.ts`), `npx sanity deploy`
- `pnpm dev` (web) then check the dev server log for the Clerk error — confirm it's gone.

## Manual test steps

1. `pnpm install` at the repo root.
2. `pnpm dev:studio`, open `http://localhost:3333` — confirm Course/Lesson/Instructor/Category appear in the sidebar with icons.
3. In Studio: create a Category, an Instructor, then a Lesson (fill title/slug/notes), then a Course referencing that instructor/category and a module containing that lesson. Confirm no validation errors block saving once required fields are filled, and that the module/lesson relationship round-trips (reopen the course, module still shows the lesson).
4. In a separate terminal, `pnpm dev` (web app) — open `http://localhost:3000/`, confirm the home page renders as before (static data, unaffected) with no error overlay.
5. Check the web dev server log — confirm there is no `Clerk: auth() was called but Clerk can't detect usage of clerkMiddleware()` error (previously reproducible by hitting `/studio`, which no longer exists in the web app at all).
6. `pnpm --filter web build` — confirm it completes without the removed `/studio` route and without type errors from the new `web/sanity.types.ts`.
7. From `studio/`, run `npx sanity deploy` and confirm it reports a hosted Studio URL.

## Needs your attention (will flag again after implementation)

- You'll need to create a Sanity API read token (Manage → API → Tokens, "Viewer" role is enough) and put it in `web/.env.local` as `SANITY_API_READ_TOKEN` before any page actually fetches content server-side.
