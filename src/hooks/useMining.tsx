import {
  mining,
  setSelectedCoins,
  setSelectedServers,
} from "@/redux/slices/miningSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Coin, Server } from "@/types";

export const useMining = () => {
  const { selectedServers, selectedCoins } = useAppSelector(mining);
  const dispatch = useAppDispatch();

  const toggleServerSelection = (server: Server) => {
    const foundServer = selectedServers.find((el) => server.id === el.id);

    if (selectedServers[0] && selectedServers[0].type !== server.type) return;

    if (!foundServer) {
      return dispatch(setSelectedServers([...selectedServers, server]));
    } else {
      dispatch(
        setSelectedCoins(
          selectedCoins.filter(
            (coinEl) => !server.coins?.some((el) => el.id === coinEl.id),
          ),
        ),
      );

      return dispatch(
        setSelectedServers(selectedServers.filter((el) => el.id !== server.id)),
      );
    }
  };

  const toggleCoinSelection = (coin: Coin) => {
    const foundCoins = selectedCoins.find((el) => coin.id === el.id);

    if (!foundCoins) {
      return dispatch(setSelectedCoins([...selectedCoins, coin]));
    } else {
      return dispatch(
        setSelectedCoins(selectedCoins.filter((el) => el.id !== coin.id)),
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

  return {
    toggleServerSelection,
    toggleCoinSelection,
    checkIdentityType,
    coins: coins(),
  };
};
