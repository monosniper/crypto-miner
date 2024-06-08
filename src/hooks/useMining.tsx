import socket from "@/core/socket";
import { useGetMyServersQuery } from "@/redux/api/serversApi";
import {
  mining,
  setSelectedCoins,
  setSelectedServers,
} from "@/redux/slices/miningSlice";
import { user } from "@/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Coin } from "@/types";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";
import { useSession } from "./useSession.hook";
import { useLazyGetSessionQuery } from "@/redux/api/miningApi";

export const useMining = () => {
  const { selectedServers, selectedCoins } = useAppSelector(mining);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [getSession] = useLazyGetSessionQuery();
  const { userData } = useAppSelector(user);
  const { data: serversList } = useGetMyServersQuery(null);
  const { data: coinsFromApi } = useGetCoinsQuery(null);
  const {
    sessionData,
    isLoading: sessionIsLoading,
    serversAllLogs,
    serversAllFounds,
    sessionMinerLogs,
    sessionServersLogs,
  } = useSession();

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

  const getCoins = () => {
    const coins: Coin[] = [];

    for (let i = 0; i < selectedServers.length; i++) {
      const serverId = selectedServers[i];

      const server = serversList?.data.find((server) => server.id === serverId);

      if (!server?.configuration.coins || !server || !coinsFromApi) break;

      if (!coins.find((el) => el.id !== server.id)) {
        const coinsWithInfo = server.configuration.coins
          .map((coinId) => {
            const foundCoinFromApi = coinsFromApi.data.find(
              (coinFromApi) => coinFromApi.id === Number(coinId)
            );

            return foundCoinFromApi;
          })
          .filter((coin) => coin !== undefined) as Coin[];

        coins.push(...coinsWithInfo);
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

    if (socket?.readyState === WebSocket.OPEN) {
      const dataToSend = {
        method: "start",
        data: {
          coins: selectedCoins,
          servers: selectedServers,
        },
      };

      socket.send(JSON.stringify(dataToSend));
    }

    if (socket?.readyState === WebSocket.CLOSED) {
      toast.error(t("mistake"));
    }
  };

  const handleSocketMessage = () => {
    getSession(null);

    localStorage.removeItem("isOverSession");
  };

  useEffect(() => {
    socket?.addEventListener("message", handleSocketMessage);

    return () => {
      socket?.removeEventListener("message", handleSocketMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    sessionData,
    sessionIsLoading,
    toggleServerSelection,
    toggleCoinSelection,
    coins: getCoins(),
    startMiner,
    serversAllLogs,
    serversAllFounds,
    sessionMinerLogs,
    sessionServersLogs,
  };
};
