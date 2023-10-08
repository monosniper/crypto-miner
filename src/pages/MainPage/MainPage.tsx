import { Coins, Conversions, News, Title } from "@/components";

export const MainPage = () => {
  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Главная" />

      <Coins />

      <div className="flex flex-wrap mt-16 -m-6">
        <div className="w-full md:w-1/2 p-6">
          <News />
        </div>

        <div className="w-full md:w-1/2 p-6">
          <Conversions />
        </div>
      </div>
    </div>
  );
};
