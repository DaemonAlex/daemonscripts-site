import { defineConfig } from 'astro/config';

// A fully static site: Cloudflare Pages serves the `dist/` folder as it is.
export default defineConfig({
    site: 'https://daemonscripts.com',
    trailingSlash: 'ignore',
    build: { format: 'directory' },
});
