---
title: DPS Parking
tagline: Cars stay where you park them, with meters, tickets, impound, valet, delivery, reserved spots and lots players can own
category: fivem
area: vehicles
status: live
repo: https://github.com/DaemonAlex/dps-parking
stack: ["Lua", "ox_lib", "NUI (HTML/JS)", "MySQL"]
frameworks: ["Qbox", "QBCore", "ESX"]
requires: ["oxmysql", "ox_lib", "qbx_core"]
tags: ["parking", "meters", "tickets", "impound", "valet", "delivery", "lb-phone", "economy"]
credits: "Based on mh-parking by MaDHouSe79. GPL-3.0."
order: 20
---

## Overview

DPS Parking makes parking part of city life. Park your car on the street and it stays in the world, frozen in place with its owner, plate and name floating above it, until you come back. Around that sits a full parking economy: meters you pay by the minute, tickets and late fees, police impound, an NPC valet, delivery of your parked car to wherever you are, reserved spots, and parking lots that players can buy and run as a business.

It is built for Qbox servers, and the code also detects QBCore and ESX. It hooks into the insurance, garage, dispatch, billing, phone, fuel and key scripts you already run, using whichever one it finds.

DPS Parking started from mh-parking by MaDHouSe79 and has been rebuilt into separate modules, each with its own client and server code.

## Features

- Park where you stop: the car stays in the world, frozen, with optional floating text.
- A parking limit per player (5 by default); VIP players get more slots.
- Auto-park: with the engine off, press `E` in the driver seat.
- Timed parking: a car left longer than the maximum (3 days by default) is charged and impounded.
- Eight default parking lots and a list of no-parking zones, with job exceptions such as police at the MRPD back gate.
- Lot business: players buy a lot, earn a share of the fees and pay city tax.
- Parking meters: pay by the minute, premium price zones, free hours, grace time, then an automatic ticket and tow.
- Seven ticket types with late fees; players can pay or contest, and police can issue tickets.
- Impound with fees by reason, daily fee growth, insurance discounts, police impound and admin release.
- NPC valet that parks and fetches cars, with tips for faster service.
- Delivery of your parked car, with a rush option, VIP tiers, an NPC driver for higher tiers and job discounts.
- Reserved spots for VIPs, jobs, businesses and renters.
- Police dispatch alerts for expired meters and zone violations.
- A phone app for your parked cars on lb-phone.
- Optional Discord audit log.
- Pre-hooks, post-hooks and exports so other resources can react to or block parking actions.

## How it works

1. A player stops, turns the engine off and presses `F5` (or `E` for auto-park). The car is saved and stays where it is.
2. If they parked in a metered spot, they pay for time; once the meter runs out and the grace time passes, a ticket is issued and police can be alerted.
3. Left too long, the car is towed to impound. Getting it back costs a fee that grows daily, reduced if the car is insured.
4. Police jobs, by grade, can issue tickets, check meters, boot or impound cars and dismiss tickets.
5. Players can hand their car to the valet NPC, have it delivered, rent a reserved spot, or buy a lot and collect its fees.

## Requirements

- `oxmysql`
- `ox_lib`
- `qbx_core` (QBCore and ESX are detected too)
- A vehicle table with parking columns; on Qbox this is `player_vehicles`
- Optional, detected when started: `ox_target` or `qb-target` (valet and impound NPCs), an insurance script (including dps-insurance), a garage script, a dispatch script, a billing script, a society banking script, `lb-phone`, a fuel script, a vehicle key script, and dps-vehiclepersistence

## Installation

1. Copy the `dps-parking` folder into your resources folder.
2. Import `database/schema.sql`. It adds parking columns to `player_vehicles` and creates the VIP, business, meter, delivery and audit tables. The script does not create tables by itself.
3. Add `ensure dps-parking` to `server.cfg`, after your framework, `oxmysql`, `ox_lib` and any optional scripts, so they are detected.
4. Give admins an ace (`group.admin`, `admin` or `command`) for the admin commands.
5. Edit `config/config.lua` and the job tables in `integrations/permissions.lua`.
6. Restart the server.

## Configuration

Most options are in `config/config.lua`; the README lists every one, including which are not yet read by the code.

| Section | What it controls |
| --- | --- |
| `Config.Parking` | Slots per player, fees, park time limit, collision, floating text, auto-park |
| `Config.Zones`, `Config.NoParkingZones`, `Config.ParkingLots` | Lots, no-parking areas and blips |
| `Config.Meters` | Hourly rate (50 by default), minimum and maximum time, grace, fine, tow delay, premium zones, free hours |
| `Config.Delivery` | Base cost, rush multiplier, delivery times, job discounts |
| `Config.Business` | Lots per player, owner revenue share (70%), city tax (10%) |
| `Config.VIP` | Free or discounted meters for VIPs |
| `Config.Integration` | Phone app, forced target or key script, Discord webhook |
| `Config.Keybinds`, `Config.Commands` | Park key and admin command names |
| `Config.Valet`, `Config.Reserved` | Valet stands and reserved spots |
| `Config.Impound` | Not in the default file; add it to enable the impound NPC, blip and police key |

Ticket fines, impound fees, valet prices, rental prices and delivery tiers are set at the top of their module files. Enforcement powers per job and grade live in `integrations/permissions.lua`.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/park` (default `F5`) | Players | Park the vehicle you are driving |
| `/tickets` | Players | Open your parking tickets |
| `/rentspot` | Players | Open the rental spot menu |
| `/myrentals` | Players | Show your rented spots |
| `/issueticket` | Ticketing jobs | Open the ticket menu |
| `/addparkvip [id] [slots]` | Admins | Make a player VIP |
| `/removeparkvip [id]` | Admins | Remove VIP |
| `/parkresetplayer [id]` | Admins | Reset one player's parking |
| `/parkresetall` | Admins | Reset all parking |
| `/parkdebug` | Admins | Toggle zone debug outlines |
| `/deletepark [plate]` | Admins | Delete a parked vehicle |
| `/dpsparking` | Admins | Show the admin command list |

Meters, delivery and the valet have no chat command: they open through the phone app, exports, or the valet NPC.

## Credits

- Original script: mh-parking by MaDHouSe79.
- Rebuilt and extended by DaemonAlex for Del Perro Sands.
- GPL-3.0 licence.
