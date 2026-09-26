import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2 as Github } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { Reveal } from "@/components/reveal";
import { getSiteUrl, projects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) return { title: "Project not found" };
  const siteUrl = getSiteUrl();
  return {
    title: project.name,
    description: project.summary,
    ...(siteUrl ? { alternates: { canonical: `${siteUrl}/work/${project.slug}` } } : {}),
    openGraph: { title: `${project.name} — Tarun Bagewadi`, description: project.summary, type: "article" },
    twitter: { card: "summary", title: `${project.name} — Tarun Bagewadi`, description: project.summary },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projectIndex = projects.findIndex(item => item.slug === slug);
  if (projectIndex === -1) notFound();
  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return <main id="main" className="case-page shell">
    <Link href="/#work" className="back-link"><ArrowLeft size={16} aria-hidden="true" /> Selected work</Link>
    <header className="case-header"><span className="eyebrow mono">{project.number} / {project.category}</span><h1>{project.name}<span>.</span></h1><p className="case-headline">{project.headline}</p><p className="case-summary">{project.summary}</p><div className="case-meta"><div><span className="mono">CONTEXT</span><p>{project.scope}</p></div><div><span className="mono">TECHNOLOGIES</span><p>{project.stack.join(" · ")}</p></div><a href={project.repository} className="text-link" target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden="true" /> View source<ArrowUpRight size={16} aria-hidden="true" /></a></div></header>
    <div className="case-visual"><ProjectVisual slug={project.slug} /></div>
    <div className="case-body"><aside className="case-contents"><span className="mono">IN THIS CASE STUDY</span><nav aria-label="Case study contents"><a href="#challenge">The challenge</a><a href="#architecture">System overview</a><a href="#decisions">Engineering decisions</a><a href="#takeaway">The takeaway</a></nav></aside><div className="case-prose">
      <Reveal><section id="challenge"><span className="eyebrow mono">01 / THE CHALLENGE</span><h2>Where the work begins.</h2><p>{project.challenge}</p></section></Reveal>
      <Reveal><section id="architecture"><span className="eyebrow mono">02 / SYSTEM OVERVIEW</span><h2>Follow the flow.</h2><ol className="architecture-flow">{project.flow.map((step, index) => <li key={step}><span className="mono">0{index + 1}</span><span>{step}</span>{index < project.flow.length - 1 && <ArrowRight size={16} aria-hidden="true" />}</li>)}</ol></section></Reveal>
      <Reveal><section id="decisions"><span className="eyebrow mono">03 / ENGINEERING DECISIONS</span><h2>The choices that matter.</h2><div className="decisions">{project.approach.map((decision, index) => <div className="decision" key={decision.title}><span className="mono">0{index + 1}</span><div><h3>{decision.title}</h3><p>{decision.body}</p></div></div>)}</div></section></Reveal>
      <Reveal><section id="takeaway"><span className="eyebrow mono">04 / THE TAKEAWAY</span><h2>What this work makes clear.</h2><p>{project.takeaway}</p><div className="scope-note"><span className="mono">SCOPE & EVIDENCE</span><p>{project.limitation}</p><a href={project.repository} target="_blank" rel="noopener noreferrer">Explore the repository <ArrowUpRight size={14} aria-hidden="true" /></a></div></section></Reveal>
    </div></div>
    <Link className="next-project" href={`/work/${nextProject.slug}`}><div><span className="eyebrow mono">NEXT CASE STUDY / {nextProject.number}</span><h2>{nextProject.name}</h2><p>{nextProject.category}</p></div><ArrowUpRight size={42} strokeWidth={1.2} aria-hidden="true" /></Link>
  </main>;
}
