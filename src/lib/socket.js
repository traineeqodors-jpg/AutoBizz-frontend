import { io } from "socket.io-client";

let socket;

export const getSocket = (user) => {
  if (!user) return null;
  if (user.role === "employee") return null;

  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      withCredentials: true,
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }

  return socket;
};

export const ensureSocketRoom = async (user) => {
  const socket = getSocket(user);

  if (!socket) return null;

  const userId = user?.orgId || user?.id;

  if (!socket.connected) {
    socket.connect();

    await new Promise((resolve) => {
      socket.once("connect", resolve);
    });
  }

  socket.emit("join-room", userId);

  return socket;
};
