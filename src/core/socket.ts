import { io } from "socket.io-client";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  auth: {
    token,
  },

  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 3,
  autoConnect: false,
});

export default socket;
