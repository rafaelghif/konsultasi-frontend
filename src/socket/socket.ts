import { io, Socket } from "socket.io-client";
const socket: Socket = io("http://localhost:8081", { autoConnect: false });

export default socket;