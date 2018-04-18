import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

/*
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}
*/

function sendMessage(msg) {
	socket.emit('message', msg);
}

function subscribeToMessage(cb) {
	socket.on('message', message => cb(message));
}

export default { sendMessage, subscribeToMessage };