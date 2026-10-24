---
title: DPS Faceplant
tagline: The city's help desk on the phone and tablet, with tickets, reports, staff tools and bans shared with the website
category: fivem
area: admin
status: live
repo: https://github.com/DaemonAlex/dps-faceplant
website: https://delperrosands.com
stack: ["Lua", "ox_lib", "NUI (HTML/JS)"]
frameworks: ["Qbox"]
requires: ["ox_lib", "lb-phone", "lb-tablet"]
tags: ["phone app", "tablet app", "support tickets", "reports", "staff tools", "bans", "website"]
order: 30
---

## Overview

Faceplant is Del Perro Sands' app for help, reports and staff tools, on the lb-phone and the lb-tablet. It is the in-city side of the server's website: every ticket, reply, photo, duty shift and ban is the same record on the phone and on delperrosands.com.

Players open a ticket without leaving the city, attach photos from their phone gallery and follow staff replies. Staff clock in, work the queue and set a GPS waypoint to where a ticket was sent from. Bans made on the website keep banned players out of the city too.

It is a server and staff app, not the Faceplant social feed.

## Features

- Help tab: open a ticket to get help, report a player, report harassment, report a bug, ask for a refund or complain about staff.
- Up to four photos from the phone gallery per ticket or reply. The location and time are added for staff.
- My tickets: status, staff replies, and the option to reply or add more photos.
- News tab with city news from staff and where to read the rules.
- A player with an active ban is shown how to appeal on the website instead of the form.
- Staff tab, for staff only: clock in and out, with the shift shown on the website's staff board and ended automatically when they leave the city.
- The queue of open tickets each staff member may handle, decided by their rank on the website.
- Claim, reply, write a staff-only note, close with an outcome, and set GPS to the ticket's location.
- Refunds and appeals are decided on the website.
- Join check: a player banned on the website is refused at connect, with the reason and the appeal link.
- If the website does not answer within five seconds, the player is let in, so a website outage never locks the city.
- Every 60 seconds, players already in the city who have been banned on the website are removed.
- Bans made with the in-game admin menu are copied onto the player's website record by the website itself.
- Small test suite for the shared helpers.

## How it works

The phone page never talks to the website. It talks to the game server, and the game server talks to the website's API with a key that only the server holds. The website accepts that key only from the game server's own address.

For each player the website hands the server a short session, found or created by the player's Discord ID. The server then uses the website's normal routes, so ranks, limits and the audit log are exactly the website's. Players need Discord open when they start FiveM; that is how the city knows who they are.

Phone photos are downloaded by the website, checked for their real file type and kept privately with the ticket. Only the phone's photo host is accepted.

## Requirements

- `ox_lib`
- `lb-phone` (paid)
- `lb-tablet` (paid), optional: every tablet call is guarded
- The Del Perro Sands website's portal API, which this resource is built to talk to

## Installation

1. Put the folder in your resources.
2. Set the website key as a server-only convar in a secret config file that is never committed, and `exec` it from `server.cfg` before the resources start.
3. Add the Faceplant entry from the README to `Config.CustomApps` in lb-tablet's config.
4. Start it after ox_lib and lb-phone.
5. Do a full restart.

## Configuration

`config.lua` holds the app's name and identifier, the website's API address and public address, how often bans are synced (`Config.SyncSeconds`, 60), the join check timeout (`Config.JoinCheckTimeoutMs`, 5000) and the photo limit (`Config.MaxPhotos`, 4). The API key is never in the config file.

## Credits

Written by DaemonAlex for Del Perro Sands. Hosts on lb-phone and lb-tablet by LB Scripts, paid resources that are not included.
