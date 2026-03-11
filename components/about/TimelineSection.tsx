import { Icon, IconType } from "@/components/Icon";
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
        <Icon key={icon} name={icon} type={IconType.Tech} />
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
  const {
    organization,
    role,
    location,
    startTime,
    endTime,
    icons,
    details,
    tech_stacks,
  } = period;
  const roleInfo = `${organization} | ${role} | ${location}`;
  const organizationIconType =
    entryType === "experience" ? IconType.Company : IconType.School;
  const stackLine = icons.join(", ");
  const timeRange = `${formatTimelineDate(startTime)} - ${formatTimelineDate(
    endTime,
  )}`;

  return (
    <article className="home-timeline-period">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          flexWrap: "nowrap",
        }}
      >
        <Icon
          name={organization}
          type={organizationIconType}
          alt={organization}
        />
        <div>
          <div>
            <strong>{roleInfo}</strong>
          </div>
          <div>
            <strong>{timeRange}</strong>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "0.75rem",
          marginBottom: "0.5rem",
          display: "flex",
          alignItems: "baseline",
          gap: "0.35rem",
          flexWrap: "nowrap",
        }}
      >
        <strong>Core Stack: </strong>
        {stackLine ? <span style={{ whiteSpace: "nowrap" }}>{stackLine}</span> : null}
      </div>
      <TechRow icons={icons} />
      {entryType === "experience" && details?.length ? (
        <>
          <div style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
            <strong>Work Details</strong>
          </div>
          <ul>{details?.map((item) => <li key={item}>{item}</li>)}</ul>
        </>
      ) : null}
      {entryType === "education" && tech_stacks?.length ? (
        <>
          <div style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
            <strong>Coursework</strong>
          </div>
          <ul>
            {tech_stacks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
            key={`${title}-${period.organization}-${period.role}-${period.startTime}`}
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
