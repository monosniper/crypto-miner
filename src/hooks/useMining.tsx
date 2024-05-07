import socket from "@/core/socket";
import { useLazyGetSessionQuery } from "@/redux/api/miningApi";
import { useGetMyServersQuery } from "@/redux/api/serversApi";
import { useLazyGetMeDataQuery } from "@/redux/api/userApi";
import {
  mining,
  setSelectedCoins,
  setSelectedServers,
} from "@/redux/slices/miningSlice";
import { setUserData, user } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  Coin,
  Found,
  Log,
  NamesModals,
  Preset,
  Server,
  ServerLog,
  StartMinerSocketData,
} from "@/types";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import { setOpenModal } from "@/redux/slices/modalsOpensSlice";
import { setText, setTitle } from "@/redux/slices/successModal";

export const useMining = () => {
  const { selectedServers, selectedCoins } = useAppSelector(mining);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [
    getSession,
    { data: sessionData, error: sessionError, isLoading: sessionIsLoading },
  ] = useLazyGetSessionQuery();
  const { t } = useTranslation();
  const [serversAllLogs, setServersAllLogs] = useState<ServerLog[]>([]);
  const [serversAllFounds, setServersAllFounds] = useState<Found[]>([]);
  const [sessionServersLogs, setSessionServersLogs] = useState<Log[]>([]);
  const [sessionMinerLogs, setSessionMinerLogs] = useState<Log[]>([]);
  const { userData } = useAppSelector(user);
  const { data: serversList } = useGetMyServersQuery(null);
  const mainUserData = JSON.parse(localStorage.getItem("mainUserData") || "{}");
  const bytesPassword = CryptoJS.AES.decrypt(
    mainUserData.password || "",
    import.meta.env.VITE_CRYPT_KEY || ""
  );
  const decryptedPassword = bytesPassword.toString(CryptoJS.enc.Utf8) || "";

  const encryptedPassword = CryptoJS.AES.encrypt(
    decryptedPassword,
    import.meta.env.VITE_CRYPT_KEY || ""
  ).toString();

  const [getMe, { data: getMeData }] = useLazyGetMeDataQuery();

  useEffect(() => {
    if (!userData?.session) return;

    const userSelectedServers = userData.session.servers.map((el) => {
      const foundServer = serversList?.data.find(
        (server) => server.id === el.id
      );

      if (!foundServer) return el;

      return {
        id: el.id,
        // type: foundServer.server?.type,
        coins: foundServer.configuration?.coins,
      };
    });

    const userSelectedCoins = userData?.session.coins.map((el) => el.id);

    dispatch(setSelectedServers(userSelectedServers));
    dispatch(setSelectedCoins(userSelectedCoins));
  }, [dispatch, serversList?.data, userData]);

  useEffect(() => {
    if (!userData) return;

    const servers = sessionData?.data.servers || userData?.session?.servers;
    const sessionLogs = sessionData?.data.logs || userData?.session?.logs;

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
    }, 1000);

    const currentTime = moment.utc();
    const endTimeMining = moment.utc(
      sessionData?.data.end_at || userData.session.end_at
    );

    if (currentTime.isAfter(endTimeMining)) {
      getMe(null);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getMe,
    mainUserData.password,
    encryptedPassword,
    sessionData?.data.logs,
    sessionData?.data.servers,
    sessionMinerLogs.length,
    sessionServersLogs.length,
    userData,
  ]);

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

  const toggleServerSelection = (serverId: number) => {
    const foundServer = selectedServers.find((id) => id === serverId);

    if (!foundServer) {
      return dispatch(setSelectedServers([...selectedServers, serverId]));
    }

    const serversWithoutThisId = selectedServers.filter(
      (id) => id !== serverId
    );

    dispatch(setSelectedServers(serversWithoutThisId));
  };

  const toggleCoinSelection = (coin: Coin) => {
    const foundCoins = selectedCoins.find((el) => coin.id === el);

    if (!foundCoins) {
      return dispatch(setSelectedCoins([...selectedCoins, coin.id]));
    } else {
      return dispatch(
        setSelectedCoins(selectedCoins.filter((el) => el !== coin.id))
      );
    }
  };

  const checkIdentityType = (server: Server) => {
    if (!server.server?.type || selectedServers.length === 0) return true;

    const res = server.server?.type === selectedServers[0].type ? true : false;

    return res;
  };

  const coins = () => {
    const coins: Coin[] = [];

    for (let i = 0; i < selectedServers.length; i++) {
      const server = selectedServers[i];

      if (!server.coins) break;

      if (!coins.find((el) => el.id !== server.id)) {
        coins.push(...server.coins);
      }
    }

    return coins;
  };

  const startMiner = () => {
    if (!userData) return;

    if (!userData.isVerificated) {
      return toast.error(t("verify your email") + ": " + userData.email);
    }

    if (selectedCoins.length === 0) {
      return toast.warning(t("select coins"));
    }

    setLoading(true);

    const servers = selectedServers.map((el) => el.id);

    if (socket?.readyState === WebSocket.OPEN) {
      const dataToSend = {
        method: "start",
        data: {
          coins: selectedCoins,
          servers,
        },
      };

      socket.send(JSON.stringify(dataToSend));
    }

    if (socket?.readyState === WebSocket.CLOSED) {
      setLoading(false);

      toast.error(t("mistake"));
    }
  };

  const handleSocketMessage = (e: MessageEvent) => {
    const data: StartMinerSocketData = JSON.parse(e.data);
    const {
      data: { session_id },
    } = data;

    getSession({ id: session_id });

    localStorage.removeItem("isOverSession");
  };

  useEffect(() => {
    socket?.addEventListener("message", handleSocketMessage);

    return () => {
      socket?.removeEventListener("message", handleSocketMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sessionError) return;

    toast.error(t("failed to start mining"));
  }, [sessionError, t]);

  useEffect(() => {
    if (!sessionData) return;

    setLoading(false);
  }, [sessionData]);

  return {
    toggleServerSelection,
    toggleCoinSelection,
    checkIdentityType,
    coins: coins(),
    startMiner,
    loading: loading || sessionIsLoading,
    sessionData,
    sessionError,
    serversAllLogs,
    serversAllFounds,
    sessionMinerLogs,
    sessionServersLogs,
  };
};
