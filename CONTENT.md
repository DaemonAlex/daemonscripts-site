# Writing a project page

Each project is one file: `src/content/projects/<slug>.md`. The slug is the repo name in lower case
(`dps-airlines.md`, `gamepanel.md`, `apex.md`). The frontmatter fields are defined, with comments, in
`src/content.config.ts`; the build fails if one is wrong.

## Voice

- Plain, confident English for server owners and players, not other developers first. Say what it
  does for the city before how it is built.
- Short paragraphs, concrete nouns. "Players clock in at the depot and get a route" beats
  "provides an immersive job experience".
- No marketing filler ("next-level", "seamless", "immersive", "revolutionary"). No emoji.
- **No em dashes (U+2014) anywhere.** Use a comma, a colon or a new sentence.
- Only state what the code or README shows. If a feature is planned, say "planned". Never invent
  commands, config keys, numbers or screenshots.
- Credit original authors in `credits` and in the Credits section when a project is a port or fork.

## Body sections (in this order; leave out a section that has nothing true to say)

```md
## Overview
Two or three paragraphs: what it is, who it is for, what problem it solves.

## Features
- Bullet list, one feature per bullet, each a short sentence.

## How it works
How a player or admin actually uses it, step by step or as a short narrative.
For platforms: architecture at a level a buyer would care about.

## Requirements
- Framework, dependencies, server build, anything that must be installed first.

## Installation
1. Numbered steps, copied faithfully from the README when it has them.

## Configuration
What can be changed (config files and the main options), in prose or a small table.

## Commands
| Command | Who | What it does |
| --- | --- | --- |

## Credits
Original authors, libraries with notable roles, licence.
```

## Never publish

Passwords, tokens, API keys, `.env` contents, internal IPs (10.x, 100.x tailnet, 192.168.x), internal
hostnames, SSH details, database names or credentials, customer names, or anything from a private
repo's ops / infra docs. When in doubt, leave it out.
