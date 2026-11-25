import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSkills, getSkillBySlug, getSkillFile } from "@/lib/skills";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MarkdownContent } from "@/components/markdown-content";
import matter from "gray-matter";

export function generateStaticParams() {
  const skills = getAllSkills();
  const params: { slug: string; file: string }[] = [];

  for (const skill of skills) {
    for (const file of skill.files) {
      if (file !== "SKILL.md") {
        params.push({ slug: skill.slug, file: file.replace(".md", "") });
      }
    }
  }

  return params;
}

export default async function SkillFilePage({
  params,
}: {
  params: Promise<{ slug: string; file: string }>;
}) {
  const { slug, file } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) {
    notFound();
  }

  const filename = `${file}.md`;
  const fileContent = getSkillFile(slug, filename);

  if (!fileContent) {
    notFound();
  }

  const { content } = matter(fileContent);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 -ml-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                All Skills
              </Button>
            </Link>
            <span className="text-zinc-300 dark:text-zinc-600">/</span>
            <Link href={`/skill/${slug}`}>
              <Button variant="ghost" size="sm">
                {skill.name}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
                {filename}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Part of the <span className="font-medium">{skill.name}</span>{" "}
                skill
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline">
              {skill.name} / {filename}
            </Badge>
          </div>
        </div>

        <Separator className="mb-8" />

        <article className="prose prose-zinc dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-code:before:content-none prose-code:after:content-none prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-200 dark:prose-pre:border-zinc-700 max-w-none">
          <MarkdownContent content={content} />
        </article>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Skills Browser
        </div>
      </footer>
    </div>
  );
}
