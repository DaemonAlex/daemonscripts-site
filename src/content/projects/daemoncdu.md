---
title: DaemonCDU
tagline: Your airliner's flight computer keypad on an iPad, live from Microsoft Flight Simulator 2024
category: tool
status: beta
repo: https://github.com/DaemonAlex/DaemonCDU
stack: ["C#", ".NET (ASP.NET Core)", "SimConnect", "Vue 3", "TypeScript", "Vite"]
frameworks: []
requires: ["Microsoft Flight Simulator 2024", ".NET SDK", "Node.js"]
tags: ["flight simulator", "MSFS 2024", "PMDG", "FlyByWire", "CDU", "MCDU", "iPad", "WebSocket"]
order: 20
---

## Overview

In a PMDG 737 or 777, much of the flight is spent typing into the CDU, the small screen and keypad between the pilots. Doing that with a mouse on a tiny 3D panel is slow. DaemonCDU puts a full, working CDU on a tablet, phone or second screen next to you.

A small bridge program runs on the same PC as the simulator. It reads the CDU screen from the aircraft and serves a web page on your home network. Open the address it prints on your iPad and you get the live 24 by 14 character display and a real keypad: press a key on the tablet and it is pressed in the aircraft. No app to install, no cloud service and no account.

It also works with the FlyByWire A320neo and A380X, whose MCDU data comes through FlyByWire's SimBridge.

## Features

- Live 24 by 14 CDU and MCDU display with the aircraft's colours, in the B612 Mono aviation font.
- Boeing CDU keypad for the 737 and 777, and Airbus MCDU keypad for the A320 and A380.
- Switch between aircraft types with one tap.
- Choose the left, right or (on the 777) centre CDU.
- Haptic feedback on touch, on devices that support it.
- Works in any modern browser: iPad, iPhone, Android or a second monitor.
- Several devices can connect at once.
- Updates are pushed when the screen changes, not polled.
- Demo mode cycles through sample CDU pages when no bridge is found, for trying the UI without the simulator.
- Runs entirely on your local network; no internet needed after setup.

Supported aircraft:

| Aircraft | Data source | CDUs | Status |
| --- | --- | --- | --- |
| PMDG 737 NG3 | SimConnect | Left, right | Ready |
| PMDG 777 | SimConnect | Left, right, centre | Ready |
| FlyByWire A320neo | SimBridge | Left, right | Ready |
| FlyByWire A380X | SimBridge | Left, right | Ready |
| iniBuilds A310 / A320 | Waiting on SDK | | Planned |

## How it works

The bridge is a .NET program that connects to MSFS through SimConnect for PMDG aircraft and to SimBridge for FlyByWire aircraft. It serves the web interface and a WebSocket on the same port (8420), which avoids browser mixed-content blocks. Screen updates go to the browser as the full character grid; key presses come back as the key name and which CDU it belongs to.

## Requirements

What you need on your PC:

- Windows with Microsoft Flight Simulator 2024 and at least one supported aircraft.
- For PMDG aircraft: the MSFS 2024 SDK, for its SimConnect DLL.
- For FlyByWire aircraft: FlyByWire SimBridge running alongside the simulator.
- The .NET SDK to build and run the bridge. The project targets .NET 10; the README asks for .NET 8 or later.
- Node.js and npm to build the web interface.
- A tablet, phone or other screen on the same network as the PC.

## Installation

There is no installer yet; you build it from source.

1. PMDG only: turn on CDU broadcasting in the aircraft's options file (`737_Options.ini` or `777_Options.ini` in the PMDG package's `work` folder) by adding an `[SDK]` section with `EnableDataBroadcast=1` and one `EnableCDUBroadcast.N=1` line per CDU. Leave a blank line after the last entry, or PMDG may drop the edit.
2. PMDG only: copy `Microsoft.FlightSimulator.SimConnect.dll` from the MSFS 2024 SDK into `bridge/lib/SimConnect/`.
3. FlyByWire only: install and start SimBridge. DaemonCDU finds it on the same PC automatically.
4. Build the web interface: in `web`, run `npm install` and `npm run build`. The output goes into the bridge's `wwwroot` folder.
5. Build and start the bridge: in `bridge/src`, run `dotnet run`.
6. Open the address the bridge prints on your tablet.
7. If the tablet cannot connect, allow TCP port 8420 through Windows Firewall.

## Credits

Written by DaemonAlex. Uses SimConnect from the Microsoft Flight Simulator SDK, the PMDG SDK data broadcast, FlyByWire SimBridge, and the B612 Mono font. MIT licence.
