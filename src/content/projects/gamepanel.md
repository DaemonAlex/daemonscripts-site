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

I built this because I wanted to run a Minecraft server for a friend who had just come home from deployment, on a machine I already owned, without handing the keys to a hosting company. Every panel I tried was either a rented slot on someone else's hardware or a pile of scripts that only I could operate. So I wrote the panel I wanted: one web page where you start and stop servers, watch the console, manage players, plugins, files, backups and databases, and hand a friend their own server with a link.

Minecraft is the first game it runs. Paper, Purpur, Vanilla, Fabric, Forge and NeoForge all work, each server in its own container on a machine you control.

It is made for sharing. You invite someone with a link, you can hand them a whole server, or you can give a friend the console and nothing else. Everyone gets exactly the access they need, on exactly the servers they need, and every change is written down.

It is also careful on your behalf. A backup is taken before every risky change, a snapshot before every database edit, and game servers can reach neither each other nor your private network. Those are not options you switch on; they are how it works.

## What you see when you log in

<figure class="side">
<img src="/projects/gamepanel/server-card.jpg" alt="A server card: Perpetual Wonders, running, the address with a Copy button, type, players, CPU, port, a RAM bar and a CPU line for the last hour" width="746" height="594" loading="lazy">
<figcaption>One card per server. Copy the address, see who is on, and spot a RAM problem before anyone complains about lag.</figcaption>
</figure>

Every server on one page: whether it is running, the address to hand out (one click copies it), who is on, how hard the CPU is working, how much RAM is in use and a trend line for the last hour. If a server is running out of RAM, the panel says so at the top instead of leaving you to find out from a lag report.

Admins also see each game machine: RAM promised to servers against what the box has, disk used, and 24-hour graphs for both. From the same page you can send a message to every server at once (handy before a restart) or start, restart and stop all of them.

<figure>
<img src="/projects/gamepanel/node.jpg" alt="The node card: RAM promised 8.0 GB of 15.6 GB, disk used 12.9 GB of 119.9 GB, and 24-hour graphs for both" width="2216" height="754" loading="lazy">
<figcaption>The machine itself. The dashed line on each graph is the limit, so you can see how close you are running.</figcaption>
</figure>

<figure>
<img src="/projects/gamepanel/tools.jpg" alt="The dashboard tools: find a server, a message box that sends to every server, and Start all, Restart all and Stop all buttons" width="2216" height="430" loading="lazy">
<figcaption>Find a server by name, port, IP, type or memory; warn everyone at once; start or stop the lot.</figcaption>
</figure>

### One server, everything on one page

Open a server and the first tab is the overview: connection info with the address, edition, version and whether the whitelist is on, plus a ready-made set of join steps you can send to a friend who has never joined a server before.

<figure>
<img src="/projects/gamepanel/connection.jpg" alt="Connection info: play.example.com with a Copy address button, edition Java, Minecraft 1.21.4, whitelist on, IP and port, and a Join steps to send a friend link" width="2216" height="422" loading="lazy">
<figcaption>Everything a new player asks you for, in one block, with join steps written for someone who has never done it.</figcaption>
</figure>

Below that: TPS, tick time, players, uptime, CPU and RAM, each with a note about what a good number looks like, and performance graphs over the last hour, the last day or the last week. Samples are taken every 30 seconds and kept for 8 days.

<figure>
<img src="/projects/gamepanel/tiles.jpg" alt="Six tiles: TPS 20.0, tick time 0.1 ms, players 3 of 20, up time 21 min, CPU 1.2 percent, RAM 6.8 GB of 7.5 GB, each with a one-line note" width="2216" height="288" loading="lazy">
<figcaption>The numbers, each with a line that says what good looks like. "Under 50 ms keeps 20 TPS" saves a search.</figcaption>
</figure>

<figure>
<img src="/projects/gamepanel/graphs.jpg" alt="Performance graphs for the last hour: TPS, tick time, players, CPU, RAM and disk, with 1 hour, 24 hours and 7 days buttons" width="2216" height="912" loading="lazy">
<figcaption>Was it laggy last night? Switch to 24 hours and look at the tick time line.</figcaption>
</figure>

## The console

The live server console in your browser, with command history on the up arrow, the way a terminal behaves. Every command anyone sends is recorded in the audit log with their name, so when a plugin config "changed itself", you can see who typed what.

<figure>
<img src="/projects/gamepanel/console.jpg" alt="The live console: Paper starting, plugins loading, players joining and chatting, and a command line at the bottom" width="2216" height="1084" loading="lazy">
<figcaption>The console follows new lines until you scroll up to read something, then stays put.</figcaption>
</figure>

## Players

Who is online right now, and buttons for the things you do a hundred times: message, kick, op, ban. No command syntax to remember and no typos in a player's name.

<figure>
<img src="/projects/gamepanel/players.jpg" alt="Three players online, each with Message, Kick, Op or Deop and Ban buttons" width="2216" height="474" loading="lazy">
<figcaption>Online now. The op badge shows who already has it; the button flips between Op and Deop.</figcaption>
</figure>

The whitelist is its own list with a switch, operators have their level shown, bans keep their reason, and there is a list of everyone the server has ever seen with the last time they were on.

<figure>
<img src="/projects/gamepanel/whitelist.jpg" alt="The whitelist with five names and an On: invite only switch, beside the operators list showing Marnie at level 4" width="2216" height="638" loading="lazy">
<figcaption>Whitelist and operators side by side. Add a name, remove a name, done.</figcaption>
</figure>

## Plugins and mods

Every installed plugin (or mod, on Fabric, Forge and NeoForge) with its version. Switch one off without deleting it, or move it to the trash. Search Modrinth and Hangar from inside the panel for plugins that fit the server's Minecraft version and install them in one click. Files are only ever fetched from those two sites' own servers and checked against the hash they publish, so a plugin that has been tampered with on the way does not get installed.

When a plugin has a newer stable release for your Minecraft version, the panel offers the update next to it. Big jumps (say 3.x to 4.x) are flagged, because those are the ones that change configs and commands.

<figure>
<img src="/projects/gamepanel/plugins.jpg" alt="Installed plugins with versions and file sizes, Update buttons where a newer version exists, Turn off and trash buttons, and a search box for Modrinth and Hangar" width="2216" height="1266" loading="lazy">
<figcaption>Three updates waiting. Dynmap's is a big jump, so the button says so before you press it.</figcaption>
</figure>

## Minecraft version updates without the panic

Updating Minecraft used to mean a weekend. The panel tells you when a newer version is out and suggests the sensible one: the newest release in your current line, or the newest overall.

<figure>
<img src="/projects/gamepanel/version.jpg" alt="The version box: Minecraft 1.21.11 is available, you are on 1.21.4, with a Check my plugins button and the type and version pickers" width="2216" height="486" loading="lazy">
<figcaption>The nudge. Nothing changes until you press Change, and Change is greyed out while the server runs.</figcaption>
</figure>

Before you change anything, press **Check my plugins**. It looks every plugin up and tells you which ones are ready for the new version, which are not there yet, and which it cannot tell. If a plugin would break, you know before the server is down, not after.

<figure>
<img src="/projects/gamepanel/plugin-check.jpg" alt="The plugin check for 1.21.11: 3 ready, 1 not yet, 1 check by hand, with each plugin's result and a warning that one plugin may not load" width="2216" height="1038" loading="lazy">
<figcaption>CoreProtect has no build for 1.21.11 yet. That is the weekend you just did not lose.</figcaption>
</figure>

When you do switch, the panel stops the server, takes a backup first, moves it to the new version with the right Java for it, and starts it again.

## Files

A file manager for the server folder: browse, upload (big files go up in pieces so a flaky connection does not kill the transfer), download, rename, and make new files and folders. Deleting moves things to a trash folder instead of destroying them.

<figure>
<img src="/projects/gamepanel/files.jpg" alt="The server folder: plugins, world, logs and config folders, then server.properties, bukkit.yml, spigot.yml and the other files, each with download, rename and delete buttons" width="2216" height="1574" loading="lazy">
<figcaption>The server folder. Folders first, then files with their size and date.</figcaption>
</figure>

Open a text file and you get a proper code editor with line numbers and syntax colouring, so editing a plugin config is a two-minute job from your phone, not a trip to the machine. Ctrl+S saves.

<figure>
<img src="/projects/gamepanel/editor.jpg" alt="server.properties open in the editor with line numbers and coloured keys, and Save and Close buttons" width="2216" height="1306" loading="lazy">
<figcaption>server.properties in the editor. Save lights up when something has changed.</figcaption>
</figure>

## Settings

<figure class="side">
<img src="/projects/gamepanel/settings.jpg" alt="The General group of settings: the MOTD shown in colour, the message of the day field, max players, and the whitelist switches" width="746" height="808" loading="lazy">
<figcaption>The MOTD preview shows the colour codes the way the server list will.</figcaption>
</figure>

`server.properties` as a form, grouped into General, Gameplay, World, Players and Advanced, with a line under each setting saying what it does and what it costs. The message of the day is previewed with its colour codes the way it will look in the server list, so you are not counting section signs.

Switches are switches, numbers are numbers, and the panel knows which settings need a restart to take effect and tells you.

## Databases

Plenty of plugins want a real database, and setting one up by hand is the step where most people give up. Here it is one button. The panel runs MariaDB on the game machine, creates a database for the server, and shows you the host, user and password to paste into the plugin's config.

<figure>
<img src="/projects/gamepanel/databases.jpg" alt="Two databases with host, port, database, username and a hidden password, New password and Delete buttons, and a Create database box" width="2216" height="1110" loading="lazy">
<figcaption>Each database with exactly the five values a plugin config asks for. The eye button shows the password.</figcaption>
</figure>

You can browse the tables and rows, fix or delete a single row, or run a query. Queries are read-only unless you tick **Allow changes**, and even then it warns you and asks again. A snapshot is taken before every change, every change is logged, and the databases are included in the server's backups. Each server reaches its databases over its own private link, so servers cannot see each other's data.

<figure>
<img src="/projects/gamepanel/tables.jpg" alt="The table browser: the tables in pw_essentials with row counts, and the first rows of luckperms_players" width="2216" height="846" loading="lazy">
<figcaption>Browse a table without leaving the panel. Edit a row and a snapshot is taken first.</figcaption>
</figure>

## Backups and schedules

Backups run while people keep playing. The world is held still for the few seconds the archive is being made, then released. Keep the newest N backups, download one, or restore one. A restore takes its own backup first, so even a restore is undoable.

<figure>
<img src="/projects/gamepanel/backups.jpg" alt="Back up now, keep newest 7, and five backups listed with their size and whether they came from a schedule, by hand or before a restore" width="2216" height="828" loading="lazy">
<figcaption>Each backup says where it came from. The pre-restore one is the safety net the panel made on its own.</figcaption>
</figure>

Schedules do the boring part for you: back up, restart, save the world, run a command or send a chat message, either every N minutes or at set times on chosen days, in your own time zone. A scheduled restart warns players a minute before. Each schedule shows when it last ran and whether it worked.

<figure>
<img src="/projects/gamepanel/schedules.jpg" alt="Five schedules: a daily backup, a chat warning, a restart, a save every 30 minutes and a weekend command, each with its last run and an On or Off switch" width="2216" height="1026" loading="lazy">
<figcaption>A typical night: warn at 4:25, restart at 4:30, backup before both. The weekend command is switched off until it is needed.</figcaption>
</figure>

## Logs

The current log, older logs and crash reports in one place, searchable. Type ERROR, or a player's name, and you get only the matching lines with their line numbers, errors highlighted. If there is a crash report, the panel points it out so you do not miss it.

<figure>
<img src="/projects/gamepanel/logs.jpg" alt="The log picker on latest.log, a search for ERROR, a notice that there is a crash report, and the two matching lines highlighted" width="2216" height="526" loading="lazy">
<figcaption>Two lines out of twenty-two, and a note that a crash report is waiting in the list.</figcaption>
</figure>

## People

This is the part I cared about most. Three roles: **admin** (everything), **owner** (runs their own servers within a quota) and **subuser** (a helper who only sees what is shared with them). An admin invites someone from the People page: type their email, pick the role, and the panel makes a one-time link that works for seven days. There is no email server to set up; you paste the link into a message yourself.

<figure>
<img src="/projects/gamepanel/invite-form.jpg" alt="The invite form: an email box, a role picker set to Owner, and a Make invite link button" width="2216" height="188" loading="lazy">
<figcaption>Email, role, button. The link it makes is the only thing you send.</figcaption>
</figure>

<figure>
<img src="/projects/gamepanel/people.jpg" alt="Everyone: an admin, two owners with their server, RAM and disk usage against their limits, a subuser, and a turned-off account, with Limits, Reset link and Turn off buttons" width="2216" height="810" loading="lazy">
<figcaption>Everyone with an account. Owners show how much of their quota they are using; the 2-step badge shows who has two-step login on.</figcaption>
</figure>

<figure class="side">
<img src="/projects/gamepanel/invite.jpg" alt="The invite page: Welcome, set a password for sam@example.com, two password boxes and a Join and log in button" width="880" height="632" loading="lazy">
<figcaption>What the other person sees. One password, twice, and they are in.</figcaption>
</figure>

The person opens the link, sets a password, and they are in. An invite can also hand them a server on the way in, so a friend's first login already shows their own world.

Each owner has a quota: how many servers, how much RAM and how much disk. Admins can turn an account off (which ends its sessions on the spot), make a password reset link, and set a per-server disk cap that is enforced on the game machine itself.

### Share a server, but only the parts you want

An owner can share a server with anyone who has an account and tick exactly what that person may do: console and commands, start and stop, players, files, plugins, backups, schedules, logs, settings, databases. A helper with only console and logs sees only those two tabs, and nothing else about your setup.

<figure>
<img src="/projects/gamepanel/sharing.jpg" alt="Who else can use this server: an email box, ten permission chips with three ticked, and two people listed with the rights each one has" width="2216" height="800" loading="lazy">
<figcaption>Priya gets console, players and logs. Jordan gets nearly everything. Neither sees the databases.</figcaption>
</figure>

## Two-step login

Any account can turn on two-step login from its account page. Scan the code with Google Authenticator, Authy, 1Password or any app of that kind, type the six digits once to prove it works, and from then on the login page asks for the code after the password. The People page shows a badge next to everyone who has it on.

<div class="shots">
<figure>
<img src="/projects/gamepanel/two-step.jpg" alt="Two-step login setup: a QR code, the key for typing by hand, a box for the first six-digit code and a Turn on button" width="1000" height="1002" loading="lazy">
<figcaption>Turning it on. The key is there for people who cannot scan.</figcaption>
</figure>
<figure>
<img src="/projects/gamepanel/login.jpg" alt="The login page: email, password and a Log in button" width="800" height="660" loading="lazy">
<figcaption>The front door. With two-step on, a code box follows the password.</figcaption>
</figure>
</div>

## Starting a new server

Name it, pick the type, pick the Minecraft version (or leave LATEST), set RAM, CPU cores and disk with sliders, accept the Minecraft EULA for that server, and press **Create and start**. The panel picks the next free port, creates the container on a game machine and starts it. The first start downloads the game, so give it a minute.

<figure class="mid">
<img src="/projects/gamepanel/new-server.jpg" alt="The New server form: name, six server types with a line each, Minecraft version, RAM and disk sliders, CPU cores, the EULA tick box and Create and start" width="1320" height="1460" loading="lazy">
<figcaption>Six types, each with one line saying who it is for. Paper is the usual choice.</figcaption>
</figure>

## How it works

Players and admins only ever see the web page. Behind it, the panel is split in two parts that run on different machines.

**The panel** runs on one machine as a Docker Compose stack: the Vue 3 web app, a Fastify API on Node.js and PostgreSQL. The API owns accounts, permissions, the audit log and metrics, and it is the only thing that talks to the game machines.

**Each game machine** (a "node") runs a small Node.js agent and Docker. The agent runs each Minecraft server in its own container from the widely used `itzg/minecraft-server` image, and handles files, backups, the server console over RCON, the node's MariaDB and disk quotas. Nodes are a list in the panel; add a second machine and new servers can go on either.

**Between them**, the panel calls each agent over HTTPS with that node's own pinned certificate plus a per-node token. The agent accepts calls from nothing else.

**Isolation on the node.** Game containers run as an unprivileged user with every Linux capability dropped, and cannot talk to each other. A node firewall keeps containers off private address ranges and off the node itself. Each server gets its own database link, and per-server disk caps are XFS project quotas, enforced by the file system rather than by the panel asking nicely.

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
