---
title: DPS City Worker
tagline: Keep the city's power on by repairing sites across town, climbing five ranks and answering emergencies
category: fivem
area: jobs
status: live
repo: https://github.com/DaemonAlex/dps-cityworker
stack: ["Lua", "ox_lib", "NUI (HTML/JS)", "MySQL"]
frameworks: ["Qbox", "QBCore", "ESX"]
requires: ["ox_lib", "oxmysql", "ox_target"]
tags: ["job", "city worker", "infrastructure", "blackouts", "emergencies", "ranks", "contractors"]
credits: "The resource manifest lists Randol as co-author alongside DaemonScripts."
order: 25
---

## Overview

City Worker is an infrastructure job with real stakes. Players clock in at the depot, take a work truck and get sent to sites around town: burst pipes, potholes, streetlights, electrical boxes, transformers and more. Every repair raises the health of the city sector it is in. Let a sector's health fall too far and it goes into blackout, with lights flickering for everyone inside it.

Workers earn pay and XP for every job and climb from Probationary Laborer to Foreman, unlocking harder and better-paid tasks on the way. Random emergencies, such as a water main break, gas leak or downed power lines, pop up while crews are on shift, and storms can bring down trees and lines. Foremen get a live control room to watch the grid and dispatch crews, and senior workers can register their own sub-contractor company to take city contracts with a hired crew.

Anyone can clock in; no job entry is needed.

## Features

- Boss ped at the depot with Start Work and Finish Work through ox_target.
- Work truck with a `CITY####` plate, keys and a full tank.
- One task at a time, marked with a blip, a route, a prop and a target zone.
- 18 task types across five categories, unlocked by rank: from meter reading and trash collection up to transformer maintenance, hazmat cleanup and bridge inspection.
- Each repair is a progress bar followed by an ox_lib skill check; failing means no pay, but you can try again.
- Traffic Control task: place cones, barriers, stop and slow signs and work lights (at least 4) to complete the setup.
- Particle effects at sites such as burst pipes, gas leaks and downed lines.
- Five ranks with rising pay multipliers, from 1.0 to 2.5.
- Teamwork bonus: +10% pay for each other on-duty worker within 30 m, up to +30%.
- Scavenging: a chance to find materials such as copper, plastic and scrap after each job.
- City sectors with health from 0 to 100 that decay while crews are on shift and are saved to the database.
- Blackouts with a city-wide alert and flickering lights inside the affected sector.
- Random emergencies with a flashing red blip for everyone, a minimum rank to respond, double pay and 1.5 times the XP.
- Weather events: thunder can trigger fallen trees or downed lines.
- Control Room for Foremen: a live view of sector health with a Dispatch Crew button per sector.
- Sub-contractor companies for rank 3 and above: register, accept "complete N jobs in a sector" contracts, hire nearby players, earn reputation and withdraw funds.
- Damage reports from any on-duty worker.
- Checks that the worker is at the site and not completing jobs too fast.

## How it works

1. Talk to the boss at the depot and choose Start Work. A truck spawns and you are put in it.
2. Drive to the marked site and use the target option to start the repair.
3. Finish the progress bar and the skill check. You are paid, the sector's health rises, and the next task arrives a few seconds later.
4. Earn XP to rank up. Rank 1 needs 1000 XP, rank 2 needs 2000, and so on.
5. When an emergency appears, respond if your rank allows it for a bigger reward.
6. Return to the boss and choose Finish Work to save your stats and return the truck.

## Requirements

- `ox_lib`
- `oxmysql`
- `ox_target` (falls back to `qb-target` when ox_target is not started)
- A framework: Qbox, QBCore or ESX, detected automatically
- Optional: an inventory (ox_inventory, qs-inventory, codem-inventory or the framework's own) for scavenged items
- Optional: a fuel script (ox_fuel, LegacyFuel, ps-fuel, cdn-fuel and others are detected)
- A keys script that handles the `vehiclekeys:client:SetOwner` event

## Installation

1. Put the `dps-cityworker` folder in your resources folder.
2. Import `sql/cityworker.sql`. It creates the worker, infrastructure, damage report, contractor and contract tables, and adds the three default sectors at full health.
3. Add `ensure dps-cityworker` to `server.cfg` after `ox_lib`, `oxmysql`, `ox_target` and your framework.
4. Make sure the scavenge items in `Config.ItemDrops.items` (default `copper`, `plastic`, `metalscrap`, `electronics`, `steel`) exist in your inventory, or change the list.
5. Give admins the `group.admin` ace for the admin commands.
6. Restart the server.

## Configuration

Settings are split between `config.lua` (shared) and `sv_config.lua` (server).

| Option | Default | What it does |
| --- | --- | --- |
| `BossCoords` | the depot | Boss ped, blip and clock-out spot |
| `Economy.BasePay` | `250` | Base pay per task, also the base of the emergency bonus |
| `Economy.Currency` | `cash` | Account task pay goes to |
| `Economy.CompanyRegistrationFee` | `5000` | Fee to register a company |
| `ItemDrops` | on, 40% | Scavenging chance and weighted item list |
| `Ranks` | five ranks | Labels and pay multipliers |
| `Sectors` | Legion Square, Mirror Park, Sandy Shores | Sector centres, radius, decay rate and blackout threshold |
| `SkillCheck` | easy, easy, medium | Default skill check sequence and key |
| `TaskProps`, `TrafficProps`, `TaskAnimations` | per task | Props and animations at each site |
| `Contractor` | on, rank 3 | Contract count, deadline, budget per job, reputation, crew cut |
| `Vehicle` (sv_config) | `bison` | Work truck model |
| `CategoryLocations` (sv_config) | 6 to 7 points per category | Where each kind of task can appear |

New sectors are added in `config.lua`; the Control Room page needs a matching card added in `web/index.html`.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/workstatus` | Everyone | Show your rank, XP and repair count |
| `/company` | Everyone | Open the sub-contractor company menu |
| `/reportdamage [type]` | On-duty workers | Report damage at your position |
| `/controlroom` | On-duty Foremen (rank 5) | Open the Control Room |
| `/setsectorhealth <sector> <health>` | Admins | Set a sector's health |
| `/triggeremergency <type> <sector>` | Admins | Start an emergency |

There are no key binds; everything else is done through ox_target.

## Credits

Written by DaemonAlex (DaemonScripts) for Del Perro Sands. The resource manifest lists Randol as co-author.
