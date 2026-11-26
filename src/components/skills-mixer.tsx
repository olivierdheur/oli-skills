"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Skill {
  slug: string;
  name: string;
  description: string;
  source: string;
  category: string;
}

interface SkillStack {
  id: string;
  name: string;
  emoji: string;
  description: string;
  tags: string[];
  skillSlugs: string[];
}

const SKILL_STACKS: SkillStack[] = [
  {
    id: "saas-launch",
    name: "SaaS Launch",
    emoji: "🚀",
    description: "Everything you need to launch a SaaS product: positioning, pricing, landing pages, and go-to-market strategy.",
    tags: ["startup", "product", "b2b"],
    skillSlugs: [
      "consulting/go-to-market",
      "strategy/pricing-strategy",
      "gtm/landing-page-copy",
      "gtm/copywriting",
      "business-skills/competitor-analysis",
      "gtm/customer-research",
      "gtm/sales-enablement",
      "marketing/email-marketing",
      "gtm/lead-magnets",
      "gtm/objection-handling",
      "marketing/ab-testing",
      "gtm/product-launch",
    ],
  },
  {
    id: "ai-video-creator",
    name: "AI Video Creator",
    emoji: "🎬",
    description: "Create stunning AI-generated videos with Runway, Luma, Kling, HeyGen, and more.",
    tags: ["video", "ai", "creative"],
    skillSlugs: [
      "social-media/ai-video",
      "social-media/runway",
      "social-media/luma",
      "social-media/kling",
      "social-media/heygen",
      "social-media/veo-3",
      "social-media/synthesia",
      "social-media/capcut",
      "social-media/short-form-video-script",
      "pexo/ai-video-generation",
      "pexo/text-to-video",
      "gen-media/explainer-video-production",
    ],
  },
  {
    id: "image-generation",
    name: "AI Image Studio",
    emoji: "🖼️",
    description: "Master AI image generation with Midjourney, DALL-E, Flux, Stable Diffusion, and ComfyUI workflows.",
    tags: ["image", "ai", "creative", "design"],
    skillSlugs: [
      "marketing/image",
      "social-media/flux",
      "social-media/ai-image-editing",
      "social-media/canva",
      "agency/Image Prompt Engineer",
      "comfiest/prompt-writing",
      "gen-media/ecommerce-product-imagery",
      "gen-media/fashion-campaign-production",
      "media-skills/image-studio",
    ],
  },
  {
    id: "startup-legal",
    name: "Startup Legal",
    emoji: "⚖️",
    description: "Essential legal skills for startups: NDAs, contracts, compliance, terms of service, and privacy policies.",
    tags: ["legal", "startup", "compliance"],
    skillSlugs: [
      "claude-legal/nda-review",
      "lq-skills/nda-review",
      "uk-legal/legal-agreement",
      "uk-legal/legal-terms",
      "uk-legal/legal-privacy",
      "uk-legal/legal-compliance",
      "uk-legal/legal-risks",
      "claude-legal/contract-review",
      "ukummar-legal/client-intake",
      "claude-legal/aia-generation",
    ],
  },
  {
    id: "social-media-pro",
    name: "Social Media Pro",
    emoji: "📱",
    description: "Dominate social media with content calendars, platform-specific strategies, and community building.",
    tags: ["social", "marketing", "content"],
    skillSlugs: [
      "social-media/instagram",
      "social-media/tiktok",
      "social-media/linkedin",
      "social-media/youtube",
      "social-media/content-calendar",
      "social-media/community-management",
      "social-media/competitor-analysis",
      "social-media/short-form-video-script",
      "business-skills/social-media-strategy",
      "aaron-marketing/social-content-planner",
      "content-creation/content-ideas",
      "social-media/hooks",
    ],
  },
  {
    id: "ecommerce-growth",
    name: "E-commerce Growth",
    emoji: "🛒",
    description: "Scale your online store with SEO, paid ads, email marketing, and conversion optimization.",
    tags: ["ecommerce", "marketing", "growth"],
    skillSlugs: [
      "seo/seo-ecommerce",
      "seo/seo-shopify",
      "business-skills/keyword-research",
      "business-skills/google-ads",
      "business-skills/meta-ads",
      "marketing/conversion",
      "business-skills/ab-testing",
      "business-skills/reviews-and-testimonials",
      "fivetran/store-performance-analysis",
      "hasdata/hasdata-ecommerce",
      "growth-marketing/conversion-copywriter",
      "gen-media/ecommerce-product-imagery",
    ],
  },
  {
    id: "amazon-seller",
    name: "Amazon Seller",
    emoji: "📦",
    description: "Master Amazon selling: listing optimization, compliance, FBA management, ads, and analytics.",
    tags: ["amazon", "ecommerce", "fba", "marketplace"],
    skillSlugs: [
      "amazon-sp/listing-troubleshooter",
      "amazon-sp/listing-compliance",
      "amazon-sp/listing-searchability",
      "amazon-sp/listing-buyability",
      "amazon-sp/fba-inbound-management",
      "amazon-sp/stockout-prevention",
      "amazon-sp/seller-analytics",
      "amazon-sp/sp-api-knowledge",
      "vibe-seller/amazon-listing",
      "vibe-seller/amazon-ads",
      "hasdata/hasdata-ecommerce",
      "apify/apify-ecommerce",
    ],
  },
  {
    id: "consultant-toolkit",
    name: "Consultant Toolkit",
    emoji: "💼",
    description: "Professional consulting skills: proposals, client management, strategy frameworks, and deliverables.",
    tags: ["consulting", "strategy", "business"],
    skillSlugs: [
      "consulting/proposal-writing",
      "consulting/client-intake",
      "consulting/go-to-market",
      "consulting/negotiation-prep",
      "consulting/lead-qualification",
      "strategy/decision-memo",
      "strategy/competitive-intel",
      "strategy/pricing-strategy",
      "consulting/operating-model-design",
      "consulting/data-quality-audit",
      "strategy/scenario-planning",
    ],
  },
  {
    id: "affiliate-marketing",
    name: "Affiliate Marketing",
    emoji: "🔗",
    description: "Build profitable affiliate sites with landing pages, compliance, SEO, and conversion optimization.",
    tags: ["affiliate", "marketing", "monetization"],
    skillSlugs: [
      "affitor/landing-page-optimizer",
      "affitor/compliance-checker",
      "affitor/affiliate-program-search",
      "affitor/bonus-stack-builder",
      "affitor/seo-audit",
      "affitor/comparison-post-writer",
      "copywriting/landing-page-copy",
      "copywriting/ad-copy",
      "fyp/affiliate-product-match",
      "business-skills/link-building",
    ],
  },
  {
    id: "content-creator",
    name: "Content Creator",
    emoji: "✍️",
    description: "Create compelling content: blog posts, newsletters, scripts, and multimedia production.",
    tags: ["content", "writing", "creator"],
    skillSlugs: [
      "business-skills/blog-writing",
      "business-skills/email-newsletters",
      "content-creation/short-form-video-script",
      "social-media/hooks",
      "marketing/content-strategy",
      "business-skills/podcast-production",
      "business-skills/youtube-scripts",
      "content-creation/content-ideas",
      "social-media/content-calendar",
      "copywriting/angle-finder",
    ],
  },
  {
    id: "market-research",
    name: "Market Research",
    emoji: "🔍",
    description: "Comprehensive market intelligence: competitor analysis, customer research, and strategic insights.",
    tags: ["research", "strategy", "analysis"],
    skillSlugs: [
      "cursor/market-research",
      "business-skills/market-research",
      "business-skills/competitor-analysis",
      "productside/mi-collect",
      "productside/mi-analyze",
      "productside/mi-size",
      "strategy/competitive-intel",
      "gtm/customer-research",
      "marketing/customer-research",
      "analytics/funnel-analysis",
    ],
  },
  {
    id: "devops-cloud",
    name: "DevOps & Cloud",
    emoji: "☁️",
    description: "Cloud infrastructure and DevOps: AWS services, CI/CD, containers, and infrastructure as code.",
    tags: ["devops", "cloud", "aws", "infrastructure"],
    skillSlugs: [
      "aws/amazon-ec2",
      "aws/amazon-s3",
      "aws/amazon-lambda",
      "aws/amazon-dynamodb",
      "aws/amazon-cloudformation",
      "aws/amazon-ecs",
      "aws/amazon-api-gateway",
      "aws/amazon-cloudwatch",
      "vercel/vercel-functions",
      "vercel/deployments-cicd",
    ],
  },
  {
    id: "security-audit",
    name: "Security Audit",
    emoji: "🔒",
    description: "Comprehensive security review: threat modeling, vulnerability scanning, and compliance checks.",
    tags: ["security", "audit", "compliance"],
    skillSlugs: [
      "owasp/threat-modeling",
      "owasp/secrets-scan",
      "phaedra/secrets-scan",
      "owasp/dependency-check",
      "phaedra/security-review",
      "owasp/api-security",
      "jmanico/secure-coding",
      "owasp/penetration-testing",
      "phaedra/incident-response",
    ],
  },
];

interface SkillsMixerProps {
  skills: Skill[];
}

export function SkillsMixer({ skills }: SkillsMixerProps) {
  const [selectedStack, setSelectedStack] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<Skill[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const skillsMap = useMemo(() => {
    const map = new Map<string, Skill>();
    for (const skill of skills) {
      map.set(skill.slug, skill);
    }
    return map;
  }, [skills]);

  const filteredStacks = useMemo(() => {
    if (!searchQuery) return SKILL_STACKS;
    const q = searchQuery.toLowerCase();
    return SKILL_STACKS.filter(
      (stack) =>
        stack.name.toLowerCase().includes(q) ||
        stack.description.toLowerCase().includes(q) ||
        stack.tags.some((tag) => tag.includes(q))
    );
  }, [searchQuery]);

  const selectedStackData = useMemo(() => {
    if (!selectedStack) return null;
    return SKILL_STACKS.find((s) => s.id === selectedStack);
  }, [selectedStack]);

  const stackSkills = useMemo(() => {
    if (!selectedStackData) return [];
    return selectedStackData.skillSlugs
      .map((slug) => skillsMap.get(slug))
      .filter((s): s is Skill => s !== undefined);
  }, [selectedStackData, skillsMap]);

  const copyInstallCommand = (skillSlugs: string[]) => {
    const validSlugs = skillSlugs.filter((slug) => skillsMap.has(slug));
    const command = `npx oli-skills add ${validSlugs.join(" ")}`;
    navigator.clipboard.writeText(command);
    toast.success("Install command copied!", {
      description: `${validSlugs.length} skills ready to install`,
    });
  };

  const handleAiSearch = async () => {
    if (!aiQuery.trim()) return;
    setIsAiLoading(true);

    const query = aiQuery.toLowerCase();
    const keywords = query.split(/\s+/).filter((w) => w.length > 2);

    const scored = skills.map((skill) => {
      const text = `${skill.name} ${skill.description} ${skill.category} ${skill.slug}`.toLowerCase();
      let score = 0;

      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          score += 1;
          if (skill.name.toLowerCase().includes(keyword)) score += 2;
          if (skill.category.toLowerCase().includes(keyword)) score += 1;
        }
      }

      if (query.includes("video") && skill.category.includes("Video")) score += 3;
      if (query.includes("image") && skill.category.includes("Image")) score += 3;
      if (query.includes("legal") && skill.category.includes("Legal")) score += 3;
      if (query.includes("marketing") && skill.category.includes("Marketing")) score += 3;
      if (query.includes("security") && skill.category.includes("Security")) score += 3;
      if (query.includes("saas") && (skill.category.includes("Business") || skill.category.includes("Marketing"))) score += 2;
      if (query.includes("startup") && (skill.slug.includes("launch") || skill.slug.includes("pricing"))) score += 2;
      if (query.includes("social") && skill.category.includes("Social")) score += 3;
      if (query.includes("ai") && skill.category.includes("AI")) score += 3;
      if (query.includes("aws") && skill.source === "aws") score += 5;
      if (query.includes("cloud") && skill.source === "aws") score += 3;

      return { skill, score };
    });

    const suggestions = scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15)
      .map((s) => s.skill);

    setTimeout(() => {
      setAiSuggestions(suggestions);
      setIsAiLoading(false);
    }, 300);
  };

  return (
    <div className="space-y-8">
      {/* AI-Powered Mixer */}
      <Card className="border-2 border-dashed border-violet-300 dark:border-violet-700 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <CardTitle className="text-xl">AI Skills Mixer</CardTitle>
          </div>
          <CardDescription>
            Describe your project and get personalized skill recommendations
          </CardDescription>
        </CardHeader>
        <div className="px-6 pb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAiSearch()}
              placeholder="e.g., I'm building a B2B SaaS for HR teams with AI features..."
              className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              onClick={handleAiSearch}
              disabled={isAiLoading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium hover:from-violet-700 hover:to-purple-700 transition-all disabled:opacity-50"
            >
              {isAiLoading ? "Finding..." : "Find Skills"}
            </button>
          </div>

          {aiSuggestions.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Recommended Skills ({aiSuggestions.length})
                </h4>
                <button
                  onClick={() => copyInstallCommand(aiSuggestions.map((s) => s.slug))}
                  className="text-xs px-3 py-1.5 rounded-lg bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-900 transition-colors"
                >
                  Copy Install Command
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.map((skill) => (
                  <a
                    key={skill.slug}
                    href={`/skill/${skill.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm hover:border-violet-400 dark:hover:border-violet-500 transition-colors"
                  >
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-xs text-zinc-400">[{skill.source}]</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Template Stacks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Template Stacks
          </h3>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter stacks..."
            className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStacks.map((stack) => (
            <Card
              key={stack.id}
              className={`cursor-pointer transition-all hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 ${
                selectedStack === stack.id
                  ? "ring-2 ring-blue-500 border-blue-500"
                  : ""
              }`}
              onClick={() => setSelectedStack(selectedStack === stack.id ? null : stack.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{stack.emoji}</span>
                  <CardTitle className="text-base">{stack.name}</CardTitle>
                </div>
                <CardDescription className="text-xs line-clamp-2">
                  {stack.description}
                </CardDescription>
                <div className="flex flex-wrap gap-1 mt-2">
                  {stack.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-zinc-500 mt-2">
                  {stack.skillSlugs.length} skills
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Selected Stack Details */}
      {selectedStackData && (
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedStackData.emoji}</span>
                <div>
                  <CardTitle>{selectedStackData.name}</CardTitle>
                  <CardDescription>{selectedStackData.description}</CardDescription>
                </div>
              </div>
              <button
                onClick={() => copyInstallCommand(selectedStackData.skillSlugs)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Copy Install Command
              </button>
            </div>
          </CardHeader>
          <div className="px-6 pb-6">
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
              Included Skills ({stackSkills.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {stackSkills.map((skill) => (
                <a
                  key={skill.slug}
                  href={`/skill/${skill.slug}`}
                  className="flex items-start gap-2 p-3 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{skill.name}</div>
                    <div className="text-xs text-zinc-500 truncate">{skill.description}</div>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {skill.source}
                  </Badge>
                </a>
              ))}
            </div>
            {selectedStackData.skillSlugs.length > stackSkills.length && (
              <p className="text-xs text-zinc-500 mt-3">
                {selectedStackData.skillSlugs.length - stackSkills.length} skills not found in current index
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
