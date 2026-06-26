# ROUTING — Workspace Map (Layer 1)

> The agent reads this to learn which pipelines and stages currently exist.
> Keep it current: every time a stage is added or renamed, update this map.

## Client
- **Name:** `{{CLIENT_NAME}}`
- **Goal:** `{{CLIENT_GOAL}}`
- **Status:** scaffolded / awaiting operator approval

## Active Pipeline (One-Way DAG — flows top to bottom only)

| Order | Stage folder      | Purpose (one line)                              | Reads from        | Writes to (output artifact)     |
|------:|-------------------|-------------------------------------------------|-------------------|---------------------------------|
| 1     | `01_intake/`      | Capture & validate raw client input             | operator + `_shared/` | `outputs/intake.json`       |
| 2     | `02_processing/`  | Transform validated intake into the work product | `01_intake/outputs/` + `_shared/` | `outputs/draft.md` |
| 3     | `03_delivery/`    | Final audit, format, and package for the client | `02_processing/outputs/` + `_shared/` | `outputs/final.md` |

## Shared Truth (Layer 3, read-only)
- `_shared/brand-guidelines.md`
- `_shared/tech-specs.md`

## Rules
- A stage may ONLY read from upstream outputs and `_shared/`. Never downstream.
- Add new stages with the next number (`04_...`, `05_...`) and give each a `CONTEXT.md`.
