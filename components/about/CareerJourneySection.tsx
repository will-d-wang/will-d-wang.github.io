import type { ReactNode } from "react";
import Link from "next/link";

import { Icon, IconType } from "@/components/Icon";
import { CURRENT_STATUS } from "@/components/about/data";

const CURRENT_PRIORITY = [
  "Python",
  "Golang",
  "JavaScript",
  "TypeScript",
  "Terraform",
  "Kubernetes",
  "Docker",
  "AWS",
  "Azure",
  "GCP",
  "PyTorch",
];

const INTRO_PARAGRAPHS: ReactNode[] = [
  [
    "👋 Welcome! I started documenting my journey as a software engineer after being inspired by ",
    <Link
      key="intro-phd-grind"
      href="https://www.goodreads.com/en/book/show/15731248-the-ph-d-grind"
    >
      The Ph.D. Grind: A Ph.D. Student Memoir, Philip J. Guo
    </Link>,
    ", in which he chronicles his six-year pursuit of a Ph.D. in Computer Science at Stanford University from 2006 to 2012.",
  ],
  [
    "😇 A software engineering career is also a pursuit of ",
    <Link
      key="intro-craftsmanship"
      href="https://manifesto.softwarecraftsmanship.org/"
    >
      craftsmanship
    </Link>,
    ". It means reading broadly, learning deeply, and striving to solve real problems with simpler, more elegant code.",
  ],
  [
    "🎨 Through this journal and the spirit of craftsmanship, I see computer programming as ultimately a form of art, an idea championed by ",
    <Link key="intro-knuth" href="https://en.wikipedia.org/wiki/Donald_Knuth">
      Donald Knuth
    </Link>,
    ", who underscored that view in ",
    <Link
      key="intro-taocp"
      href="https://en.wikipedia.org/wiki/The_Art_of_Computer_Programming"
    >
      The Art of Computer Programming
    </Link>,
    ".",
  ],
];

export function CareerJourneySection() {
  return (
    <>
      <CareerJournalSection />
      <CurrentStatusSection />
    </>
  );
}

export function CareerJournalSection() {
  return (
    <section className="home-section home-journal">
      <h2>My Career Journey</h2>
      {INTRO_PARAGRAPHS.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function CurrentStatusSection() {
  return (
    <section className="home-section">
      <h3>Current Status</h3>
      <p>🔭 My current focuses:</p>
      <div className="home-tech-row" style={{ justifyContent: "flex-start" }}>
        {CURRENT_PRIORITY.map((name) => (
          <Icon key={name} name={name} type={IconType.Tech} />
        ))}
      </div>
      <ul>
        {CURRENT_STATUS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3>
        Enjoy cultures across 🌏️🍁️🗽️🀄️🌎️ as a human, love the technologies
        as a geek.
      </h3>
    </section>
  );
}
