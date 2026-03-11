import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { TechIcon } from "@/components/TechIcon";

type SocialLink = {
  alt: string;
  href: string;
  src: string;
};

type CurrentLanguage = {
  label: string;
  href: string;
};

type TimelinePeriod = {
  period: string;
  icons: string[];
  summary: string[];
  detailTitle?: string;
  details?: string[];
};

type TimelineEntry = {
  title: string;
  duration: string;
  periods: TimelinePeriod[];
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    alt: "My github.io",
    href: "https://github.com/Will-D-Wang",
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg",
  },
  {
    alt: "Will-Dingan-Wang",
    href: "https://linkedin.com/in/will-d-wang",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg",
  },
];

const MY_TECH_STACK_ROWS = [
  ["C", "Python", "Groovy", "Golang", "Java", "JavaScript"],
  ["Gradle", "Jenkins", "Ubuntu", "VIM", "Git", "Docker", "Kubernetes"],
  [
    "Vagrant",
    "Github",
    "VS-Code",
    "Pandas",
    "Terraform",
    "GCP",
    "AWS",
    "Azure",
  ],
];

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    title: "Platform Engineer",
    duration: getCurrentDurationLabel(new Date(2024, 0, 1)),
    periods: [
      {
        period: "January 2024 - Present",
        icons: [
          "Python",
          "JavaScript",
          "TypeScript",
          "GCP",
          "Azure",
          "AWS",
          "JIRA",
          "Confluence",
          "Bash",
          "Linux",
        ],
        summary: [
          "Python - System testing & analysis",
          "JavaScript & Typescript - Backend development with REST API",
          "SRE - System monitoring, alerting, incident response",
          "Cloud Architecture - GCP, Azure, AWS",
          "Platform reliability engineering",
          "Advanced DevSecOps practices",
        ],
        detailTitle:
          "HP | Software Applications Engineer 3 | Oct 2021 - Present | Vancouver, B.C., Canada · Hybrid",
        details: [
          "Led the Pipeline group to build CI/CD pipelines for the Anyware Manager product line across SaaS and on-prem releases, while contributing backend improvements for safer and faster releases.",
          "Led system test development on AWS to validate the on-prem solution end-to-end, including backend API and service validation plus integration coverage.",
          "Reduced on-prem SaaS release time from multiple days to about 2 hours by streamlining CI/CD pipelines, backend build and test workflows, and system-test automation.",
          "Owned TeamCity CI/CD infrastructure, creating reusable meta-runners, build templates, and hundreds of build configurations to support backend delivery at scale.",
          "Implemented and validated security compliance features across AWS and Azure environments.",
          "Joined the Platform team to drive DevOps and SRE objectives, improving backend service reliability, release stability, and operational readiness.",
          "Owned security reviews and security feature delivery, and contributed to SOC 2 readiness and audit support.",
          "Worked across DevOps, Platform, and SRE responsibilities to support backend development, CI/CD reliability, infrastructure, and production operations.",
        ],
      },
    ],
  },
  {
    title: "DevOps Engineer",
    duration: "3 years",
    periods: [
      {
        period: "October 2021 - December 2023",
        icons: [
          "Python",
          "Terraform",
          "Kubernetes",
          "Docker",
          "GCP",
          "Azure",
          "AWS",
          "Jenkins",
          "TeamCity",
          "Golang",
        ],
        summary: [
          "Terraform - Infrastructure as Code & resources management",
          "Kubernetes - SAAS application orchestration",
          "Docker - Tasks containerization",
          "Cloud - GCP, Azure, AWS platform management",
          "Teamcity & Jenkins - CICD pipeline design and implementation",
          "Python - System testing & automation",
          "DevSecOps - Pipeline designs, Cloud security enhancement",
          "Golang - Installer development",
        ],
        detailTitle:
          "HP | Software Applications Engineer 3 | Oct 2021 - Dec 2023 | Vancouver, B.C., Canada · Hybrid",
        details: [
          "Led the Pipeline group to build CI/CD pipelines for the Anyware Manager product line across SaaS and on-prem releases, while contributing backend improvements for safer and faster releases.",
          "Reduced on-prem SaaS release time from multiple days to about 2 hours by streamlining CI/CD pipelines, backend build and test workflows, and system-test automation.",
          "Owned TeamCity CI/CD infrastructure and supported backend delivery at scale.",
        ],
      },
      {
        period: "January 2021 - October 2021",
        icons: [
          "Python",
          "Terraform",
          "Kubernetes",
          "Docker",
          "GCP",
          "AWS",
          "Golang",
        ],
        summary: [
          "Terraform - Infrastructure as Code & resources management",
          "Kubernetes - SAAS application orchestration",
          "Docker - Tasks containerization",
          "Cloud - GCP and AWS platform management",
          "Python - System testing & automation",
          "Golang - Installer development",
        ],
        detailTitle:
          "Teradici, an HP Company | Software Developer - Staff | Jan 2021 - Oct 2021 | Greater Vancouver, B.C., Canada",
        details: [
          "Worked on a microservice-based SaaS platform deployed on Kubernetes and Docker.",
          "Contributed to the SaaS on-premise application in Go, improving deployment reliability and usability.",
          "Developed and maintained Python test automation scripts to strengthen regression coverage.",
          "Managed Google Cloud Platform and AWS resources using Terraform.",
          "Served as CI/CD and release gatekeeper, reviewing pipeline health, enforcing quality checks, and coordinating release readiness.",
        ],
      },
    ],
  },
  {
    title: "Master of Science - Computer Science",
    duration: "4 years",
    periods: [
      {
        period:
          "Georgia Institute of Technology | Jan 2021 – Dec 2024 | Grade: 3.82/4.0",
        icons: [
          "C",
          "Python",
          "Docker",
          "Linux",
          "Apache Spark",
          "Pandas",
          "PyTorch",
          "Git",
          "GCP",
          "MongoDB",
        ],
        summary: [
          "CSE6242 - Data and Visual Analytics",
          "CS 7646 - Machine Learning for Trading",
          "CS 6310 - Software Architecture and Design",
          "CS 6300 - Software Development Process",
          "CS 6515 - Introduction to Graduate Algorithms",
          "CS 6601 - Artificial Intelligence",
          "CS 7643 - Deep Learning",
          "CS 6035 - Introduction to Information Security",
          "CS 6210 - Advanced Operating Systems",
          "CS 6211 - System Design for Cloud Computing",
          "CS 7650 - Natural Language Processing",
        ],
      },
    ],
  },
  {
    title: "SDET (Software Development Engineer in Test)",
    duration: "2+ years",
    periods: [
      {
        period: "October 2019 - December 2020",
        icons: [
          "Python",
          "Docker",
          "Jenkins",
          "Groovy",
          "Elasticsearch",
          "Logstash",
          "Kibana",
        ],
        summary: [
          "Python - System testing",
          "Docker - Test agent containerization",
          "Jenkins - CI/CD",
          "Log & Reporting - ELK (Elasticsearch, Logstash, Kibana)",
          "Groovy - Jenkins Pipeline development",
        ],
        detailTitle:
          "Sierra Wireless | Senior Validation Engineer | Oct 2019 - Jan 2021 | Richmond, British Columbia, Canada",
        details: [
          "Worked on the Legato Delivery team within the IoT Business Unit.",
          "Maintained the Legato Testing Project, a pytest-based framework with Pexpect-driven CLI validation.",
          "Developed and maintained Jenkins pipeline Groovy scripts and Docker images to automate CI/CD workflows.",
          "Introduced test-driven development practices for Jenkins pipeline Groovy scripts to improve reliability and reduce regressions.",
          "Automated performance testing and published results to Kibana dashboards.",
          "Automated Python test reporting by collecting metrics from Jira and Quality Center via REST APIs, then generating Confluence pages.",
          "Served as Scrum Master for the delivery team, facilitating sprint ceremonies and removing blockers.",
        ],
      },
      {
        period: "March 2018 - September 2019",
        icons: ["Python", "TeamCity", "JIRA", "Confluence"],
        summary: [
          "Python - System testing",
          "Python - Workflow automation",
          "CICD - Teamcity",
          "TDD - Test automation system",
        ],
        detailTitle:
          "Intel Corporation | Validation Engineer | Feb 2018 - Sep 2019 | Vancouver, B.C., Canada",
        details: [
          "Designed and implemented system tests and automation tools in Python for the Intel NSG SSD Firmware Platform Service team.",
          "Built a tool to collect QuickBuild results via REST APIs and analyze outcomes to improve CI visibility.",
          "Maintained and improved TeamCity configurations to support reliable builds and test execution.",
          "Developed and enabled system tests in the CI pipeline, increasing automation coverage for platform services.",
          "Introduced unit and integration tests for internal test tools using unittest and pytest, applying TDD to improve maintainability.",
        ],
      },
    ],
  },
  {
    title: "Software Engineer",
    duration: "3+ years",
    periods: [
      {
        period: "April 2017 - February 2018",
        icons: ["C", "Python"],
        summary: ["C - SSD Firmware Development", "Python - System testing"],
        detailTitle:
          "Intel Corporation | Software Engineer | Apr 2017 - Jan 2018 | Vancouver, B.C., Canada",
        details: [
          "Programmed and debugged SSD firmware in C for the Intel SSD Firmware Product team.",
          "Maintained firmware for a production series of Intel NAND SSD drives, supporting feature updates and defect fixes.",
          "Regularly reported and analyzed firmware system regression and CI test results, working across teams to drive issue resolution.",
        ],
      },
      {
        period: "May 2014 - March 2017",
        icons: ["C", "Python", "CMake", "VIM", "Git", "Bash", "Linux"],
        summary: [
          "C - Distributed system development",
          "Python - Integration tests",
          "Agile Development",
          "System Performance and Profiling",
        ],
        detailTitle:
          "Ericsson | Software Developer | May 2014 - Dec 2015 | Burnaby, B.C., Canada",
        details: [
          "Developed ACL features in IP-OS and collaborated on Service Sync and Software Quality Ranking initiatives.",
          "Built a Python unit test framework for ACL and improved coverage and regression safety.",
          "Designed module APIs and wrote Doxygen documentation for maintainable interfaces.",
          "Led performance testing and optimization of a pub-sub system supporting 128K circuits.",
          "Drove profiling and coverage reporting to improve runtime efficiency and code quality.",
          "HCL Technologies | Software Developer | Jan 2016 - Mar 2017 | Burnaby, B.C., Canada",
          "Worked as a contractor supporting Ericsson projects following the acquisition.",
          "Ericsson | Software Developer COOP | Jan 2013 - Aug 2013 | Burnaby, B.C., Canada",
          "Joined the Forwarding Service team for the Smart Service Router.",
          "Developed and maintained hardware simulation software to support SSR feature development.",
          "Implemented and tested Layer 2 ACL functionality with automated and manual test cases.",
        ],
      },
    ],
  },
  {
    title: "Bachelor of Applied Science (BASc) - Computer Science",
    duration: "4 years",
    periods: [
      {
        period:
          "Simon Fraser University | 2011 – 2014 | Concentration on operating systems and networking",
        icons: ["C", "C++", "Java", "Python", "JavaScript", "Linux", "MySQL"],
        summary: [
          "CMPT-225 - Data Structure/Programming",
          "CMPT-275 - Software Engineering",
          "CMPT-300 - Operating System",
          "CMPT-307 - Data Structure",
          "CMPT-354 - Multimedia Systems",
          "CMPT-371 - Data Communication/Networking",
          "CMPT-419 - Machine Learning",
          "CMPT-431 - Distributed Systems",
          "CMPT-470 - Web-based Information Systems",
          "CMPT-477 - Introduction to Formal Verification",
          "CMPT-741 - Data Mining",
          "CMPT-705 - Design/Analysis Algorithms",
          "CMPT-771 - Internet Architecture and Protocols",
        ],
        detailTitle:
          "Simon Fraser University | Teaching Assistant | Sep 2012 - Dec 2012 | Burnaby, B.C., Canada",
        details: [
          "Tutored CMPT 130 lab sessions and guided students in debugging and improving C programs.",
          "Graded programming assignments and exams, providing clear and actionable feedback.",
        ],
      },
    ],
  },
];

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

const CURRENT_LANGUAGES: CurrentLanguage[] = [
  { label: "Python", href: "https://www.python.org/" },
  { label: "Golang", href: "https://golang.org/" },
  {
    label: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    label: "Jenkins CI/CD",
    href: "https://www.jenkins.io/doc/book/pipeline/",
  },
  {
    label: "Teamcity",
    href: "https://www.jetbrains.com/help/teamcity/teamcity-documentation.html",
  },
  { label: "Terraform", href: "https://www.terraform.io/" },
  { label: "Kubernetes", href: "https://kubernetes.io/" },
  { label: "Docker", href: "https://www.docker.com/" },
];

const CURRENT_STATUS: string[] = [
  "🎵️🎶️ I'm playing with backend, micro-service, system design, DevOps, SRE, Teamcity, AI.",
  "🌱🌳️ I'm learning history, psychology, philosophy, management.",
  "🍻️🥂️ I'm looking to collaborate on more interesting open source projects.",
  "💬🗒️ Ask me about test automation, philosophy, python, AI.",
  "☯️❤️ Fun fact: Life is the most precious journey, only once in the universe, enjoy it everyday.",
];

function getCurrentDurationLabel(start: Date) {
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0) {
    return remainingMonths > 0
      ? `${years}y ${remainingMonths}m`
      : `${years}+ years`;
  }

  return `${months} months`;
}

function TechRow({ icons }: { icons: string[] }) {
  return (
    <div className="home-tech-row">
      {icons.map((icon) => (
        <TechIcon key={icon} alt={icon} />
      ))}
    </div>
  );
}

function TimelinePeriodCard({
  period,
  icons,
  summary,
  detailTitle,
  details,
}: TimelinePeriod) {
  return (
    <article className="home-timeline-period">
      <strong>{period}</strong>
      <TechRow icons={icons} />
      <ul>
        {summary.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {detailTitle ? (
        <>
          <div style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
            <strong>{detailTitle}</strong>
          </div>
          <ul>{details?.map((item) => <li key={item}>{item}</li>)}</ul>
        </>
      ) : null}
    </article>
  );
}

function TimelineEntryCard({ title, duration, periods }: TimelineEntry) {
  return (
    <article className="home-timeline-item">
      <header className="home-timeline-header">
        <h3>{title}</h3>
        <span className="home-timeline-duration">{duration}</span>
      </header>
      <div className="home-timeline-content">
        {periods.map((period) => (
          <TimelinePeriodCard key={`${title}-${period.period}`} {...period} />
        ))}
      </div>
    </article>
  );
}

export function AboutPage() {
  return (
    <main className="home-page">
      <figure className="flex flex-wrap justify-center">
        <Image
          src="/images/DinganWang.jpg"
          alt="Dingan Wang"
          height={320}
          width={320}
          className="shadow-lg rounded-full max-w-full h-auto align-middle border-none"
        />
      </figure>

      <nav
        className="home-social"
        style={{ marginTop: "2rem", marginBottom: "3rem" }}
        aria-label="Social links"
      >
        {SOCIAL_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="home-social-link"
          >
            <Image src={link.src} alt={link.alt} width={32} height={32} />
          </Link>
        ))}
        <span className="home-social-badge">
          <Image
            src="https://komarev.com/ghpvc/?username=anonyknight"
            alt="Will-D-Wang"
            width={150}
            height={20}
          />
        </span>
      </nav>

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

      <section>
        <h2>My Tech Stack</h2>
        <div className="home-tech">
          <div className="home-tech-heart">❤️</div>
          {MY_TECH_STACK_ROWS.map((row, index) => (
            <TechRow key={index} icons={row} />
          ))}
        </div>
      </section>

      <section>
        <h2>My Career and Tech Stack Evolution</h2>
        <div className="home-timeline">
          {TIMELINE_ENTRIES.map((entry) => (
            <TimelineEntryCard key={entry.title} {...entry} />
          ))}
        </div>
      </section>
    </main>
  );
}
