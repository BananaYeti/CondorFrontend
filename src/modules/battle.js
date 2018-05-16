import auth from './auth';
import {store, persistor} from '../store';

import {printLine, clear} from '../actions/commandActions';
import {beginMatch, takeTurn, tookTurn, updateEnemy, endMatch, battleLog, clearBattleLog} from '../actions/battle';

import {matchSocket} from './socket';

matchSocket.on('joinedMatch', (gameObject) => {
    store.dispatch(clearBattleLog());
    store.dispatch(battleLog("You've joined a match"));
    store.dispatch(battleLog("Waiting for opponent..."));
    store.dispatch(beginMatch());
});

matchSocket.on('turn', (message, ack) => {
    store.dispatch(printLine(message));
    store.dispatch(takeTurn(function(response){
        store.dispatch(tookTurn());
        ack(response);
    }));
});

matchSocket.on('matchEnded', () => {
    store.dispatch(endMatch());
    store.dispatch(printLine('match ended'));
});

matchSocket.on('enemyMech', (mech) => {
    store.dispatch(updateEnemy(mech));
});

matchSocket.on('matchMessage', (message) => {
    store.dispatch(printLine(message));
});

function matchmake(){
    matchSocket.emit('matchmake', store.getState().authorization.token);
}

function forfit(){
    matchSocket.emit('forfit');
}

export default {
    matchmake,
    forfit
};
