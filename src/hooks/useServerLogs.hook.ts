import { useLazyGetMeDataQuery } from "@/redux/api/userApi";
import { setOpenModal } from "@/redux/slices/modalsOpensSlice";
import { setText, setTitle } from "@/redux/slices/successModal";
import { setUserData } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/redux/store";
import { Found, Log, NamesModals, ServerLog, Session } from "@/types";
import { getEncryptedPassword } from "@/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useServerLogs = (sessionData?: Session) => {
  const [serversAllLogs, setServersAllLogs] = useState<ServerLog[]>([]);
  const [serversAllFounds, setServersAllFounds] = useState<Found[]>([]);
  const [sessionServersLogs, setSessionServersLogs] = useState<Log[]>([]);
  const [sessionMinerLogs, setSessionMinerLogs] = useState<Log[]>([]);
  const [getMe, { data: getMeData }] = useLazyGetMeDataQuery();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const encryptedPassword = getEncryptedPassword();

  useEffect(() => {
    const servers = sessionData?.data?.servers;
    const sessionLogs = sessionData?.data?.logs;

    if (!servers) return;

    for (let i = 0; i < servers.length; i++) {
      const server = servers[i];

      if (!server) return;

      if (server.logs) {
        setServersAllLogs(server.logs);
      }
      if (server.founds) {
        setServersAllFounds(server.founds);
      }
      if (sessionLogs) {
        setSessionMinerLogs(sessionLogs?.filter((log) => log.type === "miner"));
        setSessionServersLogs(
          sessionLogs?.filter((log) => log.type === "servers")
        );
      }
    }
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
