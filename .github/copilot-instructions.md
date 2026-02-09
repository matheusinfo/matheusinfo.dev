# Copilot / AI Agent Instructions for matheusinfo.dev

Purpose
- Quick reference to make AI coding agents productive in this Next.js + TypeScript site.

Big picture
- Pages-based Next.js site: top-level Next `pages/` directory drives routes (see `pages/index.tsx`, `pages/blog/index.tsx`, `pages/blog/[slug].tsx`).
- UI is componentized under `components/` with one folder per component. Each folder typically contains `index.tsx` and `styles.ts` using `styled-components`.
- Blog data is static and shipped from `data/posts.ts`. Components call `getAllPosts()` and `getPostBySlug()` to populate views.

Key conventions and patterns
- Component exports are named (e.g., `export const Header`) — prefer named imports/exports when adding or updating components.
- Styling: `styled-components` is used and styles live in `styles.ts` next to the component. Follow existing style tokens and patterns (see `components/Blog/styles.ts`).
- Client components: many components use the `"use client"` directive at the top of the file (e.g., `components/Blog/index.tsx`, `components/Header/index.tsx`). Only add `"use client"` when client-side hooks or browser-only APIs are required.
- Animation and interaction: `framer-motion` is used for entrance/hover animations. Reuse existing motion variants when possible.

Developer workflows (commands)
- Dev server: `npm run dev` (runs `next dev`).
- Build: `npm run build` (runs `next build`).
- Start (prod): `npm run start` (runs `next start`).
- Lint: `npm run lint`.

TypeScript & tooling notes
- `tsconfig.json` is already configured with `moduleResolution: "node"` and `strict: true`. If the editor reports "Cannot find module 'next/head'", verify `node_modules` exists and then reload the TS server (IDE command: "TypeScript: Restart TS Server").
- Project includes `@types/*` devDependencies. Prefer adding types for new runtime libraries as needed.

Integration points & dependencies
- Styled system: `styled-components` (see `components/*/styles.ts`).
- Motion: `framer-motion` (components use `motion` wrappers). Example: `components/Blog/index.tsx`.
- Data: static posts in `data/posts.ts` — new blog posts are added by appending entries to this file.

Files to reference when coding
- Routes & pages: `pages/`, especially `pages/blog/index.tsx` and `pages/blog/[slug].tsx`.
- Components pattern: any `components/*/index.tsx` plus `components/*/styles.ts`.
- Data source: `data/posts.ts` (use `getAllPosts()` / `getPostBySlug()`).
- Project config: `package.json`, `tsconfig.json`, `next.config.js` (if present).
- CI: `.github/workflows/nextjs.yml` (build/publish pipeline).

What to avoid
- Do not convert components to default exports; maintain named export convention unless there is a clear reason.
- Avoid moving styling into global CSS—keep styles colocated in `styles.ts`.

Examples
- Add a new component `components/Foo/index.tsx` + `components/Foo/styles.ts`, export as `export const Foo: React.FC = () => {}` and import as `import { Foo } from "../../components/Foo"`.
- Add a blog post: append a `Post` object to `data/posts.ts` and link it from `pages/blog/index.tsx`.

If you need more context
- Inspect `components/Blog/index.tsx`, `components/Header/index.tsx` and `data/posts.ts` to learn component/data patterns quickly.

Please review and tell me if any section needs more examples or additional details.
