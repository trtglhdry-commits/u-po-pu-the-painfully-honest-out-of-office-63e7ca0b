// The Painfully Honest Out-of-Office — make.fun bounty
// u-po-pu-the-painfully-honest-out-of-office-63e7ca0b
//
// Writes one painfully honest but still polite out-of-office auto-reply
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Deterministic: no randomness, no network, no clock, stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I'm on holiday and, honestly, I won't be reading email — your message is safe in my inbox and I'll reply properly when I'm back, instead of pretending to work from a sun lounger.";

// Gate: the entry must be 1–200 characters (Unicode code points), not only
// whitespace. Fail loudly rather than hand in an invalid entry.
const length = [...LINE].length;
if (length < 1 || length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry length ${length} is outside the 1–200 character gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
