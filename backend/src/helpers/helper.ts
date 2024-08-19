import { parseISO, addDays, startOfDay, endOfDay } from "date-fns";
import { toZonedTime, format } from "date-fns-tz";

const indiaTimeZone = "Asia/Kolkata";

export function calculateEndDate(startDateISO: string, durationDays: number) {
  const startDate = parseISO(startDateISO);

  const startDateInIST = startOfDay(toZonedTime(startDate, indiaTimeZone));
  const endDateInIST = endOfDay(addDays(startDateInIST, durationDays - 1));

  const formattedStartDate = format(
    startDateInIST,
    "yyyy-MM-dd'T'00:00:00XXX",
    { timeZone: indiaTimeZone }
  );
  const formattedEndDate = format(endDateInIST, "yyyy-MM-dd'T'00:00:00XXX", {
    timeZone: indiaTimeZone,
  });

  return { startDate: formattedStartDate, endDate: formattedEndDate };
}
