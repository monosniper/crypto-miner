import { mining, setSelectedServers } from "@/redux/slices/miningSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Server } from "@/types";

export const useMining = () => {
  const { selectedServers } = useAppSelector(mining);
  const dispatch = useAppDispatch();

  const toggleServerSelection = (server: Server) => {
    const foundServer = selectedServers.find((el) => server.id === el.id);

    if (!foundServer) {
      return dispatch(setSelectedServers([...selectedServers, server]));
    } else {
      return dispatch(
        setSelectedServers(selectedServers.filter((el) => el.id !== server.id)),
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
    checkIdentityType,
    coins: coins(),
  };
};
