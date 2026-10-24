---
title: DPS AI NPCs
tagline: Street contacts you talk to in your own words, who remember you, sell intel and hand out jobs as trust grows
category: fivem
area: world
status: live
repo: https://github.com/DaemonAlex/dps-ainpcs
stack: ["Lua", "NUI (HTML/JS)", "oxmysql", "LLM (Ollama / OpenAI-compatible / Anthropic)"]
frameworks: ["Qbox"]
requires: ["ox_lib", "qbx_core", "ox_target", "ox_inventory", "oxmysql", "dps-badpeds"]
tags: ["NPC", "AI", "LLM", "dialogue", "intel", "quests", "trust", "factions", "criminal"]
featured: true
order: 25
---

## Overview

These NPCs answer whatever you type. Walk up to a contact, choose "Talk to" with ox_target, and say what you want in plain words; a language model writes the reply in that character's voice, and it shows as a speech bubble over their head.

Each NPC knows who it is, where it stands, what has happened in the city lately and what it thinks of you. Trust starts at zero. Talk to a contact, pay them, bring what they ask for or come back again and they open up: better rumours, paid intel, and jobs that only go to people they know. Gangs keep their own standing with you, and what you do on the street spreads as rumours the NPCs pick up.

The NPCs only exist while a player is nearby, can wander, patrol or keep a daily schedule, and some will call you over as you walk past.

## Features

- Free-text conversation with any configured NPC through ox_target; the opening line can also come from the model.
- Per-NPC trust from 0 to 100 in four tiers: Stranger, Acquaintance, Trusted, Inner Circle. Trust decays slowly when you stay away.
- Faction trust with gangs and groups, from enemy through neutral and friendly to ally and blood.
- NPCs react to your job, gang, cash, the items you carry and your recent actions. Police jobs make criminal contacts wary.
- Memory: after a talk the NPC stores a one-line summary and brings it up next time.
- Each NPC knows a short list of real places near it, recent city news, and one thing on its mind that day.
- Paid intel in tiers from rumours to exclusive, each with its own trust requirement, price range and cooldown.
- Jobs: "Ask About Work" offers quests you qualify for; `/myjobs` shows your active ones.
- Breadcrumb chains (ladders) where one NPC points you to the next.
- Movement patterns: stationary, wander, patrol or a time-of-day schedule.
- Bar crowds: extra talkable regulars that fill a bar around a set spot.
- Hailing: some NPCs call out when you walk past.
- Per-player rate limits and a request queue so a busy server cannot flood the model.
- Fallback lines when the model is unreachable, so an NPC never goes silent.
- Optional Discord logging of conversations, intel purchases, quest completions and errors.
- Optional phone notifications through npwd or lb-phone.
- A large set of server exports (trust, factions, rumours, mood, intel, co-op quests, interrogation, debts, referrals) for other resources to build on.

## How it works

1. A player walks up to an NPC and picks "Talk to <name>" from ox_target, then types a message.
2. The server builds a prompt from the NPC's character sheet, the facts unlocked at the player's trust tier, its memories of this player, nearby places, recent news, mood and what it can see about the player.
3. The request goes to the configured model. Replies come back as a head bubble through dps-chat, or an ox_lib notification if dps-chat is not running.
4. Paying the NPC, bringing items or finishing jobs raises trust and unlocks more. "Ask About Work" lists jobs for that NPC's role.
5. When the talk ends, the NPC writes itself a short memory of it for next time.

Each player has 5 request tokens that refill at 5 per minute, and at most 5 model requests run at once.

## Requirements

- `ox_lib`, `qbx_core`, `ox_target`, `ox_inventory`, `oxmysql`
- `dps-badpeds` (shared character pool and jail status)
- A language model endpoint, one of:
  - Ollama, running a local model. The shipped config uses a small 8B-class model; the Ollama timeout is 120 seconds, so smaller models suit slower hardware.
  - Any OpenAI-compatible chat-completions server.
  - Anthropic's API.
- Optional: `dps-chat` for head bubbles, `npwd` or `lb-phone` for phone notifications, Discord webhooks for logs.

## Installation

1. Put the folder in your resources directory as `dps-ainpcs`.
2. Copy `config.example.lua` to `config.lua`.
3. Create an empty `server/config_secrets.lua`. It is git-ignored but the manifest loads it.
4. Run `sql/install.sql` and then `sql/upgrade_v2.5.sql` on your database.
5. In `config.lua`, set `Config.AI.provider`, `apiUrl` and `model` to your own model server, and `apiKey` only if the provider needs one. `config.lua` is also loaded on the client, so do not leave a paid API key in it on a public server.
6. Start it after its dependencies: `ensure dps-badpeds`, optionally `ensure dps-chat`, then `ensure dps-ainpcs`.
7. Grant admin commands if needed, for example `add_ace group.admin command allow`.
8. Restart and run `/ainpc test` from the server console to check the model connection.

## Configuration

Everything lives in `config.lua`, with quests in `quests.lua` and world data in `data/`.

| Option | Default | What it does |
| --- | --- | --- |
| `Config.AI.provider` | `ollama` | `ollama`, `openai` or `anthropic` |
| `Config.AI.model` | an 8B Ollama model | Model name on your server |
| `Config.AI.maxTokens` | `320` | Longest reply |
| `Config.AI.temperature` | `0.9` | Higher is more varied |
| `Config.AI.globalBudget.enabled` | `false` | Server-wide token-per-minute limit |
| `Config.Trust.earnRates` | conversation 1, payment 5, item 10, repeat visit 2, referral 15 | How fast trust grows |
| `Config.Trust.decayRate` | `2` | Trust lost per real day away |
| `Config.Intel.prices` | 500 up to 200,000 by tier | Price ranges for intel |
| `Config.Memory.maxLines` | `5` | Memories added to the prompt |
| `Config.Movement.spawnDistance` | `120.0` | NPCs exist only within this range of a player |
| `Config.Interaction.maxConversationLength` | `15` | Most exchanges per talk |
| `Config.Interaction.paymentMethods` | cash only | Cash, bank and crypto can each be switched on |
| `Config.PlayerContext.suspiciousJobs` | police and other law jobs | Jobs that make NPCs wary |
| `Config.Logs.enabled` | `false` | Discord webhook logging |

New NPCs are added to `Config.NPCs` with a model, home position, movement pattern, role, personality, facts per trust tier, reactions and intel. `/createnpc` prints a starting template at your position.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `/myjobs` | All players | Show your active jobs |
| `/ainpc` | Admins or console | Help, plus `tokens`, `refill`, `refillall`, `queue`, `budget`, `provider`, `test` and `debug` |
| `/createnpc <id> [name] [role]` | Admins or console | Print a config template for a new NPC |
| `/npcgesture [tag]` | Debug | Play a gesture on the nearest AI NPC |

## Credits

Written by DaemonAlex for Del Perro Sands. The shared character pool comes from dps-badpeds. Earlier versions used text-to-speech voices; that feature has been retired and the NPCs are now text only. MIT licence.
