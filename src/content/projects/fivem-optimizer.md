---
title: FiveM Optimizer
tagline: Shrinks oversized texture dictionaries and shows the real in-game memory cost of every stream file
category: tool
status: live
repo: https://github.com/DaemonAlex/fivem-optimizer
stack: ["Python", "Electron", "React", "Vite"]
frameworks: []
requires: ["Python 3.10+", "ImageMagick or texconv"]
tags: ["textures", "ytd", "memory", "streaming", "optimization", "audio", "CLI", "desktop app"]
order: 10
---

## Overview

FiveM servers fill up with car and map packs whose textures are far bigger than anyone will ever see. The trouble is that file size on disk tells you nothing: a 9.9 MB `.ytd` can take 86 MiB of memory once the game unpacks it, because the game allocates whatever the file's header asks for. That header number is what FXServer prints at boot ("Asset ... uses 86.0 MiB of physical memory"), and it is the number this tool reports and reduces.

FiveM Optimizer reads that real cost, finds textures larger than you need, and rewrites them smaller with the same compression, keeping a backup of every original. It comes in two forms: `ytdshrink`, a command-line tool for the server, and a Windows desktop app for scanning a folder on your PC. Both use the same Python engine.

A second command-line tool, `audiomerge`, fixes addon vehicle sounds that go silent once a server passes FiveM's limit of roughly 190 audio banks.

## Features

- Reports the true in-game memory of each `.ytd`, read from its RSC7 header, not its size on disk.
- Shrinks textures over a target size (1024 px by default) by dropping their top mip levels, which is exact and keeps the original compression.
- Textures that shipped without a mip chain are resampled into a full one with ImageMagick (Linux and macOS) or texconv (Windows).
- 32-bit uncompressed textures are re-encoded as DXT5 or DXT1 with mips: a 4096-square uncompressed sign drops from 64 MiB to about 1.3 MiB.
- Dry run by default: nothing is written until you add `--apply`, and applying requires a backup folder.
- Every rewritten file is read back to verify it, and a log lists each texture changed or kept, with the reason.
- Never upscales, never resizes `script_rt` or emissive and glow textures, and reports escrow-encrypted files as unreadable instead of guessing.
- `audiomerge` folds a whole audio resource into one registration per data type, merging its `.rel` files and copying its `.awc` banks, with a report of duplicates and conflicts.
- Desktop app: scans a folder, flags files over a memory threshold (32 MiB by default), and optimizes selected `.ytd` files with before and after figures.
- The app also checks models, collisions and maps (`.yft`, `.ydr`, `.ybn`, `.ymap`, `.ytyp`), shows duplicates and a dependency map, and exports results.

## How it works

1. Point `ytdshrink` at a stream folder. It prints a table of every texture dictionary: texture count, largest size, memory now and memory after.
2. If the numbers look right, run it again with `--apply --backup <folder>`. Originals are copied to the backup first, keeping their relative paths.
3. Restart the server and read the boot log: each file's "uses N MiB" line shows the new figure.
4. To undo, copy a file back from the backup folder and restart.

On Windows, the desktop app does the same through a folder picker, a results dashboard and a Textures tab.

## Requirements

Server tool (`ytdshrink` and `audiomerge`):

- Linux (the README gives Debian and Ubuntu steps)
- Python 3.10 or newer; the engine uses only the standard library
- ImageMagick, for textures that have no mip chain (without it those textures are left as they are)

Desktop app:

- Windows. The installer bundles Python and texconv.

## Installation

Server tool on Debian or Ubuntu:

1. `sudo apt install python3 imagemagick`
2. Clone the repository and copy its `python` folder somewhere on the server.
3. Check that ImageMagick is visible with `magick -version`.
4. Run `python3 ytdshrink.py "<stream folder>"` from that folder for a dry run.

Desktop app: download the installer from the repository's Releases page and run it.

## Configuration

`ytdshrink` options:

| Flag | What it does |
| --- | --- |
| `--max N` | Longest side allowed in pixels (default 1024) |
| `--only a,b` | Only files whose name contains one of these fragments |
| `--apply` | Write changes (needs `--backup`) |
| `--backup DIR` | Where originals and the log go |
| `--keep-emissive` | Also shrink emissive and glow textures |
| `--keep-uncompressed` | Leave 32-bit uncompressed textures as they are |
| `--json` | Machine-readable output |

`audiomerge` takes a resource folder, `--out` for a new output folder (which must not exist yet) and `--name` for the merged pack. The source is never modified.

In the desktop app, the memory threshold for a critical warning is set on the Settings page.

## Credits

Built by DaemonAlex for Del Perro Sands. RSC7 page maths, texture dictionary layout and the `.rel` container layout follow CodeWalker by dexyfex. Resampling uses ImageMagick, or texconv from Microsoft DirectXTex on Windows. The audio bank limit and the merged-pack workaround come from the FiveM community (citizenfx/fivem issue 2515 and the Cfx.re forum). The model, collision and map analyzers in the app still use heuristics, so treat their numbers as rough hints. MIT licence.
