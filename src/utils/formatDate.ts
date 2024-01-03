export const formatDate = (date: Date): string => {
  const formattedDate: string = date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  });

  return formattedDate;
};
