export const profile = {
  name: "Tarun Bagewadi",
  role: "Backend & AI Software Engineer",
  email: "tarun.bags@gmail.com",
  github: "https://github.com/tabs929",
};

export type Project = {
  slug: string;
  number: string;
  name: string;
  category: string;
  headline: string;
  summary: string;
  stack: string[];
  repository: string;
  scope: string;
  challenge: string;
  approach: { title: string; body: string }[];
  takeaway: string;
  limitation: string;
  flow: string[];
};

export const projects: Project[] = [
  {
    slug: "ledgerguard", number: "01", name: "LedgerGuard", category: "Backend systems",
    headline: "Correctness, down to the last transaction.",
    summary: "A double-entry ledger and settlement platform built around the hard parts: retries, concurrency, and reliable event delivery.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Kafka"],
    repository: "https://github.com/tabs929/LedgerGuard",
    scope: "Independent engineering project",
    challenge: "A payment request can arrive twice. Two transfers can race. An event publisher can fail after the database commits. The challenge is preserving financial invariants across each of these failure modes.",
    approach: [
      { title: "Make the database the source of truth", body: "Deposits and transfers produce balanced debit and credit entries in a single transaction. Database triggers enforce immutability, and reconciliation recomputes balances from ledger entries instead of trusting a cached balance." },
      { title: "Design for retries and concurrency", body: "Principal-scoped idempotency uses PostgreSQL transaction-scoped advisory locks. Deterministic row-lock ordering handles concurrent transfers, while ownership checks live at both the HTTP and service boundaries." },
      { title: "Close the event-delivery gap", body: "The financial write and its outbox event commit together. A separate publisher sends events to Kafka with at-least-once delivery; database-backed consumer deduplication prevents duplicate processing." },
    ],
    takeaway: "Reliability comes from explicit invariants and failure-aware boundaries. A modular monolith keeps the deployment simple while separating ledger, settlement, reconciliation, and security concerns.",
    limitation: "A demonstration platform, not a production financial service. The repository includes Testcontainers-backed integration tests against real PostgreSQL and Kafka; no production traffic or business-impact claims are implied.",
    flow: ["Authenticated request", "Ledger + outbox transaction", "Kafka publication", "Idempotent consumer"],
  },
  {
    slug: "visseqbench", number: "02", name: "VisSeqBench", category: "AI evaluation",
    headline: "Look beyond a convincing answer.",
    summary: "A multi-metric benchmark that asks whether vision-language models understand objects, actions, and the order of events.",
    stack: ["Python", "Transformers", "NLTK", "Statistics"],
    repository: "https://github.com/tabs929/VisSeqBench",
    scope: "CSCI 544 · NLP course project",
    challenge: "A fluent description can still miss an action or reverse the order of events. Surface text similarity alone cannot explain how a multimodal model understands a visual sequence.",
    approach: [
      { title: "Separate actions from objects", body: "Curated synonym graphs and part-of-speech-aware lemmatization normalize recognized actions and objects before scoring. Per-image macro scores sit alongside pooled micro scores." },
      { title: "Evaluate across multiple dimensions", body: "The pipeline combines keyword F1, BLEU, ROUGE-L, METEOR, BERTScore, embedding similarity, and temporal-order measures. New model predictions enter through a common CSV format." },
      { title: "Make uncertainty visible", body: "Bootstrap confidence intervals and paired comparisons accompany the results. The documented evaluation covers 12 montages, so conclusions remain tied to that small sample rather than presented as universal model rankings." },
    ],
    takeaway: "Different metrics expose different strengths. In the documented sample, one model captured objects better while the other recovered actions and ordering better—an argument for evaluating the task, not just the prose.",
    limitation: "The published results cover 12 evaluated montages from a larger reference set. They are a bounded course-project comparison of GPT-4.1 and Claude 3.7 Sonnet, not a current general-purpose model leaderboard.",
    flow: ["Reference + model captions", "Graph-aware normalization", "Multi-metric evaluation", "Bootstrap analysis"],
  },
  {
    slug: "contractiq", number: "03", name: "ContractIQ", category: "Applied AI",
    headline: "From evaluation to a repeatable workflow.",
    summary: "An AI-assisted scoring and reporting workflow connecting backend APIs, orchestration, and vendor reports.",
    stack: ["Python", "FastAPI", "Airflow", "Docker"],
    repository: "https://github.com/tabs929/contractIQ",
    scope: "Software engineering project",
    challenge: "A score is only one step in an evaluation process. Inputs, generated outputs, reports, and subsequent workflow steps need a consistent path that can be inspected and repeated.",
    approach: [
      { title: "Give scoring a clear API boundary", body: "The backend accepts a criterion, workspace, and maximum score through a scoring endpoint. Workspace-specific JSON output provides the handoff to the reporting workflow." },
      { title: "Orchestrate the reporting pipeline", body: "Airflow DAGs read scoring output and generate per-vendor CSV and DOCX reports. The repository also describes simulated approval and delivery steps." },
      { title: "Keep configuration outside the code", body: "Docker Compose coordinates the local Airflow stack. Model-provider keys, workflow identifiers, and service settings are supplied through environment configuration." },
    ],
    takeaway: "Applied AI becomes more useful when it fits a repeatable process. Explicit handoffs between scoring, stored artifacts, and orchestration make the workflow easier to reason about.",
    limitation: "This case study describes the workflow documented in the repository. Approval and delivery are described as simulated; individual contribution breakdowns and measured outcomes await confirmation.",
    flow: ["Scoring request", "Workspace JSON artifact", "Airflow DAG", "CSV + DOCX reports"],
  },
  {
    slug: "events-around", number: "04", name: "Events Around", category: "Full-stack development",
    headline: "A little less searching. A little more going.",
    summary: "An event-discovery project spanning a React web client, a Flask backend, and an Android client.",
    stack: ["React", "Flask", "Android"],
    repository: "https://github.com/tabs929/EventfInder-react",
    scope: "Web & mobile project",
    challenge: "Event discovery crosses several boundaries: a user-facing search experience, backend data access, and different client platforms. The engineering focus is connecting those pieces into a coherent product.",
    approach: [
      { title: "Build across client platforms", body: "The project is represented by separate React and Android client repositories, with a Flask backend repository supporting the application." },
      { title: "Keep the backend distinct", body: "Separating the service from the clients creates a clear place for backend behavior and lets web and mobile interfaces evolve independently." },
      { title: "Follow the implementation", body: "The linked source is the reference for functionality. This overview intentionally avoids unverified claims about integrations, live availability, user numbers, and performance." },
    ],
    takeaway: "Building across web, backend, and mobile surfaces develops an end-to-end view of software: the API contract matters just as much as the interaction that consumes it.",
    limitation: "The project name is supplied by the portfolio brief. The React, Flask, and Android repositories are verified; detailed feature mapping and contribution scope should be confirmed before adding further claims.",
    flow: ["Web or Android client", "Flask backend", "Event discovery", "Client experience"],
  },
];

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return new URL(configured).origin;
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return vercelHost ? `https://${vercelHost}` : undefined;
}
