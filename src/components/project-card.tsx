import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content";
import { ProjectVisual } from "@/components/project-visual";

export function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card"><Link href={`/work/${project.slug}`} className="project-link" aria-label={`Read ${project.name} case study`}><ProjectVisual slug={project.slug} /><div className="project-info"><div className="project-meta mono"><span>{project.number} / {project.category}</span><span className="project-arrow"><ArrowUpRight size={23} aria-hidden="true" /></span></div><h3>{project.name}</h3><p>{project.summary}</p><div className="project-stack">{project.stack.map(technology => <span key={technology}>{technology}</span>)}</div><span className="case-study-link">Explore case study <ArrowUpRight size={15} aria-hidden="true" /></span></div></Link></article>;
}
