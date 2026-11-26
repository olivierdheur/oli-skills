#!/usr/bin/env node
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const SKILLS_DIRS = [
  { path: ".agents/skills", source: "agents" },
  { path: ".cursor/skills", source: "cursor" },
  { path: ".superpowers/skills", source: "superpowers" },
  { path: ".marketing/skills", source: "marketing" },
  { path: ".vercel-skills/skills", source: "vercel" },
  { path: ".claude-seo/skills", source: "seo" },
  { path: ".agency/skills", source: "agency" },
  { path: ".mattpocock/skills", source: "mattpocock" },
  { path: ".jmanico/skills", source: "jmanico" },
];

const categoryPatterns = [
  { category: "Animation", patterns: [/animat/i, /motion/i, /spring/i, /transition/i, /easing/i] },
  { category: "UI/Design", patterns: [/design/i, /ui\b/i, /component/i, /layout/i, /style/i, /accessibility/i, /a11y/i, /mobile-native/i, /prototype/i, /break-ui/i, /sonner/i, /pick-ui/i] },
  { category: "Security", patterns: [/security/i, /auth/i, /vulnerab/i, /threat/i, /penetration/i, /owasp/i] },
  { category: "Writing", patterns: [/writ/i, /article/i, /content/i, /document/i, /investor/i, /market-research/i, /outreach/i] },
  { category: "Testing", patterns: [/test/i, /tdd/i, /qa\b/i, /e2e/i, /verification/i, /regression/i] },
  { category: "Backend", patterns: [/api/i, /backend/i, /database/i, /django/i, /fastapi/i, /express/i, /graphql/i, /rest\b/i, /server/i, /migration/i] },
  { category: "Frontend", patterns: [/angular/i, /react/i, /vue/i, /svelte/i, /frontend/i, /next/i, /nuxt/i, /remix/i, /astro/i] },
  { category: "AI/Agents", patterns: [/agent/i, /\bai\b/i, /llm/i, /continuous-learning/i, /eval/i, /council/i, /model/i, /subagent/i, /dispatch/i] },
  { category: "DevOps", patterns: [/deploy/i, /ci\b/i, /cd\b/i, /docker/i, /kubernetes/i, /infrastructure/i, /monitoring/i, /worktree/i, /git/i] },
  { category: "Architecture", patterns: [/architect/i, /pattern/i, /clean/i, /structure/i, /onboard/i, /codebase/i, /code-tour/i] },
  { category: "Languages", patterns: [/swift/i, /kotlin/i, /python/i, /typescript/i, /golang/i, /rust/i, /cpp/i, /csharp/i, /java\b/i, /dart/i, /flutter/i, /dotnet/i, /ruby/i, /rails/i, /perl/i, /php/i, /bun/i] },
  { category: "Workflow", patterns: [/brainstorm/i, /plan/i, /execut/i, /finish/i, /review/i, /debug/i, /diagnos/i, /superpowers/i] },
  { category: "Marketing", patterns: [/marketing/i, /seo/i, /cro/i, /copywriting/i, /copy/i, /ads/i, /email/i, /social/i, /landing/i, /conversion/i, /analytics/i, /content/i, /launch/i, /pricing/i, /referral/i, /churn/i, /onboard/i, /popup/i, /paywall/i, /signup/i, /ab-test/i, /competitor/i, /link-build/i, /schema/i, /programmatic/i, /site-arch/i, /aso/i, /cold-email/i, /lead/i, /sales/i, /revops/i, /influencer/i, /community/i, /event/i, /video/i, /image/i, /sms/i, /offer/i, /directory/i, /prospect/i, /attribution/i, /public-relation/i, /co-market/i, /free-tool/i] },
  { category: "Agency", patterns: [/agency/i, /engineer/i, /developer/i, /designer/i, /architect/i, /analyst/i, /specialist/i, /strategist/i, /manager/i, /coordinator/i, /coach/i, /consultant/i, /researcher/i, /producer/i, /writer/i, /editor/i, /reviewer/i, /optimizer/i, /builder/i, /commander/i, /gis/i, /healthcare/i, /finance/i, /project-management/i, /spatial/i, /game-dev/i, /academic/i, /support/i] },
];

function detectCategory(name, description) {
  const text = `${name} ${description}`.toLowerCase();
  for (const { category, patterns } of categoryPatterns) {
    for (const pattern of patterns) {
      if (pattern.test(text)) return category;
    }
  }
  return "Other";
}

function getSkillsFromDir(dirPath, source) {
  const fullDirPath = path.join(ROOT, dirPath);
  if (!fs.existsSync(fullDirPath)) return [];

  const skillDirs = fs.readdirSync(fullDirPath).filter((dir) => {
    const fullPath = path.join(fullDirPath, dir);
    return fs.statSync(fullPath).isDirectory();
  });

  return skillDirs
    .map((slug) => {
      const skillPath = path.join(fullDirPath, slug, "SKILL.md");
      if (!fs.existsSync(skillPath)) return null;

      const fileContents = fs.readFileSync(skillPath, "utf8");
      const { data, content } = matter(fileContents);

      const skillDir = path.join(fullDirPath, slug);
      const files = fs.readdirSync(skillDir).filter((f) => f.endsWith(".md"));
      
      const filesContent = {};
      for (const file of files) {
        filesContent[file] = fs.readFileSync(path.join(skillDir, file), "utf8");
      }

      const skillName = data.name || slug;
      const skillDescription = data.description || "";

      return {
        slug: `${source}/${slug}`,
        name: skillName,
        description: skillDescription,
        content,
        files,
        filesContent,
        source,
        category: detectCategory(skillName, skillDescription),
      };
    })
    .filter(Boolean);
}

function generateIndex() {
  const allSkills = [];
  for (const { path: dirPath, source } of SKILLS_DIRS) {
    allSkills.push(...getSkillsFromDir(dirPath, source));
  }
  allSkills.sort((a, b) => a.name.localeCompare(b.name));

  const outputPath = path.join(ROOT, "src/lib/skills-data.json");
  fs.writeFileSync(outputPath, JSON.stringify(allSkills, null, 2));
  console.log(`Generated ${allSkills.length} skills to src/lib/skills-data.json`);
}

generateIndex();
