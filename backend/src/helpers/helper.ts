export function getCurrentDate() {
  const now = new Date();
  const utcOffsetMinutes = now.getTimezoneOffset();
  const indiaOffsetMinutes = 330;
  const totalOffsetMinutes = indiaOffsetMinutes + utcOffsetMinutes;
  const startDate = new Date(now.getTime() + totalOffsetMinutes * 60 * 1000);
  const endDate = new Date(startDate);
  return { endDate, startDate };
}
