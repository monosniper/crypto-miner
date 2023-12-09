export const formatDate = (date: Date): string => {
  const months: string[] = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const day: number = date.getDate();
  const month: string = months[date.getMonth()];
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();

  const formattedDate: string = `${day} ${month} ${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;

  return formattedDate;
};
