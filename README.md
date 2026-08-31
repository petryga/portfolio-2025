# petryga.com

My personal portfolio — a single-page site with a hero, an about/skills section,
a project list, and contact links, over an animated particle background.

**Live:** [petryga.com](https://petryga.com)

## Stack

- **React 19** + **TypeScript**, built with **Vite** (SWC plugin)
- **Tailwind CSS** with CSS-variable design tokens (light/dark), a few **shadcn/ui**
  primitives (card, tooltip, toasts)
- **react-router-dom** for the `/` + 404 routing
- **tsparticles** (slim engine) for the background, code-split and loaded after
  the page content
- **Vitest** + **Testing Library** (jsdom) — 86 tests across components, pages and
  data
- CI (GitHub Actions) runs lint, typecheck, tests and a production build on every
  push

## Local development

```bash
npm install
npm run dev        # http://localhost:8080
```

| Script | |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | production build to `dist/` |
| `npm run preview` | serve the production build |
| `npm run test` | Vitest (one-shot) |
| `npm run test:watch` / `test:coverage` | watch mode / coverage report |
| `npm run lint` | ESLint (`--max-warnings 0`) |
| `npm run typecheck` | `tsc --noEmit` |

## Structure

```
src/
  components/        one file per section (Hero, About, Work, Contact, Navigation,
                     ParticlesBackground) + shadcn/ui primitives under ui/
  pages/             Index (composes the sections) and NotFound
  data/              skills.ts — the skills list, pinned by a test
  lib/ hooks/        cn() helper, toast hook
  index.css          design tokens + a few custom utilities
```

Project and skill content lives in `src/components/Work.tsx` and `src/data/skills.ts`.

## Deployment

Static build (`npm run build` → `dist/`), deployed to `petryga.com` via a
Git-connected host. No environment variables.
