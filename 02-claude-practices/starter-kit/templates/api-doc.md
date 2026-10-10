<!--
TEMPLATE: API endpoint doc — Spring REST (QI Spine)
One file per endpoint (or group). Match the owning service's conventions:
  qispine-webservices  → Java 8, port 8080, com.idx.*,  Response<T> envelope, javax.*
  patient-service      → Java 21, port 8081, com.qispine.patientservice, jakarta.*, Instant
Fill [...]; delete rows that don't apply.
-->

# [METHOD] [/api/v1/resource/{id}]

- **Service:** qispine-webservices (8080) | patient-service (8081)
- **Controller:** `[com.idx.controller.XxxController | com.qispine.patientservice.controller.XxxController]`
- **Ticket:** [SPIQ-XXX]   **Status:** draft | implemented | deprecated

## Purpose
[1 line: what it does and for whom.]

## Auth
- **Required:** Bearer JWT (patient) | `X-Internal-Api-Key` (service-to-service) | none
- **Ownership:** [Must own the resource — verify profileId/patientId belongs to caller. Guard against IDOR.]
- **Region:** [IN | UAE | LOCAL — DataRegion enforced? patient-service only]

## Request
- **Path params:** `id` (Long) — [meaning]
- **Query params:** `[name]` ([type], required?) — [meaning]
- **Headers:** `Authorization`, [`X-Internal-Api-Key`]
- **Body** (`application/json`):
```json
{
  "patientId": 0,
  "field": "value"
}
```
- **Validation:** [@NotNull/@Min(1)/@Max(10) on each field; cascade with @Valid on nested]

## Response — 200 OK
qispine-webservices uses the `Response<T>` envelope; patient-service returns the DTO directly (confirm per service).
```json
{
  "success": true,
  "message": "DATA_FOUND",
  "data": { "id": 0, "field": "value" }
}
```
- **Timestamps:** [epoch/ISO-8601 — patient-service serializes `Instant`; note IST↔UTC handling]

## Errors
| HTTP | When | Body / message |
|---|---|---|
| 400 | invalid input / business rule (DataInvalidException) | `{ "success": false, "message": "[...]" }` |
| 401 | missing/invalid JWT or missing internal key | — |
| 403 | not owner / wrong region | — |
| 404 | resource not found | — |
| 500 | unexpected | generic message, details logged with `[COMPONENT]` prefix |

## Example
```bash
curl -s -X [METHOD] "http://localhost:[8080|8081]/api/v1/[path]" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "patientId": 123 }'
```

## Notes
- **Events emitted:** [EventName → routing key, e.g. appointment.created — see eda skill]
- **Idempotency / concurrency:** [unique constraint? re-check under lock? double-booking risk?]
- **Related:** [other endpoints, memory [[project_...]], consultation-booking skill]
