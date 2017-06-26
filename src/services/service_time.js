import moment from 'moment';

// private functions
function getDays(startOfWeek, endOfWeek) {
  let days = [];
  let day = startOfWeek;
  const currDay = moment().format("DD dddd MMM YYYY");

  while (day <= endOfWeek) {
    days.push({ epoch: day.unix(), day_of_week: day.format("dddd"), displayName: day.format("ddd D"), active: (day.format("DD dddd MMM YYYY") === currDay)});
    day = day.clone().add(1, 'd');
  }
  return days;
}

function getMonthNames(startOfWeek, endOfWeek) {
  let startDisplay = "";
  let endDisplay = "";

  const startYear = startOfWeek.format("YY");
  const endYear = endOfWeek.format("YY");

  const startMonth = startOfWeek.format("MMMM");
  const endMonth = endOfWeek.format("MMMM");

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      startDisplay = startOfWeek.format("MMM D");
      endDisplay = endOfWeek.format("D, YYYY");
      return `${startDisplay} - ${endDisplay}`;
    } else {
      startDisplay = startOfWeek.format("MMM D");
      endDisplay = endOfWeek.format("MMM D, YYYY");
      return `${startDisplay} - ${endDisplay}`;
    }
  } else {
    startDisplay = startOfWeek.format("MMM D, YYYY");
    endDisplay = endOfWeek.format("MMM D, YYYY");
    return `${startDisplay} - ${endDisplay}`;
  }
}

function buildWeekData(startOfWeek, endOfWeek) {
  const days = getDays(startOfWeek, endOfWeek);
  const displayMonths = getMonthNames(startOfWeek, endOfWeek);
  return { days, displayMonths };
}

// public functions
export function getDurationDisplay(start_time, end_time) {
  let startTime = start_time.minutes > 0 ? `${start_time.hours}.${start_time.minutes}` : `${start_time.hours}`;
  let endTime = end_time.minutes > 0 ? `${end_time.hours}.${end_time.minutes}` : `${end_time.hours}`;
  return { startTime, endTime }
}

export function getDayForEpoch(epoch) {
  return moment.unix(epoch).format("DD/MM/YYYY");
}

export function convertDateFormatToStd(date, format) {
  return moment(date, format).format("DD/MM/YYYY");
}

export function getDayForDate(date) {
  return moment(date).format("ddd, DD/MM/YYYY");
}

export function getDayOfWeekForDate(date) {
  return moment(date).format("dddd");
}

export function getAllHoursInDay(currentUnixTime, startingHour, endingHour) {
  let hours = [];
  let momentHour = moment().startOf('day').add(startingHour, 'h');
  let hour = startingHour;

  while (hour < endingHour) {
    hours.push({ epoch: momentHour.unix(), digit: hour, display: momentHour.format("h a") });
    momentHour = momentHour.clone().add(1, 'h');
    hour++;
  }
  return hours;
}

export function getDetailHoursInDay(currentUnixTime, startingHour, endingHour) {
  let hours = [];
  let momentHour = moment().startOf('day').add(startingHour, 'h');
  let hour = startingHour;

  while (hour <= endingHour) {
    hours.push({ epoch: momentHour.unix(), digit: hour, display: momentHour.format("h:mm a") });
    momentHour = momentHour.clone().add(0.25, 'h');
    hour = hour + 0.25;
  }
  return hours;
}

export function convertDigitToDate(digit) {
  let momentHour = moment().startOf('day').add(digit, 'h');
  return momentHour.toDate();
}

export function getNextWeekArray(currentWeek) {
  const day = moment.unix(currentWeek[0].epoch);
  const startOfWeek = day.clone().add(1, 'weeks').startOf('week');
  const endOfWeek = day.clone().add(1, 'weeks').endOf('week');
  return buildWeekData(startOfWeek, endOfWeek);
}

export function getPreviousWeekArray(currentWeek) {
  const day = moment.unix(currentWeek[0].epoch)
  const startOfWeek = day.clone().subtract(1, 'weeks').startOf('week');
  const endOfWeek = day.clone().subtract(1, 'weeks').endOf('week');
  return buildWeekData(startOfWeek, endOfWeek);
}

export function getCurrentWeekArray() {
  const startOfWeek = moment().startOf('week');
  const endOfWeek = moment().endOf('week');
  return buildWeekData(startOfWeek, endOfWeek);
}

export function getWeekForDate(date) {
  const day = moment(date);
  const startOfWeek = day.clone().startOf('week');
  const endOfWeek = day.clone().endOf('week');
  return buildWeekData(startOfWeek, endOfWeek);
}
