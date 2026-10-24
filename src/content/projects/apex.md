---
title: APEX
tagline: One shared record for AV and UC work, from the first project plan to the last room check and renewal
category: platform
status: beta
website: https://apexavcloud.com
stack: ["Vue 3", "TypeScript", "Naive UI", "Node.js", "Express", "PostgreSQL 16", "Docker"]
requires: ["Docker Compose", "PostgreSQL 16", "nginx"]
tags: ["audio-visual", "unified communications", "project management", "field operations", "multi-tenant", "SaaS", "partner portal", "room monitoring"]
featured: true
order: 1
---

## Overview

APEX (sold as ApexAV) is a project-management and operations platform for audio-visual integrators, unified-communications deployments and the field teams who install and support meeting rooms. It is a hosted service at [apexavcloud.com](https://apexavcloud.com), and it can also be installed on a customer's own server.

AV work usually lives in many tools that do not know about each other: projects in a tracker, device health in one console per manufacturer, site visits on a shared calendar, partner insurance certificates and license renewals in spreadsheets, and leadership reports rebuilt by hand every quarter. APEX puts that work on one set of records. A project, a room, a device, a partner, a license and a site visit each exist once, and every screen is a different window onto the same record. Update a visit in Field Ops and every other view sees the change, because there is only one visit.

The platform follows the order AV work happens in everywhere: plan it, install it, watch what you installed, then support it. It serves two kinds of team at once. An in-house AV or IT department runs its own rooms and brings outside integrators in on scoped access. An integrator or managed-service provider runs its whole book of clients, each one in its own sealed workspace, from a single sign-in.

## Features

### Projects

- A workspace per job with task lists, prerequisites and assignees.
- Budgets with baselines, actuals and cost variance, visible only to roles allowed to see money.
- An equipment bill of materials that follows each item from spec through commissioned.
- Documents, change orders and submittals kept on the project record.
- One discussion thread per project, shared by your team and your assigned partners.
- A retrospective waiting when the project closes.

### Field operations

- Site visits with a structured lifecycle: the partner proposes dates, the client approves or counters with a reason, the technician marks on-site on arrival and closes the visit as Done, Partial or Blocked.
- Every state change is posted to the visit's thread automatically, so the audit trail writes itself while the work happens.
- Built to run from a phone; photos taken on site file into the project on their own.
- Partner staging: devices are prepared with bench details before installation.
- Network access gates: the workspace approves a gate before a device joins the network, and partners can see what they are blocked on.

### Rooms and infrastructure

- A workspace per room with its tech sheet, equipment and a line diagram you can draw and export.
- Recurring room checks on a cadence, overdue first, with the full check history kept.
- Scheduled pre-flight checks that email a pass or fail before the meeting starts.
- Live room and device health pulled from the manufacturer platforms you already run. Cisco Control Hub and Logitech Sync connect today.
- Zoom, Google Meet, Microsoft Teams, Crestron, Mersive and ServiceNow appear in the connector list as coming soon.
- Firmware flags that mark any unit older than the newest of its kind you own.
- Plain-language notes written onto each room card, and usage analytics that show which rooms earn their gear.
- A deep-diagnosis panel in the room drawer that weighs the room's signals and lists likely causes with what to check first.

### Licenses, reporting and audit

- License and credential tracking with alerts before anything lapses.
- A leadership dashboard with portfolio health, projects that are sliding and rooms that are down, on one screen you can share.
- Reports on portfolio, budget, timeline, partner performance, reschedule reasons and monthly trends.
- An append-only audit log of every create, update and delete, with who, when and what changed.
- Notification preferences per person.

### Partners and access

- A separate Partner portal for outside integrators, with a client switcher and a band across every page naming the client they are working in.
- Per-project partner profiles (read only by default) and per-area sharing at View, Work or Manage.
- A partner's own internal role caps whatever a client grants, so a partner's field technician can never manage a client's infrastructure.
- Nine fixed Company roles, from Owner to Viewer, plus a "view as" preview for administrators.
- Single-use invitations for teammates and partners.

## How it works

### How a team uses it

1. A company signs up for the free 30-day trial, and a setup wizard walks through company, location, first project and teammates.
2. Administrators invite their team and give each person one role. Everyone in a workspace can see every project; the role decides what a person can change, and whether they can see the money.
3. An administrator connects the manufacturer platforms the company already runs. The connector signs in on the company's behalf and keeps device state current, so nobody re-types an inventory.
4. Project managers build projects, add equipment and invite partner companies to the projects they work on.
5. Partners sign in to their own portal, propose site visits, stage devices and post updates into the same threads the client reads.
6. Leadership reads the dashboard and reports instead of asking for a status deck.

How much a client takes part is up to them. Some never log in and receive reports from their integrator, some hold a read-only login, and a co-managed client runs its own internal team alongside the partner, with some projects partner-led and others client-led.

### Architecture

**Frontend.** The interface is Vue 3 with TypeScript, Naive UI components, Pinia for state and ECharts for charts. Vite builds it into one browser bundle that exposes a mount function per application. Each page is a light HTML shell (sign-in, the Company portal, the Partner portal, the profile screen and, on the hosted edition, the staff operator console) that mounts its own Vue app from that bundle, so partner users never load the internal company interface. Inside the Company portal, each section (Dashboard, Projects, Field Ops, Infrastructure, Rooms, Licenses, Reports and Administration) is its own view.

**Backend.** A Node.js API on Express runs as a cluster of worker processes. Work that must happen exactly once, such as the connector sync schedulers, runs on the cluster primary so a feed is never pulled twice. Queries are parameterised SQL through the `pg` driver, with the schema defined in Drizzle ORM. Every changing request passes input validation and writes to the audit log.

**Database and tenancy.** PostgreSQL 16 holds everything. Each company is a tenant, and the separation is enforced by the database itself with row-level security: the API sets the tenant on the database connection for each request, and a query that forgets to filter returns nothing rather than another company's rows. The application connects with a role that cannot bypass those policies and cannot change the schema; schema changes use a separate role. Partner users carry a second boundary that pins them to their own organisation. Requests for anything outside a user's scope answer 404, so record IDs cannot be probed.

**Authentication.** Sign-in issues a short-lived RS256-signed access token and a rotating refresh token, both in HTTP-only, Secure, SameSite=Strict cookies, so page scripts never see them. Refresh tokens are stored hashed, and reusing a revoked one ends every session for that user. State-changing requests use double-submit CSRF protection. Passwords are hashed with bcrypt, failed sign-ins trigger a tiered lockout, and time-based one-time codes (TOTP) add a second factor, with the stored secrets encrypted at rest. Role and partner checks run on the server on every request and fail closed.

**Connectors.** Each connector performs a fixed set of actions, holds credentials scoped to one company and encrypted at rest, and logs every outside call to the audit log. APEX reads what the manufacturer platform knows; it does not probe the customer's network. For room devices with no cloud service, a small on-site agent connects outbound to APEX and waits for work, so the customer opens no inbound hole in their firewall.

**Deployment.** The platform ships as a three-container Docker Compose stack: PostgreSQL 16, the Express backend and an nginx web tier that serves the shells and bundle and proxies the API. The hosted service runs that stack on Linux behind a Cloudflare Tunnel, so the server publishes no public ports, with Cloudflare Turnstile on public forms and a Prometheus-backed health view for the operations team. A bare-metal install (Node.js, PostgreSQL and nginx) is also documented.

**Editions.** One repository builds two editions. The cloud edition is the hosted service, with its marketing site, documentation, support desk and staff console. The prem edition is a single-organisation install on a customer's own server: its Docker images are built with the hosted-only code removed, and automated checks fail the build if any of it slips into the prem images.

## Requirements

For the hosted service, a current browser. For a self-hosted install:

- A Linux server with Docker and Docker Compose
- Or, for bare metal: Node.js, PostgreSQL 16 and nginx
- An RSA key pair for signing access tokens (a script generates it)
- An SMTP relay for invitations and password resets

## Installation

The hosted service needs no installation: start the free trial at [apexavcloud.com](https://apexavcloud.com). Self-hosted installs are arranged directly; the repository is private.

## Credits

Designed and built by DaemonAlex.
