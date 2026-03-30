# climatefinance-dashboard

## Purpose

`climatefinance-dashboard` is a Next.js dashboard for presenting selected country-level climate finance and transition analysis outputs for the Forward Global Institute (FGI).

It combines:
- a public-facing / semi-protected frontend
- Clerk-based authentication for protected content
- Next.js API routes acting as a BFF layer
- Azure Blob-hosted JSON data feeds
- Supabase-backed user management / admin flows

## Current Status

- **Status**: active frontend
- **Deployment**: Netlify
- **Live URL**: [forwardglobalinstitute.com](https://forwardglobalinstitute.com/)
- **Documentation maturity before this file**: low

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS + shadcn/ui + Radix UI
- Clerk for current auth flow
- Supabase for user management and admin operations
- Recharts / D3 / Leaflet for visualization

## Main Routes

- `/` landing page
- `/dashboard` main country dashboard
- `/analytics` analytics page
- `/asset-details` protected asset drill-down
- `/downloads/*` protected and unprotected data download pages
- `/login` Clerk sign-in
- `/profile` user profile
- `/admin/users` admin user management
- `/contact` contact page

## API Layer

The app uses Next.js route handlers under `app/api/` as a backend-for-frontend layer.

Typical responsibilities:
- fetch JSON from Azure Blob Storage
- filter / transform country and asset data
- protect selected endpoints with Clerk
- support admin/user operations tied to Supabase

## Data Dependencies

Main remote data source:
- Azure Blob path rooted at `https://fapublicdata.blob.core.windows.net/fa-public-data/`

Typical datasets include:
- country info
- phase-out map data
- phase-out chart data
- phase-in chart data
- cost and benefit data
- asset info
- company info

## Local Development

```bash
npm install
npm run dev
```

### Production build
```bash
npm run build
npm run netlify-build
npm run lint
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill the required values.

Expected variables include:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- optional legacy JWT variables

## Deployment

Netlify configuration lives in `netlify.toml` and the custom build wrapper is `netlify-build.js`.

## Known Limitations

1. No dedicated automated test suite is configured.
2. Legacy Supabase-auth code paths still exist alongside Clerk.
3. The package name and some generated structure still reflect v0.dev scaffolding origins.

## Related Documents

- `HANDOVER.md`
- `AGENTS.md`
- `app/components/README.md`
