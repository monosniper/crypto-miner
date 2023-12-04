import { LogsBlock, Title } from "@/components";
import { FanIcon, PrevIcon } from "@/components/icons";
import { useNavigate, useParams } from "react-router-dom";
import cn from "clsx";
import { Button } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { ServerLog, ServerStatuses } from "@/types";
import { getServerStatus } from "@/data";
import { useGetMyServerByIdQuery } from "@/redux/api/serversApi";
import styles from "./ServerPage.module.css";
import { useMining } from "@/hooks/useMining";
import { useAppSelector } from "@/redux/store";
import { user } from "@/redux/slices/userSlice";
import { useState, useEffect } from "react";

export const ServerPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading } = useGetMyServerByIdQuery(
    { id: Number(id) },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );
  const { sessionData } = useMining();
  const { userData } = useAppSelector(user);
  const [serverLogs, setServerLogs] = useState<ServerLog[]>([]);

  useEffect(() => {
    if ((!sessionData && !userData?.session) || !id) return;

    const servers = sessionData?.data.servers || userData?.session.servers;

    if (!servers) return;

    const foundServer = servers.find((el) => el.id === Number(id));

    if (!foundServer) return;

    if (foundServer.logs) {
      setServerLogs(foundServer.logs);
    }
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

      {!isLoading && data?.data.title ? (
        <Title title={data.data.title} />
      ) : (
        <div className="w-20 h-2 rounded bg-base-200 animate-pulse"></div>
      )}

      <div className={cn("box", "p-6 mt-6")}>
        <div className="flex justify-between items-center">
          <h5>{t("status")}</h5>

          {data?.data.server_user_name && (
            <h6 className="font-semibold text-xl">
              {data.data.server_user_name}
            </h6>
          )}
        </div>

        <div className="flex justify-between items-center gap-3 gap-y-6 flex-wrap mt-4">
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

          <Button title={t("restart")} />
        </div>
      </div>

      <div className="mt-6">
        <LogsBlock loading={isLoading} left={serverLogs} />
      </div>
    </div>
  );
};
