---
title: DPS Bad Peds
tagline: Stop any pedestrian, check their ID, frisk them and make an arrest, so patrol has work when no criminals are online
category: fivem
area: police-ems
status: live
repo: https://github.com/DaemonAlex/dps-badpeds
stack: ["Lua", "ox_lib", "oxmysql"]
frameworks: ["Qbox"]
requires: ["qbx_core", "ox_lib", "ox_target", "ox_inventory", "oxmysql"]
tags: ["police", "NPC", "frisk", "arrest", "intel", "informants", "dispatch", "patrol"]
featured: true
order: 15
---

## Overview

Police on a roleplay server often have nothing to do when no criminals are online. Bad Peds turns every pedestrian on the street into a possible stop. An officer walks up to any NPC, checks their ID, frisks them and, if they find contraband, makes an arrest.

Suspects are not all the same. Some come quietly, some run, some will trade information for a lighter sentence and a few can be turned into informants. A roster of recurring characters with their own personalities builds up rap sheets over time, so the same faces turn up on patrol and become familiar.

Everything is checked on the server: one officer per NPC, distance checks on every action, and seized contraband goes to an evidence locker, never into the officer's own pockets.

## Features

- Any pedestrian within range gets a target option for law-enforcement officers.
- ID check with a live mugshot of the NPC, a generated name and their prior arrests.
- Frisk: the NPC puts their hands up and turns out three to six items pulled from your real inventory item list.
- Items are sorted into legal and illegal by a configurable list; illegal finds unlock the arrest menu.
- Click an item to seize it. Seized items go to an evidence stash, or are destroyed and logged.
- Arrests: compliant suspects surrender; runners flee and must be tased first. The officer is handed a stun gun for the chase.
- Whether a suspect runs, talks or turns informant depends on their personality, not a coin flip.
- Intel trading: a suspect may offer information, generated from what they were carrying, in exchange for a halved sentence.
- Informant deals: release the informant without charges to keep their cover.
- 25 recurring characters with backstories, specialties and personalities, rotated so only a few are active each in-game day.
- Jail records: arrested characters are unavailable for a sentence based on what they carried, up to 72 in-game hours.
- Dispatch calls for contraband found, foot pursuits and arrests, sent to wasabi_mdt, ps-dispatch or cd_dispatch.
- Optional AI dialogue through dps-ainpcs, with static lines as a fallback.
- The character roster is shared with dps-ainpcs, so a character in jail is unavailable in both.

## How it works

1. An officer approaches a pedestrian and picks the police option.
2. They check the ID card or frisk the suspect.
3. If only legal items turn up, the officer closes the menu and lets them go.
4. If contraband turns up, a dispatch call goes out to other officers and the arrest menu opens: seize items, frisk again, negotiate intel or arrest.
5. On arrest, the suspect either surrenders or runs. A runner triggers a foot pursuit call and has to be tased.
6. The arrest is recorded, the sentence is worked out from the contraband, and the character is off the streets until it ends.

## Requirements

- `qbx_core`
- `ox_lib`
- `ox_target`
- `ox_inventory`
- `oxmysql` for the jail, intel and informant records
- Optional: `wasabi_mdt`, `ps-dispatch` or `cd_dispatch` for dispatch calls
- Optional: `dps-ainpcs` for AI dialogue

## Installation

1. Place the folder in your resources.
2. If you use the jail system, run `sql/jail_records.sql` in your database. It creates the jail record, informant and intel report tables.
3. Add `ensure dps-badpeds` to `server.cfg` after `qbx_core`, `ox_lib`, `ox_target`, `ox_inventory`, `oxmysql` and any dispatch or AI resource.
4. Review `config.lua`: target and inventory, seizure handling, jail and AI settings, the illegal item list, dispatch and intel templates.
5. Restart the server or run `ensure dps-badpeds`.

## Configuration

Everything lives in `config.lua`; the character roster and personalities are in `shared/characters.lua`.

| Option | Default | What it does |
| --- | --- | --- |
| `Config.target` | `ox_target` | Target resource |
| `Config.inventory` | `ox_inventory` | Inventory resource |
| `Config.SeizeMode` | `evidence` | Send seized items to a stash, or `destroy` them |
| `Config.evidenceStash` | `evidence-badpeds` | The evidence stash's id, label and size |
| `Config.jailSystem.enabled` | `true` | Turns jail records on or off |
| `Config.jailSystem.maxJailHours` | `72` | Longest sentence in game hours |
| `Config.jailSystem.intelReduction` | `0.5` | Sentence multiplier when a suspect gives intel |
| `Config.aiIntegration.enabled` | `false` | Uses dps-ainpcs for dialogue |
| `Config.dispatch` | `wasabi_mdt` | Dispatch resource and the three call types |
| `Config.npcItemCount` | 3 to 6 | Items found on a frisk |
| `Config.illegalItems` | list | Items that count as contraband |
| `Config.recurringCharacters.spawnChance` | `25` | Percent chance a stop is a known character |

## Credits

Written by DaemonAlex (DPS Development) for Del Perro Sands, inspired by FivePD-style pedestrian stops. Built on Qbox and the Overextended stack. The README allows free use and modification for your own server; redistribution or resale needs the author's permission.
