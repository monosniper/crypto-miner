import Cookies from "js-cookie";

const token = Cookies.get("token");

const socket = new WebSocket(
  import.meta.env.VITE_SOCKET_URL + "?token=" + token
);

export default socket;
