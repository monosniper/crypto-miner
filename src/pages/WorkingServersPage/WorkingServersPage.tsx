import { useRef } from "react";
import { Attention, Servers, ServersPlans, Title } from "@/components";
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
    serversListIsFetching
  );
  const { t } = useTranslation();

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Доступные планы" />

      <Attention
        className="p-6"
        title={t("pay-attention")}
        content={<AttentionContent />}
      />

      <div className="mt-16" ref={plansRef}>
        <ServersPlans />
      </div>

      <div className="mt-16">
        <Title title={t("your servers")} />

        <Servers
          className="mt-6"
          plansRef={plansRef}
          servers={serversList?.data}
          loading={serversListLoading}
        />
      </div>
    </div>
  );
};

const AttentionContent = () => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <p>
          {t(
            "servers of the same plan can be launched simultaneously, this will give a multiple boost to the farm"
          )}
        </p>
      </div>
    </>
  );
};
