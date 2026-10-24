---
title: AV App
tagline: A self-hosted AV operations platform that runs inside one organization's network, with no internet exposure
category: platform
status: beta
stack: ["Vue 3", "TypeScript", "Vite", "Node.js 20", "Express", "PostgreSQL 16", "nginx", "Docker"]
requires: ["Ubuntu Server 24.04", "Docker Engine", "Docker Compose v2"]
tags: ["audio-visual", "meeting rooms", "intranet", "self-hosted", "on-premises", "vendor portal", "field operations", "room monitoring"]
order: 2
---

## Overview

AV App is the web application an organization's AV team uses to run its meeting rooms, devices, vendors, field work and projects. It is built for the intranet: it runs on one small Linux server inside the organization's network, and people reach it in a browser over the internal network or the organization's VPN. It is not meant to be reachable from the internet, and with its default settings the server opens no connection to anything outside itself.

AV App is a separate product from [APEX](/projects/apex/), not a module of it. The two share a design and a technical foundation: the same company portal and vendor portal layout, the same way of keeping records apart in the database, and the same sign-in model. Where APEX is a hosted service that serves many companies and their integrators, AV App is packaged for a single organization's own server, installed and run by that organization's IT staff, with every outside connection switched off until an administrator turns it on.

It is aimed at the people who have to approve software on a corporate network as much as the AV team who uses it. The documentation lists every port, every outbound connection the code can open and every setting, so a security or infrastructure reviewer can check the install against the code.

## Features

- Rooms organised by location, with their equipment, documents and recurring room checks.
- Pre-flight room checks, with a daily digest by email.
- Plain-language room insights, worded from fixed templates.
- Projects with tasks, notes, site visits and time entries.
- Project templates, project modules and an approval queue in the company portal.
- Field work: visits and on-site jobs.
- Discussion threads on projects, rooms, equipment and visits, with attachments, seen by staff and vendors alike.
- Vendor records and assignments, with access to each project turned on or off per vendor and given a level.
- A vendor portal where invited partners see only the work shared with them: their visits, tasks, licences, certificates and insurance documents, devices they are staging, and approval steps they are waiting on.
- Platform licence tracking for the organization.
- Cisco Control Hub device data and device commands, and Logitech Sync room and device status, each off until configured.
- Invitations by email link for staff and vendors, and per-person notifications.
- Local accounts with password rules, tiered lockout and optional one-time codes, which an organization can require for owners and admins.

## How it works

### Who uses it

| Person | What they do |
| --- | --- |
| Administrators | Create accounts, set roles, configure integrations and email |
| AV staff | Track rooms, devices, field visits, projects and tasks |
| Vendor partners | Sign in through an invitation and see only the work shared with them |

### Architecture

AV App runs as three containers started by Docker Compose on one server:

- **web:** nginx serves the HTML pages and the browser bundle, adds the security headers and passes API requests on. It is the only container that publishes a port.
- **backend:** the API, Node.js 20 on Express, run as a cluster of worker processes. Work that must happen once per server (device sync, the insights sweep, pre-flight checks and the email outbox) runs on the cluster primary.
- **db:** PostgreSQL 16, reachable only from the backend inside the compose network.

HTTPS ends on the organization's own reverse proxy or load balancer in front of the server, using a certificate from the organization's internal certificate authority.

**Frontend.** Vue 3 with TypeScript, built by Vite into one bundle. Light HTML shells for sign-in, the company portal, the vendor portal and the profile screen each mount their own Vue app from it, so vendors never load the internal interface.

**Records kept apart by the database.** Each organization is a row in the database, and PostgreSQL row-level security filters every table that holds its data. For each request the API opens a transaction, sets the organization on it and runs every query inside it, then commits or rolls back. The application's database role cannot bypass those policies, so a query that forgets its filter returns nothing instead of another organization's rows.

**Sign-in.** A short-lived RS256-signed access token and a rotating refresh token live in HTTP-only, Secure, SameSite=Strict cookies; the page keeps no token in browser storage. Refresh tokens are stored hashed, and a reused old one revokes every session for that account. State-changing requests carry a CSRF token. Changing or resetting a password ends the account's other sessions.

**Add-ons.** A single hooks module is where optional behaviour joins the core. In a plain install every hook is empty: no bot check, no language model, no extra routes.

**Data and backups.** The database, uploaded files, and the keys and settings live in three places on the host. AV App runs no backup job of its own; the organization protects the server with system-level snapshots, and the operations guide lists exactly what to capture.

## Requirements

- One server, physical or virtual, inside the organization's network: Ubuntu Server 24.04 LTS, 2 vCPU, 4 GB RAM, 40 GB disk
- Docker Engine and the Docker Compose v2 plugin
- A reverse proxy or load balancer that terminates TLS
- Optional: an SMTP relay for invitations and password reset emails
- Current Google Chrome or Microsoft Edge for users

Running AV App needs no internet access. Images can be built on another machine and copied over.

## Installation

1. Generate the signing keys with the included script.
2. Copy the example settings file and fill in every placeholder value.
3. Run the install script. It loads the images, starts the containers, sets up the database and creates the first administrator, and refuses to start until every setting and key is in place.

The full procedure, with checks after each step, is in the repository's install guide. The repository is private.

## Configuration

Every setting lives in one settings file with comments: the public address, cookie domain, mail relay, Cisco and Logitech credentials, sync intervals and process counts. Device integrations can also be set per organization from the integrations screen.

### Planned

None of the following is built yet:

- Sign-in with Microsoft Entra ID, with Entra groups mapped to AV App roles and a local break-glass account kept.
- Every integration as an add-on module that stays off until an operator enables it: email through Microsoft 365, Cisco, Logitech, Solstice, Zoom, Google Meet, Webex, a language model running inside the organization's network, and the vendor portal itself.
- An operator console for operators, the audit log, modules, server settings, branding and health.
- A signed release package that carries the container images as offline files, so a server with no internet access can install and upgrade.

## Credits

Designed and built by DaemonAlex.
