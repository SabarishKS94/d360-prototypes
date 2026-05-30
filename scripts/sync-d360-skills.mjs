/**
 * Syncs D360 UX Cursor rules from the central skills repo into `.cursor/rules/d360/`.
 *
 * Invoked via `npm run skills:sync`.
 *
 * Clones the d360-ux-skills repo (Soma), copies `cursor-rules/*.mdc` into
 * the project's `.cursor/rules/d360/` directory (gitignored).
 *
 * Requires: git on PATH, SSH access to git.soma.salesforce.com.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const DEST = path.join(REPO_ROOT, '.cursor', 'rules', 'd360');

const REPO_URL = 'git@git.soma.salesforce.com:lizzie-li/d360-ux-skills.git';
const BRANCH = 'main';
const SOURCE_DIR = 'cursor-rules';

function runGit(args) {
    const result = spawnSync('git', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    if (result.error) {
        throw result.error;
    }
    if (result.status !== 0) {
        const stderr = result.stderr?.toString().trim();
        if (stderr) console.error(stderr);
        process.exit(result.status ?? 1);
    }
}

const tmpBase = fs.mkdtempSync(path.join(os.tmpdir(), 'd360-skills-'));
const cloneDir = path.join(tmpBase, 'repo');

try {
    console.log('sync-d360-skills: fetching cursor rules from d360-ux-skills...');
    runGit(['clone', '--depth', '1', '--branch', BRANCH, REPO_URL, cloneDir]);

    const sourceRoot = path.join(cloneDir, SOURCE_DIR);
    if (!fs.existsSync(sourceRoot)) {
        console.error(`sync-d360-skills: expected directory missing: ${sourceRoot}`);
        console.error('The cursor-rules directory may not exist in the skills repo yet.');
        process.exit(1);
    }

    // Clear existing synced rules and recreate
    fs.rmSync(DEST, { recursive: true, force: true });
    fs.mkdirSync(DEST, { recursive: true });

    // Copy all .mdc files
    const files = fs.readdirSync(sourceRoot).filter(f => f.endsWith('.mdc'));
    for (const file of files) {
        fs.cpSync(path.join(sourceRoot, file), path.join(DEST, file));
    }

    console.log(`sync-d360-skills: synced ${files.length} rules to ${DEST}`);
    console.log('  Rules:', files.map(f => f.replace('.mdc', '')).join(', '));
} finally {
    fs.rmSync(tmpBase, { recursive: true, force: true });
}
