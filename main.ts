// The Moon Finally Answers Back — make.fun entry.
// Writes the Moon's one-line comeback to entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "You howl, you wish, you beg the sky — four billion years of it, and your best wish is still 'make him text back'? He's not going to. I can see him from up here.";

function gate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 240) {
    throw new Error(`gate: ${chars} chars, need 1-240`);
  }
  if (line.trim().length === 0) {
    throw new Error("gate: whitespace only");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("gate: must be a single line");
  }
  for (const ch of line) {
    if (ch.charCodeAt(0) < 32) {
      throw new Error("gate: control character");
    }
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
gate(LINE);
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");
const back = readFileSync(target, "utf8");
if (back !== LINE) {
  throw new Error("gate: read-back mismatch");
}
const bytes = Buffer.byteLength(back, "utf8");
if (bytes !== Buffer.byteLength(LINE, "utf8")) {
  throw new Error(`gate: byte length mismatch (${bytes})`);
}
console.log(`entry ok: ${[...LINE].length} chars, ${bytes} bytes`);
