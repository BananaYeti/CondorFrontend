import auth from './auth';
import {store, persistor} from '../store';

import {recieveMessage} from '../actions/messageActions';

import socket from './socket';

subscribeToMessage((message) => {
    if(message.room === store.getState().messages.room){
        store.dispatch(recieveMessage(message.username, message.message));
    }
})

function switchToRoom(room){
    socket.emit('subscribe', room);
}
    
function subscribeToMessage(cb){
    socket.on('message', cb);
}

function sendMessage(room, username, message){
    socket.emit('message', {
        username,
        room,
        message
    });
}
export default {
    switchToRoom,
    subscribeToMessage,
    sendMessage
};