import Link from "next/link";

import { PROJECTS } from "@/components/about/data";
import { formatTimelineDate } from "@/components/about/dateUtils";
import { TechRow } from "@/components/about/TimelineSection";
import type { Project } from "@/components/about/types";

function ProjectCard({
  name,
  tagline,
  startTime,
  endTime,
  icons,
  highlights,
  links,
}: Project) {
  const timeRange = `${formatTimelineDate(startTime)} - ${formatTimelineDate(
    endTime,
  )}`;

  return (
    <article className="home-project-card">
      <header className="home-project-head">
        <h3>{name}</h3>
        <span className="home-timeline-duration">{timeRange}</span>
      </header>
      <p className="home-project-tagline">{tagline}</p>
      <TechRow icons={icons} />
      <ul>
        {highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {links?.length ? (
        <div className="home-project-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section className="home-section">
      <h2>Selected Projects</h2>
      <div className="home-projects">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
}
