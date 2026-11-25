import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Skill {
  slug: string;
  name: string;
  description: string;
  content: string;
  files: string[];
  source: string;
  category: string;
}

const categoryPatterns: { category: string; patterns: RegExp[] }[] = [
  {
    category: "Animation",
    patterns: [/animat/i, /motion/i, /spring/i, /transition/i, /easing/i],
  },
  {
    category: "UI/Design",
    patterns: [/design/i, /ui\b/i, /component/i, /layout/i, /style/i, /accessibility/i, /a11y/i, /mobile-native/i, /prototype/i, /break-ui/i, /sonner/i, /pick-ui/i],
  },
  {
    category: "Security",
    patterns: [/security/i, /auth/i, /vulnerab/i, /threat/i, /penetration/i, /owasp/i],
  },
  {
    category: "Writing",
    patterns: [/writ/i, /article/i, /content/i, /document/i, /investor/i, /market-research/i, /outreach/i],
  },
  {
    category: "Testing",
    patterns: [/test/i, /tdd/i, /qa\b/i, /e2e/i, /verification/i, /regression/i],
  },
  {
    category: "Backend",
    patterns: [/api/i, /backend/i, /database/i, /django/i, /fastapi/i, /express/i, /graphql/i, /rest\b/i, /server/i, /migration/i],
  },
  {
    category: "Frontend",
    patterns: [/angular/i, /react/i, /vue/i, /svelte/i, /frontend/i, /next/i, /nuxt/i, /remix/i, /astro/i],
  },
  {
    category: "AI/Agents",
    patterns: [/agent/i, /\bai\b/i, /llm/i, /continuous-learning/i, /eval/i, /council/i, /model/i, /subagent/i, /dispatch/i],
  },
  {
    category: "DevOps",
    patterns: [/deploy/i, /ci\b/i, /cd\b/i, /docker/i, /kubernetes/i, /infrastructure/i, /monitoring/i, /worktree/i, /git/i],
  },
  {
    category: "Architecture",
    patterns: [/architect/i, /pattern/i, /clean/i, /structure/i, /onboard/i, /codebase/i, /code-tour/i],
  },
  {
    category: "Languages",
    patterns: [/swift/i, /kotlin/i, /python/i, /typescript/i, /golang/i, /rust/i, /cpp/i, /csharp/i, /java\b/i, /dart/i, /flutter/i, /dotnet/i, /ruby/i, /rails/i, /perl/i, /php/i, /bun/i],
  },
  {
    category: "Workflow",
    patterns: [/brainstorm/i, /plan/i, /execut/i, /finish/i, /review/i, /debug/i, /diagnos/i, /superpowers/i],
  },
  {
    category: "Marketing",
    patterns: [/marketing/i, /seo/i, /cro/i, /copywriting/i, /copy/i, /ads/i, /email/i, /social/i, /landing/i, /conversion/i, /analytics/i, /content/i, /launch/i, /pricing/i, /referral/i, /churn/i, /onboard/i, /popup/i, /paywall/i, /signup/i, /ab-test/i, /competitor/i, /link-build/i, /schema/i, /programmatic/i, /site-arch/i, /aso/i, /cold-email/i, /lead/i, /sales/i, /revops/i, /influencer/i, /community/i, /event/i, /video/i, /image/i, /sms/i, /offer/i, /directory/i, /prospect/i, /attribution/i, /public-relation/i, /co-market/i, /free-tool/i],
  },
];

function detectCategory(name: string, description: string): string {
  const text = `${name} ${description}`.toLowerCase();
  
  for (const { category, patterns } of categoryPatterns) {
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        return category;
      }
    }
  }
  
  return "Other";
}

const SKILLS_DIRS = [
  { path: ".agents/skills", source: "agents" },
  { path: ".cursor/skills", source: "cursor" },
  { path: ".superpowers/skills", source: "superpowers" },
  { path: ".marketing/skills", source: "marketing" },
  { path: ".vercel-skills/skills", source: "vercel" },
  { path: ".claude-seo/skills", source: "seo" },
];

function getSkillsFromDir(dirPath: string, source: string): Skill[] {
  const fullDirPath = path.join(process.cwd(), dirPath);
  
  if (!fs.existsSync(fullDirPath)) {
    return [];
  }

  const skillDirs = fs.readdirSync(fullDirPath).filter((dir) => {
    const fullPath = path.join(fullDirPath, dir);
    return fs.statSync(fullPath).isDirectory();
  });

  return skillDirs
    .map((slug) => {
      const skillPath = path.join(fullDirPath, slug, "SKILL.md");
      if (!fs.existsSync(skillPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(skillPath, "utf8");
      const { data, content } = matter(fileContents);

      const skillDir = path.join(fullDirPath, slug);
      const files = fs.readdirSync(skillDir).filter((f) => f.endsWith(".md"));

      const skillName = data.name || slug;
      const skillDescription = data.description || "";
      
      return {
        slug: `${source}/${slug}`,
        name: skillName,
        description: skillDescription,
        content,
        files,
        source,
        category: detectCategory(skillName, skillDescription),
      };
    })
    .filter((skill): skill is Skill => skill !== null);
}

export function getAllSkills(): Skill[] {
  const allSkills: Skill[] = [];
  
  for (const { path: dirPath, source } of SKILLS_DIRS) {
    allSkills.push(...getSkillsFromDir(dirPath, source));
  }
  
  return allSkills.sort((a, b) => a.name.localeCompare(b.name));
}

export function getAllCategories(skills: Skill[]): { name: string; count: number }[] {
  const categoryCount = new Map<string, number>();
  
  for (const skill of skills) {
    categoryCount.set(skill.category, (categoryCount.get(skill.category) || 0) + 1);
  }
  
  return Array.from(categoryCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getSkillBySlug(slug: string): Skill | null {
  const skills = getAllSkills();
  return skills.find((s) => s.slug === slug) || null;
}

function getSkillDirPath(slug: string): string | null {
  const [source, ...rest] = slug.split("/");
  const skillSlug = rest.join("/");
  
  const dirConfig = SKILLS_DIRS.find((d) => d.source === source);
  if (!dirConfig) return null;
  
  return path.join(process.cwd(), dirConfig.path, skillSlug);
}

export function getSkillFile(slug: string, filename: string): string | null {
  const skillDir = getSkillDirPath(slug);
  if (!skillDir) return null;
  
  const filePath = path.join(skillDir, filename);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, "utf8");
}
