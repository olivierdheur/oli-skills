import skillsData from "./skills-data.json";

export interface Skill {
  slug: string;
  name: string;
  description: string;
  content: string;
  files: string[];
  filesContent: Record<string, string>;
  source: string;
  category: string;
}

const skills: Skill[] = skillsData as unknown as Skill[];

export function getAllSkills(): Skill[] {
  return skills;
}

export function getAllCategories(skills: Skill[]): { name: string; count: number }[] {
  const categoryCount = new Map<string, number>();
  
  for (const skill of skills) {
    categoryCount.set(skill.category, (categoryCount.get(skill.category) || 0) + 1);
  }
  
  return Array.from(categoryCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getSkillBySlug(slug: string): Skill | null {
  return skills.find((s) => s.slug === slug) || null;
}

export function getSkillFile(slug: string, filename: string): string | null {
  const skill = getSkillBySlug(slug);
  if (!skill) return null;
  return skill.filesContent[filename] || null;
}
