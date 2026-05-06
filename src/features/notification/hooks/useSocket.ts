import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { WEBSOCKET_EVENTS } from '../constants';

// Assuming your backend runs on a specific URL. Adjust this if needed.
const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem('vibe_token');
  
  useEffect(() => {
    if (!token) {
      setError('No authentication token found for socket connection');
      return;
    }

    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socketRef.current = socket;

    socket.on(WEBSOCKET_EVENTS.CONNECT, () => {
      setIsConnected(true);
      setError(null);
      console.log('[NotificationSocket] Connected');
    });

    socket.on(WEBSOCKET_EVENTS.DISCONNECT, (reason) => {
      setIsConnected(false);
      console.log('[NotificationSocket] Disconnected:', reason);
    });

    socket.on('connect_error', (err) => {
      setError(err.message);
      setIsConnected(false);
      console.error('[NotificationSocket] Connection Error:', err);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [token]);

  return {
    socket: socketRef.current,
    isConnected,
    error,
  };
};
