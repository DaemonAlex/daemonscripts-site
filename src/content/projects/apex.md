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

I spent twenty years running corporate AV: 160 rooms across a bank's headquarters and its branches, hotel conference centres, global offices on three continents. The work always lived in eight tools that did not know about each other. Projects in a tracker, device health in one console per manufacturer, site visits on a shared calendar, partner insurance certificates and license renewals in spreadsheets, and a leadership report rebuilt by hand every quarter. When a senior tech left, half of how the rooms worked left with them.

APEX (sold as [ApexAV](https://apexavcloud.com)) is the platform I wished I had. A project, a room, a device, a partner, a license and a site visit each exist once, and every screen is a different window onto the same record. Update a visit in Field Ops and every other view sees it, because there is only one visit.

It serves two kinds of team at the same time. An in-house AV or IT department runs its own rooms and brings outside integrators in on scoped access. An integrator or managed-service provider runs its whole book of clients from one sign-in, each client in its own sealed workspace. It is a hosted service in beta, by application, with a self-hosted edition for customers who want it on their own server.

## The shape of it

The work moves in the same order everywhere: plan it, install it, watch what you installed, then support it. The navigation follows that order.

| Area | What lives there |
| --- | --- |
| Dashboard | Portfolio, fleet and team health on one screen |
| Projects | Plans, tasks, budgets, equipment, documents, one discussion thread per job |
| Field Ops | Site visits from proposal to sign-off |
| Infrastructure | The monitored device fleet and its health, from the platforms you already run |
| Room Checks | Room readiness on a cadence, diagrams, usage |
| Licenses | Platform licenses and renewals, with alerts before they lapse |
| Reports | Roll-ups across projects, budget, partners and the field |
| Administration | People, roles, partners, connectors, the audit log, exports |

Every screen ships in dark and light, and each person picks their own.

## The dashboard

The first thing an owner sees. Five numbers across the top, then what is at risk and what needs a decision. Every count is all time; the Reports tab is the rolling view.

<figure>
<img src="/projects/apex/dash-kpis.png" alt="Five dashboard tiles: 33 projects with 10 active and 11 done, 64 visits with 14 scheduled, 160 devices at 95 percent online with 3 offline, 15 partners, 47 thousand dollars of licenses across 13 platforms with 7 expiring" width="1345" height="156" loading="lazy">
<figcaption>Projects, visits, devices, partners and license spend, each with the line underneath that says what the number is made of.</figcaption>
</figure>

<div class="shots">
<figure>
<img src="/projects/apex/dash-at-risk.png" alt="The At Risk list: six projects, each with the client, a one-line reason, percent complete and a date" width="661" height="715" loading="lazy">
<figcaption>At risk, with the reason written out. "Second display mount back-ordered to next month" tells leadership more than a red dot does.</figcaption>
</figure>
<figure>
<img src="/projects/apex/dash-attention.png" alt="Needs Attention: seven site visits proposed or countered by partners, each with its due date" width="654" height="644" loading="lazy">
<figcaption>Needs attention is the queue of decisions waiting on you: partner proposals and counter-proposals.</figcaption>
</figure>
</div>

This is the screen you forward to the CIO instead of building a deck. Leadership gets a read-only role that sees every project and the money, with nothing to click that changes anything.

## Projects

The portfolio first: what is important now, then the whole list sortable by risk and due date.

<figure>
<img src="/projects/apex/projects-important.png" alt="What's important now: five projects behind schedule, each with percent done against percent of time elapsed, and one that slipped ten days from its baseline" width="1345" height="170" loading="lazy">
<figcaption>Behind schedule is computed, not declared: 20 percent done against 48 percent of the time gone.</figcaption>
</figure>

<figure>
<img src="/projects/apex/projects-rag.png" alt="Four tiles: 33 in portfolio, 0 at risk, 5 needing attention, 28 on track" width="1345" height="145" loading="lazy">
<figcaption>The portfolio by colour. Red and amber here come from the schedule maths; the project manager's own call sits next to it on every row.</figcaption>
</figure>

Each project carries a status, a RAG colour with the reason for it, a budget, a schedule with a baseline, a task count and a progress bar. The RAG has two sources, what the numbers say and what the project manager says, and the table shows both when they disagree.

<figure>
<img src="/projects/apex/projects-table.png" alt="The projects table: name, code and client, status, budget, due date with days remaining, tasks done, progress bar and a risk column with the reason" width="1349" height="572" loading="lazy">
<figcaption>Five rows of the portfolio. "10d slipped from baseline" is the kind of line that starts a useful conversation.</figcaption>
</figure>

### One project, one page

Open a project and everything about it is on one page: the code, client and business line, the badges, and a row of tabs for tasks, field ops, equipment, rooms, documents, meetings, submittals, partners, RAID, change orders, approvals and discussion. Scope, schedule and budget sit in three cards, the money showing only to roles allowed to see it, and the RAG reason is a sentence a person wrote.

Budgets carry a baseline, actuals and variance. Equipment is a bill of materials that follows each item from spec through commissioned. Documents, change orders and submittals stay on the record, and a project can be re-baselined when the plan changes for a reason you want written down.

### Partners on the project

The Partners tab is where an outside integrator is brought in. Invited vendors start read only; you raise them to field operator, collaborator or delegated manager when they are ready to work the project. Partners on the same project cannot see each other's work unless you switch that on.

### The recap

When a project closes, a recap band appears at the top: visits, done, first-time fix rate, partners and duration, captured from the run itself rather than typed in afterwards.

## Field Ops

Site visits have a real lifecycle instead of an email thread called RE: RE: Tuesday. A partner proposes dates, you approve or counter with a reason, the technician marks on-site on arrival, and the visit closes as Done, Partial or Blocked. Every state change lands in the visit's thread on its own.

<figure>
<img src="/projects/apex/fieldops-kpis.png" alt="Field Ops counts: 64 visits all-time, 5 proposals awaiting your call, 14 scheduled, 0 overdue, 43 completed with 40 first-time fixes" width="1345" height="158" loading="lazy">
<figcaption>All onsite work in five numbers, including the first-time fix rate.</figcaption>
</figure>

<figure>
<img src="/projects/apex/fieldops-proposals.png" alt="Vendor proposals needing approval: five visits from three partners, each with Approve, Counter and Decline buttons" width="1345" height="506" loading="lazy">
<figcaption>Approve to confirm, Counter to move the dates, Decline to push back. The partner sees the answer in their own portal.</figcaption>
</figure>

Day-to-day repairs run through the same place. A branch manager reports a flicker, the local service partner proposes a slot, the branch counters for Thursday, the technician closes it with photos, and the whole exchange sits on the visit as notes.

<figure>
<img src="/projects/apex/fieldops-activity.png" alt="Recent activity: six new notes on service calls, each naming the visit, the project and who wrote it" width="1345" height="604" loading="lazy">
<figcaption>Notes from the field as they are posted: the vendor's proposal, the in-house check, the fix.</figcaption>
</figure>

<figure>
<img src="/projects/apex/fieldops-list.png" alt="Completed visits: a site survey by the in-house team, cable pull, commissioning and tuning visits by two partners, each with its project, site and a one-line summary" width="1354" height="692" loading="lazy">
<figcaption>The visit history. In-house and partner work in one list, each with the project it belongs to.</figcaption>
</figure>

It is built to run from a phone. Photos and video taken on site attach to the visit, partners stage devices with bench details before an install, and the workspace approves a network access gate before anything joins the network, so partners can see exactly what they are blocked on.

## Infrastructure

Room and device health comes from the manufacturer platforms you already run. A connector signs in on the company's behalf and keeps the fleet current, so nobody re-types an inventory. Cisco Control Hub, Logitech Sync and Zoom Rooms are set up from the Connectors screen; Crestron, Google Meet, Microsoft Teams, Mersive and ServiceNow are listed there and switch on as each one ships.

<figure>
<img src="/projects/apex/infra-kpis.png" alt="Fleet health: 95 percent healthy with 152 online, 5 with issues and 3 offline, 160 devices, 4 vendors, 5 locations, 45 percent average utilization" width="1363" height="271" loading="lazy">
<figcaption>The fleet at a glance. The offline three are the ones you walk towards.</figcaption>
</figure>

<figure>
<img src="/projects/apex/infra-vendors.png" alt="By vendor: Manual 97, Cisco 28, Mersive 25, Logitech 10, each with an online, issues and offline bar" width="1363" height="125" loading="lazy">
<figcaption>By source. Cisco and Logitech come from their clouds, Mersive pods from the on-site agent, the rest entered by hand.</figcaption>
</figure>

<figure>
<img src="/projects/apex/infra-rooms.png" alt="Rooms by location: Denver Branch devices as cards, a signage player, an offline MeetUp, a Rally Bar with issues, Taps, Solstice pods and displays, with utilization bars" width="1363" height="715" loading="lazy">
<figcaption>Every device as a card under its branch, with firmware and utilization. The red and amber edges are the service calls waiting to happen.</figcaption>
</figure>

<figure>
<img src="/projects/apex/device-drawer.png" alt="A device drawer for the Denver Conference Room Rally Bar: connected with issues, 33 percent utilization, model, room, location, IP address and last seen" width="1370" height="546" loading="lazy">
<figcaption>Click a device and the drawer has what the technician asks for first: the IP, where it is, when it was last seen.</figcaption>
</figure>

Firmware flags mark any unit older than the newest of its kind you own.

## Rooms and room checks

Every room has its own drawer: the live systems with their IPs and status, the equipment list, a line diagram you can draw and export, the check history, pre-flight schedules, the tech sheet, licensing and the projects that touched it. An AI diagnosis reads the room's signals and writes a plain-language note.

<figure>
<img src="/projects/apex/room-drawer.png" alt="The Executive Boardroom drawer: tabs for systems, diagram, equipment, checks, pre-flight, tech sheet, licensing and projects, a Run diagnosis button, status operational, the platform, the last check with video, display, audio, camera and network ticks, and the systems list with IPs" width="1210" height="975" loading="lazy">
<figcaption>A healthy boardroom: operational, last check all green, seven of seven systems online.</figcaption>
</figure>

<figure>
<img src="/projects/apex/room-drawer-down.png" alt="The Denver Conference Room drawer: status down, an open issue with a ticket number, the last check failing camera and network, and the Rally Bar connected with issues" width="1210" height="975" loading="lazy">
<figcaption>A room that is down: the open issue with its ticket, the failed checks, and the device that caused it.</figcaption>
</figure>

Room checks run on a cadence, overdue first, with the full check trail kept. Scheduled pre-flight checks email a pass or fail before the meeting starts, so the EA hears about a dead codec at 8:30 instead of from the CEO at 9:02.

<figure>
<img src="/projects/apex/roomchecks.png" alt="Room Checks: 6 overdue, 0 due soon, 40 on track, a room search, and the overdue list of signage screens never checked, each with a Run check button" width="1356" height="896" loading="lazy">
<figcaption>Overdue first. One tap runs the check from the list.</figcaption>
</figure>

## Licenses

Licenses and partner credentials are tracked with alerts before they lapse: Webex, Teams Rooms, Zoom, Mersive, Logitech Sync, Crestron and Q-SYS on the license side, insurance certificates, business licenses and manufacturer certifications on the partner side.

<figure>
<img src="/projects/apex/licenses-kpis.png" alt="License tiles: 47 thousand dollars annual spend across 13 platforms, 77 of 99 seats in use, 2 expiring within 60 days, 5 past renewal" width="1363" height="166" loading="lazy">
<figcaption>Spend, seats, what is about to lapse and what already has.</figcaption>
</figure>

<figure>
<img src="/projects/apex/licenses-platforms.png" alt="Spend by platform: service contract 18K, Webex 13K, Mersive 8K, Teams Rooms 3K, Q-SYS Reflect 2K, Crestron Fusion 1K, other 960, Logitech Sync 720" width="1363" height="238" loading="lazy">
<figcaption>Where the money goes, by platform. The renewal calendar stops living in one person's head.</figcaption>
</figure>

## Reports

Each report answers one question over a trailing window you pick, against the window before it, and exports as CSV.

<figure>
<img src="/projects/apex/reports-portfolio.png" alt="Reports: tabs for portfolio health, partner performance, financial performance, team performance, field operations and infrastructure and compliance, trailing 90 days, and portfolio tiles for on-time delivery, at-risk projects and completion rate" width="1363" height="427" loading="lazy">
<figcaption>Portfolio Health asks whether the portfolio is healthy and where it is bleeding.</figcaption>
</figure>

<figure>
<img src="/projects/apex/reports-partner.png" alt="Partner Performance: 30, 90, 180 and 365 day windows, completion rate 46.9 percent down 53 points, first-time fix 93.3 percent, 6 active vendors, and two alerts about partners whose completion rate dropped" width="1364" height="522" loading="lazy">
<figcaption>Are my vendors earning their seat at the table? The alerts name the partner whose numbers moved.</figcaption>
</figure>

<figure>
<img src="/projects/apex/reports-leaderboard.png" alt="Vendor leaderboard: four partners with visits in the last 90 days, completion, change against the prior period, first-time fix and outcome mix" width="1364" height="418" loading="lazy">
<figcaption>The leaderboard, partner by partner. This is the quarterly review, already written.</figcaption>
</figure>

## Connectors

An administrator wires the platforms up once. Credentials are entered, tested and saved per workspace, a sync can be run on demand, and every call the connector makes lands in the audit log.

<figure>
<img src="/projects/apex/connectors.png" alt="The Connectors screen: Cisco, Crestron, Google Meet, Logitech, Mersive and ServiceNow cards, each with its status and a Set up or Request access button" width="1364" height="680" loading="lazy">
<figcaption>Eight platforms on one screen. Set up means credentials go in here; Request access means it is on the way.</figcaption>
</figure>

## The partner portal

This is the part the platform is built around. An integrator signs in once and switches between clients; a band across every page names the client they are in, so a technician never posts into the wrong account. Each client decides what the partner sees and touches, area by area, at View, Work or Manage, workspace-wide or narrowed to one project.

The partner's home page shows where they stand across every client: proposals waiting on an answer, credentials and licenses due, the visits and tasks on deck this week. Their Onsite view is the other side of Field Ops, every visit for that client with the same statuses the client sees, and when a client opens Infrastructure to them they see that client's fleet live, with a shared-by badge on it.

A partner's own internal role caps whatever a client grants: a partner's field technician can never manage a client's infrastructure, however generous the grant, and both sides have to agree before a write goes through.

## People, roles and the audit trail

Nine fixed company roles, from Owner to Viewer. Everyone in a workspace sees every project; the role decides what a person can change, and whether they see the money. Owner and Administrator run the workspace (Owner alone can delete or transfer it). Project Manager does the project and field work plus the money and the connectors. Field Operations does visits, equipment and documents. Leadership reads everything with the money. Auditor and Security Auditor read everything plus the audit log; Financial Auditor reads the money but not the log. Viewer reads.

<figure>
<img src="/projects/apex/admin-home.png" alt="The Administration page: workspace name, trial and user count badges, and cards for Team and Roles, Partners and Sharing, Workspace, Settings, Plan and Billing, System health, Audit log, Data and Privacy, and Connectors" width="1364" height="450" loading="lazy">
<figcaption>Administration is nine cards, each a question: who has access, what can each partner touch, who did what.</figcaption>
</figure>

<figure>
<img src="/projects/apex/admin-team-counts.png" alt="Team and Roles: counts of admins and owners, project managers, field ops, viewers, auditors, leadership, security auditors and financial auditors, with an Invite teammate button" width="1364" height="371" loading="lazy">
<figcaption>The team by role. One button invites the next person.</figcaption>
</figure>

<figure>
<img src="/projects/apex/admin-team-table.png" alt="The team table: name, email, role badge, two-factor status, last login, joined date and active status" width="1364" height="278" loading="lazy">
<figcaption>Every account with its role, whether two-factor is on, and when they last signed in.</figcaption>
</figure>

<figure class="mid">
<img src="/projects/apex/admin-invite.png" alt="The Invite a teammate form: full name, work email, a role picker set to Project Manager, and a Send invite button" width="625" height="334" loading="lazy">
<figcaption>Inviting someone is a name, an email and a role. Invitations are single-use. Owners and administrators also get a "view as" tool to preview the product as a lower role first.</figcaption>
</figure>

### What each partner can touch

Partners never hold a company role. Partners and Sharing lists every partner organisation with three chips, Projects, Field Ops and Infrastructure, each at None, View, Work or Manage, workspace-wide or pinned to specific projects. A partner's own internal role caps whatever you grant.

<figure>
<img src="/projects/apex/admin-sharing.png" alt="Partners and Sharing card for Great Lakes AV Integration: 4 members, shared since Oct 27 2026, Projects at Work, Field Ops at Work, Infrastructure at View, with Sites and Rooms, Reports and Support coming soon" width="1364" height="230" loading="lazy">
<figcaption>The integrator gets Work on projects and field ops and View on the fleet. Nothing else, and never another client's data.</figcaption>
</figure>

### The audit trail

Every create, update and delete lands in an append-only log with who, when, the IP and what changed. The runtime database role can write entries but cannot update or delete them, so history cannot be rewritten from the application.

<figure>
<img src="/projects/apex/admin-audit.png" alt="The audit log: a filter box and a 30 day window, then rows with when, user, action with HTTP status, entity path, level and IP" width="1364" height="618" loading="lazy">
<figcaption>Who did what, when, from where. Filter it to what the auditor asked for instead of running a six-week scramble.</figcaption>
</figure>

<figure>
<img src="/projects/apex/admin-health.png" alt="System health: users, projects, field visits, equipment, Cisco devices, partners and licenses counts, and plugin health per connector" width="1364" height="415" loading="lazy">
<figcaption>System health is the workspace's own numbers plus the sync state of every connector.</figcaption>
</figure>

<figure>
<img src="/projects/apex/admin-privacy.png" alt="Data and Privacy: Export your workspace as a JSON snapshot with a Download button, and the data retention policy with a Read the full policy link" width="1364" height="590" loading="lazy">
<figcaption>Your data is yours: export the whole workspace as JSON any time, and the retention policy is written where you can read it.</figcaption>
</figure>

If ApexAV staff ever open a customer workspace to help with a support question, it is a look-only session of at most 60 minutes, with a typed reason, and it leaves two rows in that customer's audit log.

## How it works

**Frontend.** Vue 3 with TypeScript, Naive UI components, Pinia for state and ECharts for charts. Vite builds one bundle that exposes a mount function per application. Each page is a light HTML shell (sign-in, the Company portal, the Partner portal, the profile screen and, on the hosted edition, the staff console) that mounts its own app, so partner users never load the internal company interface.

**Backend.** A Node.js API on Express, running as a cluster of worker processes. Work that must happen exactly once, such as the connector sync schedulers, runs on the cluster primary so a feed is never pulled twice. Queries are parameterised SQL through the `pg` driver with the schema in Drizzle ORM. Every changing request passes validation and writes to the audit log.

**Database and tenancy.** PostgreSQL 16 holds everything. Each company is a tenant, and the separation is enforced by the database with row-level security: the API sets the tenant on the connection for each request, and a query that forgets to filter returns nothing rather than another company's rows. The application connects with a role that cannot bypass those policies and cannot change the schema. Partner users carry a second boundary pinning them to their own organisation. Anything outside a user's scope answers 404, not 403, so account identifiers cannot be probed.

**Authentication.** Sign-in issues a short-lived RS256-signed access token and a rotating refresh token, both in HTTP-only, Secure, SameSite=Strict cookies. Refresh tokens are stored hashed, and reusing a revoked one ends every session for that user. State-changing requests use double-submit CSRF protection. Passwords are hashed with bcrypt, failed sign-ins trigger a tiered lockout, and TOTP adds a second factor with the secrets encrypted at rest.

**Connectors.** Each connector performs a fixed set of actions, holds credentials scoped to one company and encrypted at rest, and logs every outside call. APEX reads what the manufacturer platform knows; it does not probe the customer's network. For room devices with no cloud service, a small on-site agent connects outbound and waits for work, so the customer opens no inbound hole.

**Deployment.** A three-container Docker Compose stack: PostgreSQL 16, the Express backend and an nginx tier that serves the shells and proxies the API. The hosted service runs behind a Cloudflare Tunnel with no public ports, Turnstile on public forms and a Prometheus-backed health view. One repository builds two editions: the cloud edition with its marketing site, docs, support desk and staff console, and the prem edition for a single organisation's own server, with the hosted-only code stripped out and a build check that fails if any of it slips in.

**API.** Anything you can do in the app you can do through the REST API under `/api`, JSON in and out, the same cookies and CSRF rules, and the same 404 boundary.

## Requirements

For the hosted service, a current browser. For a self-hosted install:

- A Linux server with Docker and Docker Compose
- Or, for bare metal: Node.js, PostgreSQL 16 and nginx
- An RSA key pair for signing access tokens (a script generates it)
- An SMTP relay for invitations and password resets

## Installation

The hosted service needs no installation: apply for beta access at [apexavcloud.com](https://apexavcloud.com) and a 30-day trial workspace is created when the application is approved. Self-hosted installs are arranged directly; the repository is private.

## Credits

Designed and built by DaemonAlex. Creative direction and writing by Kelly Jackson. ApexAV is a product of DS Development.
