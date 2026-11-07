import Link from "next/link";

const topics = [
  {
    number: "01",
    title: "Site Reliability Engineering",
    description: "Define reliability, observe services, and turn incidents into better systems.",
    href: "/docs/sre",
  },
  {
    number: "02",
    title: "Infrastructure",
    description: "Work through cloud foundations, containers, Kubernetes, and distributed systems.",
    href: "/docs/infrastructure",
  },
  {
    number: "03",
    title: "DevOps",
    description: "Shorten the path from a code change to a dependable release.",
    href: "/docs/devops",
  },
  {
    number: "04",
    title: "Platform Engineering",
    description: "Design developer workflows and internal platforms that make delivery easier.",
    href: "/docs/platform",
  },
  {
    number: "05",
    title: "AI for Engineering",
    description: "Use AI in engineering workflows, with evaluation and human review built in.",
    href: "/ai",
  },
] as const;

const path = [
  { title: "Build a small service", href: "/labs/build-and-operate-a-service" },
  {
    title: "Containerize and deploy it",
    href: "/labs/build-and-operate-a-service#containerize-and-run",
  },
  { title: "Automate the change path", href: "/docs/Tools/CICD/github-actions" },
  { title: "Observe its behavior", href: "/docs/DevSecOps/process/7.monitor" },
  { title: "Improve the feedback loop", href: "/field-notes/ci-feedback-loop" },
] as const;

const featured = [
  {
    kind: "Hands-on lab",
    title: "Build and operate a service",
    description: "Run a small HTTP service locally, package it, deploy it to Kubernetes, and verify its health.",
    href: "/labs/build-and-operate-a-service",
  },
  {
    kind: "Field note",
    title: "Shorten the CI feedback loop",
    description: "A practical way to reason about build duration, failure signals, and recovery time.",
    href: "/field-notes/ci-feedback-loop",
  },
  {
    kind: "Reference notes",
    title: "Kubernetes concepts",
    description: "A map of the control plane, workloads, and objects to revisit while working through the lab.",
    href: "/docs/Tools/k8s/k8s_concepts",
  },
] as const;

export function LearningHome() {
  return (
    <main className="learning-home">
      <header className="learning-hero">
        <p className="learning-eyebrow">Will D. Wang · Technical learning</p>
        <h1>Learn to build and operate reliable systems.</h1>
        <p className="learning-lede">
          Practical paths, hands-on labs, and field notes across SRE,
          infrastructure, DevOps, platform engineering, and AI. Start with a
          service, then follow it from development to production operations.
        </p>
        <div className="learning-actions">
          <Link className="learning-button learning-button-primary" href="/docs">
            Explore the learning paths <span aria-hidden="true">→</span>
          </Link>
          <Link className="learning-button learning-button-secondary" href="/labs">
            Try a lab <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>

      <section className="learning-section" aria-labelledby="topics-heading">
        <div className="learning-section-heading">
          <div>
            <p className="learning-eyebrow">Choose a focus</p>
            <h2 id="topics-heading">Five connected disciplines</h2>
          </div>
          <p>Follow a topic from first principles to the work of running it.</p>
        </div>
        <div className="learning-topic-grid">
          {topics.map((topic) => (
            <Link className="learning-topic-card" href={topic.href} key={topic.href}>
              <span className="learning-card-number">{topic.number} / 05</span>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <span className="learning-card-link">Explore topic <span aria-hidden="true">↗</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="learning-section learning-path" aria-labelledby="path-heading">
        <div className="learning-section-heading">
          <div>
            <p className="learning-eyebrow">Start here</p>
            <h2 id="path-heading">Build and operate a service</h2>
          </div>
          <p>One practical thread through delivery, infrastructure, and reliability.</p>
        </div>
        <ol className="learning-path-list">
          {path.map((step, index) => (
            <li key={step.title}>
              <Link href={step.href}>
                <span className="learning-path-number">{String(index + 1).padStart(2, "0")}</span>
                <span>{step.title}</span>
                <span className="learning-path-arrow" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="learning-section" aria-labelledby="featured-heading">
        <div className="learning-section-heading">
          <div>
            <p className="learning-eyebrow">Selected reading</p>
            <h2 id="featured-heading">Put the ideas to work</h2>
          </div>
          <Link className="learning-inline-link" href="/field-notes">All field notes →</Link>
        </div>
        <div className="learning-featured-grid">
          {featured.map((item) => (
            <Link className="learning-featured-card" href={item.href} key={item.href}>
              <span className="learning-eyebrow">{item.kind}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="learning-card-link">Read more <span aria-hidden="true">↗</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="learning-about" aria-labelledby="about-heading">
        <div>
          <p className="learning-eyebrow">The person behind the notes</p>
          <h2 id="about-heading">Hi, I’m Will D.</h2>
          <p>
            I work across DevOps and platform engineering. This site is where I
            turn what I study and build into practical notes for other engineers.
          </p>
        </div>
        <Link className="learning-button learning-button-secondary" href="/about">
          More about me <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
