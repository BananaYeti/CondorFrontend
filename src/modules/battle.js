import auth from './auth';
import {store, persistor} from '../store';

import {printLine} from '../actions/commandActions';
import {beginMatch} from '../actions/battle';

import {matchSocket} from './socket';

matchSocket.on('joinedMatch', (gameObject) => {
    store.dispatch(printLine('Joined match'));
    store.dispatch(beginMatch());
});

matchSocket.on('matchMessage', (message) => {
    store.dispatch(printLine(message));    
});

function matchmake(){
    matchSocket.emit('matchmake', store.getState().authorization.token);
}

export default {
    matchmake
};
