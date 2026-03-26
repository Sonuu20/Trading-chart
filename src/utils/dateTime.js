import { format, isSameDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const formatDateTime = (
  timestamp,
  formatStr = "hh:mm:ss a, dd MMM yyyy",
  // caseType
) => {
  if (!timestamp) return "";

  try {
    const defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zonedDate = toZonedTime(new Date(timestamp), defaultTimeZone);
    return format(zonedDate, formatStr);
  } catch (error) {
    console.error("Error formatting date/time:", error);
    return "Invalid Date";
  }
};

export const isBothSameDay = (
  laterDate = new Date(),
  earlierDate = new Date(),
  options,
) => {
  // laterDate - string | number | Date -The first date to check
  // earlierDate - string | number | Date -	The second date to check
  // options? - IsSameDayOptions - An object with options
  return isSameDay(laterDate, earlierDate, options);
};

export const getFutureDateByDays = (days) =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000);

export function parseDateTime(timestamp) {
  if (!timestamp) return null;

  if (timestamp instanceof Date) {
    return isNaN(timestamp.getTime()) ? null : timestamp;
  }

  if (
    typeof timestamp === "string" &&
    timestamp.length >= 8 &&
    !isNaN(Date.parse(timestamp))
  ) {
    return new Date(timestamp);
  }

  return null;
}

export function getDateRangeInfo(startDate, endDate) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  return {
    start,
    end,
    isInRange: now >= start && now <= end,
  };
}
