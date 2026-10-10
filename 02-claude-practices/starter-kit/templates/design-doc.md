<!--
TEMPLATE: Design / technical proposal — QI Spine
For a feature or change spanning code, data, and/or both services.
Keep it decision-oriented: the goal is to pick an option and capture why.
Fill [...]; trim sections that don't apply.
-->

# Design: [Title]

- **Author:** Ajay Waghmare   **Date:** [YYYY-MM-DD]   **Status:** Draft | Reviewed | Approved | Superseded
- **Ticket(s):** [SPIQ-XXX / CLFV-XXX]
- **Repos:** qispine-webservices | patient-service | notification-service | frontend

## Context / problem
[What's the situation today and why it needs to change. Link current behavior — e.g. monolith-payment-invoice skill, a memory file, or existing code path.]

## Goals
- [Measurable outcome 1]
- [Outcome 2]

## Non-goals
- [Explicitly out of scope — prevents scope creep]

## Constraints
- [Java 8 vs Java 21; field vs constructor injection; javax vs jakarta]
- [IST↔UTC timezone correctness; multi-region IN/UAE/LOCAL]
- [No prod DDL via hibernate.ddl-auto; Liquibase changelog only]
- [Backward compat / data migration / no PHI in logs]

## Options considered
### Option A — [name]
- How: [...]
- Pros: [...]   Cons: [...]

### Option B — [name]
- How: [...]
- Pros: [...]   Cons: [...]

## Decision
**Chosen: [Option X]** because [...].
(Record as an ADR if it's a long-lived architectural choice — see adr.md.)

## Design detail
- **Data model:** [new tables/columns; Liquibase changeset + rollback]
- **API surface:** [endpoints — link api-doc.md]
- **Events:** [new EventTranslationRule + routing key; consumer in notification-service — see add-event skill]
- **Service placement:** [which service owns the logic and why]
- **Frontend:** [Angular screens/flags affected]

## Risks & mitigations
| Risk | Likelihood | Mitigation |
|---|---|---|
| [Double-booking race] | [M] | [unique constraint + re-check under lock] |
| [Timezone off-by-5.5h] | [M] | [single IST→UTC conversion point, tested] |

## Rollout
- [Feature flag? branch path feature → INT_DEV → QISPINE_DEMO_V1 → UAT → master]
- [Backfill/migration order; reversibility]

## Open questions
- [ ] [Question for PM/PC/clinical team]
