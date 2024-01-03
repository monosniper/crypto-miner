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
    const languagesLocales = {
      rus: "ru-RU",
      eng: "en-US",
    };

    const formattedDateStr = date.toLocaleString(languagesLocales[language], {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "long",
    });

    // Example - Пятница, 13 октября 2023 г.
    return formattedDateStr;
  };

  return {
    getDateNextDayWeek,
    formattedDateStr,
  };
};
