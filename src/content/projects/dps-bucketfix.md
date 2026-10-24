---
title: DPS Bucket Fix
tagline: A tiny watchdog that rescues players stranded in an empty routing bucket after spawn selection
category: fivem
area: admin
status: live
repo: https://github.com/DaemonAlex/dps-bucketfix
stack: ["Lua"]
frameworks: ["Standalone"]
requires: []
tags: ["fix", "routing buckets", "wasabi_spawn", "server stability"]
order: 90
---

## Overview

Sometimes a player would load in to a ghost town: no other players around, and nobody able to see them. The cause was the spawn selector. wasabi_spawn moves players into routing bucket 1 while they choose where to spawn, and on some join paths it never moves them back to the shared world in bucket 0.

The spawn script is escrowed, so it cannot be patched. DPS Bucket Fix guarantees the right result from outside instead: anyone found in bucket 1 is moved back to bucket 0, and the correction is logged.

Being stuck in the wrong bucket had knock-on effects beyond loneliness. Qbox's entity lockdown only protects bucket 0, and the DPS train system skips players in any other bucket, so with everyone stranded no train ever spawned.

## Features

- Checks each player 5 seconds after they spawn and after their character loads.
- A safety sweep every 15 seconds catches anyone the first checks missed.
- Only bucket 1 is touched, so housing interiors and any deliberate instancing in other buckets are left alone.
- Every correction is printed to the server console with the player and the reason.
- No configuration and no dependencies.

## How it works

The resource listens for the player spawning and for the character finishing loading. A few seconds later it looks at the player's routing bucket and, if it is 1, sets it to 0. A background loop does the same check for every player every 15 seconds.

## Requirements

- None beyond a standard FiveM server. It was written for servers using wasabi_multichar and wasabi_spawn.

## Installation

1. Put the folder in your resources directory as `dps-bucketfix`.
2. Add `ensure dps-bucketfix` to `server.cfg`.

## Commands

| Command | Who | What it does |
| --- | --- | --- |
| `bucketcheck` | Server console | List every player and their current routing bucket |

## Credits

Written by DaemonAlex for Del Perro Sands.
