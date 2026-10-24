---
title: DPS Fleet
tagline: One panel to find, spawn and outfit any vehicle on the server, with a full workshop and trunk gear for emergency crews
category: fivem
area: vehicles
status: live
repo: https://github.com/DaemonAlex/dps-fleet
stack: ["Lua", "ox_lib", "NUI (HTML/JS)", "MySQL"]
frameworks: ["Qbox"]
requires: ["ox_lib", "qbx_core", "oxmysql", "ox_target"]
tags: ["vehicle browser", "workshop", "liveries", "sirens", "emergency vehicles", "presets", "trunk gear", "NUI"]
credits: "Trunk gear is a fork of Vehiclegear by Lapertaja (CC BY-NC-SA 4.0). Siren tones play through Luxart Vehicle Control by Lt.Caine and TrevorBarns (GPL-3)."
featured: true
order: 15
---

## Overview

DPS Fleet puts the vehicle browser and the vehicle workshop on one panel. Press `F7` (or type `/fleet`) to search every vehicle on the server by group, department, kind, price, brand or free text, then spawn it, swap it for the car you are in, or park it beside you. On the same panel, the Workshop changes liveries, extras, performance, colours, wheels, tint, neon, doors, windows, seats and sirens, saves presets and runs repairs.

Emergency vehicles also carry trunk gear: vests, helmets, turnout coats and medical bags that the right department can take out through `ox_target`.

Fleet is the merge of two older DPS resources: dps-carmenu (the browser) and dps-EVM (the Emergency Vehicle Menu, the workshop). The repository was previously named dps-EVM, so if you ran either one, this is where it lives now. Existing database tables carry over unchanged and the old `/carmenu` and `/evm` commands still work.

## Features

### Browse

- Plain-word search, or `key:value` tokens such as `cat:sports`, `dept:police`, `type:suv`, `brand:vapid`, `price>50000`, `speed<200` and `sort:price-desc`.
- Shortcut words like `cops`, `swat`, `ambulance`, `bikes` and `heli` expand to the right filters.
- Vehicles grouped the way people think about them: Street, Bikes, Racing, Emergency, Work, Air, Sea and Other.
- The Emergency group is sorted by department (LSPD, BCSO, SAHP, FIB, DOC, LSFD, SAMS and more) and then by kind (cruiser, unmarked, fire engine, ambulance, helicopter and so on).
- Vehicle photos when jg-vehiclestudio is installed; everything else works without it.
- Spawn fresh, replace the car you are sitting in, or spawn beside you.
- Copy card: a plain-text vehicle card with model, price, class, handling summary and current workshop state, ready to paste into a ticket.
- Favourites and your last 15 spawns lead an empty search.

### Workshop

| Section | What it does |
| --- | --- |
| Liveries | Every livery the model defines |
| Custom liveries | Custom YFT liveries listed in the config |
| Extras | Toggle lightbars, pushbars, spotlights and every other extra |
| Performance | Engine, brakes, transmission, suspension, armour, turbo |
| Colours | Primary and secondary paint from the full GTA V colour list |
| Wheels | Wheel type and index |
| Window tint | The stock tint levels |
| Neon | Colour and on/off, with an undercover allow-list |
| Doors, windows, seats | Open doors, roll or smash windows, eject a seat |
| Presets | Save and load personal or job-wide setups |
| Sirens | Choose which tones Luxart Vehicle Control cycles on this model |
| Repair | Emergency, full or field repair, with pricing |

- Livery memory: the livery and extras you last set on a model come back automatically next time.
- Sirens: every installed LVC tone, ready-made sets (LEO/Whelen, Fire, EMS and others) or a hand-built list of 2 to 8 tones.
- Repairs priced on the server, with job discounts and free repairs for mechanics. Field repair needs a repair item and has a cooldown.

### Trunk gear

- Emergency vehicles listed in `data/emergency.json` carry their department's kit automatically.
- Kits include bulletproof vest, heavy vest, reflective vest, helmet, turnout coat, fire helmet and medical bag.
- By default a job can only take its own department's kit: police cannot pull turnout gear from a fire engine.
- Optional checks that the vehicle is unlocked and that item-backed gear is really in the trunk.

### Built to stay light

- No running loops. One startup task loads data, creates the database tables and grants aces, then ends.
- The README reports 0.00 ms with the panel closed and at most 0.10 ms open, measured with `resmon`.

## How it works

1. A staff member with the `dps.fleet` ace presses `F7` or types `/fleet` to open Browse.
2. They search, pick a vehicle and spawn it, replace their current car or spawn it alongside.
3. Workshop opens on the vehicle they are in, through `/evm`, or through the `ox_target` Workshop option on any vehicle.
4. Workshop access is by job: by default every Qbox job of type `leo` or `ems`, plus mechanics. Admins with the `command` ace can open it on any vehicle.
5. Emergency crews walk to the trunk of their vehicle and use `ox_target` to take or stow gear.

## Requirements

- `ox_lib`
- `qbx_core`
- `oxmysql`
- `ox_target`
- Optional: `wasabi_carlock` (hands over keys on spawn)
- Optional: `jg-vehiclestudio` (photos in Browse)
- Optional: Luxart Vehicle Control, for the Sirens section

## Installation

1. Copy the `dps-fleet` folder into your resources.
2. Add `ensure dps-fleet` to `server.cfg`, after `ox_lib`, `qbx_core`, `oxmysql` and `ox_target`.
3. Grant the Browse ace. With `Config.AutoAces = true` (the default) the server grants `dps.fleet` to `group.admin` and `group.tester` at start. To manage it yourself, add lines such as `add_ace group.admin dps.fleet allow`.
4. That is it. On first start Fleet creates its own five database tables, and `Config.AutoJobs` works out Workshop access from your job list.

Coming from dps-EVM or dps-carmenu: remove their `ensure` lines, add `ensure dps-fleet`, and keep the old folders aside. Full steps are in `docs/UPGRADING.md`.

## Configuration

Everything lives in `config.lua`. The README documents every key; the main groups are:

| Group | What it controls |
| --- | --- |
| `EnableJobRestrictions`, `AutoJobs`, `ExtraWorkshopJobs` | Who can use the Workshop |
| `AutoAces` | Automatic grant of the `dps.fleet` ace |
| `EnabledModifications` | Switch individual Workshop sections on or off |
| `UndercoverNeon` | Allow neon on chosen vehicles while neon is otherwise off |
| `RepairCosts` | Repair prices (500 full, 200 emergency, 350 field by default), payment account, free and discounted jobs |
| `FieldRepair` | Required item, allowed jobs, engine cap, cooldown, duration |
| `Presets` | Personal and job preset limits and the grade needed for job presets |
| `AutoApplyLivery` | Livery memory on spawn or on enter |
| `CustomLiveries` | Custom YFT liveries per spawn code |
| `TrunkGear` | Department kits, which jobs may take them, cross-department rules |

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `F7` / `/fleet` | Players with the `dps.fleet` ace | Open Browse |
| `/carmenu` | Players with the `dps.fleet` ace | Open Browse (old alias) |
| `/evm` | Workshop jobs and admins | Open the Workshop on your current vehicle (old alias) |

## Credits

- Written by DaemonAlex for Del Perro Sands, merging his earlier dps-EVM and dps-carmenu.
- Trunk gear is DaemonAlex's fork of Vehiclegear by Lapertaja, licensed CC BY-NC-SA 4.0. The original licence text ships in `docs/licenses/vehiclegear.txt`.
- Siren sounds come from Luxart Vehicle Control by Lt.Caine and TrevorBarns (GPL-3). Fleet copies no LVC code; a small, credited hook in LVC reads the tone list Fleet assigns.
- Vehicle photos come from JG Vehicle Studio when installed.
- MIT licence. Third-party pieces keep their own licences.
