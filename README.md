# Weekly Drink Tracker

A small static web app for visualizing weekly alcohol consumption. Patients drag bottle icons (beer, wine, shots, mixed drinks, seltzer, champagne, etc.) onto a Mon–Sun weekly calendar. Each day is a tiny wood shelf the bottles "stand" on.

Built as a friendlier alternative to writing "beer x3 per week" on a paper intake form.

## Features

- Drag-and-drop bottles onto each day of the week (mouse, touch, and keyboard via `@dnd-kit`)
- Eight drink types with distinct SVG glassware/bottles
- Wood-shelf day cells with overflow wrapping to additional shelves
- Tap a bottle to remove it
- Live weekly summary with per-type breakdown and approximate NIAAA standard drinks
- Fully client-side; data persists to `localStorage`
- Deploys to GitHub Pages from `main` via GitHub Actions

## Local development

Requires Node 18+ (Node 20 recommended).

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually <http://localhost:5173>).

## Build

```bash
npm run build
npm run preview
```

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main`. The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the app with `BASE_PATH=/<repo-name>/` and deploys `dist/` to Pages.

The site will be available at `https://<your-username>.github.io/<repo-name>/`.

## Disclaimer

NIAAA standard drink calculations are approximations for visualization only. This is not medical advice.
