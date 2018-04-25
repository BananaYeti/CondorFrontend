import chat from './chat';
import {store, persistor} from '../store';

import {printLine} from '../actions/commandActions';
import {switchRoom} from '../actions/messageActions';
import {logout} from '../actions/authActions';

var commandsMap = {
    'chat':{
        func:changeChat,
        description:'Changes the chat room you\'re in',
        usage:'chat [room]'
    },
    'scrot':{
        func:screenShot,
        description:'Takes a screenshot',
        usage:'scrot'
    },
    'help':{
        func:help,
        description:'Lists all possible commands',
        usage:'help [room]'
    },
    'exit':{
        func:exit,
        description:'logs out of condor',
        usage:'exit'
    }
}

function print(line){
    store.dispatch(printLine(line));
}

function processCommand(command, commandArray){
    if(commandsMap[command]){
        commandsMap[command].func(commandArray);
    } else {
        print('Command not found');
    }
}

//All command functions are given args which come after command


function changeChat(args){
    if(args.length == 1){
        var newRoom = args[0]
        store.dispatch(switchRoom(newRoom));
        print('Switched to new room');
    } else {
        print('Not valid use of command');
    }
}

function screenShot(args){
    //Awkward to do this way...
}

function help(args){
    for (var command in commandsMap){
        if(commandsMap.hasOwnProperty(command)){
            print(command + ' - ' + commandsMap[command].description);
        }
    }
}

function exit(){
    store.dispatch(logout());
}

export default {
    processCommand
}