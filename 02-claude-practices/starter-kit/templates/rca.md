<!--
TEMPLATE: Root Cause Analysis (incident / production bug) — QI Spine
Blameless. The point is the fix AND the prevention, not who.
Fill [...]; times in IST (note UTC where relevant — many bugs here are tz-related).
-->

# RCA: [Short incident title]

- **Date of incident:** [YYYY-MM-DD]   **Author:** Ajay Waghmare
- **Severity:** SEV1 (prod down/PHI) | SEV2 (major degraded) | SEV3 (minor)
- **Ticket:** [SPIQ-XXX / CLFV-XXX]   **Env:** prod (qed_prod) | demo (qed_testing)
- **Status:** Investigating | Mitigated | Resolved

## Summary
[2–3 sentences: what broke, who was affected, how long, current state.]

## Impact
- **Users affected:** [patients/PCs/doctors — count or %]
- **Functional impact:** [bookings failed / wrong slot / WhatsApp not sent / wallet wrong]
- **Data impact:** [rows written incorrectly? need backfill? — quantify]
- **Duration:** [start IST – end IST]

## Timeline (IST)
| Time | Event |
|---|---|
| [HH:MM] | [Trigger — deploy / data load / traffic spike] |
| [HH:MM] | [First symptom / alert (cron-watchdog email?)] |
| [HH:MM] | [Detected by …] |
| [HH:MM] | [Mitigation applied] |
| [HH:MM] | [Resolved / verified] |

## Root cause
[The actual technical cause. Be specific: file:method, query, config, timezone conversion, missing constraint, etc. Verify against current code — don't assume.]

## 5 Whys
1. Why did [symptom]? → [...]
2. Why? → [...]
3. Why? → [...]
4. Why? → [...]
5. Why (root)? → [...]

## Fix
- **Immediate (mitigation):** [what stopped the bleeding]
- **Permanent:** [code/config/migration change — link PR/commit]
- **Backfill:** [SQL/script to correct bad data, if any — staged & reviewed, not auto-run on prod]

## Prevention / action items
- [ ] [Test that would have caught it — unit/integration]
- [ ] [Guardrail: constraint, validation, alert, watchdog]
- [ ] [Doc/memory update so the next person doesn't repeat it]
- [ ] [Owner + due date per item]
