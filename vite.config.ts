import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set BASE_PATH at build time (e.g. "/alcohol-consumption-tracker/") so assets resolve on GitHub Pages.
// Defaults to "/" for local dev.
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  plugins: [react()],
  base,
});
