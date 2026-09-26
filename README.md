# Tarun Bagewadi — Portfolio

A dark, editorial portfolio for a backend and AI software engineer. Built with Next.js App Router, TypeScript, Tailwind CSS, and Motion, with self-hosted typography and statically generated project case studies.

## Develop

Requires Node.js 22 or later (Node.js 24 is used in CI).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. If a constrained local environment hits file-watcher limits, use `WATCHPACK_POLLING=true npm run dev`, or use the production preview below.

```sh
npm run build
npm run start
```

## Verify

```sh
npm run build
npm run typecheck
npx playwright install chromium
npm run test:e2e
```

The browser suite checks project navigation, metadata, 404 behavior, the mobile menu, keyboard access, reduced motion, accessibility with axe, and overflow at 320, 390, 768, and 1440 pixels. Automated accessibility checks supplement, rather than replace, manual review.

To use an installed Google Chrome and capture review images:

```sh
PLAYWRIGHT_CHANNEL=chrome PREVIEW_OUTPUT=../portfolio-previews npm run test:e2e
```

## Deploy to Vercel

1. Import this GitHub repository into Vercel.
2. Use the Next.js preset and repository root. The build and installation commands are in `vercel.json`.
3. Use Node.js 24. No API credentials, database, or paid services are required.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS production origin, with no trailing path. If unset, Vercel's `VERCEL_PROJECT_PRODUCTION_URL` supplies the production host automatically.
5. Deploy. If you add a custom domain later, update `NEXT_PUBLIC_SITE_URL` and redeploy so canonical URLs and the sitemap use it.

Vercel can create preview deployments for pull requests and production deployments from `main`. CI validates builds, types, and browser behavior on pushes and pull requests. No deployment has been claimed merely because this configuration exists.

## Content and architecture

- `src/lib/content.ts`: profile, project summaries, case-study evidence, and deployment-origin resolution.
- `src/app/page.tsx`: homepage sections.
- `src/app/work/[slug]/page.tsx`: generated detail pages and project-specific metadata.
- `src/components/`: reusable navigation, footer, project cards, diagrams, and motion boundaries.
- `src/app/globals.css`: design tokens, responsive layouts, and reduced-motion behavior; Tailwind utilities are available throughout the project.
- `tests/portfolio.spec.ts`: end-to-end and accessibility checks.

Content is rendered on the server. JavaScript is limited to navigation and restrained Motion enhancements. Text stays visible without JavaScript; external fonts and tracking requests are not required.

## Before publishing final personal details

See [CONTENT-NOTES.md](CONTENT-NOTES.md). Employer names, employment dates, personal contribution percentages, and business-impact metrics are intentionally not invented. Experience is presented through verified project work. No inactive résumé button, imaginary live demo, or fabricated LinkedIn profile is included.
