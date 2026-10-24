---
title: DPS Auto Shops
tagline: Automatic repair shops that step back and send drivers to real mechanics whenever one is on duty
category: fivem
area: vehicles
status: live
repo: https://github.com/DaemonAlex/dps-autoshops
stack: ["Lua", "ox_lib"]
frameworks: ["Qbox"]
requires: ["ox_lib", "oxmysql", "qbx_core", "jg-mechanic"]
tags: ["mechanic", "repair", "jg-mechanic", "economy", "jobs"]
order: 70
---

## Overview

Auto Shops decides what the city's five automatic repair shops do, based on whether a player mechanic is working. When nobody is on duty at a player-run shop, the automatic shops at La Mesa, LSIA, Harmony, Beeker's Garage and Lombardt Bay run the normal JG Mechanic self-service menu, so nobody is stranded with a broken car.

As soon as a mechanic clocks in at Benny's, Los Santos Customs, Bay Area Customs or the Sandy Shores shop, the automatic shops change. They tell the driver which shops are open ("Please visit or request a tow to: ...") and offer only a simple patch-up: enough engine and body health to drive there, at 1.5 times the price of a full self-service repair. Players get a reason to visit real mechanics, and the mechanics get the work.

## Features

- Five automatic shops that hand over to JG Mechanic's self-service menu when no mechanic is on duty.
- Counts on-duty players in each player-run shop job and lists the open shops by name.
- Simple repair while a mechanic is on duty: engine and body raised to 600, enough to reach a shop.
- Simple repair price is the full self-service price times a configurable multiplier (1.5 by default).
- Prices the car the same way JG Mechanic does: dealership price, then the Qbox vehicle list, then a fallback value.
- Confirmation dialog with the price, then a short progress bar while the car is patched.
- Server checks that the player and the car are actually at the shop before charging.
- Takes payment from the bank first, then cash.
- Price maths kept in a shared file with its own test suite.

## How it works

1. A driver pulls into one of the automatic shops.
2. JG Mechanic's zone code asks Auto Shops whether it wants to take over.
3. If no player mechanic is on duty, Auto Shops declines and the JG self-service menu opens as normal.
4. If a mechanic is on duty, the driver sees a notice listing the open shops and a prompt for `E`.
5. From the driver seat, `E` shows the simple repair price; confirming runs a progress bar, charges the player and patches the car.

## Requirements

- `ox_lib`
- `oxmysql`
- `qbx_core`
- `jg-mechanic`, with the five automatic shops set up as `self-service` locations and its open location file calling this resource's `TakeOver` and `Leave` exports

## Installation

1. Add the five automatic shops (`auto_lamesa`, `auto_lsia`, `auto_harmony`, `auto_beekers`, `auto_lombardt`) as `type = "self-service"` locations in `jg-mechanic/config/config.lua`.
2. In `jg-mechanic/client/cl-locations.lua` (a file JG leaves open for edits), call `exports["dps-autoshops"]:TakeOver(name)` when a player enters a zone and `exports["dps-autoshops"]:Leave()` when they leave. When `TakeOver` returns false, JG carries on as normal.
3. Copy `dps-autoshops` into your resources folder and add `ensure dps-autoshops` to `server.cfg` after its dependencies.

## Configuration

Everything lives in `config.lua`.

| Option | Default | What it does |
| --- | --- | --- |
| `Config.ShopJobs` | `bennys`, `lscustoms`, `bayareacustoms`, `sandymechanic` | Player-run shop jobs that count as "open" |
| `Config.Shops` | five shops | Automatic shop ids, labels and coordinates |
| `Config.FullRepair` | `price = 500`, `percentVehVal = 0.01` | Full repair price, matching JG's self-service repair |
| `Config.SimpleMultiplier` | `1.5` | Simple repair price as a multiple of the full repair |
| `Config.SimpleRepair` | engine `600`, body `600`, `8` seconds | Health the simple repair restores and how long it takes |
| `Config.MaxShopDistance` | `15.0` | How close the player must be to the shop |
| `Config.MaxVehicleDistance` | `8.0` | How close the car must be to the player |
| `Config.FallbackVehicleValue` | `50000` | Car value when no dealership or Qbox price exists |

## Credits

Written by DaemonAlex for Del Perro Sands. Built to work alongside JG Mechanic by JG Scripts.
