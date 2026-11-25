"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Skill {
  slug: string;
  name: string;
  description: string;
  source: string;
}

const sourceColors = {
  cursor: {
    badge: "border-blue-400/50 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-950/50 dark:text-blue-300",
    icon: "from-blue-500 to-cyan-500",
    label: "ECC",
  },
  agents: {
    badge: "border-violet-400/50 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-950/50 dark:text-violet-300",
    icon: "from-violet-500 to-fuchsia-500",
    label: "Emil",
  },
};

export function SkillsGrid({ skills }: { skills: Skill[] }) {
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesSearch =
        search === "" ||
        skill.name.toLowerCase().includes(search.toLowerCase()) ||
        skill.description.toLowerCase().includes(search.toLowerCase());
      const matchesSource = !sourceFilter || skill.source === sourceFilter;
      return matchesSearch && matchesSource;
    });
  }, [skills, search, sourceFilter]);

  const eccCount = skills.filter((s) => s.source === "cursor").length;
  const emilCount = skills.filter((s) => s.source === "agents").length;

  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-shadow"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSourceFilter(null)}
            className={`nav-button px-3 py-1.5 rounded-lg text-sm font-medium ${
              !sourceFilter
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            All ({skills.length})
          </button>
          <button
            onClick={() => setSourceFilter("cursor")}
            className={`nav-button px-3 py-1.5 rounded-lg text-sm font-medium ${
              sourceFilter === "cursor"
                ? "bg-blue-600 text-white"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            ECC ({eccCount})
          </button>
          <button
            onClick={() => setSourceFilter("agents")}
            className={`nav-button px-3 py-1.5 rounded-lg text-sm font-medium ${
              sourceFilter === "agents"
                ? "bg-violet-600 text-white"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            Emil ({emilCount})
          </button>
        </div>
      </div>

      {filteredSkills.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill) => {
            const colors = sourceColors[skill.source as keyof typeof sourceColors] || sourceColors.agents;
            return (
              <Link key={skill.slug} href={`/skill/${skill.slug}`}>
                <Card className="skill-card h-full cursor-pointer border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.icon} flex items-center justify-center shadow-sm`}>
                          <svg
                            className="w-4 h-4 text-white"
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
                        <CardTitle className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                          {skill.name}
                        </CardTitle>
                      </div>
                      <Badge variant="outline" className={`text-[10px] font-medium shrink-0 ${colors.badge}`}>
                        {colors.label}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed line-clamp-2 text-zinc-600 dark:text-zinc-400">
                      {skill.description}
                    </CardDescription>
                    <div className="pt-1">
                      <code className="text-xs text-zinc-500 dark:text-zinc-500 font-mono">
                        /{skill.name}
                      </code>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">
            No skills found
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Try a different search term or filter
          </p>
        </div>
      )}
    </>
  );
}
