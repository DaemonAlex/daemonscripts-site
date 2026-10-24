---
title: DPS Insurance
tagline: Connects m-Insurance to the MDT, impound, hospital bills and the medical chart so cover actually matters in the city
category: fivem
area: police-ems
status: live
repo: https://github.com/DaemonAlex/dps-insurance
stack: ["Lua", "ox_lib", "oxmysql"]
frameworks: ["Qbox"]
requires: ["ox_lib", "oxmysql", "qbx_core", "m-Insurance"]
tags: ["insurance", "fines", "MDT", "impound", "hospital", "integration"]
order: 50
---

## Overview

m-Insurance (a paid resource) lets players buy vehicle and health cover. On its own, nothing else in the city checks it. DPS Insurance is the glue that makes the rest of the server care: a car without insurance stays in the impound, an uninsured patient pays for their scan, and the patient chart shows whether someone is covered.

It also handles MDT fines. When an officer adds a charge to an incident, the fine leaves the citizen's bank and lands in that officer's department account, even if the citizen is offline at the time.

There are no menus of its own. Players buy and manage cover in m-Insurance as usual; this resource only answers "is this covered?" for everything else.

## Features

- Answers "is this car insured?" and "does this person have health cover?" by reading m-Insurance's tables, since its own exports are escrowed and undocumented.
- Also reports MOT, tax and registration expiry for a plate.
- Answers are cached for 30 seconds so busy scripts do not hammer the database.
- MDT fines: linking a charge in wasabi_mdt takes the fine from the citizen's bank and pays the officer's department.
- An officer's adjusted fine wins over the charge's base fine.
- Offline citizens pay at their next login.
- Unlinking a charge cancels an unpaid fine, or refunds a paid one when the citizen is online.
- Every fine is kept in its own table with its status (owed, paid, refunded, cancelled).
- Insured patients pay nothing for covered care; uninsured patients are charged to the hospital account.
- Plate matching uses the same rules as m-Insurance (upper case, no spaces, dashes or dots).
- Small test suite for the pure logic (plates, fine amounts, department lookup).

## How it works

Other resources ask DPS Insurance through exports. On Del Perro Sands each integration is one small edit in the other resource:

- jg-advancedgarages asks before releasing a car from impound and refuses when it is uninsured.
- The hospital's MRI scan charges the patient through `ChargeCareItem`, which does nothing for insured patients.
- dps-medical adds an "Insured" line to the patient chart.
- dps-parking detects this resource and uses it for its insurance checks.
- wasabi_mdt's charge events drive the fines automatically, with no edit needed.

## Requirements

- `ox_lib`, `oxmysql`, `qbx_core`
- `m-Insurance` (paid): its policy, MOT, tax and registration tables are read directly

Used when present, each for its own feature:

- `wasabi_mdt` (paid) for fines
- `wasabi_banking` (paid), through the Renewed-Banking export names, for department and hospital accounts
- `jg-advancedgarages` (paid) for the impound check
- `wasabi_ambulance` (paid) and hospital hooks for care charges
- `dps-medical` and `dps-parking`

## Installation

1. Install and configure m-Insurance first, following its own README.
2. Put `dps-insurance` in your resources so it starts after m-Insurance.
3. Add an insurance job to `qbx_core/shared/jobs.lua`.
4. Add an `insurance` society account in your banking resource.
5. Add m-Insurance's items to `ox_inventory/data/items.lua`.
6. Add MDT penal codes for driving without insurance, MOT, tax or registration, with their fines.
7. Make the optional integration edits in the other resources you run.
8. Restart the server. The fines table is created on first start.

## Configuration

Everything lives in `config.lua`.

| Option | Default | What it does |
| --- | --- | --- |
| `Config.CacheSeconds` | `30` | How long a coverage answer is reused |
| `Config.Fines.enabled` | `true` | Turns MDT fines on or off |
| `Config.Fines.account` | `bank` | Which money the fine comes from |
| `Config.Fines.fallbackSociety` | `police` | Account used when the officer's job cannot be read |
| `Config.Care.society` | `omc` | Hospital account for uninsured care |
| `Config.Care.mriScan` | `250` | Price of an MRI for uninsured patients (a placeholder) |

## Credits

Written by DaemonAlex for Del Perro Sands. m-Insurance is a paid resource by m-scripts and is not included; this resource only reads its data.
