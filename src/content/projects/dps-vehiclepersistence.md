---
title: DPS Vehicle Persistence
tagline: Owned cars stay where you left them, through logouts and server restarts, with mods, fuel and damage intact
category: fivem
area: vehicles
status: live
repo: https://github.com/DaemonAlex/dps-vehiclepersistence
stack: ["Lua", "ox_lib", "MySQL"]
frameworks: ["Qbox", "QBCore", "ESX"]
requires: ["ox_lib", "oxmysql"]
tags: ["persistence", "vehicles", "garages", "state bags", "impound"]
order: 30
---

## Overview

Vehicle Persistence keeps player cars in the world the way real cars behave. Get out of your car and it stays there. Log off and it stays there. Restart the server and it comes back in the same spot, with its mods, colours, livery, fuel and damage as you left them.

It only tracks vehicles a player actually owns, and leaves out emergency fleets, work vehicles and job spawns, so the streets do not fill up with police cruisers and forklifts. Cars that sit untouched for too long are impounded or deleted automatically.

Other vehicle scripts (garages, tow jobs, mechanics, impound) can tell it when they take a car, lock a car while they work on it, or exclude a car for good, so nothing fights over the same vehicle.

## Features

- Vehicles stay in the world when their owner gets out or disconnects, even if they drop while driving.
- Vehicles respawn after a server restart in the same place.
- Saves mods, colours, liveries, fuel, engine and body damage.
- Cars, bikes, boats, helicopters, planes, quad bikes and trailers, each respawned with the right physics type.
- Only owned vehicles persist; a per-player cap (5 by default).
- Model and job blacklists keep emergency, maritime, work and service vehicles out.
- Vehicles spawned by job scripts are excluded automatically by listening for their spawn events.
- Staff vehicles can be exempt, which helps with testing.
- Storing a car in a supported garage removes it from the world list.
- Orphaned cars from inactive players are impounded (with a daily fee, capped) or deleted.
- Optional hard expiry for cars nobody has touched in a set time.
- Exports to lock, exclude or report on vehicles, plus state bags so clients can see what is persisted.
- Server-side ownership checks and input cleaning on every save and every client event.
- Fuel script auto-detection, with a native fallback.

## How it works

1. A player gets out of a car they own. The client sends its position and properties, and the server checks ownership before saving.
2. The car stays in the world, tagged with its owner through state bags.
3. On restart, persisted cars respawn one by one with a short delay so the server is not flooded.
4. When the car goes into a garage, is towed, impounded or destroyed, it is removed from the world list.
5. A cleanup pass runs on an interval and handles cars whose owners have been away for a week (by default).

## Requirements

- `ox_lib`
- `oxmysql`
- One of `qbx_core`, `qb-core` or `es_extended` (detected automatically)

The README lists support for these garage scripts: qs-advancedgarages, jg-advancedgarages, qb-garages, cd_garage, loaf_garage, okokGarage and esx_advancedgarage. It also names integrations with dealership, tow (including dps-towjob), police, mechanic and admin menu resources.

## Installation

1. Copy `dps-vehiclepersistence` into your resources folder.
2. Add `ensure dps-vehiclepersistence` to `server.cfg`.
3. Restart the server. The `dps_world_vehicles` table is created on first start; `install.sql` is there if automatic creation fails.

## Configuration

Everything lives in `config.lua`.

| Option | Default | What it does |
| --- | --- | --- |
| `Config.AdminExempt` | `true` | Staff vehicles do not persist |
| `Config.StaffGroups` | admin, god, mod and others | Groups treated as staff |
| `Config.VehicleTimeout` | `0` | Minutes untouched before a car expires; `0` never expires |
| `Config.PersistThroughRestart` | `true` | Respawn cars after a restart |
| `Config.MaxVehiclesPerPlayer` | `5` | Cars per player kept in the world |
| `Config.SpawnDelay` | `500` | Milliseconds between respawns on restart |
| `Config.GarageSpawnGracePeriod` | `10000` | Milliseconds after a garage spawn before persistence starts |
| `Config.PersistTypes` | all seven types | Vehicle types that persist |
| `Config.BlacklistedModels` | emergency, boats, work, utility | Models that never persist |
| `Config.BlacklistedJobs` | emergency and service jobs | Jobs whose vehicles never persist |
| `Config.OrphanedVehicles` | 7 days, impound, 100 per day, 1500 max | What happens to abandoned cars |
| `Config.TowJobs` | police jobs, tow, mechanic | Jobs allowed to tow persisted cars |
| `Config.FuelResource` | `auto` | Fuel script to read and write |
| `Config.JobVehicleExclusion` | on | Job spawn events that auto-exclude a vehicle |

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/clearworldvehicles` | Admins | Remove all persisted vehicles |
| `/listworldvehicles` | Admins | List all persisted vehicles in the console |

## Credits

Written by DaemonAlex for Del Perro Sands. Uses ox_lib and oxmysql by Overextended. The licence note in the README allows modification for your own use.
