# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js 14 frontend using both the App Router and Pages Router. Put route files in `app/` for primary pages and API handlers in `app/api/`; keep legacy router files in `pages/` only when required for framework integration such as `_app.tsx` and `_document.tsx`.

Shared UI lives in `components/`, with reusable primitives under `components/ui/`. App-specific client helpers live in `app/components/`. Common logic belongs in `lib/`, hooks in `hooks/`, shared types in `types/`, static assets in `public/`, and global styling in `styles/` plus `app/globals.css`.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start the local Next.js dev server.
- `npm run build`: create a production build.
- `npm run start`: serve the production build locally.
- `npm run lint`: run Next.js ESLint checks.
- `npm run netlify-build`: run the Netlify-specific build script.

## Coding Style & Naming Conventions
Use TypeScript with strict mode in mind, even though production builds currently ignore type and lint errors in [`next.config.mjs`](/Users/lxt/Documents/ForwardAnalytics/code/FA_SaaS_FrontEnd/climatefinance-dashboard/next.config.mjs). Follow the existing style: double quotes in TS/TSX, semicolon-light formatting, and 2-space indentation in JSON/config files.

Use PascalCase for React components (`DashboardClientPage.tsx`), camelCase for functions and variables, and kebab-case for multiword utility/component filenames in `components/` (`phase-out-chart.tsx`). Prefer the `@/` path alias from [`tsconfig.json`](/Users/lxt/Documents/ForwardAnalytics/code/FA_SaaS_FrontEnd/climatefinance-dashboard/tsconfig.json).

## Testing Guidelines
There is no dedicated test runner configured yet. At minimum, run `npm run lint` and a local production build before opening a PR. If you add tests, keep them next to the feature as `*.test.ts` or `*.test.tsx` and document any new command in `package.json`.

For URL query state, use `SearchParamsProvider` from [`app/components/README.md`](/Users/lxt/Documents/ForwardAnalytics/code/FA_SaaS_FrontEnd/climatefinance-dashboard/app/components/README.md) instead of calling `useSearchParams()` directly.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit subjects such as `Update the phase-in graph` and `Fix the phase-in chart with correct scale in MW or GW`. Keep commits focused and descriptive.

PRs should include a brief summary, linked issue or task, screenshots for UI changes, affected routes, and confirmation that `npm run lint` and `npm run build` were checked locally. Note any required `.env.local` or Supabase configuration changes explicitly.
