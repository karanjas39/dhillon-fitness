import { parseISO, startOfDay, endOfDay, addMonths } from "date-fns";
import { toZonedTime, format } from "date-fns-tz";

const indiaTimeZone = "Asia/Kolkata";

export function calculateEndDate(startDateISO: string, durationMonths: number) {
  const startDate = parseISO(startDateISO);

  const startDateInIST = startOfDay(toZonedTime(startDate, indiaTimeZone));

  const endDateInIST = endOfDay(addMonths(startDateInIST, durationMonths));

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
