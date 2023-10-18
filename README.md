# SuperEffective.gg

## Tech stack

- Next.js: React framework
- Tailwind CSS + SCSS: Styling framework
- PNPM: Package manager
- Bun: Test runner and TS script runner
- Turbo: Package script runner
- ESLint: JS/TS linter
- Bun: Test and TS script runner

## Design System Rules

- Use Tailwind CSS classes as much as possible
- Avoid having long Tailwind class lists inside `className` attributes (4 classes at max.)
- Merge component classes using `@apply` directives inside `styles/*/components/*.scss` files (similar to Daisy UI's
  approach)
- Configure new global variables also in the `tailwind.config.ts` file.
- Use Neobrutalism Design

### Neobrutalism Design Rules

![Neobrutalism](assets/docs/neobrutalism-example.webp)

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
