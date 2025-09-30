// export const socket = global.io();

import { io } from 'socket.io-client';

export const createSocket = userId => io({ query: { userId } });
