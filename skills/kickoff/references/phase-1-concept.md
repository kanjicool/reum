# Phase 1 — Concept

Goal: `docs/concept.md` says what is being built, for whom, why, by when, and what is out of scope, in a form a new agent can read in two minutes.

## What you need to know

1. **Overview**: what it is, in one or two sentences, and who uses it.
2. **Purpose**: the problem it solves or the question it answers. For a demo or prototype: the hypothesis it must prove.
3. **Expected outcome**: what exists when this is "done", and how the user will tell it worked (something that can be checked).
4. **Timeline**: target date or duration, and how much time is available (people, hours per day or week).
5. **Scope**: what is in, what is explicitly out, what is faked or deferred.
6. **Who decides what**: which decisions the user keeps (design, taste, money, anything shown to customers) and which the agent may make alone.
7. **Constraints and risks**: platform, budget, compliance, the part most likely to fail.

## How to ask

- Start open: ask the user to describe the project in their own words. Extract as many of the seven items as you can from the answer and from anything found in phase 0.
- Then ask only for what is missing, at most 3 questions per turn, each with a suggested answer.
- Push back once on vague answers. "Works well" is not an outcome; ask what they would look at to judge it. An empty out-of-scope list means scope was not discussed; propose two or three things to cut.
- If timeline and scope disagree (three months of features, two weeks of time), say so with rough numbers and ask which gives.
- Also ask once: which language for the docs, and which for agent files and code comments.
- Stop asking when the seven items are covered or the user has said "assume". Usually two or three rounds.

## Write

`docs/concept.md` from `templates/concept.md`. Keep it under about 80 lines. Anything unknown goes under "Open questions" with who can answer it.

Show the user a summary (not the whole file) and ask if it is right. Apply corrections, then mark phase 1 `done`.
