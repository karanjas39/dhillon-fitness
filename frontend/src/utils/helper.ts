import { parseISO, format, startOfDay } from "date-fns";

export function modifyDate(isoString: string | undefined): string {
  if (!isoString) return "";
  const date = parseISO(isoString);
  const humanReadableDate = format(date, "dd MMMM, yyyy");
  return humanReadableDate;
}

export function modifyEndDate(isoString: string | undefined): string {
  if (!isoString) return "";
  const date = parseISO(isoString);
  const humanReadableDate = format(date, "dd MMMM, yyyy");
  return humanReadableDate;
}

export function isMembershipExpired(
  endDate: string,
  timeZone: string = "Asia/Kolkata"
): boolean {
  const endDateTime = parseISO(endDate);

  const expirationDateTime = startOfDay(endDateTime);

  const now = new Date();
  const todayMidnight = startOfDay(now);

  return todayMidnight >= expirationDateTime;
}
