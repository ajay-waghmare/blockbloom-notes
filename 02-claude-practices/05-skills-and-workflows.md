# Skills, agents and workflows

## Skills

A skill is a folder with a `SKILL.md`: YAML frontmatter (`name`, `description`, optionally
`disable-model-invocation: true`) followed by instructions. User-level skills live in
`~\.claude\skills\<name>\`; project-level ones in `<repo>\.claude\skills\<name>\` and travel with
the repo. The **description is loaded every session**, the body only when the skill is invoked
(`/name` or when Claude picks it from the description), so keep descriptions one line and prune
skills you do not use.

Patterns that worked in the QiSpine skills (the content stays at work, the shape comes along):
- a skill per repeatable procedure with an exact command sequence and the known failure modes
  (`update-uat`, `deploy-demo`, `n8n-flow`)
- a skill per domain reference so Claude reads the real contract instead of inventing one
  (`consultation-booking`, `eda`)
- "never do X" lines inside the skill where the mistake is likely (`never deactivate a live flow`)

Two Block Bloom skills are new in the kit:
- `blockbloom-release` — the release runbook as a procedure Claude follows and checks.
- `blockbloom-analytics` — how to pull the numbers and the three interpretation traps.

Ten generic skills from the work laptop are in `starter-kit\skills\_optional-generic\`
(architect-guard, security, testing-cicd, postgresql, redis, microservices, enterprise-hub, eda,
medusa, strapi). They are Node/TS-flavoured and were judged dead weight for a Java shop; for a
Kotlin/Android laptop they are too. Install only what you will use. The claude.ai-synced skills
(docs, docx, pdf, pptx, xlsx, skill-creator, ...) reappear by themselves after login.

## Agent vs Workflow vs inline

| Need | Use |
|---|---|
| a lookup, a grep, reading a few files | inline, always |
| one side task that should not block, or a read across many files where only the conclusion matters | a single `Agent` |
| independent work on many items, or an answer that must survive adversarial checking | `Workflow`, **only when you ask for it** |

Workflow facts that mattered:
- `pipeline(items, stage1, stage2)` over `parallel()`: no barrier, each item flows on its own.
  The listing localisation ran research -> draft -> native review per locale this way.
- `schema` on `agent()` returns validated JSON, no parsing.
- `model: 'sonnet'` on mechanical stages; the main model only for synthesis and judgement.
- The run journal (`journal.jsonl`) holds each agent's real return value; read it before
  diagnosing an empty result; `resumeFromRunId` replays unchanged calls from cache.
- A workflow that **fixes** things has edited the tree before you read its findings.
- When an org spend limit kills agents mid-run, synthesise from what landed; do not re-run.
- Cost reference: about 150k tokens per store-listing locale; a 4-tracer architecture question
  cost ~1.5M subagent tokens. This is why the no-fan-out rule exists.

Shapes that produced real results:
- **Find -> refute**: finders on several dimensions, then skeptics told to refute each finding;
  only findings that survive are reported. Found 6 real bugs in the lifeline economy and 3 in
  the level-save logic, with 4 refuted leads recorded so they would not resurface.
- **Research sweep -> gap analysis -> red team -> synthesis** for the competitive verdict
  ("solid niche earner, not a top-10 contender"), which set the strategy that still holds.
- **Judge panel** of independent approaches when the solution space is wide.
- **Completeness critic** as the last agent: what modality was not run, which claim is unverified.

## Standards and templates

`standards\` (8 docs) are read on demand: engineering working principles (the senior-engineer
operating stance: Problem -> Findings -> Risks -> Recommendation -> Alternatives -> Effort ->
Long-term, balanced against not over-engineering a simple ask), memory strategy, token and
context optimisation, accuracy playbook, dev workflow, documentation standards, directory
layout, routines and automation. Several mention QiSpine paths as examples; the rules are general.

`templates\` (10) fix the shape of repeatable outputs: ADR, RCA, design doc, API doc, release
notes, release plan, research note, tech investigation, testing plan, Jira ticket. Reusing a
template is what keeps the third version of a document looking like the first.
