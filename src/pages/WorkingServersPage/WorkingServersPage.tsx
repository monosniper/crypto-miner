import { useRef } from "react";
import { Servers, ServersPlans, Title } from "@/components";
import { useLoading } from "@/hooks";
import { useTranslation } from "react-i18next";
import { useGetMyServersQuery } from "@/redux/api/serversApi";

export const WorkingServersPage = () => {
  const plansRef = useRef<HTMLDivElement>(null);
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
      <Title className="flex lg:hidden pb-6" title="Доступные планы" />

      <div ref={plansRef}>
        <ServersPlans />
      </div>

      <div className="mt-16">
        <Title title={t("servers involved")} />

        <Servers
          className="mt-6"
          plansRef={plansRef}
          servers={serversList}
          loading={serversListLoading}
        />
      </div>
    </div>
  );
};
