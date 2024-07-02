import { MainBadge } from "@/components/ui";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";
import {
  setConfiguration,
  setName,
  setPrice,
} from "@/redux/slices/presets.slice";
import { useAppDispatch } from "@/redux/store";
import { Configurator } from "@/types";
import cn from "clsx";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  type: string;
  price: number;
  textList: string[];
  coins: string[];
  configuration: Configurator;
};

export const ConfiguratorServerItem: FC<Props> = ({
  type,
  price,
  textList,
  coins,
  configuration,
}) => {
  const { data: allCoins } = useGetCoinsQuery(null);
  const dispatch = useAppDispatch();
  const [monthIncome] = useState(Math.ceil(Number(price) / 5));
  const [dayIncome] = useState(Math.ceil(Number(price) / 5 / 30));
  const [weekIncome] = useState(Math.ceil(Number(price) / 5 / 4));
  const { t } = useTranslation();

  const clickHandler = () => {
    dispatch(setConfiguration(configuration));
    dispatch(setPrice(price));
    dispatch(setName(type));
  };

  return (
    <div
      className={cn(
        "box",
        "px-5 py-4 flex flex-col gap-4 w-full cursor-pointer h-full"
      )}
      onClick={clickHandler}
    >
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <h4 className="font-bold text-sm">{type}</h4>

        <p className="font-bold text-sm">{price}$</p>
      </div>

      {textList.map((text, idx) => (
        <p key={idx} className="text-xs text-base-content-200">
          {text}
        </p>
      ))}

      <div className="flex flex-col gap-2">
        <p>
          {t("Income per day")}:{" "}
          <span className="font-semibold">{dayIncome}$</span>
        </p>
        <p>
          {t("Income per week")}:{" "}
          <span className="font-semibold">{weekIncome}$</span>
        </p>
        <p>
          {t("Income per month")}:{" "}
          <span className="font-semibold">{monthIncome}$</span>
        </p>
      </div>

      <div className="flex items-center gap-1 flex-wrap">
        {coins.map((coinId, idx) => {
          if (!allCoins) return;

          const coin = allCoins.data.find((el) => el.id === Number(coinId));

          return (
            <MainBadge key={idx} className="!px-4" title={coin?.slug || ""} />
          );
        })}
      </div>
    </div>
  );
};
