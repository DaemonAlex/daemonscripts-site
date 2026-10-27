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

The first thing an owner sees. Five numbers across the top, then what is at risk and what needs a decision.

<figure>
<img src="/projects/apex/dash-kpis.png" alt="Three dashboard tiles: 25 projects with 9 active and 9 done, 51 visits with 18 scheduled, 41 devices at 90 percent online" width="822" height="124" loading="lazy">
<figcaption>Projects, visits and devices, with the line underneath that says what the number is made of. Partners and license spend sit to the right.</figcaption>
</figure>

<figure>
<img src="/projects/apex/dash-at-risk.png" alt="The At Risk list: six projects, each with the client, a one-line reason, percent complete and a date" width="684" height="538" loading="lazy">
<figcaption>At risk, with the reason written out. "Switch delivery missed twice" tells leadership more than a red dot does.</figcaption>
</figure>
<figure>
<img src="/projects/apex/dash-attention.png" alt="Needs Attention: two proposed site visits, each three days overdue for a decision" width="682" height="184" loading="lazy">
<figcaption>Needs attention is the queue of decisions waiting on you, mostly partner proposals.</figcaption>
</figure>

This is the screen you forward to the CIO instead of building a deck. Leadership gets a read-only role that sees every project and the money, with nothing to click that changes anything.

## Projects

The portfolio first: what is important now, then the whole list sortable by risk and due date.

<figure>
<img src="/projects/apex/projects-important.png" alt="What's important now: projects overdue by days, and projects behind schedule with percent done against percent of time elapsed" width="690" height="136" loading="lazy">
<figcaption>Behind schedule is computed, not declared: 34 percent done against 58 percent of the time gone.</figcaption>
</figure>

Each project carries a status, a RAG colour with the reason for it, a budget, a schedule with a baseline, a task count and a progress bar. The RAG has two sources: what the numbers say, and what the project manager says, and the table shows both when they disagree.

<figure>
<img src="/projects/apex/projects-table.png" alt="The projects table: name, code and client, status, budget, schedule with overdue days, tasks done, progress bar and a risk column" width="1100" height="262" loading="lazy">
<figcaption>Three rows of the portfolio. "6d overdue, PM: green" means the numbers say trouble and the PM says it is handled; that is worth a conversation.</figcaption>
</figure>

### One project, one page

Open a project and everything about it is on one page: the code, client and business line, the badges, and a row of tabs for tasks, field ops, equipment, rooms, documents, meetings, submittals, partners, RAID, change orders and discussion.

<figure>
<img src="/projects/apex/project-header.png" alt="A project header in light mode: code, client, name, and badges for active, at risk, six days overdue, PM amber, 55 percent complete and the due date" width="830" height="160" loading="lazy">
<figcaption>The project header in the light theme. Field Ops, In Reports, Summary and Re-baseline sit on the right.</figcaption>
</figure>

<figure>
<img src="/projects/apex/project-cards.png" alt="Scope and schedule cards: type, business line, PO number and PM; start, due, baseline, variance and progress" width="690" height="194" loading="lazy">
<figcaption>Scope and schedule. Budget and site sit beside them; the money shows only to roles allowed to see it.</figcaption>
</figure>
<figure>
<img src="/projects/apex/project-context.png" alt="The context block with the RAG reason in amber, and the assigned vendors list showing CRE as a collaborator" width="900" height="212" loading="lazy">
<figcaption>The RAG reason is a sentence a person wrote, and the partner on the job is listed with the access they hold.</figcaption>
</figure>

Budgets carry a baseline, actuals and variance. Equipment is a bill of materials that follows each item from spec through commissioned. Documents, change orders and submittals stay on the record, and a project can be re-baselined when the plan changes for a reason you want written down.

### Partners on the project

The Partners tab is where an outside integrator is brought in. Invited vendors start read only; you raise them to field operator, collaborator or delegated manager when they are ready to work the project. Partners on the same project cannot see each other's work unless you switch that on.

<figure>
<img src="/projects/apex/project-partners.png" alt="Partner cooperation: invited vendors start read only, and a switch, off by default, to let partners on this project see each other's work" width="880" height="172" loading="lazy">
<figcaption>Invited partners start read only, and partner organisations on the same job are kept apart unless you switch that off.</figcaption>
</figure>

### The recap

When a project closes, a recap band appears at the top: visits, done, first-time fix rate, partners and duration, captured from the run itself rather than typed in afterwards.

<figure>
<img src="/projects/apex/project-recap.png" alt="A completed project with the recap band: 2 visits, 2 done, 100 percent first-time fix, 1 partner, 7 days" width="770" height="342" loading="lazy">
<figcaption>A codec refresh that went to plan: two visits, both done first time, seven days end to end.</figcaption>
</figure>

## Field Ops

Site visits have a real lifecycle instead of an email thread called RE: RE: Tuesday. A partner proposes dates, you approve or counter with a reason, the technician marks on-site on arrival, and the visit closes as Done, Partial or Blocked. Every state change lands in the visit's thread on its own.

<figure>
<img src="/projects/apex/fieldops-kpis.png" alt="Field Ops counts: 51 visits all-time, 2 proposals awaiting your call, 18 scheduled" width="822" height="124" loading="lazy">
<figcaption>All onsite work, sorted by date. Overdue and completed counts sit to the right, with the first-time fix rate.</figcaption>
</figure>

<figure>
<img src="/projects/apex/fieldops-proposals.png" alt="Vendor proposals needing approval: two visits from CRE on July 19 with Approve, Counter and Decline buttons" width="1376" height="182" loading="lazy">
<figcaption>Approve to confirm, Counter to move the dates, Decline to push back. The partner sees the answer in their own portal.</figcaption>
</figure>

<figure>
<img src="/projects/apex/fieldops-activity.png" alt="Recent activity: two new notes from an acoustic testing subcontractor on two projects, marked Partner" width="900" height="184" loading="lazy">
<figcaption>Notes from the field show up here as they are posted, tagged with who wrote them.</figcaption>
</figure>

It is built to run from a phone. Photos and video taken on site attach to the visit, partners stage devices with bench details before an install, and the workspace approves a network access gate before anything joins the network, so partners can see exactly what they are blocked on.

## Infrastructure

Room and device health comes from the manufacturer platforms you already run. A connector signs in on the company's behalf and keeps the fleet current, so nobody re-types an inventory. Cisco Control Hub and Logitech Sync connect today; Zoom, Google Meet, Microsoft Teams, Crestron, Mersive and ServiceNow are listed on the Connectors screen and switch on as each one ships. Credentials are entered, tested and saved per workspace, and a sync can be run on demand.

<figure>
<img src="/projects/apex/infra-kpis.png" alt="Infrastructure counts: 21 devices managed, 19 online at 90 percent availability, 2 alerts" width="735" height="124" loading="lazy">
<figcaption>The fleet at a glance. Spaces mapped and locations connected sit to the right.</figcaption>
</figure>

<figure>
<img src="/projects/apex/infra-health.png" alt="Device health donut: 19 online, with issues and offline in amber and red" width="610" height="244" loading="lazy">
<figcaption>Online, issues, offline. The offline slice is the one you walk towards.</figcaption>
</figure>
<figure>
<img src="/projects/apex/infra-models.png" alt="Devices by model: Cisco Room Navigator 7, Room Bar 4, Desk Pro 3, Board Pro 75 3, Room Bar Pro 2, Room Kit EQ 2" width="610" height="244" loading="lazy">
<figcaption>What you own, by model, straight from Control Hub.</figcaption>
</figure>

Firmware flags mark any unit older than the newest of its kind you own. Each room has its own drawer with the tech sheet, equipment, a line diagram you can draw and export, plain-language notes that write themselves onto the room card, usage analytics from Logitech Sync Insights, and a diagnosis panel that weighs the room's signals and lists the likely causes with what to check first.

## Room checks, licenses and reports

Room checks run on a cadence, overdue first, with the full check trail kept. Scheduled pre-flight checks email a pass or fail before the meeting starts, so the EA hears about a dead codec at 8:30 instead of from the CEO at 9:02.

Licenses and partner credentials are tracked with alerts before they lapse: Webex, Teams Rooms, Zoom, Mersive, Logitech Sync, Crestron Fusion and Q-SYS Reflect on the license side, insurance certificates, business licenses and manufacturer certifications on the partner side.

<figure>
<img src="/projects/apex/reports-portfolio.png" alt="Reports: tabs for portfolio health, vendor performance, financial performance, team performance, field operations and infrastructure and compliance, a trailing 90 days selector, Export CSV, and tiles for on-time delivery, at-risk projects, completion rate and average progress" width="930" height="316" loading="lazy">
<figcaption>Each report answers one question. Portfolio Health asks whether the portfolio is healthy and where it is bleeding, over a trailing 90 days against the 90 before.</figcaption>
</figure>

## The partner portal

This is the part the platform is built around. An integrator signs in once and switches between clients; a band across every page names the client they are in, so a technician never posts into the wrong account. Each client decides what the partner sees and touches, area by area, at View, Work or Manage, workspace-wide or narrowed to one project.

<figure>
<img src="/projects/apex/partner-home-hero.png" alt="The partner home: Good evening, Casey, and a line saying where CRE stands across every client" width="700" height="222" loading="lazy">
<figcaption>The partner's home page, across every client they serve.</figcaption>
</figure>
<figure>
<img src="/projects/apex/partner-home-attention.png" alt="Attention cards: 2 onsite proposals awaiting client approval, 2 credentials needing attention with one expired" width="700" height="212" loading="lazy">
<figcaption>What needs the partner's attention today: proposals waiting, a credential that has expired.</figcaption>
</figure>

<figure class="mid">
<img src="/projects/apex/partner-onsite-counts.png" alt="Visit schedule counts: 1 upcoming, 0 on site, 2 awaiting approval, shared by Meridian Financial Group" width="660" height="66" loading="lazy">
<figcaption>The shared-by badge says whose work this is.</figcaption>
</figure>

The partner's Onsite view is the other side of Field Ops: every visit for this client, proposals and scheduled visits first, with the same statuses the client sees.

<figure>
<img src="/projects/apex/partner-onsite-list.png" alt="The partner's visit schedule: dates, status badges for scheduled and proposed, project names and the scope of each visit" width="790" height="394" loading="lazy">
<figcaption>Scheduled, proposed, completed. The partner proposes; the status changes when the client answers.</figcaption>
</figure>

When a client opens Infrastructure to a partner, the partner sees that client's fleet live, with the shared-by badge on it.

<figure>
<img src="/projects/apex/partner-infra-header.png" alt="The partner's view of a client's infrastructure: 41 devices, 37 online, 4 alerts, shared by Meridian Financial Group" width="830" height="245" loading="lazy">
<figcaption>A client's fleet from the partner's seat. Live, synced three minutes ago.</figcaption>
</figure>

<figure class="mid">
<img src="/projects/apex/partner-infra-locations.png" alt="Location health: Meridian Dublin 100 percent online with 8 devices, Meridian LaSalle 75 percent with one issue and one offline" width="690" height="192" loading="lazy">
<figcaption>Health by office, so the partner knows which building to drive to.</figcaption>
</figure>

A partner's own internal role caps whatever a client grants: a partner's field technician can never manage a client's infrastructure, however generous the grant, and both sides have to agree before a write goes through.

## People, roles and the audit trail

Nine fixed company roles, from Owner to Viewer. Everyone in a workspace sees every project; the role decides what a person can change, and whether they see the money. Owners and administrators have a "view as" tool to preview the product as a lower role before inviting someone into it. Invitations are single-use.

Every create, update and delete lands in an append-only log with who, when, the IP and what changed. The runtime database role can write entries but cannot update or delete them, so history cannot be rewritten from the application. If ApexAV staff ever open a customer workspace to help with a support question, it is a look-only session of at most 60 minutes, with a typed reason, and it leaves two rows in that customer's audit log.

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
