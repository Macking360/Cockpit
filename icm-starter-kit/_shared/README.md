# _shared — Layer 3: Static Factory Config (READ-ONLY)

This directory holds the **permanent truth** for the client: things that do not change
run-to-run. Every stage may reference these files, but no stage may modify them.

Put here:
- **brand-guidelines.md** — voice, tone, do/don't, naming, visual rules
- **tech-specs.md** — technical constraints, API schemas, validation rules, hooks
- Any API schema, glossary, or legal/compliance constraint the whole pipeline must obey

Do NOT put working files, per-run inputs, or generated outputs here. Those live inside
the numbered stage folders (Layer 4).
