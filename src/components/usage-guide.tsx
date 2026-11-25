"use client";

import { useState } from "react";
import { toast } from "sonner";

export function UsageGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"install" | "usage">("install");

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    toast.success("Copied to clipboard", { description: cmd, duration: 2000 });
  };

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
                <h2 className="font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Get These Skills in Any Project</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">One command to install 500+ skills via npm</p>
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
          isOpen ? 'max-h-[3000px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-6 space-y-6">
          
          <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <button
              onClick={() => setActiveTab("install")}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "install"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              📦 Install
            </button>
            <button
              onClick={() => setActiveTab("usage")}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "usage"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              ⚡ Usage
            </button>
          </div>

          {activeTab === "install" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">1</span>
                  <span className="tracking-tight">Install via npm</span>
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Run this in any project to get all 500+ skills:
                </p>
                <button 
                  onClick={() => copyCommand("npx oli-skills init")}
                  className="w-full group"
                >
                  <div className="bg-zinc-950 rounded-xl p-4 font-mono text-sm flex items-center justify-between hover:bg-zinc-900 transition-colors">
                    <span className="text-emerald-400">npx oli-skills init</span>
                    <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </span>
                  </div>
                </button>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                  This creates <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">.skills/</code> with all skills and sets up Cursor rules.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">2</span>
                  <span className="tracking-tight">Or install specific skills</span>
                </h3>
                <div className="bg-zinc-950 rounded-xl p-4 font-mono text-sm overflow-x-auto shadow-inner space-y-2">
                  <div className="text-zinc-500"># Install specific skills</div>
                  <button onClick={() => copyCommand("npx oli-skills install animate cro")} className="block w-full text-left hover:bg-zinc-900/50 -mx-2 px-2 py-1 rounded">
                    <span className="text-emerald-400">npx oli-skills install animate cro</span>
                  </button>
                  <div className="text-zinc-500 mt-3"># Search for skills</div>
                  <button onClick={() => copyCommand("npx oli-skills search animation")} className="block w-full text-left hover:bg-zinc-900/50 -mx-2 px-2 py-1 rounded">
                    <span className="text-emerald-400">npx oli-skills search animation</span>
                  </button>
                  <div className="text-zinc-500 mt-3"># See curated packs</div>
                  <button onClick={() => copyCommand("npx oli-skills packs")} className="block w-full text-left hover:bg-zinc-900/50 -mx-2 px-2 py-1 rounded">
                    <span className="text-emerald-400">npx oli-skills packs</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">3</span>
                  <span className="tracking-tight">Use in Cursor</span>
                </h3>
                <div className="bg-zinc-950 rounded-xl p-4 font-mono text-sm overflow-x-auto shadow-inner">
                  <div className="text-zinc-500"># Load a skill in Cursor chat</div>
                  <div className="text-amber-400">Read .skills/agents/animate/SKILL.md</div>
                  <div className="mt-3 text-zinc-500"># Or just ask</div>
                  <div className="text-amber-400">Using the cro skill, review this landing page</div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200/50 dark:border-emerald-800/30">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">npm package</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                        <a href="https://www.npmjs.com/package/oli-skills" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                          npmjs.com/package/oli-skills
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-zinc-50 to-slate-50 dark:from-zinc-950/30 dark:to-slate-950/30 border border-zinc-200/50 dark:border-zinc-800/30">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900/50 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-zinc-600 dark:text-zinc-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">GitHub repo</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                        <a href="https://github.com/olivierdheur/oli-skills" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                          github.com/olivierdheur/oli-skills
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200/50 dark:border-amber-800/30">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Auto-updates on push</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                      New skills pushed to GitHub are automatically published to npm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "usage" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">⚡</span>
                  <span className="tracking-tight">Token-Efficient Workflow</span>
                </h3>
                <div className="grid gap-2">
                  {[
                    { step: "Start with no skills loaded", icon: "🚀" },
                    { step: "Identify task domain (animation? SEO? marketing?)", icon: "🎯" },
                    { step: "Load 1-3 relevant skills max", icon: "📖" },
                    { step: "Complete task, don't carry skills forward", icon: "✅" },
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
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">📦</span>
                  <span className="tracking-tight">Curated Packs</span>
                </h3>
                <div className="grid gap-3 text-sm">
                  {[
                    { name: "Frontend", skills: "animate, react-best-practices, mobile-native", color: "from-blue-500 to-cyan-500" },
                    { name: "Marketing", skills: "cro, copywriting, seo-audit, analytics", color: "from-emerald-500 to-teal-500" },
                    { name: "SEO", skills: "seo-audit, seo-technical, seo-schema", color: "from-rose-500 to-pink-500" },
                    { name: "Workflow", skills: "brainstorming, writing-plans, test-driven-development", color: "from-amber-500 to-orange-500" },
                    { name: "Design", skills: "emil-design-eng, apple-design, animation-vocabulary", color: "from-violet-500 to-fuchsia-500" },
                  ].map((pack, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${pack.color} flex items-center justify-center shrink-0`}>
                        <span className="text-white text-xs font-bold">{pack.name[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-zinc-900 dark:text-zinc-100">{pack.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{pack.skills}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">🎯</span>
                  <span className="tracking-tight">Quick Reference</span>
                </h3>
                <div className="grid gap-2 text-sm">
                  {[
                    { task: "Add animation", skill: "animate" },
                    { task: "Optimize landing page", skill: "cro" },
                    { task: "Write marketing copy", skill: "copywriting" },
                    { task: "React best practices", skill: "react-best-practices" },
                    { task: "SEO audit", skill: "seo-audit" },
                  ].map((item, i) => (
                    <button
                      key={i}
                      onClick={() => copyCommand(`Read .skills/*/` + item.skill + `/SKILL.md`)}
                      className="flex items-center justify-between gap-4 p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 hover:border-violet-300 dark:hover:border-violet-700 transition-colors text-left"
                    >
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium">{item.task}</span>
                      <code className="text-xs text-violet-600 dark:text-violet-400 bg-violet-50/80 dark:bg-violet-900/30 px-2.5 py-1 rounded-lg border border-violet-100 dark:border-violet-800/50">{item.skill}</code>
                    </button>
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
                      <strong className="text-zinc-800 dark:text-zinc-200">Pro tip:</strong> Click the copy button on any skill card to get the Cursor prompt directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
