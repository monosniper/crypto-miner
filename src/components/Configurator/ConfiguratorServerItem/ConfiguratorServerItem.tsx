import { MainBadge } from "@/components/ui";
import cn from "clsx";

export const ConfiguratorServerItem = () => {
  return (
    <div className={cn("box", "px-5 py-4 flex flex-col gap-4 w-full")}>
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <h4 className="font-bold text-sm">Базовый</h4>

        <p className="font-bold text-sm">$99.00</p>
      </div>

      <p className="text-xs text-base-content-200">Доход от $60.00 в месяц</p>

      <div className="flex items-center gap-1 flex-wrap">
        <MainBadge className="!px-4" title="USDT" />
        <MainBadge className="!px-4" title="BTC" />
      </div>
    </div>
  );
};
