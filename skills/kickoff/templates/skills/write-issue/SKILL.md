---
name: write-issue
description: Write, file and maintain GitHub issues for <Project> (<owner>/<repo>) and keep the "<board name>" project board in sync (<Todo → In Progress → Test/QA → Done>). Use when the user reports a bug, gives feedback, asks for a feature or task, asks to "add an issue / add to the board", when work on an issue starts, or when the user confirms an issue and it should move to Done.
---

# write-issue (<Project>)

Every issue lives on the board **<board name>**: <board URL>

## Tooling

- `gh`, logged in with the `project` scope. Scope error → ask the user to run `! gh auth refresh -s project`.
- Write the body to a file in the scratchpad, then pass `--body-file`. Never put a multi-line or non-ASCII body in `--body "..."`.

## Before writing

1. **Search for duplicates**: `gh issue list --repo <owner>/<repo> --state all --search "<keywords>"`. If one exists, comment on or reopen it instead.
2. **One issue = one problem or one deliverable.** Split mixed feedback into separate issues.
3. Gather facts from the conversation, `docs/DEVLOG.md` and the code: what was seen, where, which commit.

## Title (<language>)

- Sentence case. No type prefixes like `Bug:` or `[Feature]`; the type is a label.
- Bugs describe the symptom: `Save button does nothing after login timeout`.
- Features and tasks use the imperative: `Add CSV export to the report page`.
- Understandable without opening the issue; under about 72 characters.

## Body (<language>)

Keep code names, paths, commands and config keys in backticks.

### Bug

```markdown
## Summary
<what is wrong, 1–2 sentences>

## Steps to reproduce
1. ...

## Expected
...

## Actual
...

## Environment
- Device / OS / browser: ...
- Commit / branch: `abc1234` on `<branch>`
- Evidence: screenshot, log, error text

## Acceptance criteria
- [ ] <checkable: "clicking Save stores the record within 1 s">
```

### Feature / change

```markdown
## Problem
<what the user hit, or the feedback and who gave it>

## Proposal
<how it should behave from the user's side, not code>

## Alternatives considered
<if any>

## Acceptance criteria
- [ ] Given <state> when <action> then <visible result>
```

### Task (setup, tuning, content, docs)

```markdown
## Goal
<what and why>

## Scope
- ...

## Done when
- [ ] ...
```

Rules for every body:
- **Acceptance criteria are required**, each checkable by using the product or by a test. No "works well".
- Link related work: `Related to #12`, `Follow-up of #8`, and the plan section when relevant (`docs/plan.md` §4).
- No AI attribution lines in issues.

## Labels

Use labels that already exist (`gh label list --repo <owner>/<repo>`). Never invent new ones without asking. One **type** label and one or two **area** labels:

| Type | Use for |
|---|---|
| `bug` | Something that worked or should work is broken |
| `enhancement` | New feature or change |
| `documentation` | Docs only |

| Area | Use for |
|---|---|
| `<area>` | <from the plan> |

## Filing

Show the user the drafted title, labels and body first, unless they asked you to file it directly.

```bash
URL=$(gh issue create --repo <owner>/<repo> --title "<title>" --body-file <scratchpad>/issue.md --label <type> --label <area>)
ITEM=$(gh project item-add <number> --owner <owner> --url "$URL" --format json --jq .id)
PROJECT_ID=$(gh project view <number> --owner <owner> --format json --jq .id)
gh project field-list <number> --owner <owner> --format json   # Status field id and option ids
gh project item-edit --id "$ITEM" --project-id "$PROJECT_ID" --field-id <status field id> --single-select-option-id <Todo option id>
```

Look ids up at run time; don't hard-code them.

## Keeping the board honest

- **Starting work**: Status → `In Progress`.
- **Implemented and checked**: post the evidence (test/QA comment), Status → `<Test/QA>`, keep the issue open. Mention `#<n>` in the commit body when it fits.
- **User confirmed**: `gh issue close <n> --reason completed`, Status → `Done`. Close straight from `In Progress` only when there is nothing to check by hand (docs, setup), and say so in a comment.
- **Won't do**: comment why and close with `--reason "not planned"`.
- **New feedback during a session**: file it right away so it isn't lost, even if you fix it in the same session.

When you finish, give the user the issue numbers and links, and the board link.
