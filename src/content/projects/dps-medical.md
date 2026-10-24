---
title: DPS Medical
tagline: Illness, diagnostic tests and a patient chart that sit on top of wasabi_ambulance without touching its trauma system
category: fivem
area: police-ems
status: beta
repo: https://github.com/DaemonAlex/dps-medical
stack: ["Lua", "ox_lib", "oxmysql", "HTML/JS (tablet app)"]
frameworks: ["Qbox"]
requires: ["ox_lib", "oxmysql", "qbx_core", "wasabi_ambulance_v2", "ox_inventory", "lb-tablet (optional)"]
tags: ["EMS", "medical", "illness", "diagnosis", "patient records", "hospital", "lb-tablet"]
order: 20
---

## Overview

DPS Medical gives the city's doctors something to diagnose. Players can catch the flu, a respiratory virus or food poisoning, pick up a wound infection from a gunshot left untreated, or walk away from a fight with a concussion. A patient only feels symptoms, never a name, and symptoms overlap on purpose. It takes a medic, a test and often a trip to the hospital to work out what is actually wrong.

It is a companion to wasabi_ambulance_v2 (a paid resource) and follows one rule: trauma belongs to wasabi. Wasabi models limbs, injury types, bleeding and knockouts, and applies every consequence itself. DPS Medical listens to the events wasabi already broadcasts and applies no trauma effects of its own, so it can never disagree with what the player is feeling. Illness, contagion, tests, treatment, immunity and the permanent patient chart are what this resource adds.

Every visit, test, diagnosis and treatment is written to a chart keyed on the character, which medics read in a "DPS Medical" app on lb-tablet or inside wasabi's own patient inspection screen.

This is version 0.1.0 and still in beta. The README lists what is open: item images are not shipped yet, the hospital station path has not been exercised in game because the hospitals were still being built, and there is no test suite. Where the patient's own view will live long term (phone app or hotkey) is undecided; `/health` is the interim.

## Features

- Seven conditions ship in the config: influenza, a respiratory virus, food poisoning, wound infection, concussion, internal bleeding and soft tissue injury.
- Each condition has an incubation period, symptoms, severity that climbs while untreated, a treatment item and optional immunity after recovery.
- At maximum severity a condition no longer clears on its own: someone has to treat it.
- Airborne contagion between players standing close together, checked on a slow timer over the short list of contagious players only.
- Untreated trauma can turn into illness: an open gunshot, cut or burn left too long can become infected, and head trauma can cause a concussion.
- Seven diagnostic tests. A thermometer, pulse oximeter and penlight work in the field; blood tests, X-ray, CT and MRI only work at the matching hospital equipment.
- A test returns a finding ("Temperature 39.1°C"), never the answer. The medic interprets it.
- Conditions that need confirming cannot be diagnosed, and medication does nothing (and is not used up), until the confirming test has been run.
- Hospital equipment is registered as stations: beds, blood lab chairs, X-ray, CT and MRI tables, each tied to a wasabi facility. No MRI on the map means no soft tissue diagnoses.
- Wasabi's own facility beds count as stations too, so both systems agree bed for bed.
- Medics can transfer a conscious patient onto a free bed or table.
- When no medic is on duty, a symptomatic patient lying on a bed can ask the desk for treatment: they are charged by severity and their conditions clear after time spent on the bed.
- Junior staff get a hint on every refused action explaining what to do instead.
- A `/health` menu lets any player check their injured limbs, bleeding, symptoms and any recorded diagnosis.

## How it works

1. A player catches something: from another player nearby, from an untreated wound, or from an admin command. They start to feel symptoms after the incubation period.
2. A medic inspects them in wasabi's inspection screen. The chart opens alongside it.
3. The medic runs tests from the `/diagnostics` menu. Field tests work anywhere; hospital tests need the patient lying or sitting on the right station with the medic beside it.
4. Each test adds a finding to the chart. A confirming result marks the condition as confirmed.
5. The medic records the diagnosis with `/diagnose`. From then on the patient sees the condition's name.
6. The medic gives the right medication with `/administer`, or the patient takes their own. Concussion and the other injury conditions need rest instead.
7. On recovery the patient may be immune to that condition for a while.

Admins set up hospital equipment in game: stand where the patient should lie, look at the prop and run `/stationcapture <kind>`. The resource writes a ready-to-paste config block, and after a restart the prop offers "Lie down", "Sit for a sample", "Get up" and "Release patient".

## Requirements

- `ox_lib`
- `oxmysql`
- `qbx_core`
- `wasabi_ambulance_v2` (paid): the source of all trauma data and the inspection screen
- `ox_inventory` for the treatment and test items
- Optional: `lb-tablet` (paid) to host the chart as a tablet app; everything also works from commands without it

## Installation

1. Put the folder in your resources, anywhere after `qbx_core`.
2. Import `install/install.sql` into your database. The resource does not create its tables itself.
3. Merge `install/items.lua` into `ox_inventory/data/items.lua`.
4. List your medical jobs in `Config.MedicalJobs` and in wasabi_ambulance's `ambulanceJobs`. The two lists must match.
5. Optional: add the two snippets in `install/lb-tablet-config.lua` to lb-tablet to register the "DPS Medical" app.
6. Build at least one hospital facility in wasabi, then run `/reloadfacilities`.
7. Inside that facility, capture each bed and piece of equipment with `/stationcapture`, paste the blocks into `Config.Stations` and restart.
8. Restart the server.

## Configuration

Everything lives in `config.lua`.

| Option | Default | What it does |
| --- | --- | --- |
| `Config.MedicalJobs` | `sams`, `omc`, `rmc` | Jobs that can run tests and diagnose |
| `Config.RecordReadJobs` | same | Jobs that can read a chart |
| `Config.TickSeconds` | `60` | How often the illness engine advances every case |
| `Config.ContagionSeconds` | `90` | How often contagion is checked |
| `Config.ContagionDistance` | `4.0` | Airborne range in metres |
| `Config.ContagionBaseChance` | `0.12` | Chance per check, before the condition's modifier |
| `Config.SeverityStepMinutes` | `30` | Minutes per severity step while untreated |
| `Config.AdministerDistance` | `3.0` | Reach for `/administer` |
| `Config.Npc` | 10 min and $250 per severity | The no-staff desk's time and price |
| `Config.HintsBelowGrade` | `3` | Staff below this grade get hints |
| `Config.Tests`, `Config.Conditions` | 7 each | Tests, conditions, symptoms, treatments and trauma hooks |
| `Config.Stations` | empty | The station registry, filled from `/stationcapture` |

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/health` | Everyone | Show your injuries, symptoms and any diagnosis |
| `/diagnostics` | Medical staff | Test menu for the patient you are inspecting |
| `/runtest <id> <test>` | Medical staff | Run a test by command |
| `/diagnose <id> <condition>` | Medical staff | Record a diagnosis (needs the confirming test first) |
| `/administer <id> <item>` | Medical staff | Give a patient medication from your inventory |
| `/givecondition <id> <condition>` | Admin | Infect a player |
| `/curecondition <id> <condition>` | Admin | Resolve a condition as treated |
| `/reloadfacilities` | Admin | Re-read hospital points from wasabi |
| `/stationcapture <kind>` | Admin | Capture the prop you are looking at as a station |

## Credits

Written by DaemonAlex for Del Perro Sands. Integrates with wasabi_ambulance_v2 by Wasabi Scripts and lb-tablet by LB Scripts, both paid resources that are not included.
