import { addDays, parseISO, format } from "date-fns";

export function modifyDateToMonth_Year(isoString: string | undefined): string {
  const date = new Date(isoString || "");

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    //   day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    // hour12: true,
    // timeZone: "UTC",
  };

  const humanReadableDate = date.toLocaleString("en-US", options);

  return humanReadableDate;
}

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
  const incrementedDate = addDays(date, 1);
  const humanReadableDate = format(incrementedDate, "MMMM d, yyyy");
  return humanReadableDate;
}

export function isMembershipExpired(endDate: string) {
  const endDateTime = new Date(endDate);

  const today = new Date();
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    1
  );
  return todayMidnight > endDateTime;
}
