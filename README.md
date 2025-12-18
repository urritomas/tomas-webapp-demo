# Tailwind CSS Playground

This Next.js app is a live playground for Tailwind CSS. Toggle light/dark theme, experiment with utilities, and see instant UI updates.

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 and try the playgrounds:

- Typography: adjust `text-*`, `leading-*`, `tracking-*`
- Buttons: switch variants (solid/outline/ghost), sizes, radius
- Grid & Spacing: change `grid-cols-*`, `gap-*`, alignment
- Forms: try focus rings, rounding, sizes

## Theme Toggle

Use the theme button in the header. It applies the Tailwind `dark:` variants and a quick crossfade.

## Notes

- The page focuses on Tailwind usage only (install/config guides removed).
- Tailwind v4 utilities are imported in `app/globals.css` via `@import "tailwindcss";`.
