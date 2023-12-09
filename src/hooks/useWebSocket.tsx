import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const BASE_URL = 'http://localhost:4000';

interface UseWebSocketProps {
  token: string | null;
  userId: number | undefined;
}

const useWebSocket = ({ token, userId }: UseWebSocketProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (token) {
      const newSocket = io(BASE_URL, {
        auth: { userId },
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [token]);

  return socket;
};

export default useWebSocket;