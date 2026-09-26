import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main id="main" className="shell not-found"><span className="eyebrow mono">404 / A DETOUR</span><h1>This path<br /><span>ends here.</span></h1><p>The page you’re looking for isn’t here. There’s still plenty to explore.</p><Link href="/" className="button button-primary"><ArrowLeft size={16} aria-hidden="true" /> Back to the portfolio</Link></main>;
}
