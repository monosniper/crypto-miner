export const formatRelativeDate = (inputDate: Date) => {
  const currentDate = new Date();
  const diffInMilliseconds = currentDate.getTime() - inputDate.getTime();

  if (diffInMilliseconds < 60000) {
    return "только что";
  } else if (diffInMilliseconds < 3600000) {
    const minutesAgo = Math.floor(diffInMilliseconds / 60000);
    return `${minutesAgo} минут назад`;
  } else if (diffInMilliseconds < 86400000) {
    const hoursAgo = Math.floor(diffInMilliseconds / 3600000);
    return `${hoursAgo} часов назад`;
  } else if (diffInMilliseconds < 604800000) {
    const daysAgo = Math.floor(diffInMilliseconds / 86400000);
    if (daysAgo === 1) {
      return "вчера";
    }
    return `${daysAgo} дней назад`;
  } else {
    return inputDate.toLocaleString("ru-RU", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }
};
