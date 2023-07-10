export function generateDateDuration(startDate: Date, endDate: Date) {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  const endDay = endDate.getDate();

  let yearsDiff = endYear - startYear;
  let monthsDiff = endMonth - startMonth;
  let daysDiff = endDay - startDay;
  let monthDifference = (endYear - startYear) * 12 + (endMonth - startMonth);
  let yearsDifference = endYear - startYear;

  const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
  const diffInDays = Math.round(
    Math.abs((endDate.getTime() - startDate.getTime()) / oneDay)
  );

  if (daysDiff < 0) {
    const daysInMonth = new Date(endYear, endMonth + 1, 0).getDate();
    daysDiff += daysInMonth;
    monthsDiff--;
  }
  if (monthsDiff < 0) {
    monthsDiff += 12;
    yearsDiff--;
  }

  const calculatedDate = {
    years: yearsDiff,
    months: monthsDiff,
    days: daysDiff,
    diffInDays: diffInDays,
    monthDifference: monthDifference,
    yearsDifference: yearsDifference,
  };
  return calculatedDate;
}
