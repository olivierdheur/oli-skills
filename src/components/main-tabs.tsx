"use client";

import { useState } from "react";
import { SkillsGrid } from "@/components/skills-grid";
import { SkillsMixer } from "@/components/skills-mixer";

interface Skill {
  slug: string;
  name: string;
  description: string;
  source: string;
  category: string;
}

interface MainTabsProps {
  skills: Skill[];
}

export function MainTabs({ skills }: MainTabsProps) {
  const [activeTab, setActiveTab] = useState<"browser" | "mixer">("browser");

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 mb-6 p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("browser")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeTab === "browser"
              ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Browse Skills
          </span>
        </button>
        <button
          onClick={() => setActiveTab("mixer")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeTab === "mixer"
              ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Skills Mixer
            <span className="px-1.5 py-0.5 text-xs rounded-md bg-gradient-to-r from-violet-500 to-purple-500 text-white">
              New
            </span>
          </span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "browser" ? (
        <SkillsGrid skills={skills} />
      ) : (
        <SkillsMixer skills={skills} />
      )}
    </div>
  );
}
