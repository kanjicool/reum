# Phase 4 — Workflow

Goal: `docs/workflow.md` says who does what, on which model, in what order, and where the user must approve. The user agrees to it before anything is generated.

## Design it from the project, not from a fixed cast

Read `docs/concept.md` (who decides what, timeline, team size) and `docs/plan*` (kinds of work, checks, riskiest part). Then decide:

**1. Which roles this project needs.** Start from the smallest set and add only what the work calls for.

| Role | Add it when | Typical setup |
|---|---|---|
| Designer / decision-maker | always | The user, with the strongest model in the main session for planning and trade-offs |
| Implementer | always | Main session; mid-tier model is enough once a plan is approved |
| Tester | the result can be exercised (app, game, API, pipeline) | Subagent, mid-tier or small model, never edits code, returns a short evidence-based report |
| Reviewer | code will be kept (not a throwaway) | Subagent, read-only, mid-tier model; strongest model for risky areas |
| Domain analyst | the project has a judgment-heavy domain (game balance, pricing, data quality, security) | A skill describing the method, run on the strongest model; the user decides the outcome |
| Researcher | unfamiliar stack or many external docs | Subagent that returns conclusions with sources |

Name roles in the project's own terms (for a game: game designer, playtester, balance; for a data project: analyst, validator).

**2. Which model each role uses.** Principle: pay for the strongest model where a wrong judgment is expensive (design, planning, balance, review of risky changes); use cheaper models where the work is mechanical and checked by evidence (running tests, collecting data, searching). Use the model names available in the user's tool; if unsure what they have, ask.

**3. Subagent or skill.** A subagent when the work produces a lot of output the main session should not carry (test logs, screenshots, search results) or needs independence (review). A skill when it is a method the main session follows.

**4. The pipeline for one task.** For example: task with acceptance criteria → plan (user approves) → implement → test → review → log → user confirms → done. Drop steps the project does not need.

**5. Gates.** Where the user must say yes (from "who decides what"), and the risky areas that get the stronger reviewer (money, auth, data loss, anything public).

**6. Rules that keep it honest.**
- Whoever wrote the code does not test or review it.
- Testers and reviewers report what they observed, with evidence. "Not tested" is a valid result; "passed" without evidence is not. If preconditions are missing they report BLOCKED and stop.
- One task per session, tied to one task with acceptance criteria.
- A short work log is updated when code changes, so the next session starts from it.

## Present

Show the user a compact summary: a role table (role, who/what model, subagent or skill, never does), the pipeline in one line, the gates, and what you left out and why. Ask: is this OK, or what would you change? Apply changes.

## Write

`docs/workflow.md` from `templates/workflow.md`. Mark phase 4 `done`.
