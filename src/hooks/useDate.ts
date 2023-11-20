import { main } from "@/redux/slices/mainSlice";
import { useAppSelector } from "@/redux/store";

const currentDate = new Date();

export const useDate = () => {
  const { language } = useAppSelector(main);

  const getDateNextDayWeek = (dayWeek: number) => {
    const currentDay = currentDate.getDay();

    let daysUntilNextFriday = dayWeek - currentDay;

    if (daysUntilNextFriday <= 0) {
      daysUntilNextFriday += 7;
    }

    const nextFriday = new Date(
      currentDate.getTime() + daysUntilNextFriday * 24 * 60 * 60 * 1000,
    );

    return nextFriday;
  };

  const formattedDateStr = (date: Date) => {
    const languagesAbbrs = {
      rus: "ru-RU",
      eng: "en-US",
    };

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "long",
    };

    const formattedDateStr = new Intl.DateTimeFormat(
      languagesAbbrs[language],
      options,
    ).format(date);

    // Example - Friday, October 13, 2023
    return formattedDateStr;
  };

  return {
    getDateNextDayWeek,
    formattedDateStr,
  };
};
