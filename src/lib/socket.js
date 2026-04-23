// lib/socket.js
import { io } from "socket.io-client";

let socket;

export const getSocket = (user) => {
  if (!user) return null;
  if (user.role === "employee") return null;

  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      withCredentials: true,
      transports: ["websocket"], // more stable
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });
  }

  return socket;
};
