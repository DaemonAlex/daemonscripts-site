---
title: DPS Chat
tagline: A small command box for voice-only servers, with /me, /do and /try shown as bubbles over the player's head
category: fivem
area: player
status: live
repo: https://github.com/DaemonAlex/dps-chat
stack: ["Lua", "NUI (HTML/JS)"]
frameworks: ["Standalone"]
requires: []
tags: ["chat", "commands", "voice only", "me", "do", "try", "bubbles", "minimap"]
order: 35
---

## Overview

On a voice-only server, a scrolling chat feed is just noise. DPS Chat replaces the default chat (and okokChat) with a small box that does one thing: run commands. Press T, type a `/command`, press Enter. There is no chat feed and no text messages.

Roleplay actions still have a place. `/me`, `/do` and `/try` appear as short bubbles over the player's head, seen only by people close by, instead of lines in a chat log. Other scripts can draw the same bubbles over NPCs, vehicles, objects or a spot on the map.

Admins choose where the box sits on screen for every player, and can place a white ring around the round minimap.

## Features

- T opens a fixed command box that starts with `/` typed in. Players can rebind the key in the FiveM key bindings.
- Suggestions appear above the box, up to eight, with parameter names and help text. The box never moves or resizes while you type.
- Tab completes, Up and Down move through suggestions or your last 30 commands, Esc closes.
- Players only see commands they are allowed to run.
- Suggestions added by other scripts are kept; chat messages from other scripts are quietly dropped.
- `/me` shows italic text with a blue ME badge; `/do` shows a caption with an orange DO badge.
- `/try` rolls a 50/50 on the server and shows a green SUCCESS or red FAIL badge, so the player cannot pick the result.
- Bubbles last seven seconds, reach players within 25 metres in the same routing bucket, and stack up to three over one head.
- Text is cleaned on the server and on every client: game colour codes, control characters and angle brackets are removed and lines are cut to 120 characters.
- Rate limits on everything, checked on the server: one bubble every three seconds, and the same line within ten seconds is dropped.
- `ShowBubble` and `ClearBubble` exports let other scripts put bubbles on NPCs, vehicles, objects or coordinates, with a name badge and four styles.
- Admins place the box for everyone with `/chatbox` and the minimap ring with `/mapring`. Both positions are saved on the server and survive restarts.
- Declares `provide 'chat'`, so resources that depend on the default chat still start.
- No framework and no other resources needed.
- 37 checks in a test suite that runs outside the game.

## How it works

1. A player presses T and the box opens with `/` ready.
2. They type, pick a suggestion with Tab or the arrow keys, and press Enter to run it.
3. For `/me`, `/do` or `/try`, the server cleans the text, applies the rate limit and sends the bubble to nearby players only.
4. An admin runs `/chatbox`, drags the box to the right place and presses Enter: it moves for every player at once.

## Requirements

- A FiveM server build with Lua 5.4
- Nothing else: no framework and no other resource
- The `admin` ace for anyone who should use `/chatbox` and `/mapring`

## Installation

1. Stop and remove any other chat resource (the default `chat`, okokChat or anything that provides `chat`) and remove their `ensure` lines.
2. Copy the `dps-chat` folder into your resources.
3. Add `ensure dps-chat` to `server.cfg`, before the resources that register command suggestions.
4. Give your admins the ace: `add_ace group.admin admin allow`.
5. Restart the server and press T in game. Admins can then run `/chatbox` and `/mapring` once to place the box and ring.

## Configuration

There is no config file. The main values are constants in the code: bubble text length (120), time between bubbles (3 seconds), repeat window (10 seconds), bubble range (25 metres, set on both server and client), bubble time (7 seconds), most bubbles per target (3) and in total (40), and the default key (T). Default box and ring positions and bubble colours are in `html/style.css`.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/me <action>` | Everyone | Italic bubble over your head |
| `/do <description>` | Everyone | Caption over your head |
| `/try <action>` | Everyone | Bubble with a 50/50 SUCCESS or FAIL rolled on the server |
| `/chatbox` | `admin` ace | Move the command box for every player |
| `/mapring` | `admin` ace | Move the minimap ring for every player |

## Credits

Written by DaemonAlex for Del Perro Sands.
