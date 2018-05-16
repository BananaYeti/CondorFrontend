import {store, persistor} from '../store';

import {endMatch} from '../actions/battle';

import battle from '../modules/battle';

import config from '../config';

var commandsMap = {
    'forfit':{
        func:forfitMatch,
        description:'Focefully leave the match',
        usage:'forfit'
    },
}

function processBattleCommand(command, commandArray){
    if(commandsMap[command]){
        commandsMap[command].func(commandArray);
    } else {
    }
}

function forfitMatch(){
    battle.forfit();
}

export default {
    processBattleCommand,
}
