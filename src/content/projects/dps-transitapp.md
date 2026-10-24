---
title: DPS Transit App
tagline: A Transit app for lb-phone that shows the next train at every station, nearest station first
category: fivem
area: player
status: live
repo: https://github.com/DaemonAlex/dps-transitapp
stack: ["Lua", "ox_lib", "NUI (HTML/JS)"]
frameworks: ["Standalone"]
requires: ["lb-phone", "ox_lib", "dps-trains"]
tags: ["phone app", "lb-phone", "trains", "transit", "arrivals"]
order: 65
---

## Overview

The Transit app puts the railway's departure boards on every player's phone. Open it and you see one card per station, sorted by how far away it is, each showing the next train, its status and how long until it arrives.

It does no scheduling of its own. It simply shows what `dps-trains` reports, so the times on the phone match what actually turns up on the platform.

## Features

- One card per station, sorted by distance from the player and labelled in metres or kilometres.
- Each card shows the next service: its name, a status and an arrival time.
- Stations are tagged `REGIONAL` for the mainline or `LIGHT RAIL` for the other lines.
- Services have their own icons: Metro, Axsellya Express, Brown Streak and Freight.
- Status reads "boarding", "delayed", "next stop" or "N stops away".
- Arrival time reads "Due" under 45 seconds, otherwise minutes; stations with nothing coming read "No service".
- Refreshes every 5 seconds while open.
- Installed on every phone by default, and re-added automatically if lb-phone restarts.
- Keeps working, showing "No service", if `dps-trains` is stopped.

## How it works

1. When lb-phone starts, the resource registers a custom app called Transit.
2. A player opens it and the app asks the server for the arrival board.
3. The server reads `getArrivalBoard()` from `dps-trains`, and the client sorts the stations by distance before showing them.

## Requirements

- `lb-phone` with custom app support
- `ox_lib`
- `dps-trains` (for its `getArrivalBoard()` export)

## Installation

1. Put the folder in your resources directory and keep the name `dps-transitapp`. The app's page calls back to the resource by that exact name.
2. In `server.cfg`, ensure it after `lb-phone` and `dps-trains`.
3. Restart the server. No other setup is needed.

`dps-trains` is deliberately not a hard dependency: if it were, restarting the railway would remove the app from every phone.

## Configuration

There is no config file. The app id (`dps_transit`), name (`Transit`), default install and icon are set in `client.lua`. The 5-second refresh and the 45-second "Due" threshold are in `ui/index.html`.

## Credits

Written by DaemonAlex for Del Perro Sands.
