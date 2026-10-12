// Cross-platform entrypoint for the native editable PowerPoint exporter.
// Prefer the project's isolated Python environment; fall back to PYTHON/python3.
"use strict";
const fs = require("fs");
const path = require("path");
const {spawnSync} = require("child_process");

const root = path.resolve(__dirname, "..");
const projectEnv = path.join(root, ".venv", process.platform === "win32" ? "Scripts/python.exe" : "bin/python");
const python = process.env.PYTHON || (fs.existsSync(projectEnv) ? projectEnv : (process.platform === "win32" ? "python" : "python3"));
const args = [path.join(root, "scripts", "export_editable_pptx.py"), ...process.argv.slice(2)];
const result = spawnSync(python, args, {cwd:root, stdio:"inherit", env:process.env});
if (result.error) {
  console.error("Cannot run Python for native editable PPTX export:", result.error.message);
  console.error("Create a Python venv and install requirements-dev.txt; or set PYTHON=/path/to/python.");
  process.exit(1);
}
if (result.status !== 0) {
  if (result.status === null) console.error("Native editable PPTX export terminated:", result.signal || "unknown signal");
  if (result.status === 1) console.error("If Python reports missing 'pptx', install python-pptx in your project venv (requirements-dev.txt).");
  process.exit(result.status || 1);
}
