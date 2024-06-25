import { useGetSessionQuery } from "@/redux/api/miningApi";

import { useSessionLogs } from "./useSessionLogs.hook";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import {
  setSelectedCoins,
  setSelectedServers,
} from "@/redux/slices/miningSlice";

export const useSession = () => {
  const { data: sessionData, isLoading } = useGetSessionQuery(null);
  const {
    serversAllLogs,
    serversAllFounds,
    sessionMinerLogs,
    sessionServersLogs,
  } = useSessionLogs(sessionData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!sessionData?.data) return;
    const coins = sessionData?.data?.coins;
    const servers = sessionData?.data?.servers;

    const coinsIds = coins?.map((coin) => coin.id);
    const serversIds = servers?.map((server) => server.id);

    dispatch(setSelectedCoins(coinsIds));
    dispatch(setSelectedServers(serversIds || []));
  }, [dispatch, sessionData]);

  return {
    sessionData,
    isLoading,
    serversAllLogs,
    serversAllFounds,
    sessionMinerLogs,
    sessionServersLogs,
  };
};
