# daemonscripts.com

The DaemonScripts website: every project (FiveM scripts, platforms and tools) with its own detailed
page, in the DelPerroSands kit B look (the same design system as delperrosands.com, the DPS in-game
screens and the DaemonServers panel).

Static site built with [Astro](https://astro.build), hosted on Cloudflare Pages. Every merge to
`main` publishes the site.

## Add or edit a project

Each project is one Markdown file in `src/content/projects/`. Read `CONTENT.md` first: it has the
voice, the section order and the list of things that must never be published. The frontmatter fields
are defined in `src/content.config.ts`; the build fails if one is wrong.

## Write a blog post

Add `src/content/blog/<slug>.md` (the file name is the URL, `/blog/<slug>/`):

```md
---
title: DPS Tow Job 2.0
summary: One or two sentences for the list page, the RSS feed and link previews.
date: 2026-11-02
tags: ["release", "fivem"]
projects: ["dps-towjob"]   # optional: links the project pages under the post
draft: true                # optional: keeps it off the site until you remove this line
---

The post, in Markdown. Same voice rules as CONTENT.md (and no em dashes).
```

Merge the PR and Cloudflare publishes it, adds it to the home page and to `/rss.xml`.

## Run it locally

```sh
npm install
npm run dev       # http://localhost:4321, reloads on save
npm run build     # writes dist/
npm run preview   # serves dist/
```

## Cloudflare Pages settings

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Production branch | `main` |
| Custom domains | `daemonscripts.com`, `www.daemonscripts.com` |

## Layout

| Path | |
| --- | --- |
| `src/content/projects/*.md` | One page per project |
| `src/content.config.ts` | Project frontmatter schema |
| `src/pages/` | Home, projects list, project page, about, 404 |
| `src/layouts/Base.astro` | Header, footer, page metadata |
| `src/styles/site.css` | Kit B tokens and components |
| `public/` | DPS logo and icon |
