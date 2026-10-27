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

I built this because I wanted to run a Minecraft server for a friend who had just come home from deployment, on a machine I already owned, without handing the keys to a hosting company. Every panel I tried was either a rented slot on someone else's hardware or a pile of scripts that only I could operate. So I wrote the panel I wanted: one web page where you start and stop servers, watch the console, manage players, plugins, files, databases and backups, and share all of that with the people who actually play.

Minecraft is the first game it runs. Paper, Purpur, Vanilla, Fabric, Forge and NeoForge all work, each server in its own container on a machine you control.

It is made for sharing. You invite someone with a link, you can hand them a whole server, or you can give a friend the console and nothing else. Everyone gets exactly the access they need, on exactly the servers they need, and every change is written down.

It is also careful on your behalf. A backup is taken before every risky change, a snapshot before every database edit, and game servers can reach neither each other nor your private network. Those are not options you switch on; they are how it works.

## What you see when you log in

Every server on one page: whether it is running, the address to hand out (one click copies it), who is on, how hard the CPU is working, how much RAM is in use and a trend line for the last hour. If a server is running out of RAM, the panel says so at the top instead of leaving you to find out from a lag report.

<img src="/projects/gamepanel/dashboard.jpg" alt="The Servers page: a server card with status, address, players, CPU and RAM, a node card with 24-hour graphs, and the start, restart and stop all buttons" width="1316" height="860" loading="lazy">

Admins also see each game machine: RAM promised to servers against what the box has, disk used, and 24-hour graphs for both. From the same page you can send a message to every server at once (handy before a restart) or start, restart and stop all of them.

### One server, everything on one page

Open a server and the first tab is the overview: connection info with the address, edition, version and whether the whitelist is on, plus a ready-made set of join steps you can send to a friend who has never joined a server before. Below that: TPS, tick time, players, uptime, CPU and RAM, each with a note about what a good number looks like, and performance graphs over the last hour, the last day or the last week. Samples are taken every 30 seconds and kept for 8 days.

<img src="/projects/gamepanel/server-overview.jpg" alt="A server overview with connection info, TPS, tick time, players, uptime, CPU and RAM tiles, and six performance graphs" width="1316" height="905" loading="lazy">

## The console

The live server console in your browser, with command history on the up arrow, the way a terminal behaves. Every command anyone sends is recorded in the audit log with their name, so when a plugin config "changed itself", you can see who typed what.

<img src="/projects/gamepanel/console.jpg" alt="The live console with coloured server output and a command line at the bottom" width="1316" height="670" loading="lazy">

## Players

Who is online right now, and buttons for the things you do a hundred times: message, kick, op, ban. The whitelist is its own list with a switch, operators have their level shown, bans keep their reason, and there is a list of everyone the server has ever seen with the last time they were on. No command syntax to remember and no typos in a player's name.

<img src="/projects/gamepanel/players.jpg" alt="The Players tab: three players online with message, kick, op and ban buttons, the whitelist, operators, a banned player with the reason, and everyone the server has seen" width="1316" height="1421" loading="lazy">

## Plugins and mods

Every installed plugin (or mod, on Fabric, Forge and NeoForge) with its version. Switch one off without deleting it, or move it to the trash. Search Modrinth and Hangar from inside the panel for plugins that fit the server's Minecraft version and install them in one click. Files are only ever fetched from those two sites' own servers and checked against the hash they publish, so a plugin that has been tampered with on the way does not get installed.

<img src="/projects/gamepanel/plugins.jpg" alt="The Plugins tab listing installed plugins with versions, on and off switches, and a search box for Modrinth and Hangar" width="1316" height="905" loading="lazy">

When a plugin has a newer stable release for your Minecraft version, the panel offers the update next to it. Big jumps (say 4.x to 5.x) are flagged, because those are the ones that change configs and commands.

## Minecraft version updates without the panic

Updating Minecraft used to mean a weekend. The panel tells you when a newer version is out and suggests the sensible one: the newest release in your current line, or the newest overall.

<img src="/projects/gamepanel/version-update.jpg" alt="The Settings tab suggesting a newer Minecraft version for the server" width="1316" height="905" loading="lazy">

Before you change anything, press **Check my plugins**. It looks every plugin up and tells you which ones are ready for the new version, which are not there yet, and which it cannot tell. If a plugin would break, you know before the server is down, not after.

<img src="/projects/gamepanel/plugin-check.jpg" alt="The plugin check before a version change: each plugin marked ready, not yet, or unknown for the target version" width="1316" height="905" loading="lazy">

When you do switch, the panel stops the server, takes a backup first, moves it to the new version with the right Java for it, and starts it again.

## Files

A file manager for the server folder: browse, upload (big files go up in pieces so a flaky connection does not kill the transfer), download, rename, and make new files and folders. Deleting moves things to a trash folder instead of destroying them.

<img src="/projects/gamepanel/files.jpg" alt="The Files tab showing the server folder with world folders, plugins, logs and config files, each with download, rename and delete buttons" width="1316" height="900" loading="lazy">

Open a text file and you get a proper code editor with line numbers and syntax colouring, so editing a plugin config is a two-minute job from your phone, not a trip to the machine. Ctrl+S saves.

<img src="/projects/gamepanel/file-editor.jpg" alt="server.properties open in the built-in code editor with line numbers, syntax colouring, and Save and Close buttons" width="1316" height="900" loading="lazy">

## Settings

`server.properties` as a form, grouped into General, Gameplay, World, Players and Advanced, with a line under each setting saying what it does and what it costs. The message of the day is previewed with its colour codes the way it will look in the server list, so you are not counting section signs.

<img src="/projects/gamepanel/settings.jpg" alt="The Settings tab: server.properties as a form with switches and fields, and the MOTD shown in colour" width="1316" height="900" loading="lazy">

## Databases

Plenty of plugins want a real database, and setting one up by hand is the step where most people give up. Here it is one button. The panel runs MariaDB on the game machine, creates a database for the server, and shows you the host, user and password to paste into the plugin's config.

<img src="/projects/gamepanel/databases.jpg" alt="The Databases tab with a database and its connection details, table list and row browser" width="1316" height="530" loading="lazy">

You can browse the tables and rows, fix or delete a single row, or run a query. Queries are read-only unless you tick **Allow changes**, and even then it warns you and asks again. A snapshot is taken before every change, every change is logged, and the databases are included in the server's backups. Each server reaches its databases over its own private link, so servers cannot see each other's data.

## Backups and schedules

Backups run while people keep playing. The world is held still for the few seconds the archive is being made, then released. Keep the newest N backups, download one, or restore one. A restore takes its own backup first, so even a restore is undoable.

<img src="/projects/gamepanel/backups.jpg" alt="The Backups tab: a list of backups with size and date, a keep count, and back up, restore and download buttons" width="1316" height="495" loading="lazy">

Schedules do the boring part for you: back up, restart, save the world, run a command or send a chat message, either every N minutes or at set times on chosen days, in your own time zone. A scheduled restart warns players a minute before. Each schedule shows when it last ran and whether it worked.

<img src="/projects/gamepanel/schedules.jpg" alt="The Schedules tab: a daily backup, a warning message, a restart, a save every 30 minutes and a weekend command, each with its last run" width="1316" height="941" loading="lazy">

## Logs

The current log, older logs and crash reports in one place, searchable. Type ERROR, or a player's name, and you get only the matching lines with their line numbers, errors highlighted. If there is a crash report, the panel points it out so you do not miss it.

<img src="/projects/gamepanel/logs.jpg" alt="The Logs tab with the log file picker, a search for ERROR, and the two matching lines highlighted" width="1316" height="900" loading="lazy">

## People

This is the part I cared about most. Three roles: **admin** (everything), **owner** (runs their own servers within a quota) and **subuser** (a helper who only sees what is shared with them). An admin invites someone from the People page: type their email, pick the role, and the panel makes a one-time link that works for seven days. There is no email server to set up; you paste the link into a message yourself.

<img src="/projects/gamepanel/people.jpg" alt="The People page: an invite form, every account with role, two-step badge and usage against quota, and the list of links sent" width="1316" height="900" loading="lazy">

The person opens the link, sets a password, and they are in. An invite can also hand them a server on the way in, so a friend's first login already shows their own world.

<img src="/projects/gamepanel/invite.jpg" alt="The invite page asking the new person to set a password" width="1316" height="900" loading="lazy">

Each owner has a quota: how many servers, how much RAM and how much disk. Admins can turn an account off (which ends its sessions on the spot), make a password reset link, and set a per-server disk cap that is enforced on the game machine itself.

### Share a server, but only the parts you want

An owner can share a server with anyone who has an account and tick exactly what that person may do: console and commands, start and stop, players, files, plugins, backups, schedules, logs, settings, databases. A helper with only console and logs sees only those two tabs, and nothing else about your setup.

<img src="/projects/gamepanel/sharing.jpg" alt="The sharing section on a server's Settings tab: an email box, ten permission chips, and two people with the rights each one has" width="1316" height="900" loading="lazy">

## Two-step login

Any account can turn on two-step login from its account page. Scan the code with Google Authenticator, Authy, 1Password or any app of that kind, type the six digits once to prove it works, and from then on the login page asks for the code after the password. The People page shows a badge next to everyone who has it on.

<img src="/projects/gamepanel/two-step.jpg" alt="The account page with the two-step login setup: a QR code, the key for typing by hand, and the box for the first code" width="1316" height="1096" loading="lazy">

<img src="/projects/gamepanel/login.jpg" alt="The login page" width="1316" height="900" loading="lazy">

## Starting a new server

Name it, pick the type, pick the Minecraft version (or leave LATEST), set RAM, CPU cores and disk with sliders, accept the Minecraft EULA for that server, and press **Create and start**. The panel picks the next free port, creates the container on a game machine and starts it. The first start downloads the game, so give it a minute.

<img src="/projects/gamepanel/new-server.jpg" alt="The New server form: name, six server types, Minecraft version, RAM, CPU and disk sliders, and the EULA tick box" width="1316" height="980" loading="lazy">

## How it works

Players and admins only ever see the web page. Behind it, the panel is split in two parts that run on different machines.

**The panel** runs on one machine as a Docker Compose stack: the Vue 3 web app, a Fastify API on Node.js and PostgreSQL. The API owns accounts, permissions, the audit log and metrics, and it is the only thing that talks to the game machines.

**Each game machine** (a "node") runs a small Node.js agent and Docker. The agent runs each Minecraft server in its own container from the widely used `itzg/minecraft-server` image, and handles files, backups, the server console over RCON, the node's MariaDB and disk quotas. Nodes are a list in the database, so adding a second machine is one admin command.

**Between them**, the panel calls each agent over HTTPS with that node's own pinned certificate plus a per-node token. The agent accepts calls from nothing else.

**Isolation on the node.** Game containers run as an unprivileged user with every Linux capability dropped, and cannot talk to each other. A node firewall keeps containers off private address ranges and off the node itself. Each server gets its own database link, and per-server disk caps are XFS project quotas, so a runaway world cannot fill the disk for everyone.

**Code layout.** The repository is a pnpm workspace with three apps (the web app, the API and the node agent) and a shared package of types and validation used by all three. Passwords are hashed with Argon2, and sessions, invite links and node tokens are stored hashed, never in the clear.

## Requirements

- **Panel machine:** Docker with Compose. 2 cores and 4 GB RAM or more is comfortable.
- **Each node:** Linux with Docker, Node.js 24 and pnpm, and a disk for server data. Per-server disk caps need XFS with project quotas.
- Optional: a domain for the panel and for players' addresses. Servers also work by IP and port.

## Installation

The README has the full commands. In outline:

1. On each game machine, clone the repository, install dependencies with pnpm, build the shared package and the agent, fill in the agent settings (token, TLS certificate, addresses), then install and enable the node firewall and agent services.
2. On the panel machine, clone the repository, copy the example settings file for the panel and set the database password, app secret and server domain, then start it with `docker compose up -d --build`. To publish through a Cloudflare Tunnel, add the tunnel token and start the `tunnel` profile.
3. Create the first admin and register the first node with the admin commands below, then log in and press **New server**.

## Commands

Admin commands run on the panel machine through `docker compose exec panel node apps/panel-api/dist/cli.js <command>`.

| Command | Who | What it does |
| --- | --- | --- |
| `create-admin --email E` | Panel host admin | Creates an admin and prints a one-time password |
| `add-node ...` | Panel host admin | Registers a game machine with its address, token, certificate, public IP and port range |
| `register-server ...` | Panel host admin | Adopts a server that already runs on a node |
| `invite --email E --role subuser\|owner\|admin [--give-server ID]` | Panel host admin | Prints a one-time join link, valid 7 days, optionally handing over a server |
| `rebuild --id ID [--start]` | Panel host admin | Backs up a stopped server, then recreates its container so new defaults apply |

## Credits

Written by DaemonAlex. Game servers run on the `itzg/minecraft-server` container image. Plugin search and downloads use Modrinth and Hangar. Editing uses CodeMirror.
