---
title: DPS Rotations
tagline: Moves drug dealers, harvest fields and the casino podium car on a fixed daily or weekly schedule
category: fivem
area: world
status: live
repo: https://github.com/DaemonAlex/dps-rotations
stack: ["Lua", "oxmysql"]
frameworks: ["Standalone"]
requires: ["oxmysql", "rcore_drugs", "rcore_casino"]
tags: ["rotation", "drugs", "dealers", "casino", "anti-camping", "economy"]
order: 50
---

## Overview

Once a dealer's coordinates are on a wiki, the same few players camp that spot forever. DPS Rotations stops that. It keeps a pool of hand-picked candidate spots for each dealer and harvest field, and moves them on a schedule: suppliers and lab dealers change every day, harvest fields every week. It also changes the casino's podium car each week.

The schedule is worked out from the calendar, not from a random roll, so every restart within the same day or week lands on the same spot. Nothing drifts, nothing needs syncing, and staff always know where things are supposed to be.

## Features

- Daily rotations for the street supplier (12 spots across the city) and the lab dealer (6 spots in the county).
- Weekly rotations for the weed, coca and solvent harvest fields (3 spots each).
- A weekly casino podium car, chosen from a pool of custom vehicles.
- Deterministic picks: the same period always gives the same spot, and different pools do not move in lockstep.
- Dealer moves also place a table prop just behind the dealer, so the scene stays dressed without hand-placing objects.
- The podium change edits only the car inside the casino's saved settings and leaves colours, mods and plate alone.
- State is kept in the database, so a pool only moves once per period however often the server restarts.
- After a move, the affected resources are restarted once so they pick up the new locations.
- `/rotate` lets staff force a pool, or all pools, to the next spot.

## How it works

The resource runs once when the server boots. For each pool it works out the current period (today's date, or the ISO week for weekly pools) and compares it with the last period it applied. If the period has changed, it picks the next spot, writes it into the rcore_drugs or rcore_casino tables, and records what it did. If anything moved, it waits a few seconds and restarts `rcore_drugs` and `rcore_casino` so their caches reload. If nothing changed, it leaves everything alone.

A bad spot is fixed by editing its pool entry; the schedule maths never changes.

## Requirements

- `oxmysql`
- `rcore_drugs` (dealer and harvest tables)
- `rcore_casino` (podium car), if you use the podium rotation

## Installation

1. Put the folder in your resources directory as `dps-rotations`.
2. Add `ensure dps-rotations` to `server.cfg` after `oxmysql` and the resources it rotates.
3. Give staff the rotate command: `add_ace group.admin dps.rotations allow`.
4. Start the server. The `dps_rotations_state` table is created on first start.

## Configuration

Everything lives in `config.lua`.

| Option | Default | What it does |
| --- | --- | --- |
| `Config.RestartResource` | `rcore_drugs`, `rcore_casino` | Resources restarted after a rotation (one name or a list) |
| `Config.RestartDelayMs` | `8000` | Wait before restarting them |
| `Config.RotateAce` | `dps.rotations` | Ace needed for `/rotate` |
| `Config.Rotations` | 6 pools | Each pool has an `id`, a `cadence` (`daily` or `weekly`), a `target` (`dealer`, `harvest` or `podium`) and a `pool` of spots or cars |

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/rotate <id or all>` | Staff with `dps.rotations`, or the console | Force a pool, or every pool, to its next spot |

## Credits

Written by DaemonAlex for Del Perro Sands. Works on top of rcore_drugs and rcore_casino, which are separate resources.
