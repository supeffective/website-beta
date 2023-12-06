# SuperEffective.gg

## Design System

- Use Tailwind CSS classes as much as possible
- Avoid having long Tailwind class lists inside `className` attributes (4 classes at max.)
- Merge component classes using `@apply` directives inside `styles/*/components/*.scss` files (similar to Daisy UI's
  approach)
- Configure new global variables also in the `tailwind.config.ts` file.
- Use Neobrutalism Design

### Neobrutalism Design Rules

- Use `black` for strokes and shadows
- Main `background-color` should be other than black or gray.
- Use `nb-neon-*` colors for high saturated elements (vibrant)
- Use `nb-*-100` to `nb-*-400` colors for low saturated elements (vintage, muted, nostalgic)
- Spacing is defined with lines or cards
- Don't use gradients or blur
- Use large font sizes for headings or decoration
- You can use decorative elements like: raw unrefined shapes, Animated banners, neobrutalism images without background,
  neobrutalism illustrations, etc.
- Allowed `sans-serif` fonts are: Lexend Mega, Public Sans, Archivo Black, Bebas Neue, and Maven Pro
- Shadows:
  - Have both X and Y
  - Black or darkest colors
  - 100% opaque
  - No blur

## Tech stack

### Development Tools

- Node: JS runtime
- PNPM: Package manager
- Turbo: Package script runner
- ESLint: JS/TS linter
- Prettier: Code formatter
- Bun: Test and TS script runner (replacing tsx, ts-node, jest, etc.)
- VSCode + Front Matter CMS VSCode extension: IDE + CMS

### Architecture

- Next.js: React framework
- Tailwind CSS + SCSS: Styling framework
- MDX + Front Matter CMS: Static content management (pages, blog posts, etc.)
- Next Auth / Auth.js: Authentication via email (magic link) or OAuth
- MySQL: Database engine
- Drizzle ORM: Database abstraction layer

![App Architecture Diagram](resources/architecture.drawio.svg)

### Providers

- OAuth: Google, GitHub, Discord & Patreon
- Github Pages: Hosting & CDN origin for static files (JSON data, sprites)
- CloudFlare: CDN proxy and DNS
- Vercel: Serverless provider
- PlanetScale: Serverless MySQL databases
- Sentry: Error tracking
- Resend: Transactional emails
- Google Search Console: SEO
- Google Analytics: Analytics
