# Phase 5 — Generate

Goal: the files that make every future session cheap to start. Everything here is derived from `docs/concept.md`, `docs/plan*` and `docs/workflow.md`; re-read those now instead of relying on the conversation.

## Files

| File | From | Notes |
|---|---|---|
| `AGENTS.md` | `templates/AGENTS.md` | For every coding agent. Target under 100 lines. |
| `CLAUDE.md` | `templates/CLAUDE.md` | Only if the user works with Claude Code. First line imports `AGENTS.md`; the rest is Claude-specific. Target under 40 lines. |
| `.claude/agents/<role>.md` | `templates/agents/*.md` | One per subagent role in `docs/workflow.md`. |
| `docs/DEVLOG.md`, `docs/DEVLOG_ARCHIVE.md` | `templates/DEVLOG.md` | Only if the workflow has a work log. |
| `.claude/hooks/devlog-check.js` + entry in `.claude/settings.json` | `templates/hooks/devlog-check.js` | Optional. Ask first. Needs Node. |

Other tools (Cursor, Codex, Gemini CLI) read `AGENTS.md` directly; don't create extra files for them unless the user asks.

## What makes these files save tokens

They are loaded in every session, so every line costs every time.

- **Point, don't copy.** `AGENTS.md` holds a "where to look" table that maps a need to a file and section. The content stays in `docs/`.
- **Only what an agent would get wrong without being told**: project-specific rules, the exact check commands, who decides what. No generic advice ("write clean code"), nothing the agent can see by listing the directory.
- **Tell agents how to read**: grep first, read the section not the file, read only the top entries of the log.
- **One source of truth.** A rule lives in `AGENTS.md` or in a skill or in a doc, not in two of them. `CLAUDE.md` never repeats `AGENTS.md`.
- Fill every placeholder with real project facts. Delete template sections that don't apply instead of leaving them empty.

## Subagents

For each one: a description that says when to use it and what to pass in (it does not see the conversation), the tools it needs and no more (testers and reviewers get no edit tools), the model from `docs/workflow.md`, the steps, and a fixed short report format. Replace the template's generic steps with this project's real commands and paths.

## Hook (optional)

Offer the Stop hook that blocks finishing while source files are newer than `docs/DEVLOG.md`. Explain in one line what it does. If the user wants it: copy the script, set `SRC_DIRS` to the project's source directories, and add the `Stop` entry to `.claude/settings.json` (merge with existing settings; don't replace the file). A formatter-on-edit hook is worth offering too if the project has a formatter.

## Existing setup

If `AGENTS.md`, `CLAUDE.md` or `.claude/` already exist: read them, keep what is project-specific and still true, and show the user the proposed result before writing. If `CLAUDE.md` exists without `AGENTS.md`, propose moving the tool-neutral parts into `AGENTS.md`.

## Check before finishing

1. Every path mentioned in `AGENTS.md`, `CLAUDE.md` and the agents exists.
2. Every check command in `AGENTS.md` runs (or is marked "set up in milestone N").
3. Line counts: report them. Over target → cut, don't excuse.
4. No leftover `<placeholder>` text: `grep -rn '<[a-z][^>]*>' AGENTS.md CLAUDE.md .claude/agents docs/workflow.md`.
5. Mark phase 5 `done`.

Nothing is committed unless the user asks.
