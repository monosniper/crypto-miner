import { Servers, Title } from "@/components";
import { useLoading } from "@/hooks";
import { useGetMyServersQuery } from "@/redux/api/serversApi";
import { useTranslation } from "react-i18next";

export const UserServersPage = () => {
  const { t } = useTranslation();

  const {
    data: serversList,
    isLoading: serversListIsLoading,
    isFetching: serversListIsFetching,
  } = useGetMyServersQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const serversListLoading = useLoading(
    serversListIsLoading,
    serversListIsFetching,
  );

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title={t("your servers")} />

      <Servers servers={serversList?.data} loading={serversListLoading} />
    </div>
  );
};
