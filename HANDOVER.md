# climatefinance-dashboard Handover

## Purpose

`climatefinance-dashboard` is a Next.js 14 dashboard for presenting sample country-level climate finance and transition analysis. It covers a focused set of 12 countries:

**Egypt, India, Indonesia, Iran, Kenya, Mexico, Nigeria, South Africa, Tanzania, Thailand, Uganda, Vietnam**

## Current Status

- **Status**: active frontend
- **Hosting**: Netlify
- **Live URL**: [forwardglobalinstitute.com](https://forwardglobalinstitute.com/)
- **Audience**: external/public-facing or stakeholder-facing dashboard with protected sections
- **Known maturity gap before this handover**: no root README and limited operational framing

## Main Architecture

### Frontend
- Next.js App Router is primary
- Pages Router remains only for framework integration files
- shared UI components live under `components/`
- route handlers under `app/api/` act as a BFF layer

### Data layer
The app does not maintain a heavy custom backend service. Instead it:
- pulls JSON datasets from Azure Blob Storage
- transforms them in API routes
- renders charts/maps/tables on the frontend

### Authentication
- current auth model: Clerk
- user / admin data still references Supabase
- legacy Supabase-auth code remains in the repo and should be treated carefully

## Key Entry Points

See `README.md` for the full route and API listing. Key files for a new developer:

- `middleware.ts` — auth guard (Clerk)
- `app/dashboard/page.tsx` — main country dashboard entry
- `app/api/` — all BFF route handlers
- `netlify.toml` — Netlify deployment config

### Main pages (summary)
- `/` landing, `/dashboard` main view, `/analytics`, `/asset-details` (protected), `/downloads/*`, `/login`, `/profile`, `/admin/users`, `/contact`

### Protected areas
Protected routes include asset details, profile, several download pages, and selected API endpoints.

## Data Dependencies

### Main external dependency
Azure Blob Storage rooted at:
- `https://fapublicdata.blob.core.windows.net/fa-public-data/`

### Key dataset families
- `country_info/`
- `phase_out_order_maps/`
- `phase_out_bar_charts/`
- `power_plant_assets/`
- `cost_by_country/`
- `alignment_graph/`
- `phase_in_bar_chart/`
- `aggregated_cost/`
- `cost_benefit/`
- `asset_info/`
- `company_info/`

## Run / Deploy Basics

See `README.md` for full setup steps and environment variable list. Summary:

```bash
npm install && npm run dev     # local dev
npm run build                  # production build
npm run netlify-build          # Netlify-specific build
```

Netlify config: `netlify.toml` + `netlify-build.js`.

## Credentials and Services Required

Only document the need:
- Clerk publishable + secret keys
- Supabase URL / anon key / service role key
- Netlify site access
- any Azure Blob / data ownership knowledge needed for upstream data publishing

## Known Risks and Handover Notes

1. No dedicated automated test suite is configured.
2. Auth code is in a transitional state: Clerk is current, but legacy Supabase auth code still exists.
3. Some project naming still reflects scaffold/origin history rather than polished product naming.
4. Data contracts depend on upstream JSON files being published consistently.

## Start Here

- `README.md`
- `AGENTS.md`
- `netlify.toml`
- `app/dashboard/page.tsx`
- `app/api/`
- `middleware.ts`

## Recommended Next Steps for New Maintainers

1. Validate the Netlify environment variables and deployment ownership.
2. Confirm which API routes are still in active use versus legacy auth residue.
3. Create a simple data dictionary for Azure Blob JSON schemas if the dashboard will continue evolving.
4. Add at least basic smoke or route-level tests if the app becomes a maintained product.
