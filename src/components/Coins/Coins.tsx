import { CoinBlock } from "@/components";
import { PropsWithClassName } from "@/types";
import { FC } from "react";
import cn from "clsx";

export const Coins: FC<PropsWithClassName> = ({ className }) => {
  return (
    <div className={cn(className, "flex flex-wrap -m-2")}>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <CoinBlock />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <CoinBlock />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <CoinBlock />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <CoinBlock />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <CoinBlock />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <CoinBlock />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <CoinBlock />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <CoinBlock />
      </div>
    </div>
  );
};
