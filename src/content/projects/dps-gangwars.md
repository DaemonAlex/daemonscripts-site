---
title: DPS Gang Wars
tagline: Corner crews hold their blocks, rivals roll through and gang wars break out, while players stay bystanders
category: fivem
area: world
status: live
repo: https://github.com/DaemonAlex/dps-gangwars
stack: ["Lua", "ox_lib"]
frameworks: ["Qbox", "QBCore"]
requires: ["ox_lib", "qbx_core", "rcore_gangs (optional)", "wasabi_mdt (optional)"]
tags: ["gangs", "ambient AI", "territories", "NPC", "drive-by", "dispatch", "rcore_gangs"]
featured: true
order: 10
---

## Overview

Gang Wars makes the city's gang territories feel lived in. Crews of NPCs in their gang's colours stand on their corners dealing, smoking and leaning on walls. Cross a couple of streets and the colours change. Every so often a rival crew rolls through: sometimes it is just shouting, sometimes a drive-by, sometimes a real shoot-out.

On top of the street life it runs full gang wars: waves of reinforcements for both sides, triggered by an rcore_gangs rivalry or by an admin. When the NPCs shoot it out, a nearby "witness" may call it in, so police get a delayed, vague 911 report in the MDT, just like a real call.

Players are civilians to all of it. The AI fights the AI. An NPC cannot tell a player's gang by looking at them, so nobody is attacked for who they are, only for what they do.

## Features

- Corner crews of three to five gang NPCs per spot, many of them carrying concealed weapons.
- Territories for the Families, Ballas, Vagos, Marabunta and Triads, each gang with its own models, cars, weapons, idle scenarios and combat style.
- Rare street events with a cooldown per territory: taunt stand-offs that may escalate (more often at night), drive-bys and short foot skirmishes.
- The Yellow Jack Inn is a biker and redneck hangout: crews cluster by their bikes and trucks, thick after dark and thin by day, and the usual event is a fist fight.
- The Vespucci boardwalk runs a "stroll" mode: mixed gang walkers, presence without turf events.
- Gang wars with staggered reinforcement waves for attacker and defender, an engine that keeps both sides fighting, and automatic cleanup when the war ends.
- Wave sizes are capped per client so a war cannot overrun the entity budget.
- Crews talk back to police who roll past, but never start a fight with them.
- Witness reports: delayed, position-fuzzed, anonymous 10-71 calls into wasabi_mdt, with per-area cooldowns and a cap per fight.
- The same gang never fights itself.
- Works with rcore_gangs (detected automatically) or a built-in standalone territory list.
- Spawns are requested by the client but authorised by the server, which resolves who owns each zone.

## How it works

The street layer runs on its own. When a player comes near a territory, its crews spawn for them and go about their business. Events roll rarely, by design: the aim is atmosphere, not a constant war zone.

Wars start from rcore_gangs when a rivalry begins, or from the `gangwar` admin command. Both gangs send reinforcements in waves until the war is over, then everything is cleaned up. The admin command drives this resource's own war system directly, so it never creates a real, lasting rivalry inside rcore_gangs.

A "wear colours in rival turf and get recognised" mechanic is planned. It will be earned hostility, never automatic.

## Requirements

- `ox_lib`
- `qbx_core` (QBCore-compatible)
- Optional: `rcore_gangs` (paid), detected automatically, or the built-in standalone territory list
- Optional: `wasabi_mdt` (paid) for witness dispatch calls

## Installation

1. Drop `dps-gangwars` into your resources folder.
2. Add `ensure dps-gangwars` after your gang script and `ox_lib`.
3. Review `config.lua`: gang models, weapons and vehicles, territories and event tuning.
4. Keep `Config.Debug = false` in production (it is off by default).

## Configuration

Settings live in `config.lua`. Street event tuning (crew size, event chance, cooldowns, event weights and armed share) is in the `VIBE` table at the top of the street section in `client.lua`.

| Option | What it does |
| --- | --- |
| `Config.Integration.gangScript` | `auto`, `rcore_gangs` or `standalone` |
| `Config.GangData` | Per-gang models, vehicles, weapons, scenarios and combat style |
| `Config.StandaloneTerritories` | Name, label, owner, centre and radius for each block (also used by the street layer under rcore) |
| `Config.WarReinforcements` | Wave schedule and the war NPC cap |
| `Config.Relationships` | Gang to gang relationship levels |
| `Config.AmbientSpawning` | Density by heat and time of day, spawn and despawn distances |
| `Config.MaxSpawnedNPCs` | Ambient NPC cap (default `30`) |
| `Config.Debug` | Extra console output (default `false`) |

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `gangwar [zone] [attacker] [defender]` | Console or `command` ace | Start a war, for example `gangwar davis families ballas` |
| `gangwar_end [zone]` | Console or `command` ace | End the war in a zone |
| `gangvibe [taunt\|driveby\|skirmish\|dustup]` | Console or `command` ace | Force a street event at your nearest territory (only you see it) |
| `/gangai status\|spawn\|clear [gang]` | Admins | Show NPC counts, spawn a gang's NPCs at your position, or clear all gang NPCs |

## Credits

Written by DaemonAlex for Del Perro Sands. Integrates with rcore_gangs (rcore) and wasabi_mdt (Wasabi Scripts), paid resources that are not included. MIT licence.
