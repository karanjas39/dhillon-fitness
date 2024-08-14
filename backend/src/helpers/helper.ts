export function getCurrentDate() {
  const now = new Date();
  const utcOffsetMinutes = now.getTimezoneOffset();
  const indiaOffsetMinutes = 330;
  const totalOffsetMinutes = indiaOffsetMinutes + utcOffsetMinutes;
  const startDate = new Date(now.getTime() + totalOffsetMinutes * 60 * 1000);
  return startDate;
}

export function calculateEndDate(
  startDateString: string,
  durationDays: number
): Date {
  if (!Number.isInteger(durationDays) || durationDays < 1) {
    throw new Error("durationDays must be a positive integer.");
  }
  const startDate = new Date(startDateString);
  if (isNaN(startDate.getTime())) {
    throw new Error("Invalid startDateString provided.");
  }
  const endDate = new Date(startDate.getTime());
  endDate.setDate(startDate.getDate() + durationDays - 1);

  endDate.setHours(23, 59, 59, 999);

  return endDate;
}
