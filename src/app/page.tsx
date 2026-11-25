import Link from "next/link";
import { getAllSkills } from "@/lib/skills";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const skills = getAllSkills();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
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
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Skills Browser
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Design and animation skills by Emil Kowalski
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
            These skills teach AI agents how to build better user interfaces
            with proper animations, design decisions, and engineering taste.
            Each skill encodes years of experience into actionable guidance.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Badge variant="secondary" className="text-sm">
            {skills.length} skills installed
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <Link key={skill.slug} href={`/skill/${skill.slug}`}>
              <Card className="h-full transition-all duration-200 ease-out hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 hover:-translate-y-0.5 hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {skill.name}
                    </CardTitle>
                    {skill.files.length > 1 && (
                      <Badge variant="outline" className="text-xs shrink-0">
                        {skill.files.length} files
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm leading-relaxed line-clamp-3">
                    {skill.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {skills.length === 0 && (
          <div className="text-center py-16 text-zinc-500 dark:text-zinc-400">
            <p className="text-lg mb-2">No skills found</p>
            <p className="text-sm">
              Add skills to <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-sm">.agents/skills/</code>
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Skills from{" "}
          <a
            href="https://github.com/emilkowalski/skills"
            className="text-violet-600 dark:text-violet-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            emilkowalski/skills
          </a>
        </div>
      </footer>
    </div>
  );
}
