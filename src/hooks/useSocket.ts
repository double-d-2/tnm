import { useRef } from "react";

export const useSocket = (url: string) => {
  const socketRef = useRef<WebSocket | null>(null);

  if (!socketRef.current) {
    socketRef.current = new WebSocket(url);
  }

  return socketRef.current;
};
