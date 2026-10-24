---
title: DPS Roxwood Racing
tagline: Roxwood Raceway as a real business, with lobby races, an AI practice grid, pit crews, an LED leaderboard and a job that runs the money
category: fivem
area: jobs
status: live
repo: https://github.com/DaemonAlex/dps-roxwoodracing
stack: ["Lua", "ox_lib", "NUI (HTML/JS)", "MySQL"]
frameworks: ["Qbox", "QBCore", "ESX"]
requires: ["ox_lib", "oxmysql"]
tags: ["racing", "motorsport", "job", "AI", "leaderboard", "pit crew", "Roxwood"]
credits: "Port of rox_speedway (DrCannabis / DaemonAlex), descended from max_rox_speedway by MaxSuperTech; LED leaderboard from glitchdetector's amir-leaderboard"
order: 20
---

## Overview

Roxwood Racing turns the Roxwood Raceway into a place people go. Walk up to the paddock and start a lobby, or join one. The host picks the layout, laps and mode, starts the countdown, and the race runs with live positions, NPC pit crews, ghosting at the start and a full results screen at the end. A physical LED board at the track shows the running order.

When nobody is racing, the circuit is still busy. An AI grid of open-wheel cars laps a racing line recorded by staff, and anyone who drives onto the track is practising: a lap clock starts at the line, personal bests are saved, and the AI's pace adapts to the quickest drivers present so there is always something to chase.

Behind it all is the `roxwoodracing` job. Its society account takes every entry fee and pays every purse, so the raceway is a business that staff run, not free money. This is the Del Perro Sands port of rox_speedway, version 3.1.0.

## Features

- Lobby racing on four layouts (Short, Drift, Speed and Long), with several races at once on different layouts.
- Spec mode: the raceway supplies the cars from any registered vehicle, grouped by class, with a lobby-wide Stock, Street or Race tune. Cars are deleted after the race.
- Open mode: bring a car you own. The server checks the car, the plate, the driver seat and the class before it counts, and you keep the car afterwards, damage and all.
- Accurate positions through curves, using lap, checkpoint and distance along the track.
- Ghosting at GO until everyone passes the first checkpoint, and ghosting for anyone a lap down.
- NPC pit crews that refuel and repair when you stop in a pit box.
- Results overlay with times, best laps, payouts, podium styling and badges for fastest lap and most improved.
- Career stats: wins, podiums, races, earnings, spec and open wins, best lap per layout and practice laps.
- An AI practice grid of six open-wheel cars that follow a staff-recorded racing line, pass, slipstream, defend and recover when stuck.
- One shared grid: the server picks one nearby player to drive the AI so everyone sees the same cars.
- Practice mode with a lap clock, personal best and a rolling average of the last five laps.
- Lobby creation warns practising drivers to clear the track, and anyone still on track at GO is moved to the paddock.
- LED leaderboard showing live positions, the practice order or best-ever times, with rotating sponsor panels.
- Static show cars in the pit lane, placed by staff.
- Raceway Control for staff: end stuck races, clear track props, switch the sign, set fees and purse.
- Detects your banking, garage, keys, fuel, target, notify and boss menu resources, with fallbacks.
- Server-owned timing, positions, payouts and teleports, with validation and rate limits on every event.
- A Lua test suite covering validation, payouts, ranking, staff permissions and the AI line maths.

## How it works

1. A player walks up to the paddock ped and creates a lobby: mode, laps (1 to 10) and layout. Others join from the same ped, paying the entry fee if one is set.
2. The host starts the race. Spec racers pick a car within 30 seconds; Open racers are placed on the grid in their own car.
3. After the countdown everyone is ghosted until the first checkpoint. Checkpoints must be crossed in order, and pit boxes are live.
4. As each racer finishes they return to the paddock. When the race settles, the buy-in pool and purse are paid, stats are saved and the results screen appears.
5. Between races, staff record a racing line once with `/recordline`, and the AI grid laps it whenever a player is near the track.

## Requirements

- `ox_lib`
- `oxmysql` (MariaDB, for the table migrations)
- A framework: `qbx_core`, `qb-core` or `es_extended`
- The Roxwood map, since the paddock, grid, pit boxes and sign are placed for it
- Recommended: Renewed-Banking for the society account, jg-advancedgarages for the paddock garage, qbx_management for the boss menu

## Installation

1. Put the folder in your resources, ensured after `ox_lib`, `oxmysql`, your framework and the integrations above.
2. Add the `roxwoodracing` job with four grades: Marshal, Pit Crew, Race Director and Owner (boss with bank access). The README has the exact qbx_core block.
3. Add the "Roxwood Raceway" paddock garage to jg-advancedgarages. The README has the entry.
4. Restart the server and check the boot log lines from `[dps-roxwoodracing]`.
5. Give someone the job, open the boss menu and deposit a float: the account starts at $0.
6. Walk the paddock and adjust `config/tracks.lua`, `config/pit.lua` and the boss coordinates if your map differs.

Moving from rox_speedway: remove the old resource first. The old stats table is renamed automatically on first boot.

## Configuration

| File | What it controls |
| --- | --- |
| `config/config.lua` | Countdown, progress reporting, interact key, LED sign behaviour, ghosting and the results screen |
| `config/tracks.lua` | Checkpoints, curve hints, start and finish lines, grid slots, track props, paddock return point and lobby ped |
| `config/vehicles.lua` | Spec car catalogue and presets, Open mode classes, tune presets |
| `config/economy.lua` | Job name and grades, purse source (society or house), entry fee, pool split, podium purse, show-up and fastest-lap bonuses, prize car, minimum racers for a purse |
| `config/practice.lua` | Line recording, AI grid size, models, engine sounds, speed profile and racecraft, practice lap window and AI pace targets |
| `config/pit.lua` | Pit boxes, crew models and pit stop timing |

Staff can also change the fees and purse in game from Raceway Control, up to a configured ceiling.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/lobby` (default key `F2`) | Anyone | Toggles focus on the lobby panel |
| `/racestats` | Anyone | Shows your career stats |
| `/raceway` | Marshal and up | Opens Raceway Control |
| `/recordline <name>` | Race Director | Starts recording a racing line; run again to save |
| `/pitcar` / `/pitcar clear` | Race Director | Stores a static pit car where you are parked, or removes them all |
| `/placesign` / `/placesign clear` | Race Director | Places or removes the LED sign for the track you are at |
| `/practicestatus` | Anyone | Prints the practice grid state to the F8 console |
| `/signstatus` | Anyone | Prints sign placement details to the F8 console |

## Credits

Descended from max_rox_speedway by MaxSuperTech, via rox_speedway by DrCannabis / DaemonAlex. Everything from version 3.0 on is the Del Perro Sands port. The LED leaderboard is based on glitchdetector's amir-leaderboard. MIT licence, carried over from the original.
