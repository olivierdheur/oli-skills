import { getAllSkills } from "@/lib/skills";
import { SkillsGrid } from "@/components/skills-grid";
import { UsageGuide } from "@/components/usage-guide";

export default function Home() {
  const skills = getAllSkills();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950/50">
      <header className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Oli's Skills Browser
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {skills.length} skills installed
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <UsageGuide />
        <SkillsGrid skills={skills.map(s => ({ slug: s.slug, name: s.name, description: s.description, source: s.source, category: s.category }))} />
      </main>

      <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 py-6 mt-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Oli's Skills Browser
        </div>
      </footer>
    </div>
  );
}
