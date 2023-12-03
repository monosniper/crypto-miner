import socket from "@/core/socket";
import { useLazyGetSessionQuery } from "@/redux/api/miningApi";
import {
  mining,
  setSelectedCoins,
  setSelectedServers,
} from "@/redux/slices/miningSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Coin, Server, ServerLog, StartMinerSocketData } from "@/types";
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

  useEffect(() => {
    if (!sessionData) return;

    const { servers } = sessionData.data;

    for (let i = 0; i < servers.length; i++) {
      const server = servers[i];

      console.log(server);
    }
  }, [sessionData]);

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
            (coinEl) => !server.coins?.some((el) => el.id === coinEl),
          ),
        ),
      );

      return dispatch(
        setSelectedServers(selectedServers.filter((el) => el.id !== server.id)),
      );
    }
  };

  const toggleCoinSelection = (coin: Coin) => {
    const foundCoins = selectedCoins.find((el) => coin.id === el);

    if (!foundCoins) {
      return dispatch(setSelectedCoins([...selectedCoins, coin.id]));
    } else {
      return dispatch(
        setSelectedCoins(selectedCoins.filter((el) => el !== coin.id)),
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
  };
};
