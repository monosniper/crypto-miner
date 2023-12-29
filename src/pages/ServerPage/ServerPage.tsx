import { LogsBlock, Title } from "@/components";
import { FanIcon, PrevIcon } from "@/components/icons";
import { useNavigate, useParams } from "react-router-dom";
import cn from "clsx";
// import { Button } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { Found, ServerLog, ServerStatuses } from "@/types";
import { getServerStatus } from "@/data";
import { useGetMyServerByIdQuery } from "@/redux/api/serversApi";
import styles from "./ServerPage.module.css";
import { useMining } from "@/hooks/useMining";
import { useAppSelector } from "@/redux/store";
import { user } from "@/redux/slices/userSlice";
import { useState, useEffect } from "react";
import { useGetWalletQuery } from "@/redux/api/userApi";

export const ServerPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading } = useGetMyServerByIdQuery(
    { id: Number(id) },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    },
  );
  const { sessionData } = useMining();
  const { userData } = useAppSelector(user);
  const [serverLogs, setServerLogs] = useState<ServerLog[]>([]);
  const [serverFounds, setServerFounds] = useState<Found[]>([]);
  const { data: walletData } = useGetWalletQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if ((!sessionData && !userData?.session) || !id) return;

    const servers = sessionData?.data.servers || userData?.session.servers;

    if (!servers) return;

    const foundServer = servers.find((el) => el.id === Number(id));

    if (!foundServer) return;

    const interval = setInterval(() => {
      if (foundServer.logs) {
        const logs: ServerLog[] = [];

        for (let j = 0; j < foundServer.logs.length; j++) {
          const log = foundServer.logs[j];

          const logDate = new Date(log.timestamp);
          const currentDate = new Date();

          if (currentDate > logDate) {
            logs.push(log);
          }
        }

        setServerLogs(logs);
      }

      if (foundServer.founds) {
        const founds: Found[] = [];

        for (let j = 0; j < foundServer.founds.length; j++) {
          const log = foundServer.founds[j];

          const logDate = new Date(log.timestamp);
          const currentDate = new Date();

          if (currentDate > logDate) {
            founds.push(log);
          }
        }

        setServerFounds(founds);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [id, sessionData, userData?.session]);

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

      {!isLoading && data?.data.server?.title ? (
        <Title title={data.data.server.title} />
      ) : (
        <div className="w-20 h-2 rounded bg-base-200 animate-pulse"></div>
      )}

      <div className={cn("box", "p-6 mt-6")}>
        <div className="flex justify-between items-start flex-wrap gap-4 flex-col-reverse min-[500px]:items-center min-[500px]:flex-row">
          <h5>{t("status")}</h5>

          {data?.data.name && (
            <h6 className="font-semibold text-xl">{data.data.name}</h6>
          )}
        </div>

        <div className="flex justify-between items-center gap-3 gap-y-6 flex-wrap mt-4">
          <div className="flex items-center gap-4 w-full justify-between flex-wrap">
            <div className="flex items-center gap-4">
              <div
                className={cn(styles.state, {
                  [styles.notActive]:
                    data?.data.status === ServerStatuses.NOT_ACTIVE_STATUS,
                  [styles.reload]:
                    data?.data.status === ServerStatuses.RELOAD_STATUS,
                })}
              >
                <FanIcon
                  className={cn({
                    "animate-spin":
                      data?.data.status === ServerStatuses.WORK_STATUS,
                  })}
                  width={32}
                  height={32}
                />
              </div>

              <p className="text-2xl font-semibold">
                {t(getServerStatus(data?.data.status as ServerStatuses))}
              </p>
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
