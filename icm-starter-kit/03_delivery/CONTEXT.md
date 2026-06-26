# STAGE CONTRACT — 03_delivery (Layer 2)

**Purpose:** Final quality audit, formatting, and packaging for hand-off to the client.

## Inputs (must be present before you begin — else HALT and notify the operator)
- `02_processing/outputs/draft.md`.
- `_shared/brand-guidelines.md` and `_shared/tech-specs.md` (read-only reference).

## Audits (run every item; report pass/fail before finalizing)
- [ ] Full compliance pass against `_shared/brand-guidelines.md`.
- [ ] Formatting matches the client's required delivery format.
- [ ] Spelling, links, and names verified (brand name exact casing).
- [ ] A human operator has approved release. Do NOT deliver without explicit approval.

## Output (final artifact)
- `03_delivery/outputs/final.md` — the client-ready deliverable.
- Record what was delivered and when in `ROUTING.md` status.

## DAG rule
Terminal stage. Reads upstream + `_shared/`. Nothing reads from it within the pipeline.
