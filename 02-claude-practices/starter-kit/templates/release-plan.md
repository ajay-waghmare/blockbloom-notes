<!--
TEMPLATE: Release / deployment plan — QI Spine
Branch flow: feature/TICKET → INT_DEV → QISPINE_DEMO_V1 → QISPINE_UAT_V3 → master
Demo deploy: deploy-demo skill (EC2 3.6.4.172). Prod: [your prod deploy path].
Fill [...]; trim what doesn't apply.
-->

# Release Plan: [Feature / version]

- **Owner:** Ajay Waghmare   **Target date:** [YYYY-MM-DD]   **Window:** [time IST]
- **Ticket(s):** [SPIQ-XXX, …]   **Status:** Planned | In progress | Done | Rolled back

## Scope
- **Includes:** [features/fixes — bullet, with ticket keys]
- **Excludes:** [intentionally held back]

## Artifacts & environments
| Component | Repo / branch | Build cmd | Deploy target |
|---|---|---|---|
| qispine-webservices | [branch] | `mvn clean install -DskipTests` (Java 8) | [8080 host] |
| patient-service | [branch] | `mvn clean install -DskipTests` (Java 21) | [8081 host] |
| notification-service | [branch] | [build] | [EC2 3.6.4.172 — deploy-demo skill] |
| frontend (Angular) | [branch] | `ng build --prod` | [host] |

## Pre-deploy checklist
- [ ] All ACs met; PRs merged to target branch
- [ ] DB changes are Liquibase changesets **with rollback** (no hibernate.ddl-auto)
- [ ] Config/env reviewed — no local creds committed (qed_testing vs qed_prod)
- [ ] Feature flags set to intended state
- [ ] No secrets/PHI in logs

## Deploy steps (in order)
1. [DB migration / Liquibase — run & confirm]
2. [Deploy service A]
3. [Deploy service B]
4. [Deploy frontend]
5. [Toggle feature flag / clear caches (Redis)]

## Verification (post-deploy)
- [ ] [Smoke test: key endpoint returns 200 — curl/Postman]
- [ ] [Critical flow end-to-end, e.g. Schedule Now booking]
- [ ] [Event fired & consumed (RabbitMQ → notification-service)]
- [ ] [Logs clean; cron-watchdog healthy]

## Rollback plan
- **Trigger:** [what failure aborts the release]
- **Steps:** [redeploy previous JAR; run Liquibase `<rollback>`; flip flag off]
- **Data:** [how to undo any backfill — reversible?]

## Owners / comms
- Deploy: [Ajay]   QA verify: [name]   Stakeholder notify: [whom, channel]
