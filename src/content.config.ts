import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * One Markdown file per project in src/content/projects/<slug>.md. The file name is the URL:
 * /projects/<slug>/. The body is the long write-up; the frontmatter below drives the cards,
 * filters and the facts panel on the project page.
 */
const projects = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: z.object({
        /** Display name, e.g. "DPS Airlines". */
        title: z.string(),
        /** One sentence for cards and the page header, no trailing period needed. */
        tagline: z.string().max(140),
        /**
         * fivem: FiveM resources. platform: full applications (APEX, AV App, game panel).
         * tool: developer / desktop tools (optimizer, DaemonCDU).
         */
        category: z.enum(['fivem', 'platform', 'tool']),
        /** For FiveM resources: what part of the city it serves. */
        area: z
            .enum(['jobs', 'city', 'police-ems', 'vehicles', 'world', 'admin', 'player', 'library'])
            .optional(),
        /** live: in use and maintained. beta: works, still changing. planning: designed, not built. archived: kept for reference. */
        status: z.enum(['live', 'beta', 'planning', 'archived']),
        /** Public GitHub repository, if any. */
        repo: z.string().url().optional(),
        /** A public website for the project, if any (e.g. https://apexavcloud.com). */
        website: z.string().url().optional(),
        /** Main languages / stack, short: ["Lua", "ox_lib", "NUI (HTML/JS)"]. */
        stack: z.array(z.string()).default([]),
        /** FiveM framework support, e.g. ["Qbox", "QBCore"] or ["Standalone"]. */
        frameworks: z.array(z.string()).default([]),
        /** Required resources or services, e.g. ["ox_lib", "oxmysql", "ox_target"]. */
        requires: z.array(z.string()).default([]),
        /** Free-form tags for search: ["job", "aviation", "NUI"]. */
        tags: z.array(z.string()).default([]),
        /** Credit when the project is a port or rewrite of someone else's work. */
        credits: z.string().optional(),
        /** Shown in the featured row on the home page. */
        featured: z.boolean().default(false),
        /** Lower sorts first inside its category. */
        order: z.number().default(100),
    }),
});

/**
 * One Markdown file per post in src/content/blog/<slug>.md. The file name is the URL:
 * /blog/<slug>/. Posts with `draft: true` are left out of the build.
 */
const blog = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        /** One or two sentences for the list page, the RSS feed and link previews. */
        summary: z.string().max(240),
        /** Publish date, YYYY-MM-DD. Newest first on the list page. */
        date: z.coerce.date(),
        /** Set when a post is changed after publishing. */
        updated: z.coerce.date().optional(),
        author: z.string().default('DaemonAlex'),
        /** Short topic labels: ["release", "fivem", "apex"]. */
        tags: z.array(z.string()).default([]),
        /** Project slugs the post is about; their pages are linked under the post. */
        projects: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
    }),
});

export const collections = { projects, blog };
