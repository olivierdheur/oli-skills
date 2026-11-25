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
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Built with Next.js, Tailwind CSS, and design principles from Emil Kowalski
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
