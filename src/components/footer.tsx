import { ArrowUpRight, Code2 as Github } from "lucide-react";
import { profile } from "@/lib/content";

export function Footer() {
  return <footer className="site-footer"><div className="shell footer-inner"><a href="/" className="wordmark" aria-label="Tarun Bagewadi home"><span className="monogram">tb<span>.</span></span><span className="footer-name">Tarun Bagewadi</span></a><p>Thoughtfully built. Always evolving.</p><a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={14} aria-hidden="true" /></a><span className="mono">© {new Date().getFullYear()}</span></div></footer>;
}
