---
title: DPS Tow Job
tagline: A queue-based tow company with a dispatch dashboard, City Tow backup, roadside services and NPC owners who fight back
category: fivem
area: jobs
status: live
repo: https://github.com/DaemonAlex/dps-towjob
stack: ["Lua", "ox_lib", "NUI (HTML/JS)", "MySQL"]
frameworks: ["Qbox", "QBCore", "ESX"]
requires: ["ox_lib", "ox_target", "oxmysql"]
tags: ["job", "towing", "dispatch", "impound", "jg-mechanic", "qs-billing", "NUI"]
credits: "Rewrite based on qb-towjob by the QBCore team. GPL-3.0."
featured: true
order: 10
---

## Overview

Tow Job turns towing into a proper company. Drivers clock in at a depot, and work comes to them through a shared queue: police and EMS impound requests first, then players who called for a tow, then NPC breakdowns and illegally parked NPC cars. A dispatch dashboard shows the queue, the tows in progress and who is on duty.

Players ask for a tow from the City Services app. If no driver is available or nobody accepts in time, an NPC City Tow truck comes instead, so a player is never left waiting forever. When the tow is delivered, the car is filed where the owner can find it: a mechanic shop, the nearest public garage, or the nearest impound lot.

For drivers who want extra work there is predatory towing: hook NPC cars parked at hydrants, bus stops or in no-parking zones for commission. Sometimes the owner shows up angry, and the driver has to talk them down, negotiate, take a bribe, walk away or deal with a fight that can bring the police.

Design documents in the repository also describe a crafting station for roadside repair items and an employee garage for tow trucks. Both are marked as planned and are not in the resource yet.

## Features

- Shared job queue with priorities: police and EMS high, customer calls normal, NPC jobs low.
- The driver who has waited longest gets the next job; a cancelled job goes back to the front.
- Dispatch dashboard (NUI) with the queue, active tows, drivers and the day's totals.
- Service requests from the City Services app (dps-services), offered to one driver at a time with a 45 second window.
- City Tow backup: an NPC truck takes the job if no driver can, or if nobody accepts within 3 minutes.
- Repair tow fee charged only when the car is hooked, and refunded in full if the tow does not happen.
- Hand-off at delivery files the car into a garage or impound lot, and tells dps-vehiclepersistence.
- Three impound lots: Los Santos, Sandy Shores and Paleto Bay, each with its own fees.
- Repair tows go to mechanic shops with mechanics on duty, spread fairly between shops.
- Attach vehicles with ox_target, or winch distant ones with rope physics.
- Roadside services: tyre change, quick patch, jumpstart and fluid top-off.
- NPC breakdowns spawn as jobs on a timer.
- Predatory towing of illegally parked NPC cars, with a dispute system: dialogue, negotiation, bribes, fights and police alerts.
- Driver reliability rating that persists; drivers at 120 or more earn a 15% bonus.
- Pay split between driver and shop society, with a lower rate for NPC jobs.
- Keys for the dashboard, tow menu and detach only listen for players with the tow job, so they never take keys from anyone else.

## How it works

1. A driver clocks in at a tow depot.
2. They open the dispatch dashboard (`F6`) or wait for a job offer.
3. They accept a job and drive to the pickup.
4. They attach the car with ox_target, or winch it in if it is out of reach.
5. They deliver it to the shop or impound lot; the car is filed for its owner.
6. They collect their pay from the tow menu (`F7`).

For players: request a tow from the City Services app and watch its status. Anyone can ask for a repair tow of their own vehicle; only on-duty police and EMS can ask for an impound tow.

## Requirements

- `ox_lib`
- `ox_target`
- `oxmysql`
- Optional: `jg-mechanic` (shop duty tracking, shop queue, service tickets)
- Optional: `qs-billing` (customer invoices)
- Optional: `qs-dispatch` (police and EMS tow requests)
- Optional: `qb-management` (society funds)
- Optional: dps-services (the City Services app for player requests)

## Installation

1. Copy `dps-towjob` into your resources folder.
2. Database tables are created on first start; `sql/schema.sql` is the reference.
3. Edit the files in `config/`.
4. Add `ensure dps-towjob` to `server.cfg` after `ox_lib` and `ox_target`.

## Configuration

Settings are split across four files in `config/`.

| File | What it controls |
| --- | --- |
| `config.lua` | Job name, pay (base 100, 15 per mile, 85% driver / 15% shop), queue size and NPC job timing, towing limits, roadside service prices, request timings and fees |
| `impound.lua` | Impound lots, their locations and fees |
| `shops.lua` | Mechanic shops that receive repair tows |
| `vehicles.lua` | Tow trucks and vehicle settings |

Key request settings in `Config.Requests`: a 120 second cooldown between requests, a 45 second offer window, City Tow after 20 seconds with no available driver or 180 seconds with no acceptance, a 200 repair tow fee, free emergency tows, and a 500 impound release fee.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/dispatch` (`F6`) | Tow drivers | Open the dispatch dashboard |
| `/towmenu` (`F7`) | Tow drivers | Open the tow driver menu |
| `/towdetach` (`G`) | Tow drivers | Detach the towed vehicle |
| `/towqueue` | Tow drivers | View the current queue |
| `/towdrivers` | Players | List tow drivers on duty |
| `/calltow` | Players | Request a tow for the nearest vehicle |
| `towtest [impound]` | Server console | Dry-run request with short timers; writes nothing and moves no vehicle |
| `requestdebug` | Server console | Show every open request |
| `towdebug` | Server console | Show the queue and duty state (debug mode only) |

## Credits

- Base: qb-towjob by the QBCore team.
- Rewritten and extended by DaemonAlex for Del Perro Sands.
- jg-mechanic integration built for JG Scripts' mechanic resource.
- GPL-3.0 licence.
