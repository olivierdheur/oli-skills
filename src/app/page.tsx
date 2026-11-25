import { getAllSkills } from "@/lib/skills";
import { SkillsGrid } from "@/components/skills-grid";
import { UsageGuide } from "@/components/usage-guide";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeaderClient } from "@/components/header-client";
import { Suspense } from "react";

export default function Home() {
  const skills = getAllSkills();

  return (
    <div className="min-h-dvh bg-gradient-to-b from-zinc-50 via-white to-zinc-100/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <HeaderClient totalSkills={skills.length} />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <UsageGuide />
        <Suspense fallback={<div className="animate-pulse h-96 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />}>
          <SkillsGrid skills={skills.map(s => ({ slug: s.slug, name: s.name, description: s.description, source: s.source, category: s.category }))} />
        </Suspense>
      </main>

      <footer className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-medium">Oli&apos;s Skills Browser</span>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <span>{skills.length} skills</span>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <a 
                href="https://github.com/olivierdheur/oli-skills" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <a 
                href="https://www.npmjs.com/package/oli-skills" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z"/>
                </svg>
                npm
              </a>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Auto-publishes to npm when skills are updated
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
