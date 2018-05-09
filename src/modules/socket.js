import openSocket from 'socket.io-client';
import config from '../config';

export const chatSocket = openSocket(config.backendUrl + '/chat');
