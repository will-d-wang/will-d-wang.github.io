import { ALL_TECH_NAMES, getTechData, TechType } from "@/components/TechIcon";
import { TechRow } from "@/components/about/TimelineSection";

const ICONS_PER_ROW = 8;

export function TechStackSection() {
  const iconsByType = ALL_TECH_NAMES.reduce<
    Partial<Record<TechType, string[]>>
  >((groups, icon) => {
    const techData = getTechData(icon);
    if (!techData) {
      return groups;
    }

    if (!groups[techData.type]) {
      groups[techData.type] = [];
    }

    groups[techData.type].push(icon);
    return groups;
  }, {});

  return (
    <section>
      <h2>My Tech Stack Journey</h2>
      <div className="home-tech">
        <div className="home-tech-heart">❤️</div>
        {Object.values(TechType)
          .filter((type) => iconsByType[type]?.length)
          .map((type) => {
            const iconRows = Array.from(
              { length: Math.ceil(iconsByType[type].length / ICONS_PER_ROW) },
              (_, index) =>
                iconsByType[type].slice(
                  index * ICONS_PER_ROW,
                  (index + 1) * ICONS_PER_ROW,
                ),
            );

            return (
              <div key={type} style={{ marginTop: "1.25rem" }}>
                <h3>{type}</h3>
                {iconRows.map((row, index) => (
                  <TechRow key={`${type}-${index}`} icons={row} />
                ))}
              </div>
            );
          })}
      </div>
    </section>
  );
}
