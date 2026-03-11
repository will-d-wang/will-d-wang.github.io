export type SocialLink = {
  alt: string;
  href: string;
  src: string;
};

export type CurrentLanguage = {
  label: string;
  href: string;
};

export type TimelinePeriod = {
  company: string;
  role: string;
  location: string;
  startTime: string;
  endTime: string;
  icons: string[];
  tech_stacks: string[];
  details?: string[];
};

export type TimelineEntry = {
  title: string;
  periods: TimelinePeriod[];
};
