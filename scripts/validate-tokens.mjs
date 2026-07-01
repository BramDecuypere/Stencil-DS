#!/usr/bin/env node
/**
 * CI "validate" step — checks the DTCG token source (packages/tokens/tokens/)
 * before it ever reaches Style Dictionary:
 *
 *   1. Schema — every leaf token has a `$value`; a `$type` is resolvable for
 *      it, either on the token itself or inherited from an ancestor group
 *      (DTCG allows `$type` to be set once on a group and inherited).
 *   2. No orphan references — every `{path.to.token}` alias in the semantic
 *      tier resolves to a real primitive token path.
 *   3. No duplicate tokens — the same dot-path isn't defined twice across
 *      sibling files in the same tier (Style Dictionary would silently let
 *      one clobber the other).
 *
 * Exits non-zero (CI-failing) on any violation.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = 'packages/tokens/tokens';

/** Recursively collect every JSON token file under a glob-ish directory. */
async function collectJsonFiles(dir) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await collectJsonFiles(full)));
    } else if (entry.name.endsWith('.json')) {
      out.push(full);
    }
  }
  return out;
}

/**
 * Walk a parsed DTCG tree, yielding { tokenPath, value, type, file } for
 * every leaf (a node with `$value`), and recording every group-level
 * `$type` it inherits along the way.
 */
function* walk(node, file, prefix = [], inheritedType) {
  if (node === null || typeof node !== 'object') return;

  const ownType = typeof node.$type === 'string' ? node.$type : inheritedType;

  if (Object.prototype.hasOwnProperty.call(node, '$value')) {
    yield { tokenPath: prefix.join('.'), value: node.$value, type: ownType, file };
    return;
  }

  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    yield* walk(child, file, [...prefix, key], ownType);
  }
}

async function loadTier(dir) {
  const files = await collectJsonFiles(dir);
  /** @type {Map<string, {value: unknown, type: string|undefined, file: string}[]>} */
  const byPath = new Map();
  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    let json;
    try {
      json = JSON.parse(raw);
    } catch (err) {
      throw new Error(`${file}: invalid JSON — ${err.message}`);
    }
    for (const tok of walk(json, file)) {
      const list = byPath.get(tok.tokenPath) ?? [];
      list.push(tok);
      byPath.set(tok.tokenPath, list);
    }
  }
  return byPath;
}

const ALIAS_RE = /^\{(.+)\}$/;

async function main() {
  const errors = [];

  const primitives = await loadTier(path.join(ROOT, 'primitive'));
  const semanticDirs = await fs
    .readdir(path.join(ROOT, 'semantic'), { withFileTypes: true })
    .catch(() => []);

  // 1. Schema — every leaf must resolve a $type.
  const checkSchema = (byPath, tierLabel) => {
    for (const [tokenPath, defs] of byPath) {
      for (const def of defs) {
        if (!def.type) {
          errors.push(
            `[schema] ${tierLabel} "${tokenPath}" (${def.file}) has $value but no resolvable $type.`,
          );
        }
      }
      // 3. Duplicates — same path defined in more than one file.
      const files = [...new Set(defs.map((d) => d.file))];
      if (files.length > 1) {
        errors.push(
          `[duplicate] ${tierLabel} "${tokenPath}" is defined in multiple files: ${files.join(', ')}`,
        );
      }
    }
  };

  checkSchema(primitives, 'primitive');

  for (const entry of semanticDirs) {
    if (!entry.isDirectory()) continue;
    const theme = entry.name;
    const semantic = await loadTier(path.join(ROOT, 'semantic', theme));
    checkSchema(semantic, `semantic/${theme}`);

    // 2. Orphan references — every {alias} must resolve to a real primitive path.
    for (const [tokenPath, defs] of semantic) {
      for (const def of defs) {
        if (typeof def.value !== 'string') continue;
        const m = def.value.match(ALIAS_RE);
        if (!m) continue;
        const refPath = m[1];
        if (!primitives.has(refPath)) {
          errors.push(
            `[orphan] semantic/${theme} "${tokenPath}" (${def.file}) references "{${refPath}}", which does not exist in tokens/primitive/.`,
          );
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error(`✗ Token validation failed with ${errors.length} issue(s):\n`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  const primitiveCount = [...primitives.keys()].length;
  const semanticCount = (
    await Promise.all(
      semanticDirs
        .filter((e) => e.isDirectory())
        .map((e) => loadTier(path.join(ROOT, 'semantic', e.name))),
    )
  ).reduce((sum, m) => sum + m.size, 0);
  console.log(
    `✓ Token source valid — ${primitiveCount} primitive token(s), ${semanticCount} semantic token def(s) across themes.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
