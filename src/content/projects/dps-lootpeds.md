---
title: DPS LootPeds
tagline: Search dead NPCs for what they would really carry, with bodies left in place and marked as searched for everyone
category: fivem
area: player
status: live
repo: https://github.com/DaemonAlex/dps-lootpeds
stack: ["Lua", "ox_lib"]
frameworks: ["Qbox", "QBCore", "ESX"]
requires: ["ox_lib", "ox_target"]
tags: ["looting", "NPC", "loot tables", "state bags", "wallet"]
credits: "Rewrite of mh-lootpeds by MaDHouSe"
order: 60
---

## Overview

LootPeds lets players search the bodies of dead NPCs. What they find depends on who the NPC was: a cop carries a radio and handcuffs, a gang member might have drugs and a pistol, a paramedic has bandages, a tourist has sunscreen and a phone.

Most of what turns up is pocket junk, like receipts, gum, keys and coins, with useful things less often and something valuable only rarely. Cash mostly lives inside a wallet item: open the wallet to find out what is in it.

Once a body has been searched, every player sees it marked "[SEARCHED]" and nobody can loot it twice. The body stays where it fell instead of vanishing.

## Features

- Searched status is synced to every player with entity state bags, so bodies do not need deleting.
- A "[SEARCHED]" marker above looted bodies.
- Bodies are kept by default; deleting them is a config option.
- Loot tables by NPC type, matched on the ped model name: police, gang, medical, worker, beach, tourist, business, clubber, young, fitness, elderly, country, staff, street, homeless, inmate, military and a default for everyone else.
- Shared pocket junk mixed into most civilian tables.
- A wallet item, used through ox_inventory, that rolls cash (with the odd fat wallet) and extras such as cards, receipts and coupons.
- A short kneeling search animation that can be cancelled.
- Optional requirements: a needed item (consumed or not), job restrictions and a blacklist of ped models.
- Optional police alerts when someone loots a body, with a minimum number of officers online and a chance per loot. wasabi_mdt is preferred, qs-dispatch is also supported.
- Optional fingerprints left on the body through ps-evidence.
- Framework bridge for Qbox, QBCore and ESX; inventory bridge for ox_inventory, qs-inventory, qb-inventory and codem-inventory.
- Declares `provides 'mh-lootpeds'`, so it drops in where the original was installed.

## How it works

1. A player walks up to a dead NPC and uses the target option.
2. They kneel and search for a few seconds.
3. The server rolls the loot for that NPC's type and gives the items and any cash.
4. The body is marked as searched for everyone and cannot be looted again.

## Requirements

- `ox_lib`
- `ox_target`
- One of the supported frameworks and inventories
- Optional: `wasabi_mdt` or `qs-dispatch` for police alerts, `ps-evidence` for fingerprints

## Installation

1. Put the folder in your resources.
2. Configure `shared/config.lua`.
3. Add to `server.cfg`, after `ox_lib` and `ox_target`: `ensure dps-lootpeds`.
4. If you are replacing mh-lootpeds, remove it first.

## Configuration

Everything lives in `shared/config.lua`.

| Option | Default | What it does |
| --- | --- | --- |
| `Config.EnableOnStart` | `true` | Looting is on when the server starts |
| `Config.InteractionDistance` | `2.5` | How close a player must be to a body |
| `Config.DeletePedsWhenLooted` | `false` | Delete bodies after looting instead of keeping them |
| `Config.UseStateBags` | `true` | Sync searched status to all players |
| `Config.UseAllPeds` | `true` | Any dead NPC can be looted, not just listed models |
| `Config.AdminOnly` | `false` | Restricts the toggle command to admins |
| `Config.Wallet` | $10 to $140 | Wallet cash, the fat wallet chance and extras |
| `Config.PedCategories` | 18 categories | Model patterns, cash and loot chances per NPC type |
| `Config.Cash.Dirty` | `false` | Pay in dirty money instead of cash |
| `Config.PoliceIntegration.enabled` | `false` | Police alerts on looting |
| `Config.Evidence.enabled` | `false` | Leave fingerprints on the body |
| `Config.Restrictions` | all off | Required item, job restriction and ped blacklist |

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/lootpeds on` | Everyone, or admins if `Config.AdminOnly` | Turn looting on for the server |
| `/lootpeds off` | Everyone, or admins if `Config.AdminOnly` | Turn looting off for the server |

## Credits

A rewrite of [mh-lootpeds](https://github.com/MaDHouSe79/mh-lootpeds) by MaDHouSe. Version 2 was a fork adding Qbox and qs-inventory support; version 3 rewrote it with state bags, loot tables by NPC type and the framework and inventory bridges. Rewrite by DaemonAlex (DPS Development). GPL-3.0 licence.
