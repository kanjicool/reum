# AGENTS.md — <Project name>

Shared instructions for every coding agent. Keep this file short: it is loaded every session.

## Project

<What it is, for whom, platform. Team and time available. What is being worked on now.> Details: `docs/concept.md`.

- Talk to the user in **<language>**. Write code, comments and commit messages in **<language>**.
- The user decides <design / scope / ...>. Propose; don't decide.

## Where to look (read only what the task needs)

| Need | Open |
|---|---|
| What happened last session / what's next | Top 1–2 entries of `docs/DEVLOG.md` only |
| Scope, milestones, status | `docs/plan.md` (§4 milestones, §7 status). Grep for the section you need |
| Why the project exists, what is out of scope | `docs/concept.md` |
| Roles and process | `docs/workflow.md` |
| Task list | <tracker and how to list tasks> |

Never read whole documents "for context". Grep first, then read the section.

## Code map

- `<dir>` — <what lives here>

## Rules

- <project-specific rule an agent would otherwise get wrong>

## Checks before calling a task done

1. `<lint command>` → <expected>
2. `<test command>` → <expected>
3. <try the acceptance criteria for real>
4. Report real results. If a check was not run, say so.

## Workflow

1. One task per session, tied to one task with acceptance criteria. No task yet → write one first.
2. Change only what the task needs. Ask before scope changes.
3. <work log rule: when code changed, add an entry at the top of `docs/DEVLOG.md`; keep at most 3; move the oldest to `docs/DEVLOG_ARCHIVE.md`>
4. Commit only when the user asks.

## Roles

Whoever wrote the code does not test or review it. Role instructions: `.claude/agents/<name>.md`; agents without subagent support can follow those files as plain instructions. Full process: `docs/workflow.md`.

## Saving tokens

- Grep before reading; read line ranges of big files; don't re-read files you already have.
- Summarize long tool output instead of pasting it back.
- Large searches → delegate to a sub-agent or search tool and keep only the conclusion.
