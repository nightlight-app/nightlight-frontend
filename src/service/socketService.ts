import io from 'socket.io-client';
import { SERVER_URL } from '@env';

console.log('[SOCKET IO] Connecting to', SERVER_URL, '...');

export const socket = io(SERVER_URL);
