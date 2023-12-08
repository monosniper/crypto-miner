import Cookies from "js-cookie";

const token = Cookies.get("token");

const socketUrl = `${import.meta.env.VITE_SOCKET_URL}?token=${token}`;

let socket: WebSocket | null = null;

if (token) {
  const newSocket = new WebSocket(socketUrl);
  socket = newSocket;
}

console.log(socket);

export default socket;
