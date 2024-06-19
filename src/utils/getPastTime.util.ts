import { TFunction } from "i18next";

export const getPastTimeStr = (
  time: string,
  t: TFunction<"translation", undefined>
) => {
  const createdDate = new Date(time);
  
  const now = new Date();

  const diffMs = now.getTime() - createdDate.getTime();

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${diffHours} ${t("hours")} ${diffMinutes} ${t("minutes")}`;
};
