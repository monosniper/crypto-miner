import { Coins, Servers, Title } from "@/components";
import { Search, ShowMoreBtn } from "@/components/ui";

export const MiningPage = () => {
  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Майнинг" />

      <Search
        placeholder="Найти монету"
        value=""
        onChange={() => console.log("asd")}
      />

      <Coins className="mt-6" />

      <div className="mt-16">
        <Title title="Задействованные сервера" />

        <Servers className="mt-6" />

        <ShowMoreBtn className="mt-6" onClick={() => console.log("click")} />
      </div>
    </div>
  );
};
