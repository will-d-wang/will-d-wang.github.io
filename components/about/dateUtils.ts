import type { TimelinePeriod } from "@/components/about/types";

function parseTimelineDate(value: string): Date {
  if (/^\d{4}$/.test(value)) {
    return new Date(Number(value), 0, 1);
  }

  const [year, month] = value.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

function getPeriodEndDate(value: string): Date {
  if (value.toLowerCase() === "present") {
    return new Date();
  }
  return parseTimelineDate(value);
}

function getDurationLabel(start: Date, end: Date): string {
  // Count both boundary months, matching resume-style date ranges.
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0) {
    return remainingMonths > 0
      ? `${years}y ${remainingMonths}m`
      : `${years} years`;
  }

  return `${months} months`;
}

export function formatTimelineDate(value: string): string {
  if (value.toLowerCase() === "present") {
    return "Present";
  }

  if (/^\d{4}$/.test(value)) {
    return value;
  }

  const date = parseTimelineDate(value);
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

export function getEntryDuration(periods: TimelinePeriod[]): string {
  if (!periods.length) {
    return "0 months";
  }

  const startDates = periods.map((period) => parseTimelineDate(period.startTime));
  const endDates = periods.map((period) => getPeriodEndDate(period.endTime));

  const start = new Date(Math.min(...startDates.map((date) => date.getTime())));
  const end = new Date(Math.max(...endDates.map((date) => date.getTime())));

  return getDurationLabel(start, end);
}
