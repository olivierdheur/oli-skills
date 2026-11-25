"use client";

import { useState } from "react";

export function UsageGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="filter-pill w-full text-left"
      >
        <div className="rounded-2xl border border-violet-200/50 dark:border-violet-800/30 bg-gradient-to-r from-violet-50/80 to-fuchsia-50/80 dark:from-violet-950/20 dark:to-fuchsia-950/20 p-5 hover:border-violet-300/70 dark:hover:border-violet-700/50 transition-all backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Token-Efficient Usage</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Load only what you need — click to learn how</p>
              </div>
            </div>
            <div className={`w-8 h-8 rounded-lg bg-white/80 dark:bg-zinc-800/80 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <svg 
                className="w-4 h-4 text-zinc-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </button>

      <div 
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">1</span>
              <span className="tracking-tight">CLI Commands</span>
            </h3>
            <div className="bg-zinc-950 rounded-xl p-4 font-mono text-sm overflow-x-auto shadow-inner">
              <div className="text-zinc-500"># Search for skills</div>
              <div className="text-emerald-400">./scripts/skill search animation</div>
              <div className="text-emerald-400">./scripts/skill search seo</div>
              <div className="mt-4 text-zinc-500"># Show a skill&apos;s content</div>
              <div className="text-emerald-400">./scripts/skill show animate</div>
              <div className="mt-4 text-zinc-500"># List by source</div>
              <div className="text-emerald-400">./scripts/skill list marketing</div>
              <div className="mt-4 text-zinc-500"># See curated packs</div>
              <div className="text-emerald-400">./scripts/skill packs</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">2</span>
              <span className="tracking-tight">Workflow</span>
            </h3>
            <div className="grid gap-2">
              {[
                { step: "Start with no skills loaded", icon: "🚀" },
                { step: "Identify task domain (animation? SEO? marketing?)", icon: "🎯" },
                { step: "Search or browse to find relevant skills", icon: "🔍" },
                { step: "Load 1-3 skills max by reading their SKILL.md", icon: "📖" },
                { step: "Complete task, don't carry skills to unrelated work", icon: "✅" },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{item.step}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">3</span>
              <span className="tracking-tight">Quick Reference</span>
            </h3>
            <div className="grid gap-2 text-sm">
              {[
                { task: "Build React component", skill: ".vercel-skills/skills/react-best-practices" },
                { task: "Add animation", skill: ".agents/skills/animate" },
                { task: "Optimize landing page", skill: ".marketing/skills/cro" },
                { task: "Write marketing copy", skill: ".marketing/skills/copywriting" },
                { task: "Plan a feature", skill: ".superpowers/skills/brainstorming" },
                { task: "Code review", skill: ".superpowers/skills/requesting-code-review" },
                { task: "SEO audit", skill: ".claude-seo/skills/seo-audit" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 group">
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">{item.task}</span>
                  <code className="text-xs text-violet-600 dark:text-violet-400 bg-violet-50/80 dark:bg-violet-900/30 px-2.5 py-1 rounded-lg truncate max-w-[280px] border border-violet-100 dark:border-violet-800/50">{item.skill}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-5 border-t border-zinc-200/80 dark:border-zinc-800/80">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-zinc-50 to-zinc-100/50 dark:from-zinc-800/50 dark:to-zinc-800/30 border border-zinc-200/50 dark:border-zinc-700/50">
              <div className="w-8 h-8 rounded-lg bg-zinc-200/80 dark:bg-zinc-700/80 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-zinc-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-800 dark:text-zinc-200">Pro tip:</strong> Click the <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-zinc-200/80 dark:bg-zinc-700/80 rounded text-xs"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg></span> button on any skill card to copy the Cursor prompt directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
