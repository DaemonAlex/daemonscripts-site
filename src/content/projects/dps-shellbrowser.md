---
title: DPS Shell Browser
tagline: Preview every qs-housing shell in the sky and turn any door in the world into a furnished walk-in room
category: fivem
area: admin
status: archived
repo: https://github.com/DaemonAlex/dps-shellbrowser
stack: ["Lua"]
frameworks: ["Qbox"]
requires: ["ox_lib", "qs-housing"]
tags: ["staff tool", "housing shells", "interiors", "furniture", "portals"]
order: 85
---

## Overview

The Shell Browser answered a simple question for staff: what does each housing shell actually look like? `/shells` spawns one shell at a time high above the sea, with a camera that circles it, so even open shells with no walls or roof can be seen from every side. Press Enter and you are standing inside it.

It also introduced portals: a door somewhere in the city that leads into a shell hidden 60 m underneath, which staff could then furnish with `/decorate`. That idea grew into the Rooms tab of DPS Studio, which imports the portals saved here. This repository is kept for reference.

## Features

- `/shells` browses every shell in qs-housing's `Config.Shells` list, in config order. Commented-out entries are skipped.
- Start from a number or part of a shell's model name, for example `/shells 40`.
- Orbit camera with mouse or Q and E, scroll to zoom, arrows to step through shells (up and down jump 10).
- Walk mode puts you on the shell's floor; falling out puts you back on it.
- Copy the shell's model name to the clipboard with C.
- Nothing is networked while browsing: other players never see the shell.
- `/portal` turns the spot you stand on into a door that leads into a chosen shell; you mark the way out inside with G.
- Portal rooms spawn, with their furniture, only while a player is within 250 m.
- `/decorate` inside a portal room adds furniture from the qs-housing furniture list, or moves and removes placed pieces. Up to 400 pieces per room.
- Portals and furniture are saved in the resource's own `portals.json`.

## How it works

1. An admin stands at a door, faces it and types `/portal greenroom Green Room`.
2. The shell browser opens. They pick a shell, press Enter to walk in, and press G where the way out should be.
3. The server checks the name, the coordinates and that the shell is in the housing list, then saves the portal and sends it to every player.
4. Players see "[E] Enter Green Room" at the door. The screen fades and they arrive inside; the way out works the same in reverse.
5. Inside, the admin uses `/decorate` to add furniture from categorised menus.

## Requirements

- `ox_lib`
- `qs-housing` (the shell list and the furniture catalogue are read from its config files)

## Installation

1. Put the folder in your resources directory as `dps-shellbrowser`.
2. Add `ensure dps-shellbrowser` to `server.cfg` after `ox_lib` and `qs-housing`.
3. Give admins the `dps.entityselector` ace, for example `add_ace group.admin dps.entityselector allow`.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/shells [number or name]` | Admins (`dps.entityselector`) | Open the shell browser |
| `/portal <name> [label]` | Admins | Make a door into a shell from where you stand |
| `/portal list` | Admins | List all portals |
| `/portal delete <name>` | Admins | Remove a portal |
| `/decorate` | Admins, inside a portal room | Add, move or remove furniture |
| E at a portal door | All players | Enter or leave the room |

## Credits

Written by DaemonAlex for Del Perro Sands. Shells and furniture come from qs-housing. Superseded by DPS Studio.
