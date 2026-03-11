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
  entryType,
  period,
}: {
  entryType: TimelineEntry["type"];
  period: TimelinePeriod;
}) {
  const { company, role, location, startTime, endTime, icons, details } = period;
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
      {entryType === "experience" ? (
        <div style={{ marginTop: "0.75rem" }}>
          <strong>Core Stack </strong>
          <span>{period.stackLine}</span>
        </div>
      ) : (
        <>
          <div style={{ marginTop: "0.75rem", marginBottom: "0.5rem" }}>
            <strong>Coursework</strong>
          </div>
          <ul>
            {period.tech_stacks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
      <TechRow icons={icons} />
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

function TimelineEntryCard({ type, title, periods }: TimelineEntry) {
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
            entryType={type}
            period={period}
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
