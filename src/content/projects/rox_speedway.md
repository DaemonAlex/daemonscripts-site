---
title: Rox Speedway
tagline: Lobby-based multiplayer racing at Roxwood Speedway, with race classes, rewards, ghosting, pit crews and an LED leaderboard
category: fivem
area: player
status: live
repo: https://github.com/DaemonAlex/rox_speedway
stack: ["Lua", "ox_lib", "NUI (HTML/JS)", "MySQL"]
frameworks: ["Qbox", "QBCore", "ESX"]
requires: ["ox_lib", "oxmysql"]
tags: ["racing", "motorsport", "lobby", "leaderboard", "pit crew", "Roxwood"]
credits: "Forked from max_rox_speedway by MaxSuperTech (original author Koala / KOA); LED leaderboard from glitchdetector's amir-leaderboard"
order: 45
---

## Overview

Rox Speedway is a drop-in race system for the Roxwood Speedway map. Players walk up to the NPC at the track, create or join a lobby, and the host starts the countdown. Races run with a live position display, lap timing, pit crews and a results screen, and the LED sign at the speedway shows who is leading.

It is a heavily rewritten fork of max_rox_speedway, made to work on any of the common frameworks with sensible defaults: rewards on, entry fees off and stats tracking on. Del Perro Sands now runs its own extended port of it, DPS Roxwood Racing, which adds a job, an AI practice grid and more. Rox Speedway is the general release for other servers.

## Features

- Create and join lobbies; the host starts the countdown.
- Several lobbies can race at once, as long as they are on different tracks.
- Four track layouts (Short, Drift, Speed and Long), with curve hints for accurate positions.
- Live position HUD, full lap timing and a podium.
- Pit crew NPCs that refuel and repair your car mid-race.
- 75 or more curated vehicles in seven race classes: Open, Super Cars, Tuners / JDM, Muscle, Motorcycles, Vans & Trucks and Rally.
- Ghosting at GO until the first checkpoint, and for anyone a lap behind the leader.
- Results overlay with positions, times, best laps, payouts and badges for fastest lap and most improved.
- Cash rewards for the podium, a participation reward and a fastest-lap bonus, plus an optional car for the winner.
- Optional entry fees, with the pool split 60, 30 and 10 percent to the top three.
- Career stats saved to the database: wins, podiums, races, earnings and best lap per track, with a "new record" notice.
- Character names in the lobby, on the leaderboard and on the results screen.
- An LED leaderboard sign at the speedway, bundled in: live positions during a race, top all-time records when idle.
- English, Spanish, French, German and Russian translations.
- Server-side input validation on lobby and race events.

## How it works

1. A player walks up to the speedway NPC and opens the lobby panel (`F2` by default).
2. They create a lobby, choosing a track, laps and race class, or join an existing one.
3. The host starts the race. Racers pick a car from the class, are placed on the grid and wait out the countdown.
4. During the race the HUD shows position and lap; pulling into a pit box brings out the crew.
5. At the finish, rewards are paid, stats are saved and the results screen shows for 20 seconds.

## Requirements

- `ox_lib`
- `oxmysql`
- QBCore, Qbox or ESX (detected automatically)
- `ox_target` or `qb-target` (set in the config)
- The Roxwood Speedway map

## Installation

1. Drop the `rox_speedway` folder into your resources.
2. Add `ensure rox_speedway` to `server.cfg`.
3. Restart. The database table creates itself on first boot.
4. Walk up to the NPC at the speedway and start racing.

## Configuration

Everything lives in `config/config.lua`:

| Section | What it controls |
| --- | --- |
| `Config.Rewards` | Cash or bank, podium payouts, participation reward, fastest-lap bonus, optional prize car and its garage |
| `Config.EntryFee` | Turns buy-ins on, the amount and the pool split |
| `Config.Stats` | Stats tracking and showing them after a race |
| `Config.Ghosting` | Ghosting at the start, unghost checkpoint and timer, lapped ghosting and transparency |
| `Config.ResultsUI` | Results overlay, display time and badges |
| `Config.RaceStartDelay`, `Config.ProgressTickMs` | Countdown length and how often position is reported |
| `Config.TargetSystem`, `Config.NotificationProvider` | Target resource and notification style |
| `Config.PitStopTiming` | Crew walk speed, refuel and repair timing |
| `Config.Leaderboard` | LED sign updates, idle display and view mode |
| `Config.Checkpoints`, `Config.SegmentHints`, `Config.RaceClasses` | Add your own tracks and race classes |

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/racestats` | Anyone | Shows your career stats |
| `/lobby` (default key `F2`) | Anyone | Toggles lobby interaction |
| `/speedway_cleanup` | Anyone | Removes spawned track props and zones on your own client |
| `/lb names` / `/lb toggle` | Lobby host or console | Switches the LED sign between names only and names alternating with times |

## Credits

Originally by Koala (KOA, MIT licence), released as max_rox_speedway by MaxSuperTech, and forked and heavily rewritten by DrCannabis / DaemonAlex. The LED leaderboard is glitchdetector's amir-leaderboard, bundled in.
