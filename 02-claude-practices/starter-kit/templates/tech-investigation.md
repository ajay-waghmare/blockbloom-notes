<!--
TEMPLATE: Technical investigation / spike — QI Spine
For "how does X work / why is Y happening / can we Z" questions that need
code + DB digging before a decision. Evidence-first; conclusion last.
Fill [...]; cite file:line and query results so the conclusion is auditable.
-->

# Investigation: [The question]

- **Author:** Ajay Waghmare   **Date:** [YYYY-MM-DD]   **Status:** Open | Concluded
- **Ticket:** [SPIQ-XXX / CLFV-XXX]   **Trigger:** [what prompted this]

## Question
[State the precise question being answered. One sentence.]

## Scope / where I looked
- **Repos:** [qispine-webservices / patient-service / notification-service / frontend]
- **Code:** [packages, classes, methods]
- **Data:** [tables; env = prod (qed_prod, read-only via plink) / demo (qed_testing)]

## Hypotheses
- **H1:** [...]
- **H2:** [...]

## Findings (evidence)
### Finding 1
- **Claim:** [...]
- **Evidence:** [`File.java:123` snippet, query result, log line — paste the load-bearing bit]
```text
[exact evidence]
```

### Finding 2
- **Claim:** [...]
- **Evidence:** [...]

## Conclusion
[Direct answer to the question. State confidence. Note what's verified vs assumed.]
- H1: confirmed | refuted | partial — because [...]
- H2: confirmed | refuted | partial — because [...]

## Implications
- [What this means for the bug/feature/decision]

## Next steps
- [ ] [Action / follow-up ticket / what still needs verifying against current code]

## Notes
- [Memory to update [[project_...]]; gotchas discovered]
