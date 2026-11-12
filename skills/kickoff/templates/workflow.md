# <Project name> — Workflow

Agreed with the user on <date>. Change this file when the way of working changes; `AGENTS.md` and `.claude/agents/` follow it.

## Roles

| Role | Who / model | Form | Does | Never does |
|---|---|---|---|---|
| <Designer> | User + <strongest model> | main session | decides design and scope, approves plans | |
| <Implementer> | <model> | main session | implements one task | tests or reviews own work |
| <Tester> | <model> | subagent `<name>` | checks acceptance criteria, reports evidence | edits code |
| <Reviewer> | <model> (<stronger model> for risky areas) | subagent `<name>` | reads the diff, reports findings | edits code |
| <Domain analyst> | <strongest model> | skill `<name>` | measures, models, proposes | decides |

## One task, start to finish

<task with acceptance criteria> → <plan, user approves> → <implement> → <test> → <review> → <log> → <user confirms> → done

## Gates (the user must say yes)

- <plan for anything touching design or more than one area>
- <...>

Risky areas (stronger reviewer): <money, auth, data, public surface>

## Rules

- Whoever wrote the code does not test or review it.
- Reports state what was observed, with evidence. Not verified → "not tested", never "passed".
- One task per session.
- <work log rule>

## Task tracking

- Tracker: <GitHub Issues + Project "<board name>" (URL) | other | checklist in plan §7>
- Statuses: <Todo → In Progress → Test/QA → Done>; only the user's confirmation moves a task to Done.
- Labels: type <bug, enhancement, documentation> · area <from the plan>
- Every task has acceptance criteria that a tester can check. Skill: `write-issue`.

## Skills

| Skill | Used by | For |
|---|---|---|

Add when needed: <skills deferred until there is something to use them on>
