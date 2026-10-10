<!--
TEMPLATE: Test plan — QI Spine (JUnit 5 / Mockito / Spring Boot Test)
For a feature or risky change. Map each AC to at least one test.
Fill [...]; trim layers that don't apply.
-->

# Test Plan: [Feature / ticket]

- **Author:** Ajay Waghmare   **Ticket:** [SPIQ-XXX]   **Status:** Draft | In progress | Done
- **Repos under test:** qispine-webservices | patient-service | frontend

## Scope
- **In:** [what behavior is being verified]
- **Out:** [not covered here]

## Risk areas (test these hardest)
- [Timezone IST↔UTC slot math]   [IDOR / ownership]   [double-booking race]
- [empty/expired/blocked states]   [region IN/UAE/LOCAL]

## Test matrix
| ID | Layer | What | Type | Expected |
|---|---|---|---|---|
| T1 | unit | [Service method — happy path] | JUnit + Mockito | [...] |
| T2 | unit | [edge: null/empty/expired] | JUnit | 400 / DataInvalidException |
| T3 | integration | [Controller + repo, @SpringBootTest / @DataJpaTest] | Spring Boot Test | [Response<T> shape, status] |
| T4 | integration | [event emitted → routing key] | Spring Boot Test | [outbox row / consumer] |
| T5 | e2e | [full flow, e.g. Schedule Now → appointment] | manual / Postman | [...] |
| T6 | authz | [other patient's JWT cannot access] | integration | 403 |

## AC → test traceability
- AC1 → T1, T3
- AC2 → T2
- AC3 (authz) → T6

## Test data & env
- **Local:** qed_testing (localhost:5432, postgres/postgres); Redis + RabbitMQ via Docker (guest/guest)
- **Demo:** qed_testing on EC2 (demo-access skill) — read-only validation
- **Seed needed:** [doctors, languages, clinics, patient with/without consent]

## How to run
```bash
# qispine-webservices (Java 8)
mvn -q test
# patient-service (Java 21)
mvn -q test
```

## Exit criteria
- [ ] All matrix tests pass; no red/stale tests left behind
- [ ] Every AC has ≥1 passing test
- [ ] No reliance on machine timezone (set tz explicitly in tz-sensitive tests)
