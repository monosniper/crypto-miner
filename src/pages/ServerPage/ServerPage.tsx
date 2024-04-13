import { LogsBlock, Title } from "@/components";
import { FanIcon, PrevIcon } from "@/components/icons";
import { useNavigate, useParams } from "react-router-dom";
import cn from "clsx";
import { useTranslation } from "react-i18next";
import { Found, ServerLog, ServerStatuses } from "@/types";
import { getServerStatus } from "@/data";
import { useGetMyServerByIdQuery } from "@/redux/api/serversApi";
import styles from "./ServerPage.module.css";
import { useState, useEffect } from "react";
import { useGetWalletQuery } from "@/redux/api/userApi";

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
    },
  );
  // const [
  //   extendServer,
  //   {
  //     data: extendServerData,
  //     isError: extendServerIsError,
  //     isLoading: extendServerIsLoading,
  //   },
  // ] = useExtendServerMutation();
  const [serverLogs, setServerLogs] = useState<ServerLog[]>([]);
  const [serverFounds, setServerFounds] = useState<Found[]>([]);
  const { data: walletData } = useGetWalletQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  // useEffect(() => {
  //   if (!extendServerData) return;

  //   if (extendServerData.success) {
  //     document.location.href = extendServerData.url;
  //   } else {
  //     toast.error(t("mistake"));
  //   }
  // }, [extendServerData, t]);

  // useEffect(() => {
  //   if (!extendServerIsError) return;

  //   toast.error(t("mistake"));
  // }, [extendServerIsError, t]);

  useEffect(() => {
    if (!serverData?.data?.logs) return;

    const interval = setInterval(() => {
      const logs: ServerLog[] = [];
      const founds: Found[] = [];

      if (!serverData.data.logs) return;

      for (let j = 0; j < serverData.data.logs.length; j++) {
        const log = serverData.data.logs[j];

        const logDate = new Date(log.timestamp);
        const currentDate = new Date();

        if (currentDate > logDate) {
          logs.push(log);
        }
      }

      if (!serverData.data.founds) return;

      for (let j = 0; j < serverData.data.founds.length; j++) {
        const found = serverData.data.founds[j];

        const logDate = new Date(found.timestamp);
        const currentDate = new Date();

        if (currentDate > logDate) {
          founds.push(found);
        }
      }

      setServerLogs(logs);
      setServerFounds(founds);
    }, 1000);

    return () => clearInterval(interval);
  }, [serverData]);

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

      {!isLoading && serverData?.data.server?.title ? (
        <Title title={serverData.data.server.title} />
      ) : (
        <div className="w-20 h-2 rounded bg-base-200 animate-pulse"></div>
      )}

      <div className={cn("box", "p-6 mt-6")}>
        <div className="flex justify-between items-start flex-wrap gap-4 flex-col-reverse min-[500px]:items-center min-[500px]:flex-row">
          <h5>{t("status")}</h5>

          {serverData?.data.name && (
            <h6 className="font-semibold text-xl">{serverData.data.name}</h6>
          )}
        </div>

        <div className="flex justify-between items-center gap-3 gap-y-6 flex-wrap mt-4">
          <div className="flex items-center gap-4 w-full justify-between flex-wrap">
            <div className="flex items-center gap-4 flex-wrap w-full sm:w-auto">
              <div
                className={cn(styles.state, {
                  [styles.notActive]:
                    serverData?.data.status ===
                    ServerStatuses.NOT_ACTIVE_STATUS,
                  [styles.reload]:
                    serverData?.data.status === ServerStatuses.RELOAD_STATUS,
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

              {/* {moment
                .utc(serverData?.data.active_until)
                .isBefore(currentDate) && (
                <Button
                  title={extendServerIsLoading ? t("loading") : t("To extend")}
                  onClick={() => {
                    if (!serverData) return;

                    extendServer({
                      server_id: serverData.data.id,
                    });
                  }}
                  disabled={extendServerIsLoading}
                />
              )} */}
            </div>

            <p>
              Баланс:{" "}
              <span className="font-semibold text-base">
                {walletData?.data.balance.USDT} USDT
              </span>
            </p>
          </div>

          {/* <Button title={t("restart")} /> */}
        </div>
      </div>

      <div className="mt-6">
        <LogsBlock loading={isLoading} left={serverLogs} right={serverFounds} />
      </div>
    </div>
  );
};
