---
title: DPS Aviation
tagline: Aircraft that idle instead of cutting out, taxi at a sensible speed and need a real start sequence before they fly
category: fivem
area: vehicles
status: live
repo: https://github.com/DaemonAlex/dps-aviation
stack: ["Lua", "ox_lib"]
frameworks: ["Standalone"]
requires: ["ox_lib"]
tags: ["aviation", "aircraft", "helicopter", "preflight", "engine start", "taxi", "realism"]
order: 40
---

## Overview

GTA's aircraft have a few habits that make flying in roleplay awkward. Ease off the throttle on approach and the engine shuts off. Let go on the ground and a plane creeps or rockets across the apron. Jump in and you are airborne in seconds. DPS Aviation fixes all three for every plane and helicopter on the server.

Engines stay alive while the aircraft is flying or rolling, and planes hold a normal taxi speed until the pilot commits to a takeoff with full throttle. Every aircraft also starts cold. The first throttle input starts a start sequence for that type of machine: battery and avionics, engine start, warm-up and so on, shown as a one-line banner, until the aircraft is ready to go.

It is a client-only resource with no database and no server script. It also works alongside DPS Airlines, which starts the sequence for the captain once the first officer finishes the preflight checklist.

## Features

- Engine keep-alive: the engine can only be shut down when the aircraft is stopped on the ground.
- Taxi assist for planes: holds about 15 knots on the ground and stops creeping at neutral throttle.
- Holding full throttle for a moment releases the taxi limit for takeoff.
- Cold start: a freshly entered aircraft is undriveable with the engine off until its sequence runs.
- Six start sequences: piston, turboprop, jet, airliner, single helicopter and twin helicopter, each with its own stages.
- The engine lights at a set stage, so a jet can taxi during its warm-up, but full power waits for GO.
- Helicopter lift is held down until GO, so nobody lifts off mid-start.
- GO is stored on the aircraft itself, so a warm aircraft stays warm when crews swap seats.
- NO GO checks: low fuel or a dead engine refuses a start.
- Master alarm when engine health drops low; below a second threshold the engine is seized until repaired.
- One dial scales every stage, so starts can be made shorter or more realistic without editing each sequence.
- Per-model timing overrides and an exempt list for drones and toys.
- Two client exports so other resources can start a sequence or read its status.

## How it works

1. The pilot climbs into a cold aircraft. The banner reads that it is cold and needs throttle to start.
2. The first throttle input (or `/astart`) begins the sequence for that aircraft type. Each stage is shown on the banner, and the engine lights at its marked stage.
3. When the last stage completes the aircraft shows GO and can take off.
4. On the ground, taxi assist keeps speed sensible until full throttle is held for takeoff.
5. After landing, the pilot stops and types `/ashutdown`. The aircraft is cold again and the next start runs the full sequence.

With the shipped time scale, a single helicopter takes about a minute to reach GO, a piston plane about two minutes, a business jet about four and an airliner about five.

## Requirements

- `ox_lib`
- A fuel resource that sets the game's vehicle fuel level (such as `ox_fuel`) for the low-fuel NO GO check to mean anything

## Installation

1. Drop `dps-aviation` into your resources (DPS keeps it in `[dps]`).
2. Make sure `ox_lib` starts first.
3. No config edits are needed to run it. Add new add-on models to the type lists as you install aircraft packs.

## Configuration

Everything is in `config.lua`.

| Option | Default | What it does |
| --- | --- | --- |
| `Config.keepEngineAlive` | `true` | Keeps engines running while flying or rolling |
| `Config.taxiAssist` | `true` | Holds planes to a taxi speed on the ground |
| `Config.taxiSpeed` | `8.0` | Taxi speed in metres per second (about 15 knots) |
| `Config.takeoffHold` | `1200` | Milliseconds of full throttle that release the taxi limit |
| `Config.preflight` | `true` | Turns the cold start sequence on or off |
| `Config.startSequence` | six types | Stages, seconds and engine-on stage for each aircraft type |
| `Config.timeScale` | `0.6` | Plays out this share of the listed real-world seconds |
| `Config.spinupModel` | one EMS heli | Total start time override for specific models |
| `Config.airlinerModels`, `jetModels`, `turbopropModels`, `twinHelis` | lists | Which models get which sequence; other planes are piston, other helicopters are single |
| `Config.preflightExempt` | `rcmavic` | Models that never go cold |
| `Config.minFuel` | `1.0` | Fuel below this refuses a start |
| `Config.alarmHealth` / `Config.deadHealth` | `350` / `100` | Engine health for the master alarm and for a seized engine |
| `Config.driveRotor` | `false` | Leave off: scripting rotor speed made helicopters uncontrollable in testing |

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/astart` | Pilot | Starts the start sequence by hand, or relights an aircraft already at GO |
| `/ashutdown` | Pilot, stopped on the ground | Shuts down and makes the aircraft cold again |

Exports for other resources: `exports['dps-aviation']:startPreflight()` and `exports['dps-aviation']:preflightStatus()`.

## Credits

Written by DaemonAlex for Del Perro Sands. The preflight part replaces an older preflight script the server used before.
