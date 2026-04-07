# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.

## SEO

`react-helmet-async` is installed and wired throughout the whole-journeys frontend:

- **`HelmetProvider`** wraps the entire app in `App.tsx`
- **`src/components/SEO.tsx`** — shared SEO component; sets `<title>`, `<meta name="description">`, Open Graph, and Twitter Card tags per page; accepts `title`, `description`, `image`, `path`, `noIndex` props
- **Every page** (Home, Tours, About, Picks, Hotels, TripInquiry, TermsAndConditions) renders `<SEO>` with page-specific titles and descriptions
- **TourModal** renders `<Helmet>` directly when open, overriding the page title with the tour name (browser tab reflects the open tour)
- **`index.html`** has baseline fallback OG tags for crawlers that execute JS late
- Terms & Conditions page uses `noIndex={true}` to exclude it from search engines
- Site URL constant: `https://new.wholejourneys.com`

### JSON-LD Schema (Static — Crawler-Visible)

`artifacts/whole-journeys/index.html` has been updated to include all structured data as static JSON-LD blocks in the `<head>` — delivered in the initial server response before JavaScript runs:

- **Person schema** (Kathy Dragon) — credentials, knowsAbout, founder, worksFor, sameAs
- **Organization schema** (Whole Journeys as TravelAgency) — description, founder, areaServed, sameAs
- **Review schema** (John Mackey testimonial) — author, reviewBody, reviewRating
- **FAQPage schema** (5 questions) — active foodie travel, Kathy Dragon, Alpe Adria, custom trips, long-distance trails
- **TouristTrip schemas** (5 signature tours) — Alpe Adria Trail, Camino Portuguese Coastal, Tuscany, 2026 Women's Camino, Kenya Safari

Same static schemas are in `artifacts/wj-seo/index.html`.

## SEO Hub (Parallel Site)

`artifacts/wj-seo` (`@workspace/wj-seo`) — A separate React+Vite site serving as the authoritative content hub for AI search and crawlers. Running at `/wj-seo/`.

**7 pages with full content following the developer's 5 content rules:**
1. **Home** (`/`) — company overview, John Mackey testimonial, credentials bar, content grid
2. **About Kathy** (`/about-kathy`) — full credentials, World Bank, John Mackey context, 30-year history
3. **What Is Active Foodie Travel?** (`/what-is-active-foodie-travel`) — definitional page, category origin
4. **Long-Distance Trails** (`/long-distance-trail-hiking-guide`) — Camino, Alpe Adria, Via Francigena, Juliana, Rota Vicentina
5. **Italy Culinary Tours** (`/culinary-walking-tours-italy`) — Tuscany, Dolomites, Via Francigena
6. **Women's Travel** (`/womens-adventure-travel`) — 2026 Women's Camino, Slovenia Women's Hike
7. **Private & Custom Trips** (`/private-custom-trips`) — consultation process, $600 fee explained, trip types

**Content rules followed per page:**
- Lead with the definition (first sentence is the AI-extractable answer)
- Question-format H2 headings with immediate answers
- Named specific entities: trail names, towns, producers, credentials
- Credentials paired with practical implications for travelers
- Every page ends with a self-contained Summary section
