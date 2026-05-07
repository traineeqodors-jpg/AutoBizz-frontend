"use client";

import { useEffect, useRef } from "react";
import { getSocket } from "@/lib/socket";

export default function SocketProvider({ user, children }) {
  const hasJoined = useRef(false);

  useEffect(() => {
    if (!user) return;

    const userId = user?.orgId || user?.id;

    if (!userId) return;

    const socket = getSocket(user);

    if (!socket) return;

    const joinRoom = () => {
      if (hasJoined.current) return;

      socket.emit("join-room", userId);

      hasJoined.current = true;

      console.log("Joined room:", userId);
    };

    // already connected
    if (socket.connected) {
      joinRoom();
    } else {
      // wait for connection
      socket.once("connect", joinRoom);
    }

    return () => {
      socket.off("connect", joinRoom);
    };
  }, [user]);

  return children;
}
