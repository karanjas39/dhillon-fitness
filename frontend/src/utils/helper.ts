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
