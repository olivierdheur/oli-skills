import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Skill {
  slug: string;
  name: string;
  description: string;
  content: string;
  files: string[];
  source: string;
}

const SKILLS_DIRS = [
  { path: ".agents/skills", source: "agents" },
  { path: ".cursor/skills", source: "cursor" },
];

function getSkillsFromDir(dirPath: string, source: string): Skill[] {
  const fullDirPath = path.join(process.cwd(), dirPath);
  
  if (!fs.existsSync(fullDirPath)) {
    return [];
  }

  const skillDirs = fs.readdirSync(fullDirPath).filter((dir) => {
    const fullPath = path.join(fullDirPath, dir);
    return fs.statSync(fullPath).isDirectory();
  });

  return skillDirs
    .map((slug) => {
      const skillPath = path.join(fullDirPath, slug, "SKILL.md");
      if (!fs.existsSync(skillPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(skillPath, "utf8");
      const { data, content } = matter(fileContents);

      const skillDir = path.join(fullDirPath, slug);
      const files = fs.readdirSync(skillDir).filter((f) => f.endsWith(".md"));

      return {
        slug: `${source}/${slug}`,
        name: data.name || slug,
        description: data.description || "",
        content,
        files,
        source,
      };
    })
    .filter((skill): skill is Skill => skill !== null);
}

export function getAllSkills(): Skill[] {
  const allSkills: Skill[] = [];
  
  for (const { path: dirPath, source } of SKILLS_DIRS) {
    allSkills.push(...getSkillsFromDir(dirPath, source));
  }
  
  return allSkills.sort((a, b) => a.name.localeCompare(b.name));
}

export function getSkillBySlug(slug: string): Skill | null {
  const skills = getAllSkills();
  return skills.find((s) => s.slug === slug) || null;
}

function getSkillDirPath(slug: string): string | null {
  const [source, ...rest] = slug.split("/");
  const skillSlug = rest.join("/");
  
  const dirConfig = SKILLS_DIRS.find((d) => d.source === source);
  if (!dirConfig) return null;
  
  return path.join(process.cwd(), dirConfig.path, skillSlug);
}

export function getSkillFile(slug: string, filename: string): string | null {
  const skillDir = getSkillDirPath(slug);
  if (!skillDir) return null;
  
  const filePath = path.join(skillDir, filename);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, "utf8");
}
