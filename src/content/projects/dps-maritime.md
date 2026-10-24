---
title: DPS Maritime
tagline: Jetsam Maritime Logistics, a port job that grows from hauling containers on the dock to running your own fleet of boats
category: fivem
area: jobs
status: live
repo: https://github.com/DaemonAlex/dps-maritime
stack: ["Lua", "ox_lib", "NUI (HTML/JS)", "MySQL"]
frameworks: ["Qbox", "QBCore", "ESX"]
requires: ["ox_lib", "ox_target", "oxmysql"]
tags: ["job", "boats", "dock work", "containers", "progression", "fleet", "smuggling"]
credits: "Based on concepts from ocean-delivery"
featured: true
order: 15
---

## Overview

DPS Maritime is the job behind Jetsam Maritime Logistics, the city's port company. New hires start as dock hands moving shipping containers around the terminal. As they earn experience they move up through ten levels, from Dock Hand to Port Captain, and the work opens up: boat deliveries along the coast, bigger and more valuable cargo, their own fleet of boats, and for the very top ranks, contraband runs with a radar for spotting the police.

The two halves of the job feed each other. Dock workers print cargo manifests as they load containers, and captains need a manifest to start a boat delivery. Using a manifest printed by another player pays a bonus, so dock hands and captains have a reason to trade and work together.

Pay and experience are checked on the server, which validates distance, position and timing before paying anything out.

## Features

- Ten levels with their own title, pay multiplier and unlocks, from Dock Hand to Port Captain.
- Container hauling at the port with a handler vehicle.
- Cargo manifests printed by dock workers and needed by captains, with a bonus for using a traded one.
- Boat deliveries from level 4, paid by distance, with fuel to manage and a paid rescue if you run dry at sea.
- Cargo classes that unlock with level: standard, fragile, perishable, high value, hazmat and contraband.
- Crane, forklift and hazmat pressure mini-games are written and exported, but not yet wired into the job flow.
- VIP leisure transport from level 6: carry NPC passengers to leisure spots, with tips for a smooth, on-time ride.
- Fleet ownership from level 7: buy up to five boats, name them, repair them, claim insurance on a total loss and sell them back.
- A free starter boat, and paid recovery of fleet boats through the garage.
- Integration with jg-advancedgarages so a fleet boat cannot be spawned twice.
- Smuggler's Radar from level 9: shows nearby police boats and helicopters, with noisy readings and police jammers that scramble it.
- A heat level that makes the radar less reliable is planned: the radar reads it, but the server does not yet send it.
- Anchoring and depth awareness: drop anchor, and take damage in shallow water.
- Compass navigation for distant sea destinations where the GPS route is off.
- Random sea events during deliveries, such as engine failure, rough seas, coast guard encounters, wildlife, rogue waves and distress calls.
- Weather zones that pay a bonus for working in bad weather (the server's weather script stays in charge of the actual weather).
- Streak bonuses for consecutive deliveries.
- A stats dashboard in NUI.
- Temporary boat keys through qs-vehiclekeys for company boats, granted at job start and removed at the end.
- Clears the game's default port props so placed containers do not overlap them.

## How it works

1. A player speaks to the Jetsam NPC at the port and starts dock work.
2. They pick up containers with the handler and drop them in the right zones, printing manifests as they go and earning experience.
3. At level 4 they can take boat deliveries. They bring a manifest, take a company boat, sail to the destination and get paid on arrival.
4. At level 7 they can buy their own boats and run deliveries in them. Higher levels unlock the yacht, the tug and the large cargo vessel, and the riskier cargo.
5. Progress, fleet and stats are saved to the database and shown on the dashboard.

## Requirements

- `ox_lib`
- `ox_target`
- `oxmysql`
- One framework: `qbx_core`, `qb-core` or `es_extended` (set in the config)
- A `cargo_manifest` item in your inventory
- Optional: `qs-vehiclekeys`, `jg-advancedgarages`, `jg-hud` (depth meter), and the `dps-maritime-maps` port map

## Installation

1. Copy `dps-maritime` to your resources folder.
2. Import `sql/database.sql` into your database.
3. Add `ensure dps-maritime` to `server.cfg`.
4. Set your framework, target and inventory in `config/config.lua`, and adjust the rest as needed.

## Configuration

`config/config.lua` is the main file, with sections for each part of the job:

| Section | What it controls |
| --- | --- |
| `Config.Framework`, `Config.Target`, `Config.Inventory` | Which framework, target and inventory resources to use |
| `Config.Progression` | XP per delivery and per distance, level thresholds, pay multipliers, unlock levels, streak and weather bonuses |
| `Config.Manifest` | Manifest item, who prints and who needs them, expiry and trade bonus |
| `Config.DockWork` | Dock pay range and truck rental |
| `Config.BoatDelivery` | Pay per distance and fuel price |
| `Config.Fleet` | Boats per player, starter boat, sell-back, insurance and repair costs |
| `Config.VIPTransport` | VIP pay, tips and what affects passenger satisfaction |
| `Config.PoliceJammer` | How police jammers affect the radar |
| `Config.GarageBridge` | jg-advancedgarages integration |

Boats and their prices are in `config/boats.lua`, cargo types in `config/cargo.lua`, and port and delivery locations in `config/locations.lua`.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/maritimestats` (also `/maritimedash`, `/mstats`) | Everyone | Opens the stats dashboard |
| `L` (`+toggle_anchor`) | Boat captains | Drops or raises the anchor |
| `~` (`+smuggler_radar`) | Level 9 and up | Toggles the Smuggler's Radar |
| `/setmaritimelevel [id] [level]` | Admins | Sets a player's maritime level |
| `/clearcontainers` | Admins | Clears all placed containers |
| `/maritimesecurity` | Admins | Shows anti-exploit statistics |

## Credits

Written by DaemonAlex for Del Perro Sands. Based on concepts from the ocean-delivery resource. The port map comes from estrp-emptyport and ships separately.
