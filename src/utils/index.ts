const DAY: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const MONTHS: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

function generateUniqueId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomPart}`;
}

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return day + 'th';
  switch (day % 10) {
    case 1:
      return day + 'st';
    case 2:
      return day + 'nd';
    case 3:
      return day + 'rd';
    default:
      return day + 'th';
  }
}

function getFormattedDate(): string {
  const date = new Date();
  return `${DAY[date.getDay()]}, ${getOrdinalSuffix(date.getDate())} ${MONTHS[date.getMonth()]}`;
}

function getGreeting(): string {
  const date = new Date();
  const hour = date.getHours();
  if (hour < 12) {
    return 'Good morning';
  } else if (hour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

export {generateUniqueId, getFormattedDate, getGreeting};
