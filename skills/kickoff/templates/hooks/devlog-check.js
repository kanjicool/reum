// Stop hook: block finishing while any source file is newer than docs/DEVLOG.md,
// so the agent writes a DEVLOG entry after changing code.
//
// .claude/settings.json:
//   { "hooks": { "Stop": [ { "hooks": [ { "type": "command",
//     "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/devlog-check.js\"", "timeout": 30 } ] } ] } }
const fs = require("fs");
const path = require("path");

const SRC_DIRS = ["src"]; // set to this project's source directories
const LOG_FILE = path.join("docs", "DEVLOG.md");
const SKIP = new Set(["node_modules", ".git", "dist", "build", "target", "__pycache__", ".venv"]);

let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
	let input = {};
	try {
		input = JSON.parse(raw || "{}");
	} catch {}
	// Already blocked once for this stop: don't loop.
	if (input.stop_hook_active) process.exit(0);

	const projectDir = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
	const logFile = path.join(projectDir, LOG_FILE);
	const logTime = fs.existsSync(logFile) ? fs.statSync(logFile).mtimeMs : 0;

	const newer = [];
	const walk = (dir) => {
		for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
			if (SKIP.has(e.name)) continue;
			const p = path.join(dir, e.name);
			if (e.isDirectory()) walk(p);
			else if (e.isFile() && fs.statSync(p).mtimeMs > logTime + 1000)
				newer.push(path.relative(projectDir, p).replace(/\\/g, "/"));
		}
	};
	for (const d of SRC_DIRS) {
		const abs = path.join(projectDir, d);
		if (fs.existsSync(abs)) walk(abs);
	}

	if (newer.length > 0) {
		const list = newer.slice(0, 10).join(", ") + (newer.length > 10 ? ` (+${newer.length - 10} more)` : "");
		process.stdout.write(
			JSON.stringify({
				decision: "block",
				reason: `Source files changed after the last ${LOG_FILE.replace(/\\/g, "/")} update (${list}). Add an entry at the top of the DEVLOG using its template (done, files, checks run with real results, open problems, next). Keep at most 3 entries; move the oldest to the top of docs/DEVLOG_ARCHIVE.md. Do this before finishing.`,
			})
		);
	}
	process.exit(0);
});
