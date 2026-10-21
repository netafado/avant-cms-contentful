#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";

const FILE = "src/lib/contentful/__generated/sdk.ts";

/**
 * @graphql-codegen/typescript-operations v6 re-emits input object types that
 * the base typescript plugin already emitted, producing TS2300 duplicate
 * identifiers. Until that's resolved upstream, drop every repeated top-level
 * declaration (header plus body), keeping the first occurrence.
 */
const source = readFileSync(FILE, "utf8");
const lines = source.split("\n");

const seen = new Set();
const output = [];
let skipping = false;
let depth = 0;

for (const line of lines) {
  if (skipping) {
    depth += (line.match(/\{/g) || []).length;
    depth -= (line.match(/\}/g) || []).length;
    const trimmed = line.trim();
    if (
      depth === 0 &&
      (trimmed.endsWith(";") || trimmed === "}" || trimmed === "};")
    ) {
      skipping = false;
    }
    continue;
  }

  const match = line.match(/^export (?:type|interface|enum) ([A-Za-z0-9_]+)/);
  if (match && seen.has(match[1])) {
    skipping = true;
    depth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
    continue;
  }

  if (match) {
    seen.add(match[1]);
  }
  output.push(line);
}

writeFileSync(FILE, output.join("\n"));
console.log(`dedupe-codegen: kept ${seen.size} declarations`);
