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
  { path: ".heygen/skills", source: "heygen" },
  { path: ".21st/skills", source: "21st" },
  { path: ".bradautomates/skills", source: "bradautomates" },
  { path: ".apify/skills", source: "apify" },
  { path: ".langchain/skills", source: "langchain" },
  { path: ".aws/skills", source: "aws" },
  { path: ".owasp/skills", source: "owasp" },
  { path: ".phaedra/skills", source: "phaedra" },
  { path: ".productside/skills", source: "productside" },
  { path: ".consulting/skills", source: "consulting" },
  { path: ".strategy/skills", source: "strategy" },
  { path: ".deallens/skills", source: "deallens" },
  { path: ".gtm/skills", source: "gtm" },
  { path: ".finance/skills", source: "finance" },
  { path: ".analytics/skills", source: "analytics" },
  { path: ".claude-legal/skills", source: "claude-legal" },
  { path: ".lq-skills/skills", source: "lq-skills" },
  { path: ".kevin/skills", source: "kevin" },
  { path: ".uk-legal/skills", source: "uk-legal" },
  { path: ".ukummar-legal/skills", source: "ukummar-legal" },
  { path: ".social-media/skills", source: "social-media" },
  { path: ".aaron-marketing/skills", source: "aaron-marketing" },
  { path: ".business-skills/skills", source: "business-skills" },
  { path: ".pawbytes/skills", source: "pawbytes" },
  { path: ".affitor/skills", source: "affitor" },
  { path: ".content-creation/skills", source: "content-creation" },
  { path: ".copywriting/skills", source: "copywriting" },
  { path: ".fyp/skills", source: "fyp" },
  { path: ".gen-media/skills", source: "gen-media" },
  { path: ".pexo/skills", source: "pexo" },
  { path: ".comfiest/skills", source: "comfiest" },
  { path: ".media-skills/skills", source: "media-skills" },
  { path: ".comfyui-dev/skills", source: "comfyui-dev" },
];

// Hierarchical category structure: "Parent > Subcategory"
const categoryPatterns = [
  // Security (check first - high priority)
  { category: "Security > Threat Modeling", patterns: [/threat/i, /stride/i, /pasta/i, /linddun/i, /grim-prompter/i] },
  { category: "Security > Logging & Audit", patterns: [/logging/i, /audit/i, /dread-ledger/i, /security.?event/i] },
  { category: "Security > Dependencies", patterns: [/trim-reaper/i, /dependency.?reduc/i, /supply.?chain/i] },
  { category: "Security > Auth", patterns: [/auth/i, /oauth/i, /jwt/i, /session/i, /identity/i, /login/i] },
  { category: "Security > General", patterns: [/security/i, /vulnerab/i, /penetration/i, /owasp/i, /dread-forge/i, /secops/i, /appsec/i] },
  
  // Video & Image Generation (before general AI patterns)
  { category: "AI > Video Generation", patterns: [/video.?gen/i, /text.?to.?video/i, /image.?to.?video/i, /ai.?video/i, /runway/i, /luma/i, /kling/i, /pika/i, /sora/i, /veo/i, /seedance/i, /heygen/i, /synthesia/i, /avatar/i, /talking.?head/i, /video.?production/i, /video.?studio/i] },
  { category: "AI > Image Generation", patterns: [/image.?gen/i, /text.?to.?image/i, /midjourney/i, /dall.?e/i, /stable.?diffusion/i, /flux/i, /ideogram/i, /leonardo/i, /firefly/i, /comfyui/i, /diffusion/i, /image.?studio/i, /image.?prompt/i] },
  { category: "AI > 3D & Spatial", patterns: [/3d/i, /spatial/i, /neural.?reality/i, /icvfx/i, /virtual.?production/i, /scene/i, /terrain/i] },
  { category: "AI > Audio Generation", patterns: [/audio/i, /music/i, /voiceover/i, /sound.?design/i, /foley/i, /dubbing/i, /dialogue/i, /mastering/i, /mixing/i] },
  { category: "AI > Creative Direction", patterns: [/storyboard/i, /previsualization/i, /shot.?direction/i, /lighting/i, /character.?design/i, /creative.?direction/i, /performance/i] },
  
  // Social Media & Marketing (before AI patterns)
  { category: "Marketing > Social Media", patterns: [/instagram/i, /tiktok/i, /linkedin/i, /twitter/i, /threads/i, /facebook/i, /pinterest/i, /youtube/i, /reels/i, /shorts/i, /social/i] },
  { category: "Marketing > Affiliate", patterns: [/affiliate/i, /landing.?page/i, /squeeze/i, /bonus.?stack/i, /offer/i, /conversion/i, /cro/i] },
  { category: "Marketing > Email", patterns: [/email/i, /newsletter/i, /drip/i, /sequence/i, /deliverability/i, /outreach/i, /cold.?email/i] },
  { category: "Marketing > Ads", patterns: [/ads/i, /ppc/i, /meta.?ads/i, /google.?ads/i, /paid/i, /retargeting/i, /campaign/i] },
  { category: "Marketing > Copywriting", patterns: [/copywriting/i, /copy/i, /headline/i, /sales.?page/i, /vsl/i, /direct.?response/i, /funnel/i] },
  { category: "Marketing > Influencer", patterns: [/influencer/i, /creator/i, /ugc/i, /ambassador/i, /partnership/i] },
  { category: "Marketing > Content", patterns: [/content/i, /blog/i, /video.?script/i, /hook/i, /caption/i, /calendar/i, /thumbnail/i] },
  { category: "Marketing > Research", patterns: [/instagram-research/i, /tiktok-research/i, /youtube-research/i, /x-research/i, /content-ideas/i, /content-planner/i, /video-content-analyzer/i, /focus-group/i] },
  
  // Legal (before Business patterns)
  { category: "Legal > Contracts", patterns: [/contract/i, /nda/i, /msa/i, /agreement/i, /redline/i, /clause/i, /negotiate/i, /terms/i, /indemnity/i, /liability/i, /termination/i, /obligation/i] },
  { category: "Legal > Compliance", patterns: [/compliance/i, /gdpr/i, /ccpa/i, /dpa/i, /regulatory/i, /ai.?act/i, /privacy/i, /data.?protection/i] },
  { category: "Legal > Due Diligence", patterns: [/diligence/i, /vdr/i, /m&a/i, /merger/i, /acquisition/i, /investigation/i] },
  { category: "Legal > Corporate", patterns: [/corporate/i, /governance/i, /board/i, /shareholder/i, /equity/i, /incorporation/i] },
  { category: "Legal > IP", patterns: [/intellectual.?property/i, /patent/i, /trademark/i, /copyright/i, /ip.?audit/i, /licensing/i] },
  { category: "Legal > Employment", patterns: [/employment/i, /hr/i, /hiring/i, /termination/i, /compensation/i, /ir35/i, /freelancer/i] },
  { category: "Legal > General", patterns: [/legal/i, /lawyer/i, /attorney/i, /counsel/i, /litigation/i, /dispute/i] },
  
  // Business & Strategy (before general patterns)
  { category: "Business > Market Intelligence", patterns: [/mi-collect/i, /mi-analyze/i, /mi-size/i, /mi-scan/i, /mi-watch/i, /mi-build/i, /mi-fuse/i, /mi-mine/i, /mi-sweep/i, /mi-refresh/i, /osint/i, /finint/i, /techint/i, /humint/i, /sigint/i, /masint/i, /geoint/i, /demoint/i] },
  { category: "Business > Strategy", patterns: [/strategy/i, /strategic/i, /swot/i, /five.?forces/i, /ansoff/i, /tam.?sam/i, /market.?map/i, /competitive.?intel/i, /war.?gam/i, /100.?day/i, /initiative.?prior/i] },
  { category: "Business > Finance", patterns: [/valuation/i, /dcf/i, /npv/i, /irr/i, /cash.?flow/i, /unit.?economics/i, /pricing/i, /revenue/i, /margin/i, /profitability/i, /financial/i, /synergy/i, /business.?case/i] },
  { category: "Business > Consulting", patterns: [/consult/i, /engagement/i, /steering/i, /hypothesis/i, /issue.?tree/i, /mece/i, /recommendation/i, /executive.?summ/i, /board.?paper/i, /decision.?memo/i] },
  { category: "Business > Sales", patterns: [/sales/i, /deal/i, /prospect/i, /qualification/i, /proposal/i, /pitch/i, /interview.?prep/i, /due.?diligence/i, /battlecard/i] },
  { category: "Business > Analytics", patterns: [/analytics/i, /cohort/i, /funnel/i, /segmentation/i, /a.?b.?test/i, /metric/i, /dashboard/i, /data.?quality/i, /insight/i, /kpi/i] },
  { category: "Business > Operations", patterns: [/operation/i, /process/i, /bottleneck/i, /sop/i, /supply.?chain/i, /org.?design/i, /transformation/i, /change.?manage/i] },
  
  // Workflow specifics (before AI patterns)
  { category: "Workflow > General", patterns: [/second-brain/i] },
  
  // AI & Automation
  { category: "AI > Video", patterns: [/heygen/i, /hyperframes/i, /video/i, /avatar/i, /translate.*dub/i, /slideshow/i, /media-use/i, /reverse-any-video/i] },
  { category: "AI > Agents", patterns: [/agent/i, /subagent/i, /sandcastle/i, /orchestrat/i, /agentic/i] },
  { category: "AI > LLM Patterns", patterns: [/llm/i, /prompt/i, /token/i, /context.?window/i, /guardrail/i, /ai-sdk/i] },
  { category: "AI > Coding Dictionary", patterns: [/dictionary/i, /glossary/i, /terminology/i] },
  { category: "AI > Tools", patterns: [/tool.?call/i, /mcp/i, /model.?provider/i, /\bwatch\b/i] },
  { category: "AI > General", patterns: [/\bai\b/i, /machine.?learn/i, /neural/i, /model(?!ing)/i] },
  
  // Design & UI
  { category: "Design > Animation", patterns: [/animat/i, /motion/i, /spring/i, /transition/i, /easing/i, /keyframe/i] },
  { category: "Design > Components", patterns: [/component/i, /button/i, /dialog/i, /modal/i, /sonner/i, /toast/i, /21st/i, /registry/i] },
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
  { category: "Marketing > Social", patterns: [/social/i, /twitter/i, /linkedin/i, /influencer/i, /community/i, /instagram/i, /tiktok/i, /youtube-research/i, /x-research/i] },
  { category: "Marketing > Conversion", patterns: [/cro/i, /conversion/i, /landing/i, /signup/i, /onboard/i, /pricing/i, /paywall/i] },
  { category: "Marketing > Content", patterns: [/content/i, /copywriting/i, /copy/i, /blog/i, /article/i] },
  { category: "Marketing > Analytics", patterns: [/analytics/i, /attribution/i, /tracking/i, /metrics/i] },
  { category: "Marketing > General", patterns: [/marketing/i, /growth/i, /launch/i, /product/i, /focus.?group/i] },
  
  // Content & Writing
  { category: "Writing > Technical", patterns: [/document/i, /readme/i, /api.?doc/i, /technical.?writ/i] },
  { category: "Writing > Business", patterns: [/investor/i, /pitch/i, /proposal/i, /business/i] },
  { category: "Writing > General", patterns: [/writ/i, /edit/i, /proofread/i] },
  
  // Workflow & Process
  { category: "Workflow > Planning", patterns: [/plan/i, /brainstorm/i, /spec/i, /requirement/i, /questionnaire/i] },
  { category: "Workflow > Execution", patterns: [/execut/i, /implement/i, /build/i] },
  { category: "Workflow > Review", patterns: [/review/i, /debug/i, /diagnos/i, /refactor/i] },
  { category: "Workflow > General", patterns: [/workflow/i, /process/i, /superpowers/i, /second.?brain/i, /\bteach\b/i] },
  
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

function detectCategory(name, description, source) {
  const text = `${name} ${description}`.toLowerCase();
  
  // For legal sources, check legal patterns first
  const isLegalSource = /legal|lq-skills|kevin/.test(source);
  if (isLegalSource) {
    const legalPatterns = categoryPatterns.filter(p => p.category.startsWith("Legal"));
    for (const { category, patterns } of legalPatterns) {
      for (const pattern of patterns) {
        if (pattern.test(text)) return category;
      }
    }
    // Default to Legal > General for legal sources without specific match
    return "Legal > General";
  }
  
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
      
      // Extract description from YAML frontmatter, or from blockquote (> ...) in content
      let skillDescription = data.description || "";
      if (!skillDescription && content) {
        const blockquoteMatch = content.match(/^>\s*(.+)$/m);
        if (blockquoteMatch) {
          skillDescription = blockquoteMatch[1].trim();
        }
      }

      return {
        slug: `${source}/${slug}`,
        name: skillName,
        description: skillDescription,
        content,
        files,
        filesContent,
        source,
        category: detectCategory(skillName, skillDescription, source),
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
