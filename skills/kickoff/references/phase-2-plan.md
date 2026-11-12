# Phase 2 — Implementation plan

Goal: a plan an agent can execute one task at a time: the stack, the structure, ordered milestones with a way to check each, and the commands that prove work is done.

## Find out

1. **Stack and method**: does the user already know what they will build with? Is there an example to follow (a repo, a template, a previous project, a tutorial)?
   - Example given → read it and follow its structure and conventions. Note where the plan deviates and why.
   - Stack named, no example → look up the current recommended project layout and tooling for that stack (official docs first) and summarise what you will follow, with links.
   - Nothing decided → propose 2–3 options that fit the concept's constraints (timeline, the user's experience, platform), each with one line of trade-off, and recommend one. The user chooses.
   - Brownfield → don't propose a stack. Read manifests and the top-level layout, and document what is there.
2. **Checks**: the exact commands for lint, format, type-check, tests, build and run. If none exist yet, setting them up is the first milestone. Phase 5 puts these into `AGENTS.md`.
3. **The riskiest part**: schedule it early, with a fallback if it does not work.
4. **Task tracking**: where tasks live. Each task needs acceptance criteria that can be checked. Offer, with a recommendation:
   - **GitHub Issues + a GitHub Project board** (recommend when the repo is on GitHub and `gh` is available). Statuses follow the workflow's gates, e.g. `Todo → In Progress → Test/QA → Done`; `Done` only after the user confirms.
   - **Another tracker** the user already uses (Linear, Jira, ...), through its MCP server or CLI if one is set up.
   - **A checklist in the plan's status section**, for small or solo-short projects. Say this is what you recommend when the project is small.

   Record the choice, the board name, the statuses and the label set (one type label + one or two area labels, areas taken from the plan) in `docs/.reum-state.md`. Don't create anything yet; phase 5 does, after asking.

Facts from the web or docs: say where each came from. If you could not verify something, write "not verified".

## Write

Use `templates/plan.md`.

- Fits in about 300 lines → one file, `docs/plan.md`.
- Longer, or several areas an agent would rarely need together → `docs/plan/README.md` (index table: file, line count, what it covers) plus `docs/plan/NN-<topic>.md`, one topic per file. Number the sections so other docs can cite "plan §4".
- Milestones: each has a goal, a rough size, what is built, and "done when" as checkable items. Order them so something runnable exists as early as possible.
- Put every tunable or still-uncertain value in one section so later changes have one place.
- End with a status section: current milestone and next task. This is the part that gets updated as work goes on.

Show the user the stack choice, the milestone list with sizes, and the total against the timeline from `docs/concept.md`. If it does not fit, propose what to cut. After their OK, mark phase 2 `done`.
