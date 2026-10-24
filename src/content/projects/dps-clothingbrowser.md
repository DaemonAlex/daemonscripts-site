---
title: DPS Clothing Browser
tagline: Flip through every clothing drawable on your own character and save finished uniforms straight to the database
category: fivem
area: admin
status: live
repo: https://github.com/DaemonAlex/dps-clothingbrowser
stack: ["Lua", "NUI (HTML/JS)", "oxmysql"]
frameworks: ["Qbox"]
requires: ["ox_lib", "oxmysql"]
tags: ["staff tool", "clothing", "uniforms", "outfits", "qs-appearance", "NUI"]
order: 60
---

## Overview

A server with a dozen clothing packs has thousands of drawables, and nobody remembers which number is the new police vest. The Clothing Browser lets an admin page through every slot on their own character, watching each piece change in real time, until they find the one they want.

Pieces you like can be saved as you go and exported as a complete outfit with a label, a job and the grades allowed to wear it. Every export is written to a database table, and the male and female versions of the same outfit end up on one row, ready for a job wardrobe to read.

## Features

- Component browser: cycle through every drawable in tops, pants, shoes, vests, masks and the other clothing slots with a live preview.
- Prop browser: hats, glasses, ears, watches and bracelets.
- Outfit builder: save individual pieces while browsing, then export them together.
- Snapshot export: capture your whole current appearance in one click.
- Jump straight to a component and drawable number.
- Restore your original appearance at the end of the session.
- The camera frames the slot you are browsing (face, torso, legs or shoes).
- Exports go to the `dps_outfits` table, created automatically on first start.
- Male and female exports with the same outfit name merge onto one row (`male_data` and `female_data`).
- The export format matches qs-appearance job outfits.

## How it works

1. An admin types `/cb` and chooses Browse Components, then a slot such as Tops.
2. Left and right arrows step through drawables (Shift skips 10); up and down change the texture.
3. E saves the current piece to the outfit builder. Repeat for each slot.
4. In the outfit builder, Export Saved Pieces asks for a label, a job name and the allowed grades.
5. The server writes the outfit to `dps_outfits`. Do the same on the other gender with the same name and both land on the same row.

Opening the browser and saving an export are both checked on the server against `group.admin`, so a modified client cannot get around the restricted command.

## Requirements

- `ox_lib` (input dialogs, notifications, server callbacks)
- `oxmysql` (outfit storage)

## Installation

1. Drop `dps-clothingbrowser` into your resources folder.
2. Add `ensure dps-clothingbrowser` to `server.cfg`.
3. Grant the commands to admins (required): `add_ace group.admin command.cb allow` and `add_ace group.admin command.clothingbrowser allow`.

## Configuration

Everything lives in `config.lua`.

| Option | Default | What it does |
| --- | --- | --- |
| `Config.Debug` | `false` | Also prints the full outfit JSON to the console on export |
| `Config.ComponentNames` / `Config.PropNames` | GTA slot names | Labels shown for each slot |
| `Config.UniformComponents` | slots 1, 3 to 11 | Slots offered for uniform building (face and hair skipped) |
| `Config.PropIds` | 0, 1, 2, 6, 7 | Prop slots available for browsing |
| `Config.CameraOffsets` | per slot | Camera field of view, offset and rotation for each slot |

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/cb` | Admins | Open the clothing browser |
| `/clothingbrowser` | Admins | Same as `/cb` |

## Credits

Written by DaemonAlex for Del Perro Sands. Camera offsets follow the patterns used by qs-appearance.
