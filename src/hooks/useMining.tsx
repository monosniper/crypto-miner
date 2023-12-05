import socket from "@/core/socket";
import { useLazyGetSessionQuery } from "@/redux/api/miningApi";
import { useGetMyServersQuery } from "@/redux/api/serversApi";
import {
  mining,
  setSelectedCoins,
  setSelectedServers,
} from "@/redux/slices/miningSlice";
import { user } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Coin, Found, Server, ServerLog, StartMinerSocketData } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

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
  const { userData } = useAppSelector(user);
  const { data: serversList } = useGetMyServersQuery(null);

  useEffect(() => {
    if (!userData?.session) return;

    const userSelectedServers = userData.session.servers.map((el) => {
      const foundServer = serversList?.data.find(
        (server) => server.id === el.id
      );

      if (!foundServer) return el;

      return {
        id: el.id,
        type: foundServer.type,
        coins: foundServer.coins,
      };
    });

    const userSelectedCoins = userData?.session.coins.map((el) => el.id);

    dispatch(setSelectedServers(userSelectedServers));
    dispatch(setSelectedCoins(userSelectedCoins));
  }, [dispatch, serversList?.data, userData]);

  useEffect(() => {
    const servers = sessionData?.data.servers || userData?.session?.servers;

    if (!servers) return;

    const interval = setInterval(() => {
      const logs: ServerLog[] = [];
      const founds: Found[] = [];

      if (serversAllLogs.length !== servers.length) {
        for (let i = 0; i < servers.length; i++) {
          const server = servers[i];

          if (!server.logs && !server.founds) return;

          if (server.logs) {
            for (let j = 0; j < server.logs.length; j++) {
              const log = server.logs[j];

              const logDate = new Date(log.timestamp);
              const currentDate = new Date();

              if (currentDate > logDate) {
                logs.push(log);
              }
            }
          }

          if (server.founds) {
            for (let j = 0; j < server.founds.length; j++) {
              const log = server.founds[j];

              const logDate = new Date(log.timestamp);
              const currentDate = new Date();

              if (currentDate > logDate) {
                founds.push(log);
              }
            }
          }
        }
      }

      setServersAllLogs(logs);
      setServersAllFounds(founds);
    }, 2000);

    return () => clearInterval(interval);
  }, [serversAllLogs.length, sessionData, userData?.session]);

  const toggleServerSelection = (server: Server) => {
    const foundServer = selectedServers.find((el) => server.id === el.id);

    if (selectedServers[0] && selectedServers[0].type !== server.type) return;

    const filteredServer = {
      id: server.id,
      type: server.type,
      coins: server.coins,
    };

    if (!foundServer) {
      return dispatch(setSelectedServers([...selectedServers, filteredServer]));
    } else {
      dispatch(
        setSelectedCoins(
          selectedCoins.filter(
            (coinEl) => !server.coins?.some((el) => el.id === coinEl)
          )
        )
      );

      return dispatch(
        setSelectedServers(selectedServers.filter((el) => el.id !== server.id))
      );
    }
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
    if (!server.type || selectedServers.length === 0) return true;

    const res = server.type === selectedServers[0].type ? true : false;

    return res;
  };

  const coins = () => {
    const coins = [];

    for (let i = 0; i < selectedServers.length; i++) {
      const server = selectedServers[i];

      if (!server.coins) break;

      coins.push(...server.coins);
    }

    return coins;
  };

  const startMiner = () => {
    if (selectedCoins.length === 0) {
      return toast.warning(t("select coins"));
    }

    setLoading(true);

    const servers = selectedServers.map((el) => el.id);

    if (socket.readyState === WebSocket.OPEN) {
      const dataToSend = {
        method: "start",
        data: {
          coins: selectedCoins,
          servers,
        },
      };

      socket.send(JSON.stringify(dataToSend));
    }
  };

  const handleSocketMessage = (e: MessageEvent) => {
    const data: StartMinerSocketData = JSON.parse(e.data);

    const {
      data: { session_id },
    } = data;

    getSession({ id: session_id });

    setLoading(false);
  };

  useEffect(() => {
    socket.addEventListener("message", handleSocketMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sessionError) return;

    toast.error(t("failed to start mining"));
  }, [sessionError, t]);

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
  };
};
