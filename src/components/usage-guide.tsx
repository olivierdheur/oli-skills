"use client";

import { useState } from "react";

export function UsageGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left"
      >
        <div className="rounded-xl border border-violet-200 dark:border-violet-800/50 bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30 p-4 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
                <svg className="w-4 h-4 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Token-Efficient Usage</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Load only what you need to save tokens</p>
              </div>
            </div>
            <svg 
              className={`w-5 h-5 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-xs font-bold text-violet-600 dark:text-violet-400">1</span>
              CLI Commands
            </h3>
            <div className="bg-zinc-950 dark:bg-zinc-950 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <div className="text-zinc-400"># Search for skills</div>
              <div className="text-emerald-400">./scripts/skill search animation</div>
              <div className="text-emerald-400">./scripts/skill search seo</div>
              <div className="mt-3 text-zinc-400"># Show a skill&apos;s content</div>
              <div className="text-emerald-400">./scripts/skill show animate</div>
              <div className="mt-3 text-zinc-400"># List by source</div>
              <div className="text-emerald-400">./scripts/skill list marketing</div>
              <div className="mt-3 text-zinc-400"># See curated packs</div>
              <div className="text-emerald-400">./scripts/skill packs</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-xs font-bold text-violet-600 dark:text-violet-400">2</span>
              Workflow
            </h3>
            <div className="grid gap-2">
              {[
                { step: "Start with no skills loaded", icon: "🚀" },
                { step: "Identify task domain (animation? SEO? marketing?)", icon: "🎯" },
                { step: "Search or browse to find relevant skills", icon: "🔍" },
                { step: "Load 1-3 skills max by reading their SKILL.md", icon: "📖" },
                { step: "Complete task, don't carry skills to unrelated work", icon: "✅" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{item.step}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-xs font-bold text-violet-600 dark:text-violet-400">3</span>
              Common Tasks
            </h3>
            <div className="grid gap-2 text-sm">
              {[
                { task: "Build React component", skill: ".vercel-skills/skills/react-best-practices/SKILL.md" },
                { task: "Add animation", skill: ".agents/skills/animate/SKILL.md" },
                { task: "Optimize landing page", skill: ".marketing/skills/cro/SKILL.md" },
                { task: "Write marketing copy", skill: ".marketing/skills/copywriting/SKILL.md" },
                { task: "Plan a feature", skill: ".superpowers/skills/brainstorming/SKILL.md" },
                { task: "Code review", skill: ".superpowers/skills/requesting-code-review/SKILL.md" },
                { task: "SEO audit", skill: ".claude-seo/skills/seo-audit/SKILL.md" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                  <span className="text-zinc-700 dark:text-zinc-300">{item.task}</span>
                  <code className="text-xs text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 px-2 py-1 rounded truncate max-w-[300px]">{item.skill}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              <strong className="text-zinc-700 dark:text-zinc-300">Pro tip:</strong> Check <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs">SKILLS-INDEX.md</code> for a compact list of all skills, or use the search above to find what you need.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
