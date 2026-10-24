---
title: Daemon's Game Panel
tagline: A self-hosted control panel for Minecraft servers that you run on your own machines and share with friends
category: platform
status: beta
repo: https://github.com/DaemonAlex/gamepanel
stack: ["TypeScript", "Vue 3", "Vite", "Fastify", "Drizzle ORM", "PostgreSQL", "Docker", "Node.js 24"]
requires: ["Docker", "Docker Compose", "Node.js 24", "pnpm"]
tags: ["minecraft", "game server", "hosting panel", "self-hosted", "plugins", "mods", "backups", "MariaDB"]
order: 3
---

## Overview

Daemon's Game Panel is a control panel for game servers that run on hardware you own. Minecraft is the first game it supports. From one web page you start and stop servers, watch the console, manage players, install plugins and mods, edit files, give plugins a database, and take and restore backups.

It is made for sharing. Invite people with a link, hand a server to its owner, or give a friend only the console. Each person gets exactly the access they need on each server, and every change is written to an audit log with who, when and from where.

It is safe by default: a backup is taken before every risky change, a snapshot before every database edit, and game servers can reach neither each other nor your private network.

## Features

### Dashboard and monitoring

- Every server at a glance: status, an address to copy, players, CPU, RAM and a one-hour trend line.
- Admins also see each game machine's memory and disk with 24-hour graphs, and warnings when a server runs low on resources.
- Send a message to every server at once, or start, restart and stop them all.
- A server overview with connection details and join steps to send a friend, live TPS and tick time, players, uptime, and performance graphs over 1 hour, 24 hours or 7 days.

### Console, players, files and logs

- The server console in the browser, with command history; every command is recorded in the audit log.
- Players: who is online, kick, ban, op, whitelist, and everyone the server has ever seen.
- Files: browse, edit in a code editor, upload (large files in pieces), download, rename, and delete to a trash folder.
- Logs: current and older logs plus crash reports, searchable, with errors highlighted.
- Settings: `server.properties` as a form, with a coloured preview of the server list message (MOTD).

### Plugins, mods and versions

- Every installed plugin (Paper, Purpur) or mod (Fabric, Forge, NeoForge) listed with its version.
- Turn plugins off and on, or move them to the trash.
- Search Modrinth and Hangar for plugins that fit the server's Minecraft version and install them in one click. Files are only taken from those sites' own servers and checked against their published hash.
- Updates offered when a newer stable release exists for your Minecraft version.
- When a new Minecraft version is out, **Check my plugins** shows which plugins are ready before anything changes. Switching versions always stops the server and takes a backup first, and the right Java version is picked automatically.

### Databases

- A real MariaDB database for plugins, created in one click, with connection details to paste into a plugin's config.
- Browse tables and rows, edit or delete a single row, or run a query.
- Queries are read-only unless **Allow changes** is ticked, which warns and asks again.
- A snapshot before every change, every change logged, and databases included in the server's backups.
- Each server reaches its databases over its own private link; servers cannot see each other's.

### Backups and schedules

- Back up while players stay on: the world is held still while the archive is made.
- Keep the newest N backups, download them or restore one.
- Schedules run backups, restarts, commands or chat messages every N minutes or at set times of day, in your time zone.

### People

- Invite links, three roles (admin, owner, subuser) and per-server permissions.
- Quotas and per-server disk caps.
- Two-step login with an authenticator app.

## How it works

Players and admins only ever see the web page. Behind it, the panel is split in two parts that run on different machines.

**The panel** runs on one machine as a Docker Compose stack: the Vue 3 web app, a Fastify API on Node.js and PostgreSQL. The API owns accounts, permissions, the audit log and metrics, and it is the only thing that talks to the game machines. An optional Cloudflare Tunnel can publish the panel without opening ports, or you can put it behind your own reverse proxy.

**Each game machine** (a "node") runs a small Node.js agent and Docker. The agent runs each Minecraft server in its own container from the widely used `itzg/minecraft-server` image, and handles files, backups, the server console over RCON, and databases. The first time someone creates a database on a node, the agent starts a shared MariaDB container for it.

**Between them**, the panel calls each agent over HTTPS with that node's own pinned certificate plus a per-node token. The agent accepts calls from nothing else.

**Isolation on the node.** Game containers run as an unprivileged user with every Linux capability dropped, and cannot talk to each other. A node firewall keeps containers off private address ranges and off the node itself. Each server's database link is an internal network with no route out.

**Code layout.** The repository is a pnpm workspace with three apps (the web app, the API and the node agent) and a shared package of types and validation used by all three. Passwords are hashed with Argon2, and sessions, invite links and node tokens are stored hashed or encrypted.

A typical first run: register a game machine with the admin command line, log in, press **New server**, pick the server type and Minecraft version, and the panel creates the container on that node.

## Requirements

- **Panel machine:** Docker with Compose. 2 cores and 4 GB RAM or more is comfortable.
- **Each node:** Linux with Docker, Node.js 24 and pnpm, and a disk for server data. Per-server disk caps need XFS with project quotas.
- Optional: a domain for the panel and for players' addresses. Servers also work by IP and port.

## Installation

The README has the full commands. In outline:

1. On each game machine, clone the repository, install dependencies with pnpm, build the shared package and the agent, fill in the agent settings (token, TLS certificate, addresses), then install and enable the node firewall and agent services under systemd.
2. On the panel machine, clone the repository, copy the example settings file for the panel and set the database password, app secret and server domain, then start it with `docker compose up -d --build`. To publish through a Cloudflare Tunnel, add the tunnel token and start the `tunnel` profile.
3. Create the first admin and register the first node with the admin commands below, then log in.

## Commands

Admin commands run on the panel machine through `docker compose exec panel node apps/panel-api/dist/cli.js <command>`.

| Command | Who | What it does |
| --- | --- | --- |
| `create-admin --email E` | Panel host admin | Creates an admin and prints a one-time password |
| `add-node ...` | Panel host admin | Registers a game machine with its address, token, certificate, public IP and port range |
| `register-server ...` | Panel host admin | Adopts a server that already runs on a node |
| `invite --email E --role subuser\|owner\|admin` | Panel host admin | Prints a one-time join link, valid 7 days, optionally giving a server |
| `rebuild --id ID [--start]` | Panel host admin | Backs up a stopped server, then recreates its container so new defaults apply |

## Credits

Written by DaemonAlex. Game servers run on the `itzg/minecraft-server` container image. Plugin search and downloads use Modrinth and Hangar. Editing uses CodeMirror.
