import Cookies from "js-cookie";

let socket: WebSocket | null = null;

export const connectSocket = () => {
  const token = Cookies.get("token");

  if (!token) return;

  const socketUrl = `${import.meta.env.VITE_SOCKET_URL}?token=${token}`;

  socket = new WebSocket(socketUrl);

  socket.onopen = () => {
    console.log("socket connected");
  };

  socket.onerror = (e) => {
    console.error("WebSocket error:", e);
  };
};

export default socket;
