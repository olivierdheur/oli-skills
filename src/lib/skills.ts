import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Skill {
  slug: string;
  name: string;
  description: string;
  content: string;
  files: string[];
}

const SKILLS_DIR = path.join(process.cwd(), ".agents/skills");

export function getAllSkills(): Skill[] {
  if (!fs.existsSync(SKILLS_DIR)) {
    return [];
  }

  const skillDirs = fs.readdirSync(SKILLS_DIR).filter((dir) => {
    const fullPath = path.join(SKILLS_DIR, dir);
    return fs.statSync(fullPath).isDirectory();
  });

  return skillDirs
    .map((slug) => {
      const skillPath = path.join(SKILLS_DIR, slug, "SKILL.md");
      if (!fs.existsSync(skillPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(skillPath, "utf8");
      const { data, content } = matter(fileContents);

      const skillDir = path.join(SKILLS_DIR, slug);
      const files = fs.readdirSync(skillDir).filter((f) => f.endsWith(".md"));

      return {
        slug,
        name: data.name || slug,
        description: data.description || "",
        content,
        files,
      };
    })
    .filter((skill): skill is Skill => skill !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getSkillBySlug(slug: string): Skill | null {
  const skills = getAllSkills();
  return skills.find((s) => s.slug === slug) || null;
}

export function getSkillFile(slug: string, filename: string): string | null {
  const filePath = path.join(SKILLS_DIR, slug, filename);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, "utf8");
}
