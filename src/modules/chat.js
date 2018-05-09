import auth from './auth';
import {store, persistor} from '../store';

import {recieveMessage, switchRoom} from '../actions/messageActions';

import {chatSocket} from './socket';

subscribeToMessage((message) => {
  console.log(message);
  store.dispatch(recieveMessage(message.username, message.message));
});

function switchToRoom(room){
    chatSocket.emit('join', room, () => {
      store.dispatch(switchRoom(room));
      store.dispatch(recieveMessage('INFO', 'You have joined <' + room + '>'))
    });
}

function subscribeToMessage(cb){
  chatSocket.on('broadcast', cb);
}

function sendMessage(room, username, message){
    chatSocket.emit('message', {
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
