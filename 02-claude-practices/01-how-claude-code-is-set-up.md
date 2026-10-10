# How Claude Code is set up (the layout that has been working)

This is the shape of the setup on the work laptop, minus the QI Spine content. The point of the
layout: **keep what loads every session small, put detail where it loads on demand, and never
let session knowledge evaporate.**

## What loads when (verified Claude Code mechanics)

Loaded at the start of **every** session, paid for every turn:
- every `CLAUDE.md` from the home dir down to the working directory, in full
- the first **200 lines / 25 KB** of the project's `MEMORY.md` index
- the **descriptions** (not bodies) of every skill, subagent and MCP tool

Loaded **on demand** (free until touched): memory topic files, skill bodies, `standards/` docs,
MCP tool schemas, any file Claude reads.

Consequences you have been living by:
- global `CLAUDE.md` stays short (about 40 lines): cross-cutting rules + pointers
- `MEMORY.md` is an index of one-line pointers; the facts live in topic files
- big reference material goes in `~/.claude/standards/` and is read when relevant
- `/clear` when switching tasks, `/compact` once context passes ~150k; after `/compact` only the
  root `CLAUDE.md` is re-injected, nested ones reload on the next file read in that directory

## The directories

```
C:\Users\<you>\.claude\
  CLAUDE.md            global rules (auto-loaded)
  settings.json        model / effort / theme / permissions (no secrets)
  settings.local.json  machine-local permissions (gitignored style)
  standards\           on-demand reference docs (engineering principles, memory strategy,
                       token/context optimisation, accuracy playbook, dev workflow, docs standards,
                       routines, directory layout)
  templates\           fixed shapes for repeatable outputs (ADR, RCA, release notes, design doc,
                       API doc, research note, testing plan, Jira ticket, tech investigation)
  skills\              user-level skills (SKILL.md per folder); claude.ai also syncs its own under
                       skills\synced\ (docs, docx, pdf, pptx, xlsx, skill-creator, ...) automatically
  projects\<slug>\     per-repo: memory\ (MEMORY.md + topic files) and the session transcripts
                       (*.jsonl, auto-deleted after ~30 days)
<repo>\.claude\        project-level skills and rules, checked into the repo (QiSpine does this;
                       Block Bloom has none yet)
<repo>\CLAUDE.md       the repo's one-screen stack contract (Block Bloom has none yet; a draft is in
                       starter-kit\BlockBloom-repo-CLAUDE.md)
```

The slug is the repo path with separators replaced by `-` (for example
`D--DevTools-BlockBloom`); all worktrees of one repo share the same memory directory because
memory is keyed by the git repo, not the current directory. On the work laptop a second config
dir `.claude-riju` (via `CLAUDE_CONFIG_DIR`) junctions its `projects\` to the same place; that
multi-user arrangement does not apply on a single-user laptop.

## The four kinds of memory file (frontmatter `type`)

- `user_*` — who you are, preferences
- `feedback_*` — standing rules you set, each with **Why** and **How to apply**
- `project_*` — state and decisions of a piece of work, dated
- `reference_*` — stable environment facts: paths, access methods, machine quirks

Every file gets one line in `MEMORY.md`. At the end of a working session Claude writes what was
learned into a topic file and adds the index line (`feedback_persist_work_to_memory`).
`04-memory-system.md` has the full discipline.

## Settings that have been used

```json
{ "effortLevel": "xhigh", "theme": "light" }
```
plus per-model effort entries. The model has been Opus / Fable at xhigh ("model quality matters;
attack the behavioural multipliers instead"). The workflow-usage warning was deliberately left
**on** so each large fan-out is a conscious opt-in.

## Tools and connectors that mattered for Block Bloom

- **Artifacts** (claude.ai pages) for anything another person reads; **Claude Docs** connector for
  living documents. Both need the normal claude.ai login, not a long-lived setup token (the token
  has `user:inference` scope only and kills every connector).
- **Workflow** tool for multi-agent fan-outs (listing localisation per locale, adversarial code
  review, competitive research). Used sparingly and only when asked; see `05-skills-and-workflows.md`.
- **Bash (Git Bash) + PowerShell 5.1** on Windows. The quirks are in `03-techniques-that-worked.md`.
- Permission mode "auto" with a classifier: it refused to let Claude hunt for credential files
  ("Credential Exploration"), which is the right behaviour; you supply the path.
