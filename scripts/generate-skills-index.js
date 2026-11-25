const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SKILLS_DIRS = [
  { path: '.agents/skills', source: 'Emil', color: '🟣' },
  { path: '.cursor/skills', source: 'ECC', color: '🔵' },
  { path: '.superpowers/skills', source: 'Superpowers', color: '🟠' },
  { path: '.marketing/skills', source: 'Marketing', color: '🟢' },
  { path: '.vercel-skills/skills', source: 'Vercel', color: '⚫' },
  { path: '.claude-seo/skills', source: 'Claude SEO', color: '🔴' },
  { path: '.agency/skills', source: 'Agency', color: '🔷' },
];

const skills = [];

for (const { path: dirPath, source, color } of SKILLS_DIRS) {
  const fullPath = path.join(process.cwd(), dirPath);
  if (!fs.existsSync(fullPath)) continue;
  
  const dirs = fs.readdirSync(fullPath).filter(d => 
    fs.statSync(path.join(fullPath, d)).isDirectory()
  );
  
  for (const dir of dirs) {
    const skillFile = path.join(fullPath, dir, 'SKILL.md');
    if (!fs.existsSync(skillFile)) continue;
    
    const content = fs.readFileSync(skillFile, 'utf8');
    const { data } = matter(content);
    
    const name = data.name || dir;
    const desc = (data.description || '').slice(0, 80);
    
    skills.push({ name, desc, source, color, path: `${dirPath}/${dir}/SKILL.md` });
  }
}

// Group by source
const grouped = {};
for (const s of skills) {
  if (!grouped[s.source]) grouped[s.source] = [];
  grouped[s.source].push(s);
}

// Generate markdown
let md = `# Skills Index (${skills.length} skills)\n\n`;
md += `> Quick reference for all installed skills. Load only what you need.\n\n`;

for (const [source, items] of Object.entries(grouped)) {
  const color = items[0].color;
  md += `## ${color} ${source} (${items.length})\n\n`;
  md += `| Skill | Description | Path |\n|-------|-------------|------|\n`;
  for (const s of items.sort((a, b) => a.name.localeCompare(b.name))) {
    md += `| ${s.name} | ${s.desc}... | \`${s.path}\` |\n`;
  }
  md += '\n';
}

fs.writeFileSync('SKILLS-INDEX.md', md);
console.log(`Generated SKILLS-INDEX.md with ${skills.length} skills`);
