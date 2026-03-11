export type SocialLink = {
  alt: string;
  href: string;
  src: string;
};

type BaseTimelinePeriod = {
  organization: string;
  role: string;
  location: string;
  startTime: string;
  endTime: string;
  icons: string[];
  details?: string[];
};

export type TimelinePeriod = BaseTimelinePeriod & {
  tech_stacks?: string[];
};

export type TimelineEntry = {
  type: "experience" | "education";
  title: string;
  periods: TimelinePeriod[];
};
