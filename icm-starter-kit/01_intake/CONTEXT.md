# STAGE CONTRACT — 01_intake (Layer 2)

**Purpose:** Capture raw client input and validate it before any real work begins.
This is the only stage allowed to accept un-validated, human-supplied material.

## Inputs (must be present before you begin — else HALT and notify the operator)
- Raw input from the operator placed in `01_intake/inputs/` (form export, call transcript,
  email, or manual notes).
- `_shared/brand-guidelines.md` and `_shared/tech-specs.md` (read-only reference).

## Audits (run every item; report pass/fail before finalizing)
- [ ] All required fields for `{{CLIENT_GOAL}}` are present and non-empty.
- [ ] No conflicting or duplicate records.
- [ ] Input conforms to the `intake.json` schema in `_shared/tech-specs.md`.
- [ ] Anything sensitive is flagged per compliance rules in `_shared/brand-guidelines.md`.
- [ ] If any check fails: HALT, write what's missing to `01_intake/outputs/blockers.md`, notify operator.

## Output (exact artifact handed to the next stage)
- `01_intake/outputs/intake.json` conforming to the schema in `_shared/tech-specs.md`.
- This is the ONLY thing `02_processing/` is allowed to read from this stage.

## DAG rule
This is an upstream stage. It must NOT read from or reference any downstream stage.
