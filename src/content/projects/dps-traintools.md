---
title: DPS Train Tools
tagline: Board any train at a station with E, ride in a seat or on the freight cars, and step off at the next stop
category: fivem
area: world
status: live
repo: https://github.com/DaemonAlex/dps-traintools
stack: ["Lua", "ox_lib"]
frameworks: ["Standalone"]
requires: ["ox_lib"]
tags: ["trains", "boarding", "seating", "NPC passengers", "railway"]
order: 60
---

## Overview

GTA's own way of getting into a train is unreliable, and pressing E next to a carriage often puts you on the roof. Train Tools replaces it. Stand by a train at a station, press E, and you are on board: in a free seat if the carriage has one, or sitting in a sensible spot for that kind of car if it does not.

Getting off is just as simple. If the train is stopped, press E and you step off. If it is moving, press E to get off at the next stop, and you are let off as soon as the train slows down.

It also makes trains look used. Every client fills the passenger coaches it can see with a few NPC riders, and now and then someone is riding in the caboose. It works on any train in the world, vanilla trains included, and does not call any other train resource.

## Features

- An "[E] Board Train" prompt when you are within 5.5 metres of a carriage and within 60 metres of a station.
- Boarding works on a moving train, so late players can still catch one that is leaving.
- Takes a free native seat first; otherwise seats you at a spot chosen for the car type.
- Freight riders sit somewhere that makes sense: in the cab, on the logs, in a hopper, on a tank, on a container or on a boxcar roof.
- "[E] Disembark" when the train is stopped, or "[E] Disembark at next stop" while it is moving, which you can cancel.
- Blocks the game's own enter and exit actions while the prompt is up, so E never climbs you onto the roof.
- Two to four ambient NPC riders per passenger coach, and a 20 percent chance of one in the caboose.
- Riders are local to each client, invincible and cleaned up when their train is gone.
- Tools for server owners: print door counts and open or close doors, mark seat offsets, and preview map blip sprites.
- Cleans up riders, attachments and preview blips when the resource stops.

## How it works

1. A player waits at a station. When a train pulls in, the prompt appears as they walk up to a carriage.
2. They press E and are seated on board.
3. While riding, the prompt shows the right way to get off for the train's speed.
4. When the train slows below walking pace at the next stop, a queued rider is stepped off beside the carriage.

## Requirements

- `ox_lib` (text prompts, animation and model loading)
- A train in the world: any vehicle of the train class works

## Installation

1. Copy the `dps-traintools` folder into your resources folder.
2. Add `ensure ox_lib` and then `ensure dps-traintools` to `server.cfg`.
3. Start or restart the server.

## Configuration

There is no config file. The settings are constants in `client.lua`:

| Setting | Default | What it does |
| --- | --- | --- |
| `STATIONS` | 18 positions | Where the boarding prompt is offered |
| Station radius | `60.0` | Metres from a station in which boarding is offered |
| Prompt range | `5.5` | How close to a carriage you must be to see the prompt |
| Stopped speed | `1.5` | Speed in metres per second below which you can step off |
| `FREIGHT_SEATS` | per model | Height, spread along the car and side offset for each freight car |
| `RIDERS.minPerCoach` / `maxPerCoach` | `2` / `4` | NPC riders per passenger coach |
| `RIDERS.hoboChance` | `20` | Percent chance of a rider in the caboose |
| `RIDERS.models` | 10 ped models | Models used for riders |

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `E` | Anyone at a station | Board a train, or get off / queue getting off while riding |
| `/board` | Anyone | Board the nearest carriage within 8 metres, without the station check |
| `/disembark` | Anyone | Get off now, whatever the speed |
| `/traindoors` | Anyone | Print each carriage's door count; with `0`, `1`, `2` or `off`, open one side, the other, both, or close all |
| `/seatmark` | Anyone | Print your offset from the nearest carriage, for tuning seat positions |
| `/blippreview <id>` | Anyone | Place a test map blip with that sprite at your position |

No ace permissions are checked, so every command is open to all players.

## Credits

Written by DaemonAlex for the Del Perro Sands railway.
