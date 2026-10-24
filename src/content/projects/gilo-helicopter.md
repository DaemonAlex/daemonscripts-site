---
title: Gilo Helicopter (Enhanced Edition)
tagline: Police helicopter camera with thermal and night vision, plate scanning, tactical ground markers and synced spotlight
category: fivem
area: police-ems
status: live
repo: https://github.com/DaemonAlex/gilo-helicopter
stack: ["Lua"]
frameworks: ["Qbox", "QBCore", "ESX", "Standalone"]
requires: []
tags: ["police", "helicopter", "helicam", "ALPR", "spotlight", "air unit", "dispatch"]
credits: "Enhanced edition of the original Gilo Helicopter script by Gilo Modding (original author credited as TheInteger / GiloHeliPNC). MIT licence."
order: 50
---

## Overview

This is an enhanced edition of Gilo Helicopter, a well-known police helicopter camera script by Gilo Modding. The original gave air units a camera, vision modes, a spotlight and hover assists. DaemonAlex updated it for modern servers and added the tools an air unit actually needs to work with ground units.

From the helicopter, an officer can lock onto a car and see its model, plate and live speed, have the plate scanned and sent to dispatch automatically, set a GPS waypoint to it, and drop coloured markers on the ground that every police unit sees on their map. The spotlight is synced to every player, and the co-pilot can run it as well as the pilot.

It works with Qbox, QBCore and ESX, or standalone with ace permissions, and costs nothing while you are not in a helicopter.

## Features

- Helicopter camera with an LSPD overlay, 360 degree pan and tilt, and zoom.
- Live altitude, field of view and heading, plus the street and area name.
- Normal, night vision and thermal vision modes.
- Vehicle detection showing model, plate and live speed in km/h and mph.
- Lock-on tracking that follows the target smoothly.
- ALPR: holding a lock for about 3 seconds scans the plate and sends it to dispatch.
- Dispatch support for qs-dispatch, ps-dispatch, cd_dispatch, wasabi_dispatch, or a generic server event.
- Automatic GPS waypoint when you lock onto a vehicle (can be turned off).
- Tactical markers in four types: Suspect (red), Officer Down (orange), Perimeter (yellow) and Generic (blue).
- Markers show as a 3D beam and a map blip for all police units and expire after 60 seconds.
- Spotlight synced through state bags, controlled by the pilot and co-pilot, with an optional follow-the-camera mode.
- Hover mode and Super Hover (full freeze), with a speed limit so Super Hover cannot be abused.
- Seatbelt to stop accidental exits, and rappelling from the rear seats.
- Cycle the camera overlay: everything shown, speed hidden, street hidden, or minimal.
- Notifications through ox_lib, QBCore, ESX, wasabi_notify or native GTA help text.

## How it works

1. An officer gets into one of the allowed helicopters (`polmav`, `buzzard`, `frogger` and `maverick` by default).
2. `E` opens the camera. The mouse pans, the scroll wheel zooms, right click cycles vision modes.
3. `Space` locks onto a vehicle. After a short hold, the plate is scanned and sent to dispatch, and a waypoint is set.
4. `Z` picks a marker type and `G` drops it where the camera points, so ground units know where to go.
5. `H` toggles the spotlight; `L` makes it follow the camera.

## Requirements

- A FiveM server; OneSync Infinity recommended.
- Optional: `ox_lib` for notifications.
- Optional: a supported dispatch resource for ALPR alerts.

## Installation

1. Copy the `gilo-helicopter` folder into your resources folder.
2. Add `ensure gilo-helicopter` to `server.cfg`.
3. Adjust `config.lua`.
4. Restart the server.

Standalone servers grant marker access with the `gilo.helicopter.marker` ace. On framework servers, the police jobs allowed to place markers are listed at the top of `server.lua`.

## Configuration

Settings live in `config.lua` under `GiloHeli`.

| Option | Default | What it does |
| --- | --- | --- |
| `GiloHeli.Vehicles` | `polmav`, `buzzard`, `frogger`, `maverick` | Helicopters that get the camera |
| `GiloHeli.UseVision` | `true` | Night and thermal vision |
| `GiloHeli.ShowStreetName` | `true` | Street name on the overlay |
| `GiloHeli.CameraLogo` | `1` | `0` none, `1` LSPD |
| `GiloHeli.EnableALPR` | `true` | Plate scanning |
| `GiloHeli.DispatchSystem` | `generic` | Where scanned plates are sent |
| `GiloHeli.AutoWaypoint` | `true` | Waypoint on lock-on |
| `GiloHeli.AllowPassengerSpotlight` | `false` | Let rear passengers run the spotlight |
| `GiloHeli.EnableMarkers` | `true` | Tactical markers |
| `GiloHeli.MarkerDuration` | `60` | Seconds before a marker expires |

Every key below can be changed in the config, and players can rebind them in the FiveM key settings.

## Commands

| Command | Default key | What it does |
| --- | --- | --- |
| `HeliCam` | `E` | Open or close the camera |
| `HeliLights` | `H` | Toggle the spotlight |
| `HeliSpotlightFollow` | `L` | Spotlight follows the camera |
| `HeliSeatbelt` | `B` | Toggle seatbelt |
| `HeliRappel` | `X` | Rappel from a rear seat |
| `HeliHover` | `J` | Toggle hover |
| `HeliSuperHover` | `K` | Toggle Super Hover |
| `HeliHelp` | `U` | Show help and status |
| `HeliToggleUI` | `F7` | Cycle overlay layouts |
| `HeliMarker` | `G` | Place a tactical marker (in camera) |
| `HeliMarkerType` | `Z` | Cycle marker type (in camera) |

## Credits

- Original script: Gilo Helicopter by Gilo Modding. The README credits TheInteger (GiloHeliPNC) as the original author.
- Enhanced Edition (v2.0 and later): DaemonAlex.
- MIT licence, shared by the original and the enhanced edition.
