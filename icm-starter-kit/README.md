# ICM Client-Setup Starter Kit

A reusable, copy-and-go scaffold for spinning up a **permanent, time-resistant agent workspace** for a new client or business. It implements the **Interpretable Context Methodology (ICM)**: the *filesystem* is the state machine, and a set of markdown contracts governs how an agentic tool (Claude Code, Codex, etc.) operates the workspace.

## What's in here

```
icm-starter-kit/
  SYSTEM_OS.md          <- the master constitution (the agent reads this first)
  ROUTING.md            <- workspace map: which pipelines/stages exist
  _shared/              <- Layer 3: read-only truth (brand, specs, schemas)
    README.md
    brand-guidelines.md
    tech-specs.md
  01_intake/            <- Layer 2 stage + Layer 4 working files
    CONTEXT.md          <- the Stage Contract (inputs / audits / outputs)
  02_processing/
    CONTEXT.md
  03_delivery/
    CONTEXT.md
```

## How to deploy for a new client (5 steps)

1. **Copy** the whole `icm-starter-kit/` folder into the root of a fresh repo for the client.
2. **Rename** `SYSTEM_OS.md` to `CLAUDE.md` and move it to the repo root. (Claude Code auto-reads `CLAUDE.md` on startup. If you use Codex or another tool, keep whatever filename that tool reads first.)
3. **Fill the placeholders** — search for `{{` and replace `{{CLIENT_NAME}}`, `{{CLIENT_GOAL}}`, etc.
4. **Fill `_shared/`** with the client's real brand guidelines, tech specs, and API schemas. This is the permanent "truth" the whole pipeline references.
5. **Point your agent at the repo** and say *"Initialize this client."* It will read the constitution and run the Bootstrap Protocol, then stand down for your approval before processing real work.

## A note on what this does and doesn't do (read this)

- **It changes agent behavior strongly, but it does not *force* it.** A markdown constitution is high-quality guidance the agent chooses to honor — not a hard runtime lock. For real enforcement, pair it with checks (a validation script or a Claude Code hook) that fail loudly when a Stage Contract isn't met. A starting point lives in `_shared/tech-specs.md`.
- **"Filesystem is the state machine" is ideal for content / ops / intake pipelines.** For jobs that genuinely need code, treat the laws as *"prefer structure over code,"* not an absolute ban.
- **What actually survives time** is the *structure and the contracts*. Swap models in five years, point the new one at the same folders + `CLAUDE.md`, and it can operate the machine without rewriting application code. That's the real, defensible benefit.
