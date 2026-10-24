---
title: DPS Signs
tagline: Keeps every freeway matrix sign in the city showing a rotating deck of safety notices and local messages
category: fivem
area: city
status: live
repo: https://github.com/DaemonAlex/dps-signs
stack: ["Lua"]
frameworks: ["Standalone"]
requires: ["SmartSigns"]
tags: ["signs", "freeway", "messages", "ambience", "SmartSigns"]
order: 75
---

## Overview

The SmartSigns resource adds working variable-message boards over the freeways, but out of the box they sit there saying whatever was last typed into them. DPS Signs keeps them alive. A deck of twelve messages, from "Seat belts save lives" to "Welcome to Del Perro Sands", rotates across every board on a schedule, each with a matching icon.

Each sign shows a different message, offset by its id, so a drive down the freeway reads like a sequence rather than the same line twelve times. The whole deck shifts along every 12 minutes.

## Features

- Twelve built-in messages: safety notices, transit and roadwork warnings and local flavour, each with a matrix icon (drink driving, phones, roadwork, pedestrians, tiredness and more).
- Covers every board listed in SmartSigns' `locations.json` (76 on Del Perro Sands).
- Neighbouring signs show different messages, so a route reads as a sequence.
- The deck advances every 12 minutes.
- Police or admin edits at a sign's keypad still work; the next rotation pass takes the board back.
- Waits for SmartSigns to finish starting, and spaces its updates so it never floods the sign resource.

## How it works

On start the resource waits for SmartSigns, counts the boards in its `locations.json`, and then sends each one its message through SmartSigns' own server event. Server-side updates skip the player permission check, so no one has to be online at a sign. Every 12 minutes the deck moves one step and every board gets its next message.

## Requirements

- `SmartSigns`

## Installation

1. Put the folder in your resources directory as `dps-signs`.
2. Add `ensure dps-signs` to `server.cfg` after `SmartSigns`.

## Configuration

Messages live in the `DECK` table at the top of `server.lua`: three lines and an icon per message. SmartSigns rejects any line of 15 characters or more, so keep each line to 14. The rotation interval is `ROTATE_MINUTES` (12) in the same file.

## Credits

Written by DaemonAlex for Del Perro Sands. The signs themselves are provided by the SmartSigns resource.
