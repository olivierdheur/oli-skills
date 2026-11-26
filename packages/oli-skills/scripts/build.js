#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const WORKSPACE = path.join(ROOT, '..', '..');

const SKILL_SOURCES = [
  { source: 'agents', path: '.agents/skills' },
  { source: 'cursor', path: '.cursor/skills' },
  { source: 'superpowers', path: '.superpowers/skills' },
  { source: 'marketing', path: '.marketing/skills' },
  { source: 'vercel', path: '.vercel-skills/skills' },
  { source: 'seo', path: '.claude-seo/skills' },
  { source: 'agency', path: '.agency/skills' },
  { source: 'mattpocock', path: '.mattpocock/skills' },
  { source: 'jmanico', path: '.jmanico/skills' },
  { source: 'heygen', path: '.heygen/skills' },
];

console.log('Building oli-skills package...\n');

// Create dist and skills directories
const distDir = path.join(ROOT, 'dist');
const skillsDir = path.join(ROOT, 'skills');

fs.rmSync(distDir, { recursive: true, force: true });
fs.rmSync(skillsDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(skillsDir, { recursive: true });

// Copy CLI
fs.copyFileSync(
  path.join(ROOT, 'src', 'cli.js'),
  path.join(distDir, 'cli.js')
);
console.log('✓ Copied CLI');

// Build skills index and copy skills
const index = { skills: [], sources: {} };

for (const { source, path: srcPath } of SKILL_SOURCES) {
  const fullPath = path.join(WORKSPACE, srcPath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠ Skipping ${source}: directory not found`);
    continue;
  }

  const destSourceDir = path.join(skillsDir, source);
  fs.mkdirSync(destSourceDir, { recursive: true });

  const skillDirs = fs.readdirSync(fullPath, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  index.sources[source] = skillDirs.length;

  for (const skillName of skillDirs) {
    const skillPath = path.join(fullPath, skillName);
    const skillFile = path.join(skillPath, 'SKILL.md');
    
    if (!fs.existsSync(skillFile)) continue;

    // Read skill metadata
    const content = fs.readFileSync(skillFile, 'utf-8');
    const descMatch = content.match(/description:\s*["']?([^"'\n]+)["']?/);
    const description = descMatch ? descMatch[1].trim() : '';

    index.skills.push({
      name: skillName,
      source,
      description: description.slice(0, 200),
    });

    // Copy skill directory
    fs.cpSync(skillPath, path.join(destSourceDir, skillName), { recursive: true });
  }

  console.log(`✓ Copied ${skillDirs.length} ${source} skills`);
}

// Sort skills alphabetically
index.skills.sort((a, b) => a.name.localeCompare(b.name));

// Write index
fs.writeFileSync(
  path.join(skillsDir, '..', 'skills-index.json'),
  JSON.stringify(index, null, 2)
);
console.log(`\n✓ Created index with ${index.skills.length} skills`);

// Copy index to dist too
fs.copyFileSync(
  path.join(ROOT, 'skills-index.json'),
  path.join(distDir, '..', 'skills-index.json')
);

console.log('\n✓ Build complete!');
console.log(`\nPackage contents:`);
console.log(`  - dist/cli.js`);
console.log(`  - skills/ (${index.skills.length} skills)`);
console.log(`  - skills-index.json`);
