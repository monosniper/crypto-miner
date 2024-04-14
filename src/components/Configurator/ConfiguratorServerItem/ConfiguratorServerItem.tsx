import { MainBadge } from "@/components/ui";
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
  return (
    <div
      className={cn(
        "box",
        "px-5 py-4 flex flex-col gap-4 w-full cursor-pointer h-full",
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
        {coins.map((coinTitle, idx) => (
          <MainBadge key={idx} className="!px-4" title={coinTitle} />
        ))}
      </div>
    </div>
  );
};
