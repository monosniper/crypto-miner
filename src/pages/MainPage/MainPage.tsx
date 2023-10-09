import { Coins, Conversions, News, Title } from "@/components";
import { useLoading } from "@/hooks";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";

export const MainPage = () => {
  const { data, isLoading, isFetching } = useGetCoinsQuery(null);

  const coinsLoading = useLoading(isLoading, isFetching);

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Главная" />

      <Coins rows={data} draggableItems={true} loading={coinsLoading} />

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
