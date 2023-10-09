import { FC } from "react";
import { PropsWithClassName } from "@/types";
import cn from "clsx";
import { Buy } from "@/components/ui";
import { CoinSkelet } from "@/components";

export const MyCoins: FC<PropsWithClassName> = ({ className }) => {
  return (
    <div className={cn(className, "flex flex-wrap -m-2")}>
      <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2">
        <Buy title="Купить монеты" onClick={() => console.log("click")} />
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2">
        <CoinSkelet />
      </div>
    </div>
  );
};
