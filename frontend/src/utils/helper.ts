import { addDays, parseISO, format, startOfDay } from "date-fns";

export function modifyDate(isoString: string | undefined): string {
  const date = new Date(isoString || "");

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const humanReadableDate = date.toLocaleString("en-US", options);

  return humanReadableDate;
}

export function modifyEndDate(isoString: string | undefined): string {
  if (!isoString) return "";
  const date = parseISO(isoString);
  // const incrementedDate = addDays(date, 1);
  const humanReadableDate = format(date, "MMMM d, yyyy");
  return humanReadableDate;
}

export function isMembershipExpired(
  endDate: string,
  timeZone: string = "Asia/Kolkata"
): boolean {
  const endDateTime = parseISO(endDate);

  const expirationDateTime = startOfDay(addDays(endDateTime, 1));

  const now = new Date();
  const todayMidnight = startOfDay(now);

  return todayMidnight >= expirationDateTime;
}
