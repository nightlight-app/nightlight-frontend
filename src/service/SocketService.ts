import io from 'socket.io-client';
import { SOCKET_IO_URL } from '@env';

console.log('[SOCKET] Connecting to', SOCKET_IO_URL);

export const socket = io(SOCKET_IO_URL);
