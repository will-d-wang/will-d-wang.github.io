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

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  tagline: string;
  startTime: string;
  endTime: string;
  icons: string[];
  highlights: string[];
  links?: ProjectLink[];
};

export type FeaturedPost = {
  title: string;
  href: string;
  blurb: string;
};
