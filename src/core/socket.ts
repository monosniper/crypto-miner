import Cookies from "js-cookie";

const token = Cookies.get("token");

const socket = new WebSocket("ws://188.116.20.163:1337?token=" + token);

export default socket;
