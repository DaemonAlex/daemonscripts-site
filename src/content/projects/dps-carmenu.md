---
title: DPS Car Menu
tagline: The original staff vehicle browser for Del Perro Sands, now merged into DPS Fleet
category: fivem
area: admin
status: archived
repo: https://github.com/DaemonAlex/dps-carmenu
stack: ["Lua", "ox_lib", "NUI (HTML/JS)"]
frameworks: ["Qbox"]
requires: ["ox_lib", "qbx_core"]
tags: ["vehicle browser", "spawner", "staff tool", "NUI", "handling"]
order: 90
---

## Overview

Car Menu was the Del Perro Sands fleet browser for admins and testers. `F7` or `/carmenu` opens a panel over the live Qbox vehicle registry: search it, read what a car actually is, spawn it in place of the one you sit in (or beside it), and copy a clean text card to paste into a ticket or an AI chat.

Because it reads the registry live, any change to the server's vehicle list shows up after the next restart without touching this resource.

Car Menu has since been merged with dps-EVM into [DPS Fleet](/projects/dps-fleet/), which keeps the same `F7` key and `/carmenu` command. This repository is kept for reference; new installs should use Fleet.

## Features

- Search across name, brand, model code, category and pack.
- Search tokens such as `cat:sports`, `pack:...`, `type:bike`, `brand:pegassi`, `price:<50000`, `speed:>200` and `sort:price-desc`.
- Category rail with counts, plus Recent (last 15 spawned) and per-player Favourites.
- Layered vehicle info: registry details, source pack and game class, model facts read from the game (top speed, acceleration, braking, traction, seats, size), and handling numbers once the vehicle exists.
- Spawn replaces the vehicle you are in at the same spot and heading, with you still in the seat; Spawn beside puts it next to you.
- Hands over keys through wasabi_carlock when it is running.
- Copy card puts a plain-text vehicle card on the clipboard; Copy handling copies every handling field.
- Remove mine deletes the vehicle you sit in or last spawned.
- Workshop button hands the vehicle to dps-EVM for liveries, extras, mods and repairs.
- Full keyboard control.
- Every server callback re-checks the ace, so a modified client cannot spawn through it.

## How it works

1. A player with the `dps.carmenu` ace presses `F7` or types `/carmenu`.
2. They type to search and move with the arrow keys.
3. `Enter` spawns the selected vehicle in place of the current one; `Shift+Enter` spawns it beside them.
4. `C` copies the vehicle card, `F` toggles a favourite, `Esc` closes the panel.

## Requirements

- `ox_lib`
- `qbx_core`
- Optional: `wasabi_carlock` (keys on spawn)
- Optional: a fleet state file at `data/fleet_state.json`; without it every pack shows as vanilla
- Optional: dps-EVM for the Workshop button

## Installation

1. Copy `dps-carmenu` into your resources and add `ensure dps-carmenu` to `server.cfg`.
2. Grant access in `server.cfg`:
   `add_ace group.admin dps.carmenu allow`
   `add_ace group.tester dps.carmenu allow`

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `F7` / `/carmenu` | Players with the `dps.carmenu` ace | Open the fleet browser |

## Credits

Written by DaemonAlex for Del Perro Sands. Succeeded by DPS Fleet.
