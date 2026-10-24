---
title: DPS Airlines
tagline: A full airline company for your city, from ground crew and dispatch to captains flying scheduled routes between five airports
category: fivem
area: jobs
status: live
repo: https://github.com/DaemonAlex/dps-airlines
stack: ["Lua", "ox_lib", "React + TypeScript NUI", "MySQL"]
frameworks: ["Qbox", "QBCore", "ESX"]
requires: ["ox_lib", "ox_target", "oxmysql"]
tags: ["job", "aviation", "airline", "pilot", "helicopter", "flight school", "cargo", "NUI"]
featured: true
order: 10
---

## Overview

DPS Airlines turns flying into a whole company that several players can work at together. One `airline` job has six grades: trainees, ground crew, flight attendants and dispatchers, first officers, captains and a chief pilot who runs the business. Each role has its own duties, its own menu and its own way of being paid.

Captains fly NPC passengers and cargo between Los Santos International, Sandy Shores, Fort Zancudo, McKenzie Airfield and Cayo Perico. Dispatchers build the schedule and assign pilots, ground crew load cargo, refuel and marshal aircraft to the gate, and attendants board passengers and run the cabin. Around that sit a flight school, private charters, cargo contracts, helicopter work, maintenance and a pilot ranking system that unlocks bigger aircraft over time.

Version 3.1.0 moved every payout to the server. Pay is worked out from the server clock, server-tracked timers and the player's position as the server sees it, so a modified client cannot claim a bonus it did not earn.

## Features

- Six job grades, from Trainee to Chief Pilot, each with its own menu and pay model.
- Passenger flights between five airports, with pay based on distance, passengers, cargo, priority and time of night.
- Cargo hauling by weight, plus multi-delivery cargo contracts with deadlines, a completion bonus and a late penalty.
- Private charters booked by players, priced by distance, passengers, luggage and VIP service.
- Flight school with enrolment, lessons, logged practice hours and a checkride decided on the server.
- Multi-crew flights: a captain invites a first officer and an attendant, and crew pay is capped at the flight's total.
- Pilot ranks from Student Pilot to Fleet Captain, earned by hours and flights; each rank unlocks aircraft and raises the pay multiplier.
- Helicopter operations: medevac, sightseeing tours, VIP transport and search and rescue, flown from six helipads.
- Fuel that burns faster with heavier loads, and paid refuelling.
- Aircraft condition that drops each flight, required inspections, paid repairs and grounding below a set condition.
- Random in-flight emergencies such as engine failure, bird strike, hydraulic failure, cabin depressurisation and electrical failure.
- Ferry flights to reposition aircraft without passengers, at reduced pay.
- ATC-style radio calls for takeoff and landing clearance, position reports and declaring an emergency.
- A black box recorder and passenger reviews based on landing, service and timing.
- Walkable cabins: aircraft with interior mods get them applied on spawn, and players board with ox_target or `/board`.
- A React tablet with six pages: overview, flight log, type ratings, incidents, a live flight tracker for dispatchers and crew management for the chief pilot.
- Rate limits and input checks on every server action, and a TTL cache for database reads.

## How it works

1. A player hired into the `airline` job goes to an airport and toggles duty at the airline NPC.
2. Their grade decides what they can do. Ground crew pick up loading, refuelling, marshalling and de-icing tasks. Dispatchers create flights and assign a pilot. Pilots start a flight, pick an aircraft their rank allows, and choose a destination.
3. The captain can invite crew. Passengers board by targeting the aircraft, and attendants can seat nearby players in one go.
4. The flight is flown for real. The server checks that it took a believable amount of time and ended near the destination before paying out.
5. Hours and flights are logged to the pilot's record, which drives rank, unlocks larger aircraft and shows up on the tablet (`F7` while on duty at an airport).
6. The chief pilot manages staff and roles from the crew management page.

## Requirements

- `ox_lib`
- `ox_target`
- `oxmysql`
- One framework: `qbx_core`, `qb-core` or `es_extended` (detected automatically)
- Aircraft add-on models for the planes listed in the config (the defaults name add-on models such as the ATR 72, Boeing 737 family and Airbus A320 family)

## Installation

1. Place `dps-airlines` in your resources folder.
2. Run `sql/install.sql` in your database.
3. Register the `airline` job in your framework with six grades (0 to 5): Trainee, Ground Crew, Cabin/Dispatch, First Officer, Captain and Chief Pilot (boss). The README has a ready-made QBCore / Qbox job block; on ESX, add the job and grades to the `jobs` and `job_grades` tables.
4. Add `ensure dps-airlines` to `server.cfg`.
5. Restart your server.

Upgrading from v2: back up your `airline_*` tables, run `sql/migrate_v2_to_v3.sql`, rename the job from `pilot` to `airline`, update the grades to the six-grade layout and restart.

## Configuration

`shared/config.lua` holds the gameplay settings:

| Section | What it controls |
| --- | --- |
| `Config.Roles` | Pay model per role: hourly, flat rate and tips, salary and commission, or a share of flight pay |
| `Config.FlightPay` | Base rate, per passenger, per cargo ton, per kilometre, priority and night multipliers, emergency bonus |
| `Config.Aircraft` | Each plane's model, seats, cargo, fuel burn and the minimum pilot rank to fly it |
| `Config.PilotRanks` | Hours and flights needed for each rank, and its pay multiplier |
| `Config.Charter` | Charter pricing, VIP multiplier and price limits |
| `Config.FlightSchool` | Enrolment, lesson and checkride fees, lessons and hours required |
| `Config.CargoContracts` | Deliveries per contract, deadline, completion bonus and late penalty |
| `Config.Helicopters` / `Config.HeliModels` | Pay and time limits per helicopter operation, and allowed helicopters |
| `Config.Fuel`, `Config.Maintenance` | Refuel rate and cost, wear per flight, inspection interval, grounding threshold |
| `Config.Crew` | Crew size, invite range and invite timeout |

`shared/locations.lua` holds airport and helipad coordinates, tour routes and NPC spawns. `shared/constants.lua` holds flight phase thresholds, landing ratings, detection distances and rate limit cooldowns.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/airlinemenu` (default key `F7`) | On-duty airline staff near an airport | Opens the airline tablet |
| `/board` or `/boardplane` | Anyone | Boards the nearest aircraft within 12 metres |

## Credits

Original concept and code by DaemonAlex for Del Perro Sands. Free to use and modify for your server.
