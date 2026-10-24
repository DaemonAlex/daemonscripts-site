---
title: DPS Film Mode
tagline: One key hides every HUD layer and hands you a smooth free camera for clean recording
category: fivem
area: admin
status: live
repo: https://github.com/DaemonAlex/dps-filmmode
stack: ["Lua"]
frameworks: ["Qbox"]
requires: ["ox_lib", "qbx_core"]
tags: ["camera", "recording", "content creation", "free cam", "staff tool"]
order: 40
---

## Overview

Film mode is for the people who make the city look good on video. Type `/film` (or press your own bound key) and every layer of the interface disappears at once: the minimap, the base-game HUD, your HUD resource and the chat box. In its place you get a free camera with eased movement and eased mouse look, so pans and fly-throughs come out smooth without any editing.

While you film, your character is invisible, invincible and safely parked, and it quietly follows the camera so the world keeps loading around you. Press `Esc` and everything goes back exactly as it was: the camera is removed, your character returns to where it stood, and every HUD layer comes back.

Access is controlled by an ace permission that the server checks, so only the groups you choose (admins and staff by default) can use it.

## Features

- Hides the minimap and every base-game HUD element for as long as film mode is on.
- Runs your HUD's toggle command (default `togglehud`) on start and again on stop.
- Blocks the chat key and clears the chat box, then turns chat back on at the end.
- Free camera with eased movement and eased mouse look.
- Level movement: W A S D stay flat whatever the camera pitch; Q and E change height.
- Fast and slow speed multipliers, and scroll-wheel zoom (field of view).
- Your character is invisible and invincible; on foot it is also frozen with collision off.
- The character follows the camera so the world keeps streaming around it.
- Stops by itself when the resource stops or the player logs out.
- Its only loop runs while film mode is on, so it costs nothing the rest of the time.

## How it works

1. A permitted player types `/film` or presses their bound key.
2. The server checks the player's ace permission and allows or refuses.
3. Film mode hides the interface and creates the camera at the player's view.
4. The player flies with W A S D, Q and E, looks with the mouse, holds Shift or Ctrl for speed, and scrolls to zoom.
5. `Esc` or `/film` again ends it and restores everything.

## Requirements

- `ox_lib` (callbacks, notifications)
- `qbx_core` (film mode stops on logout)
- A chat resource that handles `chat:clear` (the default FiveM chat does)
- Optional: a HUD with a toggle command, such as jg-hud's `togglehud`

## Installation

1. Copy the `dps-filmmode` folder into your resources folder.
2. Add `ensure dps-filmmode` to `server.cfg`, after `ox_lib` and `qbx_core`.
3. Set up access. By default the resource grants the `dps.film` ace to the `admin` and `god` groups each time it starts. To manage it yourself, set `Config.AutoAces = false` and add lines such as `add_ace group.admin dps.film allow`.
4. Restart the server or run `ensure dps-filmmode`.
5. In game, type `/film`, or bind "Film mode" under Settings > Key Bindings > FiveM.

## Configuration

Everything lives in `config.lua`.

| Option | Default | What it does |
| --- | --- | --- |
| `Config.Ace` | `dps.film` | Ace permission a player needs |
| `Config.AutoAces` | `true` | Grants the ace to `Config.AceGroups` at start |
| `Config.AceGroups` | `admin`, `god` | Groups that get the ace |
| `Config.Command` | `film` | Chat command that toggles film mode |
| `Config.Key` | empty | Default key; empty lets players bind their own |
| `Config.Hide.hudCommand` | `togglehud` | Your HUD's toggle command, or empty to skip |
| `Config.Camera.speed` | `2.0` | Movement speed in metres per second |
| `Config.Camera.smoothing` | `0.05` | Movement easing: `0.05` glides, `0.3` snaps |
| `Config.Camera.fov` | `50.0` | Starting field of view |
| `Config.MovePedWithCamera` | `true` | Keeps the world streamed around the camera |

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/film` | Players with the `dps.film` ace | Start or stop film mode |

## Credits

Written by DaemonAlex for Del Perro Sands. MIT licence.
