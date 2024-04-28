import { MainBadge } from "@/components/ui";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";
import cn from "clsx";
import { FC } from "react";

type Props = {
  type: string;
  price: number;
  textList: string[];
  coins: string[];
};

export const ConfiguratorServerItem: FC<Props> = ({
  type,
  price,
  textList,
  coins,
}) => {
  const { data: allCoins } = useGetCoinsQuery(null);

  return (
    <div
      className={cn(
        "box",
        "px-5 py-4 flex flex-col gap-4 w-full cursor-pointer h-full"
      )}
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
