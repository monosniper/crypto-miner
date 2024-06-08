import { useLazyGetMeDataQuery } from "@/redux/api/userApi";
import { setOpenModal } from "@/redux/slices/modalsOpensSlice";
import { setText, setTitle } from "@/redux/slices/successModal";
import { setUserData } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/redux/store";
import { Found, Log, NamesModals, ServerLog, Session } from "@/types";
import { getEncryptedPassword } from "@/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useSessionLogs = (sessionData?: Session) => {
  const [serversAllLogs, setServersAllLogs] = useState<ServerLog[]>([]);
  const [serversAllFounds, setServersAllFounds] = useState<Found[]>([]);
  const [sessionServersLogs, setSessionServersLogs] = useState<Log[]>([]);
  const [sessionMinerLogs, setSessionMinerLogs] = useState<Log[]>([]);
  const [getMe, { data: getMeData }] = useLazyGetMeDataQuery();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const encryptedPassword = getEncryptedPassword();

  useEffect(() => {
    const servers = sessionData?.data.servers;
    const sessionLogs = sessionData?.data.logs;

    if (!servers) return;

    const interval = setInterval(() => {
      const logs: ServerLog[] = [];
      const founds: Found[] = [];
      const currentDate = new Date();
      const sessionMinerLogsList = [];
      const sessionServerLogsList = [];

      for (let i = 0; i < servers.length; i++) {
        const server = servers[i];

        if (!server.logs && !server.founds) return;

        if (server.logs) {
          for (let j = 0; j < server.logs.length; j++) {
            const log = server.logs[j];

            const logDate = new Date(log.timestamp);

            if (currentDate.getTime() > logDate.getTime()) {
              logs.push(log);
            }
          }
        }

        if (server.founds) {
          for (let j = 0; j < server.founds.length; j++) {
            const log = server.founds[j];

            const logDate = new Date(log.timestamp);

            if (currentDate.getTime() > logDate.getTime()) {
              founds.push(log);
            }
          }
        }
      }

      if (sessionLogs) {
        for (let i = 0; i < sessionLogs.length; i++) {
          const log = sessionLogs[i];

          const logDate = new Date(log.timestamp);

          if (currentDate.getTime() > logDate.getTime()) {
            if (log.type === "miner") {
              sessionMinerLogsList.push(log);
            }

            if (log.type === "servers") {
              sessionServerLogsList.push(log);
            }
          }
        }
      }

      setServersAllLogs(logs);
      setServersAllFounds(founds);
      setSessionMinerLogs(sessionMinerLogsList);
      setSessionServersLogs(sessionServerLogsList);
    }, 2000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getMe,
    encryptedPassword,
    sessionData,
    sessionMinerLogs.length,
    sessionServersLogs.length,
  ]);

  // useEffect(() => {
  //   const currentTime = moment.utc();
  //   const endTimeMining = moment.utc(sessionData?.data.end_at);

  //   if (currentTime.isAfter(endTimeMining)) {
  //     getMe(null);
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sessionData?.data.end_at]);

  useEffect(() => {
    if (!getMeData) return;

    const { data: user } = getMeData;

    dispatch(setUserData(user));
 
    if (!user.session) {
      dispatch(
        setOpenModal({
          stateNameModal: NamesModals.isOpenSuccessModal,
          isOpen: true,
        })
      );

      dispatch(setTitle(t("the session is over")));
      dispatch(setText(t("you can view the report on the server page")));
      localStorage.setItem("isOverSession", "true");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getMeData]);

  return {
    serversAllLogs,
    serversAllFounds,
    sessionMinerLogs,
    sessionServersLogs,
  };
};
