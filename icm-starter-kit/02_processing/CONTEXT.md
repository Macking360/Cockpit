# STAGE CONTRACT — 02_processing (Layer 2)

**Purpose:** Transform validated intake into the actual work product (draft).

## Inputs (must be present before you begin — else HALT and notify the operator)
- `01_intake/outputs/intake.json` (validated upstream output).
- `_shared/brand-guidelines.md` and `_shared/tech-specs.md` (read-only reference).

## Audits (run every item; report pass/fail before finalizing)
- [ ] Output reflects every required field from `intake.json` — nothing dropped, nothing invented.
- [ ] Voice, tone, and language obey `_shared/brand-guidelines.md`.
- [ ] No banned words/claims present.
- [ ] Draft is internally consistent and free of placeholder text.

## Output (exact artifact handed to the next stage)
- `02_processing/outputs/draft.md` — the work product, ready for final audit.
- This is the ONLY thing `03_delivery/` is allowed to read from this stage.

## DAG rule
May read upstream (`01_intake/outputs/`) and `_shared/`. Must NOT read downstream (`03_delivery/`).
