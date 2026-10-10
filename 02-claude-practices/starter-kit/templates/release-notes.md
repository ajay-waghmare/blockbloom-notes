<!--
TEMPLATE: Release notes — QI Spine
Human-readable summary of what shipped. Audience = team / ops / stakeholders.
Group by service when a release spans repos. Fill [...]; drop empty sections.
-->

# Release Notes — [Version / date]

- **Release:** [vX.Y.Z or date tag]   **Date:** [YYYY-MM-DD]
- **Environments:** [demo (qed_testing) → UAT → prod (qed_prod)]
- **Branch:** [QISPINE_DEMO_V1 / QISPINE_UAT_V3 / master]

## Highlights
- [Headline change in plain language — what users/PCs/doctors will notice]

## New features
- **[SPIQ-XXX]** [What it does, who it's for] — [service]

## Improvements
- **[SPIQ-XXX]** [Optimization / UX / performance — e.g. removed N+1 in slot lookup] — [service]

## Bug fixes
- **[SPIQ-XXX]** [What was broken → now fixed] — [service]

## Migration / operational notes
- **DB:** [Liquibase changesets applied; backfill required? order?]
- **Config / flags:** [new feature flags and their default state]
- **Events:** [new notification events live — see eda / add-event]
- **Action required:** [anything ops/PCs must do — else "none"]

## Known issues
- [SPIQ-XXX] [Deferred / partial — workaround if any]
