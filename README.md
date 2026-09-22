This is [Vertex](./AGENTS.md), a learning platform built with Next.js and Sanity.

The project is two standalone workspaces in one repo:

- `web/` — the Next.js app (pages, auth, search UI, server-side data access).
- `studio/` — the Sanity Studio (content schema and authoring).

## Getting Started

Install dependencies once at the repo root:

```bash
pnpm install
```

Run the web app:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

In a separate terminal, run Sanity Studio:

```bash
pnpm dev:studio
```

Open [http://localhost:3333](http://localhost:3333) to author content.

Each workspace has its own `.env.example` (`web/.env.example`, `studio/.env.example`) — copy to `.env.local` in that workspace and fill in the values before running it.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
