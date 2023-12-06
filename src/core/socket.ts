import Cookies from "js-cookie";

const token = Cookies.get("token");

const socketUrl = `${import.meta.env.VITE_SOCKET_URL}?token=${token}`;

const socket = new WebSocket(socketUrl);

export default socket;
