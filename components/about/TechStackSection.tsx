import { MY_TECH_STACK_ROWS } from "@/components/about/data";
import { TechRow } from "@/components/about/TimelineSection";

export function TechStackSection() {
  return (
    <section>
      <h2>My Tech Stack</h2>
      <div className="home-tech">
        <div className="home-tech-heart">❤️</div>
        {MY_TECH_STACK_ROWS.map((row, index) => (
          <TechRow key={index} icons={row} />
        ))}
      </div>
    </section>
  );
}
