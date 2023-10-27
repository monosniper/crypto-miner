import { Coins, Servers, Title } from "@/components";
import { Search } from "@/components/ui";
import { useLoading } from "@/hooks";
import { useGetMyServersQuery } from "@/redux/api/userApi";

export const MiningPage = () => {
  const {
    data: serversList,
    isLoading: serversListIsLoading,
    isFetching: serversListIsFetching,
  } = useGetMyServersQuery(null);

  const serversListLoading = useLoading(
    serversListIsLoading,
    serversListIsFetching,
  );

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Майнинг" />

      <Search
        placeholder="Найти монету"
        value=""
        onChange={() => console.log("asd")}
      />

      <Coins className="mt-6" rows={[]} />

      <div className="mt-16">
        <Title title="Задействованные сервера" />

        <Servers
          className="mt-6"
          servers={serversList}
          loading={serversListLoading}
        />
      </div>
    </div>
  );
};
