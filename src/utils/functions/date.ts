export function formatDate(date: Date) {
  const newDate = new Date(date);
  let day = newDate.getDay().toString();
  let month = (newDate.getMonth() + 1).toString();
  let year = newDate.getFullYear().toString();

  day = Number(day) < 10 ? "0" + day : day;
  month = Number(month) < 10 ? "0" + month : month;
  return `${day}/${month}/${year}`;
}

export function formatTime(date: Date) {
  const newDate = new Date(date);
  let hours = newDate.getHours().toString();
  let minutes = newDate.getMinutes().toString();

  hours = Number(hours) < 10 ? "0" + hours : hours;
  minutes = Number(minutes) < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes}`;
}
