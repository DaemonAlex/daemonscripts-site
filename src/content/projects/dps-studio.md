---
title: DPS Studio
tagline: One admin panel to build walk-in rooms, furnish them, edit doors, mark spots and inspect any object in the world
category: fivem
area: admin
status: live
repo: https://github.com/DaemonAlex/dps-studio
stack: ["Lua", "NUI (HTML/JS)", "oxmysql", "Python (library builder)"]
frameworks: ["Qbox"]
requires: ["ox_lib", "oxmysql", "qbx_core", "qs-housing"]
tags: ["staff tool", "interiors", "furniture", "housing shells", "doors", "ox_doorlock", "mapping", "NUI"]
featured: true
order: 20
---

## Overview

Studio is where the staff of Del Perro Sands build the rooms players use every day. Type `/admin` and one panel opens with tabs for rooms, furniture, shells, object inspection, saved spots, doors and history. Everything that used to need a separate script, a text file of coordinates or a restart now happens in game, by looking and clicking.

A room is a door somewhere in the world that leads into a housing shell or a real game interior. Staff place the door, pick the shell, mark the way out, then furnish it from a library of thousands of props. Players simply walk up and press E. Rooms can be open to everyone or locked to staff, jobs, gangs, key items, specific characters or a passcode.

Every change is logged with who made it and when, and most of them can be put back. A bad edit at 2 a.m. is one click to undo, not a database restore.

## Features

- Build rooms from a qs-housing shell or from a real interior provided by bob74_ipl.
- Each room has a door in the world and a way out inside; players press E at either and the screen fades as they move.
- Room access: everyone, staff, jobs or gangs with a minimum grade, key items, specific citizen ids, or a passcode. Staff always get in.
- Rename, move, copy, delete or teleport to a room, and change its shell or way out.
- Rooms only load for players within 250 m. Inside a shell room the clock and rain pause for that player only.
- Saved looks: every room holds named sets of furniture you can create, copy, rename, switch or delete.
- Interior rooms also keep a bob74_ipl style per look (default, full, empty or custom).
- Place any library object in follow mode, then fine tune by 1 cm and 1 degree (10 cm and 15 degrees with Shift). Up to 400 pieces per look.
- Hide library pieces from the Place list for every admin.
- Preview any shell in the sky, orbit the camera around it, and walk inside before using it.
- Hold middle mouse to inspect the object you aim at: model name, type, hash, coordinates, heading and interior. The last 30 scans are kept.
- `/spot` and `/pos` save your position to the database; the Spots tab lists the last 400 and can teleport you to them.
- Doors tab for ox_doorlock: rename, lock state, access, auto lock, lockpick and range; create single or double doors by clicking them; remove doors.
- Extra door access options, "Everyone" and "Staff only", on top of ox_doorlock's own groups, items, characters and passcode.
- A room can own doors, so changing the room's access updates all of them.
- History: every room and door change is logged. Restore a room to before a change, bring back a deleted room, or restore a door. 200 snapshots are kept per room.
- Photo booth: photographs every library piece alone in the sky, cuts it out and uploads it to Fivemanage so the Place list has thumbnails. Pieces that are too big or never load are left out. The next run continues where the last stopped.
- Map flyover: `/mapflyover` takes a top-down picture of every map pack listed in `flyover/targets.json` that has none yet.

## How it works

1. An admin types `/admin`. The server checks the `dps.entityselector` ace before the panel opens.
2. In the Rooms tab they stand where the door should be, pick a shell or interior, walk inside it and press G to mark the way out.
3. In the Place tab they choose props from the library. The piece follows their view; Tab switches to fine tune; left click or Enter saves it.
4. They set who may enter, and optionally attach ox_doorlock doors to the room so one access rule covers everything.
5. Players walking past see the door prompt and press E to go in. The room and its furniture spawn only while someone is nearby.
6. If anything goes wrong, the History tab shows every change and can put a room or door back.

Shell rooms sit 60 m below their door. Furniture, rooms and doors are stored in the database, so nothing is lost on restart.

## Requirements

Required by the manifest:

- `ox_lib`
- `oxmysql`

Needed for the matching features:

- `qbx_core` (job and gang lists and player data for room and door access)
- `qs-housing` (Studio reads its shell and furniture lists; without it those lists are empty)
- `ox_doorlock` (Doors tab, door access hook, room doors)
- `ox_inventory` (key item list and key item checks on room doors)
- `bob74_ipl` (interior rooms and interior styles)
- `screencapture` (photo booth and `/mapflyover`)
- A weather sync resource that answers `qb-weathersync:client:DisableSync` and `qb-weathersync:client:EnableSync`
- A Fivemanage image key, only for the photo booth

## Installation

1. Put the folder in your resources directory as `dps-studio`.
2. The prop library (`html/library.json`) ships with the resource. Rebuild it with `tools/build_library.py` after adding prop packs.
3. Keep the resource folder writable by the server if you use `/mapflyover`, which writes pictures into `flyover/shots/`.
4. Add `ensure dps-studio` to `server.cfg` after its dependencies (ox_lib, oxmysql, qbx_core, ox_inventory, qs-housing, ox_doorlock, screencapture, bob74_ipl).
5. Give admins the permissions: `add_ace group.admin dps.entityselector allow`, plus `add_ace group.admin command.doorlock allow` to create or remove doors from the Doors tab.
6. Optional, for the photo booth: set the convar `dps:fivemanage_image` to your Fivemanage key in `server.cfg`.
7. Start the server. The `dps_studio_*` tables are created on first start.

On first start Studio also imports any rooms and spots left in its `import/` folder, once.

## Configuration

There is no config file. The main values are constants at the top of the source files.

| File | Constant | Default | What it does |
| --- | --- | --- | --- |
| `shared/logic.lua` | `Studio.MAX_PIECES` | `400` | Most pieces in one look |
| `shared/logic.lua` | `Studio.DEPTH` | `60.0` | How far under its door a shell room sits (metres) |
| `server/main.lua` | `ACE` | `dps.entityselector` | Permission for Studio |
| `server/main.lua` | `KEEP_SNAPSHOTS` | `200` | Restorable history snapshots per room |
| `client/booth.lua` | `BIG` | `12.0` | Pieces larger than this (metres) are not photographed |
| `client/booth.lua` | `FOV` | `40.0` | Photo booth camera field of view |
| `client/flyover.lua` | `FOV` | `60.0` | Flyover camera field of view |

The convar `dps:fivemanage_image` holds the photo upload key, and `flyover/targets.json` lists the map packs for the flyover.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/admin` | Admins (`dps.entityselector`) | Open or close the Studio panel |
| `/mapflyover` | Admins (`dps.entityselector`) | Start the map flyover (needs `screencapture`) |
| `/spot [words]` | Admins | Save your position with the nearest prop, street and area (default key Page Up) |
| `/pos` | Admins | Save your position and show a `vector4(...)` card (default key F3) |
| Middle mouse (hold) | Admins | Inspect the object you aim at (rebindable as `+studio_scan`) |
| E at a room door | All players | Enter or leave a room, if allowed |
| Backspace | Admins | Leave previews, placing, door picking, the photo booth and the flyover |

## Credits

Written by DaemonAlex for Del Perro Sands. Studio absorbs three earlier DPS tools: the object inspector comes from dps-whatobject, the spot keys from dps-markspot, and saved portals are imported from dps-shellbrowser. Shells and furniture come from qs-housing, interiors from bob74_ipl, and door handling from ox_doorlock.
