# Technical Specs & Enforcement — {{CLIENT_NAME}} (Layer 3, read-only)

> Constraints and schemas the whole pipeline must obey, plus where the *hard* gates live.

## Output Schemas
Define the exact shape of each stage's output artifact so downstream stages can rely on it.

### intake.json (output of 01_intake)
```json
{
  "client": "{{CLIENT_NAME}}",
  "received_at": "ISO-8601 timestamp",
  "source": "form | call | email | manual",
  "fields": { "...": "..." },
  "validated": true
}
```

## Validation / Hard Gates
Prose in a `CONTEXT.md` is guidance. When a step must NOT be skippable, enforce it with code
rather than trust. Options:
- A small validation script that exits non-zero when a Stage Contract's inputs/outputs are
  missing or malformed (run it at the start and end of each stage).
- A Claude Code hook (configured in the repo's settings) that blocks finalizing a stage
  until its audit checklist passes.

> TODO for operator: decide which stages need a hard gate vs. soft guidance, and wire the
> script/hook here. Until then, the agent must run each `CONTEXT.md` audit manually and
> report pass/fail per item.

## External Integrations (if any)
- `{{API name}}`: base URL, auth method, rate limits, schema link
