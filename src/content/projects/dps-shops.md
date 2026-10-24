---
title: DPS Shops
tagline: Shop clerks who greet customers in their own voice and react to a robbery, by giving in or by fighting back
category: fivem
area: city
status: beta
repo: https://github.com/DaemonAlex/dps-shops
stack: ["Lua", "ox_lib"]
frameworks: ["Qbox"]
requires: ["ox_lib", "qbx_core", "wasabi_mdt"]
tags: ["shops", "clerks", "NPC", "robbery", "silent alarm", "voice"]
order: 45
---

## Overview

DPS Shops puts a clerk behind the counter of the city's shops. Walk in and the clerk looks up and greets you; stay a while and they may make small talk. It is all the game's own ambient speech in the clerk's own voice, with no text on screen, which suits a voice-only server.

Point a gun at them and things change. Some clerks throw their hands up and quietly hit the silent alarm. Others curse, draw a weapon and fight back, and those clerks can kill. Which way it goes depends on the kind of shop, the time of day, how many robbers there are and whether the shop was robbed recently.

This is the first layer of the project: clerks only. Player-owned shops are planned as the second layer.

## Features

- One clerk per counter, spawned only when a player comes close and removed once everyone leaves.
- Every nearby player sees the same clerk doing the same thing: one client owns it, the server decides what it does.
- A greeting the first time you step up to the counter, and an occasional idle line while you stay.
- Threats are a weapon aimed at the clerk and held steady, checked on the server, or a register robbery reported by a store-robbery script.
- Two reactions: submissive (hands up, then a cowed idle) or aggressive (a curse, then a weapon and a real fight).
- A submissive clerk never fights but always calls it in.
- An aggressive clerk never chases a robber far from the counter; past that, they go back behind it, armed.
- Night, extra robbers and a recent robbery all raise the chance of a fight, up to a ceiling per persona.
- After a robbery the shop stays jumpy for an hour: no greetings, and the next threat is more likely to end in a fight.
- Clerks can be killed during a robbery. The body stays for a short time, then the counter is empty for ten minutes before a new clerk arrives.
- Silent alarm through wasabi_mdt as a 10-31 robbery call, sent to the departments for that region.
- Six personas: convenience store, boutique, mechanic, gun counter, pharmacist and a Roxwood country clerk, each with its own models, voice lines, weapon and nerve.
- An export for store-robbery scripts so the clerk reacts instead of both scripts raising an alarm.
- Config checks at boot that warn about distances or personas that do not make sense.
- No database tables and no items.
- Test suite for the persona, reaction, claim and config logic, runnable outside the game.

## How it works

1. A player walks into a shop with a configured counter and the clerk spawns.
2. The clerk greets them and may chat now and then.
3. If the player aims a weapon at the clerk, or a store-robbery script reports a register robbery, the server rolls the reaction.
4. Every client sees the same outcome. The silent alarm goes out after the persona's delay, whichever way the clerk reacted.
5. After two minutes the clerk goes back to work and the shop enters its jumpy aftermath window.

## Requirements

- `ox_lib`
- `qbx_core`
- `wasabi_mdt` (paid) for the silent alarm
- Optional: a store-robbery script that calls the `RobberyThreat` export before sending its own dispatch

## Installation

1. Copy the `dps-shops` folder into your resources.
2. Add `ensure dps-shops` to `server.cfg`, or restart if it is in a bucket that is already ensured.
3. Add your counters to `Config.Counters`. With no counters the resource starts and does nothing else.

Each counter has an id, a label (used in the dispatch call), a kind (the persona), a region, the spot where the clerk stands and the way they face. A counter left at `0, 0, 0` is skipped, so you can reserve a row before you have its coordinates.

## Configuration

Everything lives in `config.lua`.

| Option | Default | What it does |
| --- | --- | --- |
| `Config.SpawnDistance` | `60.0` | A player this close spawns the clerk |
| `Config.DespawnDistance` | `90.0` | The clerk is removed only when players are this far away |
| `Config.GreetDistance` | `3.0` | Inside this ring the clerk greets and chats |
| `Config.ThreatDistance` | `8.0` | Aiming from further away is ignored |
| `Config.AimSeconds` | `0.6` | How long an aim must hold to count |
| `Config.RespawnSeconds` | `600` | How long a counter stays empty after its clerk dies |
| `Config.Reaction.seconds` | `120` | How long a reaction lasts |
| `Config.Reaction.huntLimit` | `40.0` | How far a fighting clerk will chase |
| `Config.Aftermath` | 3600 s, +0.25 | Jumpy window after a robbery and its bonus |
| `Config.NightHours` / `NightBonus` | 22 to 5, +0.15 | Night window and its bonus |
| `Config.CrowdBonus` | `0.10` | Added per extra robber, up to two |
| `Config.AlarmDepartments` | by region | Which jobs get the alarm in `ls`, `sandy`, `paleto` and `roxwood` |
| `Config.Personas` | 6 | Models, scenario, voice lines, weapon, fight chance and alarm delay |
| `Config.Counters` | 3 | The counters, each with its persona and spot |

## Credits

Written by DaemonAlex for Del Perro Sands. MIT licence.
