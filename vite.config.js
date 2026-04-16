var _a;
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Set BASE_PATH at build time (e.g. "/alcohol-consumption-tracker/") so assets resolve on GitHub Pages.
// Defaults to "/" for local dev.
var base = (_a = process.env.BASE_PATH) !== null && _a !== void 0 ? _a : '/';
export default defineConfig({
    plugins: [react()],
    base: base,
});
