import {
  Title,
  TradingChart,
  TradingCoins,
  TradingOperation,
} from "@/components";
import { Search } from "@/components/ui";

export const TradingPage = () => {
  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Трейдинг" />

      <div className="bg-base-200 p-6 rounded-xl border border-base-border-100">
        <h5 className="text-2xl font-medium">Bitcoin, Btc</h5>

        <div className="mt-8">
          <TradingChart />
        </div>

        <Search
          onChange={() => console.log("search")}
          value=""
          placeholder="Найти монету"
        />

        <div className="mt-4">
          <TradingCoins />
        </div>
      </div>

      <div className="flex flex-wrap mt-16 -m-6">
        <div className="w-full md:w-1/2 p-6">
          <TradingOperation />
        </div>

        <div className="w-full md:w-1/2 p-6"></div>
      </div>
    </div>
  );
};
