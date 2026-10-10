<!--
TEMPLATE: Jira ticket (Story / Bug) — QI Spine (SPIQ-* / CLFV-*)
Fill in the bracketed [...] fields. Delete the section that does not apply
(Story vs Bug). Project board: https://qispine-team.atlassian.net
Keep it skimmable — ACs are the contract; everything else is context.
-->

# [SPIQ-XXX] — [Short imperative title]

- **Type:** Story | Bug | Task | Sub-task
- **Project:** SPIQ (consultation/booking/platform) | CLFV (clinical flow)
- **Epic / Parent:** [SPIQ-XXX or —]
- **Status:** Backlog → Selected for Development → In Progress → PR Raised → QA → Ready for Staging → Done
- **Assignee:** Ajay Waghmare
- **Repos touched:** qispine-webservices | patient-service | notification-service | frontend (Angular)
- **Branch:** `feature/SPIQ-XXX-[slug]`  (flow: feature → INT_DEV → QISPINE_DEMO_V1 → QISPINE_UAT_V3 → master)

## Summary
[1–3 sentences: what and why, in product terms. Who is the user — patient, doctor/PC, ops?]

---
## STORY (delete if Bug)

### User story
As a **[patient / Patient Coordinator / doctor / ops]**, I want **[capability]** so that **[outcome]**.

### Acceptance Criteria
- [ ] **AC1** — [Given … when … then … observable result]
- [ ] **AC2** — [Edge: empty/expired/blocked/timezone (IST vs UTC)]
- [ ] **AC3** — [Error path: invalid input → 400 with message; not-found → …]
- [ ] **AC4** — [Authorization: only the owning patient/PC can act (no IDOR)]

### Scope
- **In:** [endpoints, screens, events]
- **Out (non-goals):** [what this ticket explicitly does NOT do]

### API / contract impact
- [METHOD] `[/api/v1/...]` — [new | changed]; req/resp in linked api-doc.

---
## BUG (delete if Story)

### Steps to reproduce
1. [Env: demo (qed_testing) / prod (qed_prod) / local]
2. [Action]
3. [Action]

- **Expected:** [...]
- **Actual:** [...]
- **First seen / regressed in:** [build, branch, or commit]
- **Severity:** Showstopper | High | Medium | Low

### Root cause (once known)
[Short — link RCA doc if non-trivial. See rca.md template.]

### Fix acceptance
- [ ] [Behavior corrected]
- [ ] [Regression test added]

---
## Notes / links
- Memory: [[project_...]]   Miro: [board/zone]   PR: [link]
- Dependencies / blockers: [SPIQ-XXX]
