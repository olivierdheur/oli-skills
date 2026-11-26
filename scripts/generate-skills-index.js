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

// Hierarchical category structure: "Parent > Subcategory"
const categoryPatterns = [
  // Security (check first - high priority)
  { category: "Security > Threat Modeling", patterns: [/threat/i, /stride/i, /pasta/i, /linddun/i, /grim-prompter/i] },
  { category: "Security > Logging & Audit", patterns: [/logging/i, /audit/i, /dread-ledger/i, /security.?event/i] },
  { category: "Security > Dependencies", patterns: [/trim-reaper/i, /dependency.?reduc/i, /supply.?chain/i] },
  { category: "Security > Auth", patterns: [/auth/i, /oauth/i, /jwt/i, /session/i, /identity/i, /login/i] },
  { category: "Security > General", patterns: [/security/i, /vulnerab/i, /penetration/i, /owasp/i, /dread-forge/i, /secops/i, /appsec/i] },
  
  // AI & Automation
  { category: "AI > Agents", patterns: [/agent/i, /subagent/i, /sandcastle/i, /orchestrat/i, /agentic/i] },
  { category: "AI > LLM Patterns", patterns: [/llm/i, /prompt/i, /token/i, /context.?window/i, /guardrail/i, /ai-sdk/i] },
  { category: "AI > Coding Dictionary", patterns: [/dictionary/i, /glossary/i, /terminology/i] },
  { category: "AI > Tools", patterns: [/tool.?call/i, /mcp/i, /model.?provider/i] },
  { category: "AI > General", patterns: [/\bai\b/i, /machine.?learn/i, /neural/i, /model(?!ing)/i] },
  
  // Design & UI
  { category: "Design > Animation", patterns: [/animat/i, /motion/i, /spring/i, /transition/i, /easing/i, /keyframe/i] },
  { category: "Design > Components", patterns: [/component/i, /button/i, /dialog/i, /modal/i, /sonner/i, /toast/i] },
  { category: "Design > UI Patterns", patterns: [/design/i, /ui\b/i, /layout/i, /style/i, /accessibility/i, /a11y/i, /mobile-native/i] },
  { category: "Design > Prototyping", patterns: [/prototype/i, /wireframe/i, /mockup/i, /figma/i] },
  
  // Development > Frontend
  { category: "Frontend > React", patterns: [/react/i, /next/i, /remix/i, /jsx/i] },
  { category: "Frontend > Vue", patterns: [/vue/i, /nuxt/i] },
  { category: "Frontend > Other Frameworks", patterns: [/angular/i, /svelte/i, /astro/i, /solid/i] },
  { category: "Frontend > General", patterns: [/frontend/i, /client/i, /browser/i, /dom/i] },
  
  // Development > Backend
  { category: "Backend > API", patterns: [/api/i, /graphql/i, /rest\b/i, /endpoint/i, /route/i] },
  { category: "Backend > Database", patterns: [/database/i, /sql/i, /postgres/i, /mongo/i, /redis/i, /supabase/i] },
  { category: "Backend > Frameworks", patterns: [/django/i, /fastapi/i, /express/i, /nest/i, /rails/i] },
  { category: "Backend > General", patterns: [/backend/i, /server/i, /migration/i] },
  
  // Development > Languages
  { category: "Languages > TypeScript", patterns: [/typescript/i, /ts-reset/i, /zod/i, /type.?safe/i] },
  { category: "Languages > Python", patterns: [/python/i, /pandas/i, /numpy/i, /sklearn/i, /matplotlib/i] },
  { category: "Languages > Rust", patterns: [/rust/i, /cargo/i] },
  { category: "Languages > Swift", patterns: [/swift/i, /swiftui/i, /ios/i] },
  { category: "Languages > Go", patterns: [/golang/i, /\bgo\b/i] },
  { category: "Languages > Other", patterns: [/kotlin/i, /java\b/i, /dart/i, /flutter/i, /ruby/i, /php/i, /cpp/i, /csharp/i, /dotnet/i] },
  
  // Architecture & Patterns
  { category: "Architecture > Patterns", patterns: [/pattern/i, /clean/i, /solid/i, /ddd/i, /hexagonal/i] },
  { category: "Architecture > Codebase", patterns: [/codebase/i, /onboard/i, /code-tour/i, /structure/i] },
  { category: "Architecture > General", patterns: [/architect/i, /system.?design/i, /scalab/i] },
  
  // Operations
  { category: "DevOps > CI/CD", patterns: [/ci\b/i, /cd\b/i, /pipeline/i, /github.?action/i, /deploy/i] },
  { category: "DevOps > Containers", patterns: [/docker/i, /kubernetes/i, /k8s/i, /container/i] },
  { category: "DevOps > Infrastructure", patterns: [/infrastructure/i, /terraform/i, /aws/i, /cloud/i, /vercel/i] },
  { category: "DevOps > Git", patterns: [/git/i, /worktree/i, /branch/i, /merge/i] },
  
  { category: "Testing > Unit", patterns: [/unit.?test/i, /jest/i, /vitest/i, /mocha/i] },
  { category: "Testing > E2E", patterns: [/e2e/i, /playwright/i, /cypress/i, /selenium/i] },
  { category: "Testing > General", patterns: [/test/i, /tdd/i, /qa\b/i, /verification/i] },
  
  // Marketing & Growth
  { category: "Marketing > SEO", patterns: [/seo/i, /search.?engine/i, /keyword/i, /backlink/i, /serp/i, /schema/i, /sitemap/i] },
  { category: "Marketing > Ads & PPC", patterns: [/ads/i, /ppc/i, /facebook.?ad/i, /google.?ad/i, /campaign/i] },
  { category: "Marketing > Email", patterns: [/email/i, /newsletter/i, /cold.?email/i, /outreach/i] },
  { category: "Marketing > Social", patterns: [/social/i, /twitter/i, /linkedin/i, /influencer/i, /community/i] },
  { category: "Marketing > Conversion", patterns: [/cro/i, /conversion/i, /landing/i, /signup/i, /onboard/i, /pricing/i, /paywall/i] },
  { category: "Marketing > Content", patterns: [/content/i, /copywriting/i, /copy/i, /blog/i, /article/i] },
  { category: "Marketing > Analytics", patterns: [/analytics/i, /attribution/i, /tracking/i, /metrics/i] },
  { category: "Marketing > General", patterns: [/marketing/i, /growth/i, /launch/i, /product/i] },
  
  // Content & Writing
  { category: "Writing > Technical", patterns: [/document/i, /readme/i, /api.?doc/i, /technical.?writ/i] },
  { category: "Writing > Business", patterns: [/investor/i, /pitch/i, /proposal/i, /business/i] },
  { category: "Writing > General", patterns: [/writ/i, /edit/i, /proofread/i] },
  
  // Workflow & Process
  { category: "Workflow > Planning", patterns: [/plan/i, /brainstorm/i, /spec/i, /requirement/i] },
  { category: "Workflow > Execution", patterns: [/execut/i, /implement/i, /build/i] },
  { category: "Workflow > Review", patterns: [/review/i, /debug/i, /diagnos/i, /refactor/i] },
  { category: "Workflow > General", patterns: [/workflow/i, /process/i, /superpowers/i] },
  
  // Data Science
  { category: "Data > Analysis", patterns: [/data.?analy/i, /pandas/i, /statistics/i, /visualization/i] },
  { category: "Data > ML", patterns: [/machine.?learn/i, /sklearn/i, /neural/i, /deep.?learn/i] },
  { category: "Data > General", patterns: [/data/i, /etl/i, /pipeline/i] },
  
  // Specialized Roles (Agency)
  { category: "Roles > Engineering", patterns: [/engineer/i, /developer/i, /programmer/i] },
  { category: "Roles > Design", patterns: [/designer/i, /ux/i, /creative/i] },
  { category: "Roles > Business", patterns: [/analyst/i, /strategist/i, /manager/i, /consultant/i] },
  { category: "Roles > Specialist", patterns: [/specialist/i, /expert/i, /architect/i, /lead/i] },
  { category: "Roles > General", patterns: [/agency/i, /coach/i, /coordinator/i, /producer/i] },
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
