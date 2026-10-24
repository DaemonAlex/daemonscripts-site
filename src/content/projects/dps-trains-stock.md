---
title: DPS Trains Stock
tagline: The rolling stock behind the DPS railway, with locomotives, coaches, freight wagons, consists and station builds in one asset pack
category: fivem
area: world
status: live
repo: https://github.com/DaemonAlex/dps-trains-stock
stack: ["Streamed assets", "Game data files"]
frameworks: ["Standalone"]
tags: ["trains", "rolling stock", "models", "assets", "railway", "map"]
credits: "Assets from Trains Overhauled Edition (Big Daddy), stripped down for DPS"
order: 70
---

## Overview

This resource holds no scripts at all. It ships the train models and tells the game what each train is made of. A train script, on Del Perro Sands that is `dps-trains`, decides where trains go and when.

It is a trimmed copy of *Trains Overhauled Edition*, a public rolling-stock pack. The pack's own train system, ticket purchasing and server script were deliberately removed so they cannot fight `dps-trains` for control of the track. The station builds and ticket machine were kept.

The textures were shrunk in September 2026, which took the set from about 1.1 GB to about 0.3 GB in game.

## Features

- Locomotives, passenger coaches and freight wagons, each with a high-detail model.
- 31 train models declared to the game, none of which spawn as ambient traffic.
- Five consists appended after the game's own: a blue passenger set (Axsellya Express), a brown passenger set (Brown Streak), a freight set, a one-car metro and a Roxwood regional passenger set.
- Seats and door components for the trains, and two handling entries for freight.
- Train sounds from its own audio wavepack.
- Streamed station builds for Sandy Shores, Paleto, La Mesa and Davis Quartz, plus a railway bridge, a station cover and the ticket machine.

## How it works

The game's train config file is appended to, not replaced, so the custom consists start at variation 28, after the base game's sets. A train script spawns a train by asking for a variation number. On DPS, the mainline regional trains use the Roxwood set and the Roxwood shuttle uses the metro set.

Keep the script and this file in step: asking for a variation the game does not have crashes clients. Data files are read when a client joins, so any change needs a server reboot and a rejoin.

## Requirements

- A game build that supports the `TRAINCONFIGS_FILE` data file
- A train script that spawns trains by variation, such as `dps-trains`
- `amb-roxwood-trains` if you use the Roxwood set, because its engine model streams from there

## Installation

1. Copy the folder into your resources directory and keep the name `dps-trains-stock`.
2. Check the folder contains `stream/`, `data/` and `dlc_dpstrains/train_sounds.awc`.
3. Add `ensure dps-trains-stock` to `server.cfg` before your train script. If you use the Roxwood set, also ensure `amb-roxwood-trains`.
4. Leave the `data_file` lines in `fxmanifest.lua` as they are.
5. Restart the server and have players reconnect.

## Configuration

Consists live in `data/trains.xml`. Each `<carriage>` line sets the model, how many NPC passengers it carries, whether it is flipped, interior lights, ride height and how many times it repeats. Each `<train_config>` sets options such as station announcements, door beeps and carriage gap. Handling values such as mass, brakes and top speed are in `data/handling.meta`.

On DPS, after changing a consist you must also regenerate `dps-trains/data/trains.lua`, which tells clients which models to preload. If you add or reorder consists, every variation number after the change moves.

## Credits

Models and audio from *Trains Overhauled Edition* by Big Daddy, built on Walter's overhauled trains. Stripped and prepared for Del Perro Sands by DaemonAlex.
