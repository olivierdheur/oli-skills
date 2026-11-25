#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SKILLS_DIR = path.join(__dirname, '..', 'skills');
const SKILLS_INDEX = path.join(__dirname, '..', 'skills-index.json');

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

function log(msg) { console.log(msg); }
function success(msg) { console.log(`${colors.green}✓${colors.reset} ${msg}`); }
function info(msg) { console.log(`${colors.blue}ℹ${colors.reset} ${msg}`); }
function warn(msg) { console.log(`${colors.yellow}⚠${colors.reset} ${msg}`); }
function error(msg) { console.log(`${colors.magenta}✗${colors.reset} ${msg}`); }

function loadIndex() {
  try {
    const data = fs.readFileSync(SKILLS_INDEX, 'utf-8');
    return JSON.parse(data);
  } catch {
    error('Skills index not found. Package may be corrupted.');
    process.exit(1);
  }
}

function formatSource(source) {
  const sourceLabels = {
    agents: `${colors.magenta}Emil${colors.reset}`,
    cursor: `${colors.blue}ECC${colors.reset}`,
    superpowers: `${colors.yellow}Superpowers${colors.reset}`,
    marketing: `${colors.green}Marketing${colors.reset}`,
    vercel: `${colors.white}Vercel${colors.reset}`,
    seo: `${colors.magenta}Claude SEO${colors.reset}`,
    agency: `${colors.cyan}Agency${colors.reset}`,
  };
  return sourceLabels[source] || source;
}

function showHelp() {
  log(`
${colors.bold}oli-skills${colors.reset} - 500+ AI agent skills for Cursor

${colors.bold}USAGE${colors.reset}
  npx oli-skills <command> [options]

${colors.bold}COMMANDS${colors.reset}
  ${colors.cyan}install${colors.reset}              Install all skills to current project (.skills/)
  ${colors.cyan}install <skill>${colors.reset}     Install a specific skill
  ${colors.cyan}search <query>${colors.reset}      Search skills by name or description
  ${colors.cyan}list${colors.reset}                List all available skills
  ${colors.cyan}list <source>${colors.reset}       List skills from a source (agents, marketing, etc.)
  ${colors.cyan}show <skill>${colors.reset}        Show a skill's content
  ${colors.cyan}packs${colors.reset}               Show curated skill packs
  ${colors.cyan}init${colors.reset}                Set up skills system in current project
  ${colors.cyan}help${colors.reset}                Show this help message

${colors.bold}EXAMPLES${colors.reset}
  npx oli-skills search animation
  npx oli-skills install animate
  npx oli-skills list marketing
  npx oli-skills show cro

${colors.bold}SOURCES${colors.reset}
  agents (15)      Emil Kowalski's design/animation skills
  cursor (131)     ECC developer skills
  superpowers (15) Workflow and SDLC skills
  marketing (53)   Marketing and growth skills
  vercel (8)       Vercel platform skills
  seo (29)         Claude SEO skills
  agency (262)     Specialized agent skills
`);
}

function searchSkills(query) {
  const index = loadIndex();
  const q = query.toLowerCase();
  
  const results = index.skills.filter(skill => 
    skill.name.toLowerCase().includes(q) ||
    skill.description.toLowerCase().includes(q)
  );

  if (results.length === 0) {
    warn(`No skills found matching "${query}"`);
    return;
  }

  log(`\n${colors.bold}🔍 Found ${results.length} skills matching "${query}"${colors.reset}\n`);
  
  for (const skill of results.slice(0, 20)) {
    log(`  ${formatSource(skill.source)} ${colors.bold}${skill.name}${colors.reset}`);
    log(`    ${colors.dim}${skill.description.slice(0, 80)}${skill.description.length > 80 ? '...' : ''}${colors.reset}`);
    log('');
  }

  if (results.length > 20) {
    info(`Showing 20 of ${results.length} results. Refine your search for more specific results.`);
  }
}

function listSkills(source) {
  const index = loadIndex();
  
  let skills = index.skills;
  if (source) {
    skills = skills.filter(s => s.source === source);
    if (skills.length === 0) {
      error(`Unknown source: ${source}`);
      log(`\nAvailable sources: agents, cursor, superpowers, marketing, vercel, seo, agency`);
      return;
    }
  }

  const bySource = {};
  for (const skill of skills) {
    if (!bySource[skill.source]) bySource[skill.source] = [];
    bySource[skill.source].push(skill);
  }

  log('');
  for (const [src, srcSkills] of Object.entries(bySource)) {
    log(`${colors.bold}━━━ ${formatSource(src)} (${srcSkills.length} skills) ━━━${colors.reset}`);
    for (const skill of srcSkills) {
      log(`  ${skill.name}`);
    }
    log('');
  }
}

function showSkill(skillName) {
  const index = loadIndex();
  const skill = index.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
  
  if (!skill) {
    error(`Skill not found: ${skillName}`);
    log(`\nTry: npx oli-skills search ${skillName}`);
    return;
  }

  const skillPath = path.join(SKILLS_DIR, skill.source, skill.name, 'SKILL.md');
  
  try {
    const content = fs.readFileSync(skillPath, 'utf-8');
    log(`\n${colors.bold}📖 ${skill.name}${colors.reset} ${colors.dim}(${formatSource(skill.source)})${colors.reset}`);
    log(`${colors.dim}${'━'.repeat(60)}${colors.reset}`);
    log(content);
  } catch {
    error(`Could not read skill file: ${skillPath}`);
  }
}

function showPacks() {
  log(`
${colors.bold}📦 Curated Skill Packs${colors.reset}

${colors.cyan}Frontend Development${colors.reset}
  animate, react-best-practices, mobile-native, break-ui
  ${colors.dim}npx oli-skills install animate react-best-practices${colors.reset}

${colors.green}Marketing & Growth${colors.reset}
  cro, copywriting, seo-audit, analytics, ab-testing
  ${colors.dim}npx oli-skills install cro copywriting seo-audit${colors.reset}

${colors.magenta}SEO${colors.reset}
  seo-audit, seo-technical, seo-schema, seo-geo
  ${colors.dim}npx oli-skills install seo-audit seo-technical${colors.reset}

${colors.yellow}Development Workflow${colors.reset}
  brainstorming, writing-plans, test-driven-development, requesting-code-review
  ${colors.dim}npx oli-skills install brainstorming writing-plans${colors.reset}

${colors.blue}Design Engineering${colors.reset}
  emil-design-eng, apple-design, animation-vocabulary, find-animation-opportunities
  ${colors.dim}npx oli-skills install emil-design-eng apple-design${colors.reset}
`);
}

function installSkill(skillName, targetDir) {
  const index = loadIndex();
  const skill = index.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
  
  if (!skill) {
    error(`Skill not found: ${skillName}`);
    return false;
  }

  const sourcePath = path.join(SKILLS_DIR, skill.source, skill.name);
  const destPath = path.join(targetDir, skill.name);

  try {
    fs.cpSync(sourcePath, destPath, { recursive: true });
    success(`Installed ${skill.name} to ${destPath}`);
    return true;
  } catch (err) {
    error(`Failed to install ${skill.name}: ${err.message}`);
    return false;
  }
}

function installAll(targetDir) {
  const index = loadIndex();
  
  log(`\n${colors.bold}Installing ${index.skills.length} skills...${colors.reset}\n`);

  let installed = 0;
  const bySource = {};
  
  for (const skill of index.skills) {
    if (!bySource[skill.source]) bySource[skill.source] = [];
    bySource[skill.source].push(skill);
  }

  for (const [source, skills] of Object.entries(bySource)) {
    const sourceDir = path.join(targetDir, source);
    fs.mkdirSync(sourceDir, { recursive: true });
    
    for (const skill of skills) {
      const sourcePath = path.join(SKILLS_DIR, source, skill.name);
      const destPath = path.join(sourceDir, skill.name);
      
      try {
        fs.cpSync(sourcePath, destPath, { recursive: true });
        installed++;
      } catch {
        warn(`Failed to copy ${skill.name}`);
      }
    }
    success(`Installed ${skills.length} ${source} skills`);
  }

  log('');
  success(`Installed ${installed} skills to ${targetDir}`);
}

function initProject() {
  const cwd = process.cwd();
  const skillsDir = path.join(cwd, '.skills');
  const rulesDir = path.join(cwd, '.cursor', 'rules');
  
  fs.mkdirSync(skillsDir, { recursive: true });
  fs.mkdirSync(rulesDir, { recursive: true });

  const ruleContent = `---
description: Skill discovery and loading system
globs: ["**/*"]
alwaysApply: false
---

# Skills System

You have access to 500+ specialized skills in \`.skills/\`.

## Loading Skills

Don't load skills by default. When a task matches a skill domain, load 1-3 relevant skills:

\`\`\`
Read .skills/agents/animate/SKILL.md
Read .skills/marketing/cro/SKILL.md
\`\`\`

## Finding Skills

Use the CLI to search:
\`\`\`bash
npx oli-skills search animation
npx oli-skills list marketing
npx oli-skills packs
\`\`\`

## Directories

| Directory | Contains |
|-----------|----------|
| \`.skills/agents\` | Design & animation (Emil) |
| \`.skills/cursor\` | Developer skills (ECC) |
| \`.skills/marketing\` | Marketing & growth |
| \`.skills/superpowers\` | Workflow & SDLC |
| \`.skills/vercel\` | Vercel platform |
| \`.skills/seo\` | SEO optimization |
| \`.skills/agency\` | Specialized agents |
`;

  fs.writeFileSync(path.join(rulesDir, 'skills.mdc'), ruleContent);
  success('Created .cursor/rules/skills.mdc');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('\nInstall all 500+ skills now? (y/n) ', (answer) => {
    rl.close();
    if (answer.toLowerCase() === 'y') {
      installAll(skillsDir);
    } else {
      info('You can install skills later with: npx oli-skills install');
    }
    log(`\n${colors.bold}Setup complete!${colors.reset}`);
    log(`\nUsage in Cursor:`);
    log(`  ${colors.dim}Read .skills/agents/animate/SKILL.md${colors.reset}`);
  });
}

// Main CLI
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'help':
  case '--help':
  case '-h':
  case undefined:
    showHelp();
    break;
  
  case 'search':
    if (!args[1]) {
      error('Please provide a search query');
      log('Usage: npx oli-skills search <query>');
    } else {
      searchSkills(args.slice(1).join(' '));
    }
    break;
  
  case 'list':
    listSkills(args[1]);
    break;
  
  case 'show':
    if (!args[1]) {
      error('Please provide a skill name');
      log('Usage: npx oli-skills show <skill>');
    } else {
      showSkill(args[1]);
    }
    break;
  
  case 'packs':
    showPacks();
    break;
  
  case 'install':
    const targetDir = path.join(process.cwd(), '.skills');
    fs.mkdirSync(targetDir, { recursive: true });
    
    if (args[1]) {
      for (const skillName of args.slice(1)) {
        installSkill(skillName, targetDir);
      }
    } else {
      installAll(targetDir);
    }
    break;
  
  case 'init':
    initProject();
    break;
  
  default:
    error(`Unknown command: ${command}`);
    log('Run "npx oli-skills help" for usage');
}
