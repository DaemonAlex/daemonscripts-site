---
title: DPS Trains
tagline: The Del Perro Sands railway engine, with timetabled trains that stop at real stations and keep running when nobody is watching
category: fivem
area: world
status: live
repo: https://github.com/DaemonAlex/dps-trains
stack: ["Lua", "ox_lib", "OneSync"]
frameworks: ["Standalone"]
requires: ["ox_lib", "dps-trains-stock", "OneSync"]
tags: ["trains", "transit", "metro", "railway", "timetable", "world"]
credits: "Fork of the Ehbw trains engine, built on VenomXNL's XNL-FiveM-Trains-U3 track-node work; rolling stock from Walter's Trains Overhauled via Big Daddy Scripts"
order: 20
---

## Overview

DPS Trains runs the railway on Del Perro Sands: a passenger service on the heavy-rail loop around the map and a metro on the city line. Trains run to a timetable, slow into stations, stop with their doors open and pull away again, and players can catch them or drive them.

The core idea is that a train is somewhere specific even when nobody is near it. The server moves every train along the track all the time as a "ghost" with no entity. When a player comes within range, a nearby client creates the real train at that spot. Ghosts also wait at stations, obey spacing holds and account for braking time, so the service you meet on the platform is where the timetable says it should be.

This is the engine of a four-part railway. `dps-trains-stock` supplies the models and consists, `dps-traintools` handles boarding and seating, and `dps-transitapp` shows live arrivals on the phone.

## Features

- Server-side timetable: trains keep moving and stopping as ghosts when no player is near.
- Real entities created by a nearby client when a player comes within range, then removed again when they leave.
- Station stops with doors opened, on both the mainline and the metro.
- Smooth staged braking into platforms and natural acceleration away.
- Headway holds: a train that gets too close to the one ahead waits until the gap clears.
- Dwell regulation: bunched trains wait a little longer at stops and trains with a big gap ahead wait less, so the fleet spreads out evenly.
- Stranded-train recovery: a train that stops advancing for two minutes away from a station is removed and respawned.
- Rogue-train cleanup and a guard against clients creating trains the server did not ask for, with an allow list for cable cars and other train-type resources.
- Station blips on the map, short range only; trains themselves have no map blips.
- Player driving through an ox_target option on the cab, with forward, reverse, handbrake and door controls.
- Seats on the metro that players can sit in through ox_target.
- Station skipping for stops that sit too close together to run properly.
- `getArrivalBoard()` export that gives each station's next arrivals, used by the phone app.
- Exports for other resources to create, find, stop and remove trains.

## How it works

1. On start, the server reads the game's track data and places each configured train at its starting node on its track.
2. Every second the server advances each train by the distance it would have covered, holding it at stations and behind the train ahead when needed.
3. When a player is within roughly 400 metres, a nearby client is chosen to create the real train at that position. The server keeps it in step from then on.
4. At a station the train brakes to a stop, opens its doors, waits, and leaves. Players board with `dps-traintools` or sit in metro seats.
5. Arrival times for every station come from the same server state, so the phone app and the platform always agree.

As configured on Del Perro Sands, the metro runs three trains on the city line, the mainline runs three regional passenger trains, and a single shuttle runs on the Roxwood line.

## Requirements

- FXServer artifact 10188 or newer, with OneSync on (both declared in the manifest)
- Game build 3258 or newer
- `ox_lib`
- `dps-trains-stock` for the custom rolling stock and consists
- Optional: `ox_target` 1.17.1 or newer for driving and seating options
- Optional: `dps-traintools` and `dps-transitapp`

## Installation

1. Drop all four railway resources into your resources folder. `dps-trains-stock` is a large model pack, so expect a first-join download.
2. Start them in this order, explicitly, because alphabetical order puts `dps-trains` first, which is wrong:
   `ensure ox_lib`, `ensure dps-trains-stock`, `ensure dps-trains`, then optionally `dps-traintools`, `lb-phone` and `dps-transitapp`.
3. Check that the consist numbers in the config match `dps-trains-stock/data/trains.xml`. A number the game does not have crashes clients.
4. Reboot the server and rejoin. Consist data is read when a client joins, not on resource restart.
5. Run `traindebug` in the server console. You should see one line per train with a node that moves between calls.

## Configuration

| File | What it controls |
| --- | --- |
| `configs/metro.lua` | Metro and mainline start locations (as track node positions), consist per train, speed, NPC driver, seat positions |
| `configs/freight.lua` | Freight trains (turned off on DPS) |
| `configs/general.lua` | Default line speed, station dwell time, skipped stations, model preload list, player driving, ox_target bridge, rogue-train cleanup, admin ace group |
| `configs/cablecar.lua` | Cable cars (off; needs a separate cable car resource) |
| `server/main.lua` | Station names, keyed by track node |

Line speed is capped at 30 metres per second, because higher speeds desync trains between clients. Start positions are track node indices rather than coordinates, so spacing is exact; the `trainspace` console command prints evenly spaced positions to paste in.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `traindebug` | Server console | Lists every train with its track, node, entity, dwell and hold, plus a spacing table per track |
| `boarddebug` | Server console | Shows the arrival board's station list and distances |
| `trainspace <track> <count>` | Server console | Prints evenly spaced start positions for a track |
| `/trainStats` | Admins (`group.admin`) | Lists every train and whether its entity exists |
| `/findTrain <id>` | Admins | Prints a train's current location |
| `/setTrainSpeed <id> <speed>` | Admins | Sets a train's speed (example command, can be turned off) |
| `/driveTrain` | Anyone, when example commands are on | Drives the nearest train |
| `/sitInSeat <index>` | Anyone, when example commands are on | Sits in a metro seat |

## Credits

Forked from the trains engine by Ehbw and substantially rewritten and tuned for Del Perro Sands by DaemonAlex. The track-node architecture and train tracking come from VenomXNL's XNL-FiveM-Trains-U3. Rolling stock is Walter's Overhauled Trains (lore-friendly liveries), with thanks to Big Daddy Scripts for their open source work on it.
