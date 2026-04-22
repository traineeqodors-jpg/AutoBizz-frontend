"use client";


import { getSocket } from "@/lib/socket";
import { useEffect, useRef } from "react";


export default function SocketProvider({ user, children }) {
  const userId = user?.orgId || user?.id;

  if (user?.role === "employee") return children;

  const hasJoined = useRef(false);

  useEffect(() => {
    if (!userId) return;

    const socket = getSocket(user);

    if (!hasJoined.current) {
      socket.emit("join-room", userId);
      hasJoined.current = true;

      console.log("Joined room:", userId);
    }
  }, [userId]);

  return children;
}
