# reum

[English](#english) · [ภาษาไทย](#ภาษาไทย)

> **Status: v0.1.0, being improved.** The first experiment showed that reum makes small projects cost more tokens, not fewer. See [Experiment 1](#experiment-1-does-reum-save-tokens). The next version adds scaling by project size.

## English

A Claude Code plugin for starting a project. Type `/kickoff` and the agent asks about goals and scope, writes a plan, helps you pick skills, designs a workflow, then generates `AGENTS.md` and `CLAUDE.md`.

It works for new projects and for projects that already have code.

### Install

```
/plugin marketplace add kanjicool/reum
/plugin install reum@reum
```

Try it locally without installing:

```
claude --plugin-dir /path/to/reum
```

### Usage

Open Claude Code in your project folder and type `/kickoff`.

| Phase | What the agent does | Output |
|---|---|---|
| 0 Survey | Checks whether the project is new, docs only, or already has code | `docs/.reum-state.md` |
| 1 Concept | Asks about overview, purpose, expected outcome, timeline, scope | `docs/concept.md` |
| 2 Plan | Asks about the stack and examples, researches and proposes options if there are none, breaks the work into milestones, and picks where tasks are tracked (GitHub Project, another tracker, or a checklist) | `docs/plan.md` or `docs/plan/` |
| 3 Skills | Finds skills that fit the work and shows them in a table for you to choose from. Always offers `write-issue` when a tracker is used | chosen skills in `.claude/skills/` |
| 4 Workflow | Proposes roles, a model for each role, and the steps for one task | `docs/workflow.md` |
| 5 Generate | Writes the files every session reads and, if you agree, creates the board, labels and the first milestone's issues | `AGENTS.md`, `CLAUDE.md`, `.claude/agents/`, `.claude/skills/write-issue/`, `docs/DEVLOG.md` |

Every phase ends by writing a file and waiting for your OK. You can stop anywhere. Typing `/kickoff` in a new session continues from the unfinished phase.

### Principles

Taken from building the game [slop_pets](https://github.com/kanjicool/slop_pets) (branch `demo`).

- **`AGENTS.md` is short and points elsewhere.** It loads every session, so it keeps only a "need → file" table and project-specific rules. The content lives in `docs/`.
- **`CLAUDE.md` doesn't repeat `AGENTS.md`.** Its first line is `@AGENTS.md`; the rest is Claude Code specifics.
- **Whoever writes the code doesn't test or review it.** The tester and reviewer are separate subagents that can't edit code and must report with evidence.
- **The model matches the risk.** Judgment work gets the strongest model. Work that can be checked with evidence gets a cheaper one.
- **The user decides, the agent proposes.** Every phase needs an "OK" before moving on.
- **A short DEVLOG.** It keeps the last 3 entries, and a new session reads only the top one. An optional Stop hook makes the agent write an entry when code changes.

### Experiment 1: does reum save tokens?

2026-11-12. A one-page income/expense web app (Vite + TypeScript + Vitest + Chart.js) with 3 features, built twice. **A** used the full `/kickoff` setup, with a Haiku tester and a Sonnet reviewer. **B** was plain Claude Code in an empty folder. Both ran headless `claude -p` on Opus 5.5 with the same prompts and a fresh session per feature. Two blind Sonnet judges checked the code.

| | A (reum) | B (plain) |
|---|---|---|
| Tokens, 3 features | 1,932,080 | 1,117,904 |
| Cost | $1.86 | $1.39 |
| Time | 477 s | 305 s |
| Checklist | 14/14 | 14/14 |
| Unit tests | 36 | 32 |

- **No savings on a small project.** A used ×1.73 the tokens and ×1.34 the cost. `/kickoff` itself added another 1.78M tokens once.
- **The main session is the cost, not the subagents.** The tester and reviewer were about 10% of A's cost. Most of it came from reading `AGENTS.md`, the plan and the DEVLOG, and writing the DEVLOG and plan status, on every feature.
- **The workflow did catch real bugs.** A's tester found an amount of `0.001` shown as `0.00`. A's reviewer found data silently lost when the localStorage save fails. Both bugs are still in B.
- **Limits:** one run per setup, no human in the loop, short prompts that already gave the full requirements, and tasks too small for the planning docs to pay off.

**Being worked on next:**

1. Workflow presets by project size. A small project gets one combined test-and-review subagent, or runs it only on risky features.
2. Less doc work per feature: update the DEVLOG only when there is something to carry over, and keep status in one place.
3. `AGENTS.md` under 40 lines.
4. A quick `/kickoff` mode for small projects that only writes `AGENTS.md` and the plan.
5. A token-counting script in the plugin, so users can measure their own sessions.

Next experiment: 6 or more features, short real-world prompts, at least 3 runs per setup, one run with a human in the loop, and a small-preset reum compared against A and B.

### Repo layout

```
.claude-plugin/          plugin.json, marketplace.json
skills/kickoff/
  SKILL.md               phase controller (short, loaded first)
  references/            per-phase instructions, loaded when that phase starts
  templates/             templates for the files generated in the project
```

---

## ภาษาไทย

> **สถานะ: v0.1.0 กำลังปรับปรุง** ผลทดลองครั้งแรกพบว่างานเล็กใช้ token มากกว่าเดิม ไม่ได้ประหยัดลง ดู[ผลทดลองครั้งที่ 1](#ผลทดลองครั้งที่-1-reum-ประหยัด-token-ไหม) เวอร์ชันถัดไปจะปรับ workflow ตามขนาดงาน

Plugin สำหรับ Claude Code ที่ช่วยตั้งต้นโปรเจค พิมพ์ `/kickoff` แล้ว agent จะถามเป้าหมายกับขอบเขตงาน เขียนแผน ช่วยเลือก skill ออกแบบ workflow แล้วสร้าง `AGENTS.md` กับ `CLAUDE.md` ให้

ใช้ได้ทั้งโปรเจคใหม่และโปรเจคที่มีโค้ดอยู่แล้ว

### ติดตั้ง

```
/plugin marketplace add kanjicool/reum
/plugin install reum@reum
```

ลองจากเครื่องตัวเองโดยไม่ติดตั้ง:

```
claude --plugin-dir /path/to/reum
```

### ใช้งาน

เปิด Claude Code ใน folder ของโปรเจค แล้วพิมพ์ `/kickoff`

| Phase | Agent ทำอะไร | ได้ไฟล์ |
|---|---|---|
| 0 สำรวจ | ดูว่าเป็นโปรเจคใหม่ มีแต่เอกสาร หรือมีโค้ดแล้ว | `docs/.reum-state.md` |
| 1 Concept | ถามภาพรวม จุดประสงค์ ผลที่คาดหวัง ระยะเวลา ขอบเขต | `docs/concept.md` |
| 2 Plan | ถาม stack กับตัวอย่าง ถ้าไม่มีจะค้นแล้วเสนอ แตกงานเป็น milestone และเลือกที่ track งาน (GitHub Project, tracker อื่น หรือ checklist) | `docs/plan.md` หรือ `docs/plan/` |
| 3 Skills | ค้น skill ที่เกี่ยวกับงาน สรุปเป็นตารางให้เลือก ถ้าใช้ tracker จะเสนอ `write-issue` เสมอ | skill ที่เลือกใน `.claude/skills/` |
| 4 Workflow | เสนอ role, model ของแต่ละ role และขั้นตอนต่อหนึ่งงาน | `docs/workflow.md` |
| 5 Generate | สร้างไฟล์ที่ agent อ่านทุก session และถ้าตกลงจะสร้าง board, labels กับ issue ของ milestone แรก | `AGENTS.md`, `CLAUDE.md`, `.claude/agents/`, `.claude/skills/write-issue/`, `docs/DEVLOG.md` |

ทุก phase จบด้วยการเขียนไฟล์และรอผู้ใช้ตกลง หยุดกลางทางได้ พิมพ์ `/kickoff` ใน session ใหม่แล้วจะทำต่อจาก phase ที่ค้าง

### หลักที่ใช้

ถอดมาจากการทำเกม [slop_pets](https://github.com/kanjicool/slop_pets) (branch `demo`)

- **`AGENTS.md` สั้นและชี้ไปที่อื่น**: ไฟล์นี้โหลดทุก session จึงเก็บแค่ตาราง "อยากรู้อะไรให้เปิดไฟล์ไหน" กับกฎเฉพาะโปรเจค เนื้อหาอยู่ใน `docs/`
- **`CLAUDE.md` ไม่ซ้ำกับ `AGENTS.md`**: บรรทัดแรกคือ `@AGENTS.md` ที่เหลือมีแต่เรื่องเฉพาะ Claude Code
- **คนเขียนโค้ดไม่ test และไม่ review งานตัวเอง**: tester กับ reviewer เป็น subagent แยก แก้โค้ดไม่ได้ และต้องรายงานพร้อมหลักฐาน
- **เลือก model ตามความเสี่ยงของงาน**: งานตัดสินใจใช้ model แรงสุด งานที่ตรวจด้วยหลักฐานได้ใช้ model ถูกกว่า
- **ผู้ใช้ตัดสินใจ agent เสนอ**: ทุก phase ต้องได้คำตอบ "ตกลง" ก่อนไปต่อ
- **DEVLOG สั้น**: เก็บ 3 รายการล่าสุด session ใหม่อ่านแค่รายการบนสุด มี Stop hook บังคับให้เขียนเมื่อโค้ดเปลี่ยน (เลือกติดตั้งได้)

### ผลทดลองครั้งที่ 1: reum ประหยัด token ไหม

ทดลองเมื่อ 2026-11-12 โดยทำเว็บรายรับรายจ่ายหน้าเดียว (Vite + TypeScript + Vitest + Chart.js) 3 feature สองชุด ชุด **A** ตั้งค่าผ่าน `/kickoff` ครบ มี tester เป็น Haiku และ reviewer เป็น Sonnet ส่วนชุด **B** ใช้ Claude Code ธรรมดาใน folder เปล่า ทั้งสองชุดรัน `claude -p` แบบ headless บน Opus 5.5 ด้วย prompt เดียวกัน และเปิด session ใหม่ทุก feature จากนั้นให้ judge Sonnet 2 ตัวตรวจโค้ดแบบ blind

| | A (reum) | B (ธรรมดา) |
|---|---|---|
| Token รวม 3 feature | 1,932,080 | 1,117,904 |
| ค่าใช้จ่าย | $1.86 | $1.39 |
| เวลา | 477 s | 305 s |
| Checklist | 14/14 | 14/14 |
| Unit test | 36 | 32 |

- **งานเล็กไม่ประหยัด**: A ใช้ token ×1.73 และเงิน ×1.34 ของ B ยังไม่รวม `/kickoff` ที่ใช้อีก 1.78M token (ครั้งเดียว)
- **ตัวการคือ main session ไม่ใช่ subagent**: tester กับ reviewer คิดเป็นราว 10% ของค่าใช้จ่าย A ส่วนใหญ่มาจากการอ่าน `AGENTS.md`, plan, DEVLOG และเขียน DEVLOG กับสถานะใน plan ทุก feature
- **workflow จับ bug จริงได้**: tester ของ A เจอว่าจำนวน `0.001` แสดงเป็น `0.00` และ reviewer ของ A เจอว่า save ลง localStorage ล้มเหลวแล้วข้อมูลหายเงียบ ทั้งสองข้อยังอยู่ในชุด B
- **ข้อจำกัด**: รันชุดละรอบเดียว ไม่มีคนในวง prompt ให้ requirement ครบแล้ว และงานสั้นเกินกว่าที่เอกสารจะคุ้ม

**กำลังปรับปรุง:**

1. Workflow แบบ preset ตามขนาดงาน งานเล็กรวม tester กับ reviewer เป็น subagent ตัวเดียว หรือเรียกเฉพาะ feature ที่เสี่ยง
2. ลดงานเอกสารต่อ feature: เขียน DEVLOG เฉพาะตอนมีเรื่องค้าง และเก็บสถานะไว้ที่เดียว
3. ตัด `AGENTS.md` ให้ต่ำกว่า 40 บรรทัด
4. โหมด `/kickoff` แบบเร็วสำหรับโปรเจคเล็ก สร้างแค่ `AGENTS.md` กับ plan
5. ใส่ script นับ token ใน plugin ให้ผู้ใช้วัดเองได้

ทดลองครั้งถัดไป: งาน 6 feature ขึ้นไป ใช้ prompt สั้นแบบคนพิมพ์จริง รันชุดละ 3 รอบขึ้นไป มีคนในวงอย่างน้อย 1 รอบ และเพิ่มชุด reum แบบ preset เล็กเทียบกับ A และ B

### โครงสร้าง repo

```
.claude-plugin/          plugin.json, marketplace.json
skills/kickoff/
  SKILL.md               ตัวคุมลำดับ phase (สั้น โหลดก่อน)
  references/            คำสั่งของแต่ละ phase โหลดเมื่อถึง phase นั้น
  templates/             แม่แบบของไฟล์ที่สร้างให้โปรเจค
```
