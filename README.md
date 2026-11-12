# reum

Plugin สำหรับ Claude Code ที่ช่วยตั้งต้นโปรเจค พิมพ์ `/kickoff` แล้ว agent จะถามเป้าหมายกับขอบเขตงาน เขียนแผน ช่วยเลือก skill ออกแบบ workflow แล้วสร้าง `AGENTS.md` กับ `CLAUDE.md` ให้

ใช้ได้ทั้งโปรเจคใหม่และโปรเจคที่มีโค้ดอยู่แล้ว

## ติดตั้ง

```
/plugin marketplace add kanjicool/reum
/plugin install reum@reum
```

ลองจากเครื่องตัวเองโดยไม่ติดตั้ง:

```
claude --plugin-dir /path/to/reum
```

## ใช้งาน

เปิด Claude Code ใน folder ของโปรเจค แล้วพิมพ์ `/kickoff`

| Phase | Agent ทำอะไร | ได้ไฟล์ |
|---|---|---|
| 0 สำรวจ | ดูว่าเป็นโปรเจคใหม่ มีแต่เอกสาร หรือมีโค้ดแล้ว | `docs/.reum-state.md` |
| 1 Concept | ถามภาพรวม จุดประสงค์ ผลที่คาดหวัง ระยะเวลา ขอบเขต | `docs/concept.md` |
| 2 Plan | ถาม stack กับตัวอย่าง ถ้าไม่มีจะค้นแล้วเสนอ จากนั้นแตกเป็น milestone | `docs/plan.md` หรือ `docs/plan/` |
| 3 Skills | ค้น skill ที่เกี่ยวกับงาน สรุปเป็นตารางให้เลือก | skill ที่เลือกใน `.claude/skills/` |
| 4 Workflow | เสนอ role, model ของแต่ละ role และขั้นตอนต่อหนึ่งงาน | `docs/workflow.md` |
| 5 Generate | สร้างไฟล์ที่ agent อ่านทุก session | `AGENTS.md`, `CLAUDE.md`, `.claude/agents/`, `docs/DEVLOG.md` |

ทุก phase จบด้วยการเขียนไฟล์และรอให้ผู้ใช้ตกลง หยุดกลางทางได้ พิมพ์ `/kickoff` ใน session ใหม่แล้วจะทำต่อจาก phase ที่ค้าง

## หลักที่ใช้

ถอดมาจากการทำเกม [slop_pets](https://github.com/kanjicool/slop_pets) (branch `demo`)

- **`AGENTS.md` สั้นและชี้ไปที่อื่น**: มันโหลดทุก session จึงเก็บแค่ตาราง "อยากรู้อะไรให้เปิดไฟล์ไหน" กับกฎเฉพาะโปรเจค เนื้อหาอยู่ใน `docs/`
- **`CLAUDE.md` ไม่ซ้ำกับ `AGENTS.md`**: บรรทัดแรกคือ `@AGENTS.md` ที่เหลือมีแต่เรื่องเฉพาะ Claude Code
- **คนเขียนโค้ดไม่ test และไม่ review งานตัวเอง**: tester กับ reviewer เป็น subagent แยก แก้โค้ดไม่ได้ และต้องรายงานพร้อมหลักฐาน
- **Model ตามความเสี่ยงของงาน**: งานตัดสินใจใช้ model แรงสุด งานที่ตรวจด้วยหลักฐานได้ใช้ model ถูกกว่า
- **ผู้ใช้ตัดสินใจ agent เสนอ**: ทุก phase ต้องได้คำตอบ "ตกลง" ก่อนไปต่อ
- **DEVLOG สั้น**: เก็บ 3 รายการล่าสุด session ใหม่อ่านแค่รายการบนสุด มี Stop hook บังคับให้เขียนเมื่อโค้ดเปลี่ยน (เลือกติดตั้งได้)

## โครงสร้าง repo

```
.claude-plugin/          plugin.json, marketplace.json
skills/kickoff/
  SKILL.md               ตัวคุมลำดับ phase (สั้น โหลดก่อน)
  references/            คำสั่งของแต่ละ phase โหลดเมื่อถึง phase นั้น
  templates/             แม่แบบของไฟล์ที่สร้างให้โปรเจค
```

## สถานะ

v0.1.0 ยังไม่เคยรันกับโปรเจคจริง
