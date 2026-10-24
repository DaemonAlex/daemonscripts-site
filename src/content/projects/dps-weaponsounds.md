---
title: DPS Weapon Sounds
tagline: A planned sound replacement pack for weapons, vehicles and the city, with per-category volume and on-demand loading
category: fivem
area: world
status: planning
repo: https://github.com/DaemonAlex/dps-weaponsounds
stack: ["Lua"]
frameworks: ["Standalone"]
requires: []
tags: ["audio", "weapon sounds", "sound replacement", "streaming"]
order: 85
---

## Overview

DPS Weapon Sounds is a planned resource for replacing GTA V's default weapon sounds, and optionally its ambient, vehicle and footstep sounds, with custom audio. The aim is better-sounding gunfights without loading every sound into every player's memory at once.

At the moment the repository holds the design and documentation only: a detailed README and a GPL-3.0 licence. The resource code and audio files are not published yet, so everything below describes what the README sets out, not something you can install today.

## Features

These are the features the README describes:

- Replacement audio for weapons, with separate switches for environmental, vehicle and footstep sounds.
- A master volume plus separate volume levels for weapons, environment, vehicles, footsteps and explosions.
- An option to apply the custom sounds only to chosen weapons.
- A choice between loading all audio at start or loading it only when needed.
- Automatic unloading of unused audio after a set delay to save memory.
- A debug mode with console logging.
- Exports so other resources can load, unload or check the sound banks.

## How it works

As designed, the resource streams custom audio banks and loads them when the game needs them, for example when a player first equips a weapon. Banks that go unused for a while are released again. Server owners pick the balance: preload everything for the best sound on small servers, or load on demand with a short release delay on busy ones.

## Requirements

- The README lists FiveM server build 4752 or newer and recommends players have 8 GB of RAM or more.

## Configuration

The README documents a `config.lua` with `Config.AudioSettings` (category switches, volumes, `PreloadAllSounds`, `BankReleaseDelay`), `Config.WeaponOverrides` and `Config.Debug`. Until the code is published, treat these names as planned.

## Credits

DPS Development (DaemonAlex). GPL-3.0 licence.
