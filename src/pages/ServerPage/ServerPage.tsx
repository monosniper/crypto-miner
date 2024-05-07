import { LogsBlock, Title } from "@/components";
import { FanIcon, PrevIcon } from "@/components/icons";
import { useNavigate, useParams } from "react-router-dom";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { ServerStatuses } from "@/types";
import { getServerStatus } from "@/data";
import { useGetMyServerByIdQuery } from "@/redux/api/serversApi";
import styles from "./ServerPage.module.css";
import { Button } from "@/components/ui";

// const currentDate = moment.utc();

export const ServerPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: serverData, isLoading } = useGetMyServerByIdQuery(
    { id: Number(id) },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <div>
      <button
        className="flex items-center gap-4 lg:hidden font-semibold text-2xl mb-6"
        onClick={() => {
          navigate(-1);
        }}
      >
        <PrevIcon className="prev-icon" />
        <span>{t("server")}</span>
      </button>

      {!isLoading && serverData?.data?.title ? (
        <Title title={serverData.data.title} />
      ) : (
        <div className="w-20 h-2 rounded bg-base-200 animate-pulse"></div>
      )}

      <div className={cn("box", "p-6 mt-6")}>
        <div className="flex justify-between items-start flex-wrap gap-4 flex-col-reverse min-[500px]:items-center min-[500px]:flex-row">
          <h5>{t("status")}</h5>
        </div>

        <div className="flex justify-between items-center gap-3 gap-y-6 flex-wrap mt-4">
          <div className="flex items-center gap-4 w-full justify-between flex-wrap">
            <div className="flex items-center gap-4 flex-wrap w-full sm:w-auto">
              <div
                className={cn(styles.state, {
                  [styles.notActive]:
                    serverData?.data.status ===
                    ServerStatuses.NOT_ACTIVE_STATUS,
                })}
              >
                <FanIcon
                  className={cn({
                    "animate-spin":
                      serverData?.data.status === ServerStatuses.WORK_STATUS,
                  })}
                  width={32}
                  height={32}
                />
              </div>

              <p className="text-2xl font-semibold">
                {t(getServerStatus(serverData?.data.status as ServerStatuses))}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-end w-full">
            <div className="flex flex-col gap-1 text-base font-medium text-base-content-300">
              <p>{serverData?.data.configuration.cpu}</p>
              <p>{serverData?.data.configuration.gpu}</p>
              <p>{serverData?.data.configuration.disk}</p>
            </div>

            <div className="flex items-center gap-5 flex-wrap">
              <Button title={t("Change the coin")} />
              <Button title={t("Shutdown request")} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <LogsBlock list={[]} title="CPU Usage" />
          <LogsBlock list={[]} title="GPU Usage" />
          <LogsBlock list={[]} title="RAM Usage" />
          <LogsBlock list={[]} title="Temperathure" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"></div>
      </div>
    </div>
  );
};
