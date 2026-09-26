import { Reveal } from "@/components/reveal";

const roles = [
  {
    title: "Software Engineer",
    start: "2022-06",
    end: "2024-01",
    dates: ["Jun 2022", "Jan 2024"],
    focus: "Backend systems · SmartBear Collaborator",
    summary: "Designed and maintained Java / Spring Boot backend modules and distributed microservices backed by MySQL.",
    impact: "50+",
    impactLabel: "companies adopted the integration module",
    detail: "Led the Git, SVN, and Perforce version-control integration module.",
    craft: "Built JUnit test suites, contributed to Jenkins CI/CD workflows, and mentored a junior engineer while delivering production features and reliability improvements.",
    stack: ["Java", "Spring Boot", "MySQL", "JUnit", "Jenkins"],
  },
  {
    title: "Software Engineer Intern",
    start: "2022-01",
    end: "2022-06",
    dates: ["Jan 2022", "Jun 2022"],
    focus: "Internal tools · Deployment & automation",
    summary: "Built an internal Admin Dashboard with React and TypeScript, containerized it with Docker, and served it through Nginx on Ubuntu Linux.",
    impact: null,
    impactLabel: "",
    detail: "",
    craft: "Built a Java / JSoup market-trends scraper and deployed it as a Linux background service.",
    stack: ["React", "TypeScript", "Docker", "Nginx", "Java / JSoup"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="section shell experience-section" aria-labelledby="experience-title">
      <Reveal>
        <div className="section-heading">
          <div><span className="eyebrow mono">02 / EXPERIENCE</span><h2 id="experience-title">Engineering in production.</h2></div>
          <p>From internal tools to backend systems.<br />Built, shipped, and maintained at Persistent Systems.</p>
        </div>
      </Reveal>
      <ol className="career-timeline" aria-label="Professional experience, most recent first">
        {roles.map(role => (
          <li className="career-entry" key={role.title}>
            <Reveal className="career-layout">
              <div className="career-meta">
                <p className="career-dates mono"><time dateTime={role.start}>{role.dates[0]}</time><span aria-hidden="true"> — </span><time dateTime={role.end}>{role.dates[1]}</time></p>
                <p className="career-company">Persistent Systems</p>
              </div>
              <div className="career-content">
                <span className="career-focus mono">{role.focus}</span>
                <h3>{role.title}</h3>
                <p className="career-summary">{role.summary}</p>
                {role.impact && <div className="career-impact"><div><strong>{role.impact}</strong><span>{role.impactLabel}</span></div><p>{role.detail}</p></div>}
                <p className="career-craft">{role.craft}</p>
                <div className="project-stack mono" aria-label="Technologies">{role.stack.map(technology => <span key={technology}>{technology}</span>)}</div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
