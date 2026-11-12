@AGENTS.md

# Claude Code specifics

## Skills

- `<skill>` — <when to use it>

## Subagents (`.claude/agents/`)

- `<tester>` (<model>) — <what it tests>. Use it instead of testing in the main session: its output stays in its context.
- `<reviewer>` (<model>, read-only) — independent review of the diff. Pass `model: "<stronger model>"` for risky changes (<areas>).
- Always pass the task reference and the diff target; they don't see this conversation.

Per task: <pipeline from docs/workflow.md, naming the subagent or skill at each step>

## Hooks (`.claude/settings.json`)

- <what each hook does, so the agent doesn't repeat it by hand>

## Working efficiently

- One task per session; `/clear` between unrelated tasks.
- Multi-file work or anything touching <design>: plan first (plan mode), get the user's OK, then implement.
- Broad "where is X" questions: use the Explore subagent and keep only its conclusion.
