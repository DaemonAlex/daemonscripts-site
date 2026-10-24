---
title: DPS Transit
tagline: A scheduled rail and shuttle network with zone fares, block signals and a live dispatcher panel
category: fivem
area: world
status: archived
repo: https://github.com/DaemonAlex/dps-transit
stack: ["Lua", "ox_lib", "NUI (HTML/JS)", "MySQL"]
frameworks: ["Qbox", "QBCore", "ESX"]
requires: ["ox_lib", "ox_target", "oxmysql"]
tags: ["trains", "transit", "metro", "dispatch", "tickets", "signals", "shuttle bus"]
order: 80
---

## Overview

DPS Transit was the first attempt at a full public transport system for Del Perro Sands. It schedules passenger and freight trains on the game's rail lines, sells zone-based tickets at station kiosks, shows arrivals on a station board, and gives staff a dispatcher panel with a live track diagram and emergency controls. AI shuttle buses link the rail stations to the metro.

The design goes further than most train scripts. Track is split into protected blocks with green, yellow and red signals, so trains slow or stop when the block ahead is occupied, and a dispatcher can lock a section of track or hold a train by hand.

The railway on Del Perro Sands now runs on `dps-trains` and its companion resources, which describe themselves as the four-part railway without this one. DPS Transit is kept as a reference. Some station coordinates in its config are still marked as estimates to verify in game, and the announcement sound URLs are placeholders.

## Features

- Passenger and freight trains on a timetable, with more trains at peak hours and fewer at night.
- Zone fares for single trips, plus a 24-hour day pass.
- Ticket kiosks at stations through ox_target: buy a ticket, view the schedule, see the next arrivals.
- Tickets that expire, a per-player limit, and optional physical ticket items through qs-inventory.
- Station board in NUI with arrivals and ETAs.
- Virtual block signalling: green runs at full speed, yellow at 30 percent, red stops at the block boundary.
- Deadlock detection that resolves trains stuck waiting on each other.
- Dispatcher panel with a track diagram, live train positions, click-for-details, emergency stop and release, and right-click segment locks with a logged reason.
- Emergency services can brake the nearest train and hold it at a station.
- Slowing on station approach and on curves, brake squeal and a horn near junctions.
- Platform crowding warnings and service alerts for delays.
- AI shuttle bus routes between rail stations and metro stops.
- Exports for other resources: active trains, ETAs, arrivals, signal state, segment locks, emergency braking and service alerts.

## How it works

1. A player walks up to a station kiosk and buys a ticket for their destination.
2. Trains spawn on the schedule and stop at each platform for a set time while doors are open.
3. The player boards with the station target and exits with `E` when the train is stopped at a station.
4. Staff with an allowed job open the dispatcher panel with `/dispatch` to watch the network, stop a train or lock a section of track.

## Requirements

- `ox_lib`
- `ox_target`
- `oxmysql`
- `qbx_core` (listed as a hard dependency in the manifest), with bridge files for QBCore and ESX
- Optional: `qs-inventory` for physical ticket items, `xsound` for audio announcements

## Installation

1. Put the resource in your resources folder.
2. Add to `server.cfg`, in order: `ensure ox_lib`, `ensure ox_target`, your framework, then `ensure dps-transit`.
3. Optionally set the framework in `config/config.lua` (`Config.Framework = 'auto'` detects it).
4. Set real station coordinates in `config/stations.lua`.
5. Restart the server.

## Configuration

| File | What it controls |
| --- | --- |
| `config/config.lua` | Train speed and dwell, approach and curve slowing, cleanup, block signalling, schedule by time of day, fares, zones, tickets, dispatcher and emergency service jobs, blips, audio |
| `config/stations.lua` | Station positions, platforms and which zone each belongs to |
| `config/trains.lua` | Train models and consists |
| `config/shuttles.lua` | Shuttle bus routes, stops, frequency and night service |

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/dispatch` | Players with a dispatcher job | Opens or closes the dispatcher panel |
| `transit_dispatch_panel` | Players with a dispatcher job | Same as `/dispatch`, bindable under Key Bindings with no default key |
| `E` (`exittrain`) | Passengers | Leaves the train when it is stopped at a station |

## Credits

Written by DaemonAlex for Del Perro Sands, using the Overextended libraries.
