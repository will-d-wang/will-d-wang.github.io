import type { ReactNode } from "react";
import Link from "next/link";

import { CURRENT_LANGUAGES, CURRENT_STATUS } from "@/components/about/data";

const INTRO_PARAGRAPHS: ReactNode[] = [
  [
    "Welcome!👋! I've marked down my career journey as a software engineer, inspired by the idea of ",
    <Link
      key="intro-phd-grind"
      href="https://www.goodreads.com/en/book/show/15731248-the-ph-d-grind"
    >
      The Ph.D. Grind: A Ph.D. Student Memoir
    </Link>,
    ".",
  ],
  [
    "The software engineer journey is a pursuit of ",
    <Link
      key="intro-craftsmanship"
      href="https://manifesto.softwarecraftsmanship.org/"
    >
      craftsmanship
    </Link>,
    " spirit. Software engineers normally read more, grind more technologies and then use less and elegant code in work.",
  ],
  [
    "Computer programming is ultimately an form of art, that was the great insight from ",
    <Link key="intro-knuth" href="https://en.wikipedia.org/wiki/Donald_Knuth">
      Donald Knuth
    </Link>,
    ", who even wrote a book to emphasize this point: ",
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
    <section>
      <h2>My Career Journey</h2>
      {INTRO_PARAGRAPHS.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}

      <h3>Current Status</h3>
      <p>
        🔭 I&apos;m working with{" "}
        {CURRENT_LANGUAGES.map((item, index) => (
          <span key={item.href}>
            {index > 0 ? ", " : ""}
            <Link href={item.href}>{item.label}</Link>
          </span>
        ))}
      </p>
      <ul>
        {CURRENT_STATUS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h3>
        Enjoy cultures across 🀄️🌏️🍁️🗽️🌎️ as a human, love the technologies
        as a geek.
      </h3>
    </section>
  );
}
