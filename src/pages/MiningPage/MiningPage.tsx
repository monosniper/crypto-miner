import { Coins, Servers, Title } from "@/components";
import { Search } from "@/components/ui";
import { useLoading } from "@/hooks";
import { useGetMyServersQuery } from "@/redux/api/serversApi";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title={t("mining")} />

      <div>
        <Title title={t("servers involved")} />

        <Servers
          className="mt-6"
          servers={serversList}
          loading={serversListLoading}
        />
      </div>

      <div className="mt-16">
        <Search
          placeholder={t("find a coin")}
          value=""
          onChange={() => console.log("asd")}
        />

        <Coins className="mt-6" rows={[]} />
      </div>
    </div>
  );
};
