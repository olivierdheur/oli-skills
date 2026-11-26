"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
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
  category: string;
}

const sourceColors: Record<string, { badge: string; icon: string; label: string; active: string }> = {
  cursor: {
    badge: "border-blue-400/50 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-950/50 dark:text-blue-300",
    icon: "from-blue-500 to-cyan-500",
    label: "ECC",
    active: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25",
  },
  agents: {
    badge: "border-violet-400/50 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-950/50 dark:text-violet-300",
    icon: "from-violet-500 to-fuchsia-500",
    label: "Emil",
    active: "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25",
  },
  superpowers: {
    badge: "border-amber-400/50 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-950/50 dark:text-amber-300",
    icon: "from-amber-500 to-orange-500",
    label: "Superpowers",
    active: "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25",
  },
  marketing: {
    badge: "border-emerald-400/50 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/50 dark:text-emerald-300",
    icon: "from-emerald-500 to-teal-500",
    label: "Marketing",
    active: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25",
  },
  vercel: {
    badge: "border-zinc-400/50 bg-zinc-50 text-zinc-700 dark:border-zinc-500/30 dark:bg-zinc-800/50 dark:text-zinc-300",
    icon: "from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-300",
    label: "Vercel",
    active: "bg-gradient-to-r from-zinc-700 to-zinc-900 text-white dark:from-zinc-200 dark:to-zinc-400 dark:text-zinc-900 shadow-lg shadow-zinc-500/25",
  },
  seo: {
    badge: "border-rose-400/50 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-950/50 dark:text-rose-300",
    icon: "from-rose-500 to-pink-500",
    label: "Claude SEO",
    active: "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25",
  },
  agency: {
    badge: "border-cyan-400/50 bg-cyan-50 text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-950/50 dark:text-cyan-300",
    icon: "from-cyan-500 to-sky-500",
    label: "Agency",
    active: "bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-500/25",
  },
  mattpocock: {
    badge: "border-indigo-400/50 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/50 dark:text-indigo-300",
    icon: "from-indigo-500 to-purple-500",
    label: "Matt Pocock",
    active: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25",
  },
  jmanico: {
    badge: "border-red-400/50 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-950/50 dark:text-red-300",
    icon: "from-red-500 to-orange-500",
    label: "Jim Manico",
    active: "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25",
  },
  heygen: {
    badge: "border-purple-400/50 bg-purple-50 text-purple-700 dark:border-purple-500/30 dark:bg-purple-950/50 dark:text-purple-300",
    icon: "from-purple-500 to-pink-500",
    label: "HeyGen",
    active: "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25",
  },
};

const categoryIcons: Record<string, string> = {
  // Parent categories
  "Security": "🔒",
  "AI": "🤖",
  "Design": "🎨",
  "Frontend": "🖥️",
  "Backend": "⚙️",
  "Languages": "📝",
  "Architecture": "🏗️",
  "DevOps": "🚀",
  "Testing": "🧪",
  "Marketing": "📈",
  "Writing": "✍️",
  "Workflow": "⚡",
  "Data": "📊",
  "Roles": "🎭",
  "Other": "📦",
  // Subcategories
  "Threat Modeling": "🎯",
  "Logging & Audit": "📋",
  "Dependencies": "📦",
  "Auth": "🔐",
  "General": "📌",
  "Agents": "🤖",
  "LLM Patterns": "💬",
  "Coding Dictionary": "📖",
  "Tools": "🔧",
  "Animation": "🎬",
  "Components": "🧩",
  "UI Patterns": "🎨",
  "Prototyping": "✏️",
  "React": "⚛️",
  "Vue": "💚",
  "Other Frameworks": "🔷",
  "API": "🔌",
  "Database": "🗄️",
  "Frameworks": "📚",
  "TypeScript": "🔷",
  "Python": "🐍",
  "Rust": "🦀",
  "Swift": "🍎",
  "Go": "🐹",
  "Patterns": "🧬",
  "Codebase": "📂",
  "CI/CD": "🔄",
  "Containers": "🐳",
  "Infrastructure": "☁️",
  "Git": "🌿",
  "Unit": "🔬",
  "E2E": "🎭",
  "SEO": "🔍",
  "Ads & PPC": "💰",
  "Email": "📧",
  "Social": "💬",
  "Conversion": "📈",
  "Content": "📝",
  "Analytics": "📊",
  "Technical": "📄",
  "Business": "💼",
  "Planning": "📋",
  "Execution": "⚡",
  "Review": "🔎",
  "Analysis": "📈",
  "ML": "🧠",
  "Engineering": "👨‍💻",
  "Specialist": "🎯",
};

const sourceToPath: Record<string, string> = {
  cursor: ".cursor/skills",
  agents: ".agents/skills",
  superpowers: ".superpowers/skills",
  marketing: ".marketing/skills",
  vercel: ".vercel-skills/skills",
  seo: ".claude-seo/skills",
  agency: ".agency/skills",
  mattpocock: ".mattpocock/skills",
  jmanico: ".jmanico/skills",
  heygen: ".heygen/skills",
};

const suggestedSearches = [
  { label: "Animation", query: "animation" },
  { label: "React", query: "react" },
  { label: "SEO", query: "seo" },
  { label: "Marketing", query: "marketing" },
  { label: "Testing", query: "test" },
  { label: "Security", query: "security" },
];

function CopyButton({ path, name }: { path: string; name: string }) {
  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const prompt = `Read ${path}/${name}/SKILL.md`;
    await navigator.clipboard.writeText(prompt);
    toast.success("Copied to clipboard", {
      description: prompt,
      duration: 2000,
    });
  }, [path, name]);

  return (
    <button
      onClick={handleCopy}
      className="copy-button absolute top-3 right-3 p-1.5 rounded-lg bg-zinc-100/90 dark:bg-zinc-800/90 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50"
      title="Copy Cursor prompt"
    >
      <svg className="w-4 h-4 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
      </svg>
    </button>
  );
}

interface SkillsGridProps {
  skills: Skill[];
  onFilteredCountChange?: (count: number) => void;
}

export function SkillsGrid({ skills, onFilteredCountChange }: SkillsGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [sourceFilter, setSourceFilter] = useState<string | null>(searchParams.get("source"));
  const [categoryFilter, setCategoryFilter] = useState<string | null>(searchParams.get("category"));

  const updateURL = useCallback((newSearch: string, newSource: string | null, newCategory: string | null) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("q", newSearch);
    if (newSource) params.set("source", newSource);
    if (newCategory) params.set("category", newCategory);
    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : "/", { scroll: false });
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        if (document.activeElement === searchInputRef.current) {
          if (search) {
            setSearch("");
            updateURL("", sourceFilter, categoryFilter);
          } else {
            searchInputRef.current?.blur();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [search, sourceFilter, categoryFilter, updateURL]);

  const [expandedParents, setExpandedParents] = useState<Set<string>>(new Set());

  // Parse hierarchical categories
  const { parentCategories, categoryTree } = useMemo(() => {
    const tree = new Map<string, { count: number; subcategories: Map<string, number> }>();
    
    for (const skill of skills) {
      const parts = skill.category.split(" > ");
      const parent = parts[0];
      const sub = parts[1] || "General";
      
      if (!tree.has(parent)) {
        tree.set(parent, { count: 0, subcategories: new Map() });
      }
      const node = tree.get(parent)!;
      node.count++;
      node.subcategories.set(sub, (node.subcategories.get(sub) || 0) + 1);
    }
    
    const parents = Array.from(tree.entries())
      .map(([name, data]) => ({
        name,
        count: data.count,
        subcategories: Array.from(data.subcategories.entries())
          .map(([subName, subCount]) => ({ name: subName, fullName: `${name} > ${subName}`, count: subCount }))
          .sort((a, b) => b.count - a.count)
      }))
      .sort((a, b) => b.count - a.count);
    
    return { parentCategories: parents, categoryTree: tree };
  }, [skills]);

  const toggleParentExpand = (parent: string) => {
    setExpandedParents(prev => {
      const next = new Set(prev);
      if (next.has(parent)) {
        next.delete(parent);
      } else {
        next.add(parent);
      }
      return next;
    });
  };

  const filteredSkills = useMemo(() => {
    const results = skills.filter((skill) => {
      const matchesSearch =
        search === "" ||
        skill.name.toLowerCase().includes(search.toLowerCase()) ||
        skill.description.toLowerCase().includes(search.toLowerCase());
      const matchesSource = !sourceFilter || skill.source === sourceFilter;
      
      // Category filter: match exact category OR parent category
      let matchesCategory = !categoryFilter;
      if (categoryFilter) {
        if (categoryFilter.includes(" > ")) {
          // Exact subcategory match
          matchesCategory = skill.category === categoryFilter;
        } else {
          // Parent category match
          matchesCategory = skill.category.startsWith(categoryFilter + " > ") || skill.category === categoryFilter;
        }
      }
      
      return matchesSearch && matchesSource && matchesCategory;
    });
    return results;
  }, [skills, search, sourceFilter, categoryFilter]);

  useEffect(() => {
    onFilteredCountChange?.(filteredSkills.length);
  }, [filteredSkills.length, onFilteredCountChange]);

  const sourceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const skill of skills) {
      counts[skill.source] = (counts[skill.source] || 0) + 1;
    }
    return counts;
  }, [skills]);

  const sources = useMemo(() => {
    return Object.entries(sourceCounts)
      .map(([key, count]) => ({
        key,
        label: sourceColors[key]?.label || key,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [sourceCounts]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    updateURL(value, sourceFilter, categoryFilter);
  };

  const handleSourceChange = (source: string | null) => {
    setSourceFilter(source);
    updateURL(search, source, categoryFilter);
  };

  const handleCategoryChange = (category: string | null) => {
    setCategoryFilter(category);
    updateURL(search, sourceFilter, category);
  };

  const clearAllFilters = () => {
    setSearch("");
    setSourceFilter(null);
    setCategoryFilter(null);
    updateURL("", null, null);
  };

  const hasFilters = search || sourceFilter || categoryFilter;

  return (
    <>
      <div className="mb-8 space-y-5">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 transition-colors group-focus-within:text-violet-500"
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
              ref={searchInputRef}
              type="text"
              placeholder="Search skills..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="search-input w-full pl-12 pr-24 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none text-base"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {search && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-mono border border-zinc-200 dark:border-zinc-700">
                <span className="text-[10px]">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Source</span>
            <div className="flex-1 h-px bg-gradient-to-r from-zinc-200 dark:from-zinc-800 to-transparent" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleSourceChange(null)}
              className={`filter-pill px-4 py-2 rounded-xl text-sm font-medium ${
                !sourceFilter
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-lg"
                  : "text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-800/80"
              }`}
            >
              All
              <span className="ml-1.5 text-xs opacity-70">{skills.length}</span>
            </button>
            {sources.map(({ key, label, count }) => {
              const colors = sourceColors[key as keyof typeof sourceColors];
              const isActive = sourceFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSourceChange(isActive ? null : key)}
                  className={`filter-pill px-4 py-2 rounded-xl text-sm font-medium ${
                    isActive
                      ? colors.active
                      : "text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-800/80"
                  }`}
                >
                  {label}
                  <span className="ml-1.5 text-xs opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Category</span>
            <div className="flex-1 h-px bg-gradient-to-r from-zinc-200 dark:from-zinc-800 to-transparent" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`filter-pill px-3 py-1.5 rounded-lg text-xs font-medium ${
                !categoryFilter
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md"
                  : "text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-800/80"
              }`}
            >
              All
            </button>
            {parentCategories.map(({ name: parentName, count, subcategories }) => {
              const isParentActive = categoryFilter === parentName;
              const isSubActive = categoryFilter?.startsWith(parentName + " > ");
              const isExpanded = expandedParents.has(parentName);
              const hasMultipleSubs = subcategories.length > 1;
              
              return (
                <div key={parentName} className="relative">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleCategoryChange(isParentActive ? null : parentName)}
                      className={`filter-pill px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${
                        isParentActive || isSubActive
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md"
                          : "text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-800/80"
                      } ${hasMultipleSubs ? "rounded-r-none pr-2" : ""}`}
                    >
                      <span>{categoryIcons[parentName] || "📦"}</span>
                      <span>{parentName}</span>
                      <span className="opacity-60">{count}</span>
                    </button>
                    {hasMultipleSubs && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleParentExpand(parentName);
                        }}
                        className={`filter-pill px-2 py-1.5 rounded-lg rounded-l-none text-xs font-medium border-l border-zinc-300/50 dark:border-zinc-600/50 hover:bg-zinc-200 dark:hover:bg-zinc-700 ${
                          isParentActive || isSubActive
                            ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900 shadow-md"
                            : "text-zinc-500 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-800/80"
                        }`}
                        title="Show subcategories"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  {isExpanded && hasMultipleSubs && (
                    <div className="absolute top-full left-0 mt-1 z-20 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 p-1.5 min-w-[160px]">
                      {subcategories.map(({ name: subName, fullName, count: subCount }) => (
                        <button
                          key={fullName}
                          onClick={() => {
                            handleCategoryChange(categoryFilter === fullName ? null : fullName);
                            setExpandedParents(new Set());
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 ${
                            categoryFilter === fullName
                              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          }`}
                        >
                          <span>{categoryIcons[subName] || "📌"}</span>
                          <span className="flex-1">{subName}</span>
                          <span className="opacity-60">{subCount}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {hasFilters && (
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Showing <span className="font-semibold text-zinc-900 dark:text-zinc-100">{filteredSkills.length}</span> of {skills.length} skills
            </p>
            <button
              onClick={clearAllFilters}
              className="text-sm text-violet-600 dark:text-violet-400 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {filteredSkills.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill, index) => {
            const colors = sourceColors[skill.source as keyof typeof sourceColors] || sourceColors.agents;
            const path = sourceToPath[skill.source] || ".agents/skills";
            const staggerDelay = Math.min(index * 30, 300);
            
            return (
              <Link 
                key={skill.slug} 
                href={`/skill/${skill.slug}`}
                className="skill-card-enter"
                style={{ animationDelay: `${staggerDelay}ms` }}
              >
                <Card className="skill-card relative h-full cursor-pointer border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/70 backdrop-blur-sm overflow-hidden group">
                  <CopyButton path={path} name={skill.name} />
                  <CardHeader className="space-y-3 pb-4">
                    <div className="flex items-start justify-between gap-2 pr-8">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${colors.icon} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
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
                        <CardTitle className="text-base font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
                          {skill.name}
                        </CardTitle>
                      </div>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      <Badge variant="outline" className="text-[10px] font-medium bg-zinc-50/80 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200/80 dark:border-zinc-700/50">
                        {categoryIcons[skill.category]} {skill.category}
                      </Badge>
                      <Badge variant="outline" className={`text-[10px] font-medium ${colors.badge}`}>
                        {colors.label}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed line-clamp-2 text-zinc-600 dark:text-zinc-400">
                      {skill.description}
                    </CardDescription>
                    <div className="pt-1 flex items-center gap-2">
                      <code className="text-xs text-zinc-400 dark:text-zinc-500 font-mono bg-zinc-100/80 dark:bg-zinc-800/50 px-2 py-0.5 rounded">
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
        <div className="empty-state text-center py-20">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <svg
              className="w-10 h-10 text-zinc-400"
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
          <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2 tracking-tight">
            No skills found
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
            {search 
              ? `No results for "${search}"${sourceFilter ? ` in ${sourceColors[sourceFilter as keyof typeof sourceColors]?.label || sourceFilter}` : ''}` 
              : "Try a different filter combination"
            }
          </p>
          
          <div className="mb-6">
            <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-3 uppercase tracking-wider">Try searching for</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedSearches.map(({ label, query }) => (
                <button
                  key={query}
                  onClick={() => {
                    handleSearchChange(query);
                    handleSourceChange(null);
                    handleCategoryChange(null);
                  }}
                  className="filter-pill px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={clearAllFilters}
            className="filter-pill px-5 py-2.5 rounded-xl text-sm font-medium bg-violet-600 text-white shadow-lg shadow-violet-500/25 hover:bg-violet-700 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </>
  );
}
