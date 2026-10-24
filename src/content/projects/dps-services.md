---
title: DPS City Services
tagline: A phone and tablet app to call a tow for the car next to you and follow it live until it is delivered
category: fivem
area: city
status: live
repo: https://github.com/DaemonAlex/dps-services
stack: ["Lua", "ox_lib", "NUI (HTML/JS)"]
frameworks: ["Qbox"]
requires: ["ox_lib", "qbx_core", "lb-phone", "lb-tablet", "dps-towjob"]
tags: ["phone app", "tablet app", "tow", "lb-phone", "lb-tablet", "city services"]
order: 55
---

## Overview

City Services is one app on the lb-phone and the lb-tablet. A player stands next to a vehicle, asks for a tow and follows it live: place in line, driver accepted, time to arrival, arrived, hooked, delivered.

Anyone can call a repair tow. On-duty police, EMS and fire can call an impound tow that skips the line and costs nothing. Tow drivers get their own tab with the current offer and the current job. If no tow driver is on duty, or nobody accepts in time, City Tow takes the request.

The app is only a view. The tow job resource, dps-towjob, owns the queue, the price, the order and the state. City Services forwards the request and shows what comes back.

## Features

- Scan the vehicle you are standing next to and request a tow in one tap.
- Repair tows for anyone, charged only when the vehicle is hooked (the README gives $200).
- Impound tows for on-duty police, EMS and fire: free and first in line.
- A Driver tab for tow drivers: accept or decline the current offer and see the current job.
- City Tow takes over when no driver is on duty or nobody accepts within three minutes.
- Live status: place in line, driver accepted, time to arrival, arrived, hooked, delivered.
- Cancel while the request is in line or the driver is on the way, but not once the driver has reached the vehicle.
- If the tow fails after the fee was taken, the fee is paid back and the app says so.
- A finished request stays on screen until Done is pressed, so you can read where the vehicle went.
- Optional vehicle photo on the scan and status cards from jg-vehiclestudio.
- Small test suite for the request and fee logic.

## How it works

1. The player opens City Services on their phone or tablet next to a vehicle.
2. The app scans for the closest vehicle and shows it.
3. The player picks a repair or impound tow. The request goes to dps-towjob.
4. A tow driver accepts it, or City Tow takes it.
5. The app updates as the driver accepts, drives over, hooks the vehicle and delivers it.

## Requirements

- `ox_lib`
- `qbx_core`
- `lb-phone` (paid) to host the app on the phone
- `lb-tablet` (paid) to host the app on the tablet, through one entry in its custom apps config
- `dps-towjob` 2.9.0 or newer: the queue, checked at every call rather than declared as a hard dependency
- Optional: `jg-vehiclestudio` (paid) for vehicle photos

## Installation

1. Put `dps-services` in your resources and add `ensure dps-services` after lb-phone.
2. Add the City Services entry from the README to `Config.CustomApps` in lb-tablet's config.
3. Make sure dps-towjob 2.9.0 or newer is running.
4. Restart the server. On the console, `servicesdebug` confirms the app can reach the tow script.

## Configuration

`config.lua` holds the app's name, description and identifier, the tow resource name (`Config.TowResource`, default `dps-towjob`) and the scan range (`Config.ScanRange`, 10 metres, which must not be larger than dps-towjob's own vehicle range). Prices, timings and who may call which tow come from dps-towjob.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `servicesdebug` | Server console only | One line showing the tow resource, its state, the fees and the scan range |

## Credits

Written by DaemonAlex for Del Perro Sands. Hosts on lb-phone and lb-tablet by LB Scripts, paid resources that are not included.
