import { TechIcon } from "@/components/TechIcon";
import { TIMELINE_ENTRIES } from "@/components/about/data";
import {
  formatTimelineDate,
  getEntryDuration,
} from "@/components/about/dateUtils";
import type { TimelineEntry, TimelinePeriod } from "@/components/about/types";

export function TechRow({ icons }: { icons: string[] }) {
  return (
    <div className="home-tech-row">
      {icons.map((icon) => (
        <TechIcon key={icon} alt={icon} />
      ))}
    </div>
  );
}

function TimelinePeriodCard({
  company,
  role,
  location,
  startTime,
  endTime,
  icons,
  tech_stacks: summary,
  details,
}: TimelinePeriod) {
  const roleInfo = `${company} | ${role} | ${location}`;
  const timeRange = `${formatTimelineDate(startTime)} - ${formatTimelineDate(
    endTime,
  )}`;

  return (
    <article className="home-timeline-period">
      <strong>{roleInfo}</strong>
      <div>
        <strong>{timeRange}</strong>
      </div>
      <strong>Tech Stack & Knowledge </strong>
      <TechRow icons={icons} />
      <ul>
        {summary.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {details?.length ? (
        <>
          <div style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
            <strong>Work Details</strong>
          </div>
          <ul>{details?.map((item) => <li key={item}>{item}</li>)}</ul>
        </>
      ) : null}
    </article>
  );
}

function TimelineEntryCard({ title, periods }: TimelineEntry) {
  const duration = getEntryDuration(periods);

  return (
    <article className="home-timeline-item">
      <header className="home-timeline-header">
        <h3>{title}</h3>
        <span className="home-timeline-duration">{duration}</span>
      </header>
      <div className="home-timeline-content">
        {periods.map((period) => (
          <TimelinePeriodCard
            key={`${title}-${period.company}-${period.role}-${period.startTime}`}
            {...period}
          />
        ))}
      </div>
    </article>
  );
}

export function CareerEvolutionSection() {
  return (
    <section>
      <h2>My Career and Tech Stack Evolution</h2>
      <div className="home-timeline">
        {TIMELINE_ENTRIES.map((entry) => (
          <TimelineEntryCard key={entry.title} {...entry} />
        ))}
      </div>
    </section>
  );
}
