import chat from './chat';
import {store, persistor} from '../store';
import axios from 'axios';

import {printLine, clear} from '../actions/commandActions';
import {logout} from '../actions/authActions';
import {swapPart, installPart, removePart, setMech} from '../actions/mechInventoryActions';
import {endMatch} from '../actions/battle';

import mech from '../modules/mechInventory';
import battle from '../modules/battle';

import config from '../config';

var commandsMap = {
    'fight':{
      func:enterBoutList,
      description:'Enters the bout list and waits for an opponent',
      usage:'fight'
    },
    'forfit':{
        func:forfitMatch,
        description:'Focefully leave the match',
        usage:'forfit'
    },
    'give':{
      func:givePartCmd,
      description:'Gives a part to another player',
      usage:'give [inv-slot] [player]'
    },
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
    },
    'inventory':{
        func:inventory,
        description:'Shows your inventory',
        usage:'inventory'
    },
    'part':{
        func:getPart,
        description:'gets the part dingus',
        usage:'part [number]'
    },
    'mkpart':{
        func:mkPartCmd,
        description:'makes the part dingus',
        usage:'mkpart [number]'
    },
    'mv':{
        func:mvPartCmd,
        description:'Moves a part frome one point to another',
        usage:'mv [hardpoint] [hardpoint]'
    },
    'inst':{
        func:instPartCmd,
        description:'Installs a part onto the mech',
        usage:'inst [inv-slot] [hardpoint]'
    },
    'rm':{
        func:rmvPartCmd,
        description:'Removes a part from the mech',
        usage:'rm [partslot]'
    },
    'mech':{
        func:updateMech
    },
    'stat':{
        func:statCommand,
        description:'gets the stats of a part in the inventory or on the mech',
        usage:'stat [invSlot or label]'
    },
    'credits':{
        func:getCredits,
        description:'lists how many credits you currently have'
    },
    'clear':{
        func:clearScreen,
        description:'Clears the screen',
        usage:'clear'
    },
    'pay':{
        func:payCredits,
        description:"pays a user a certain ammount of credits",
        usage:"pay [username] [credit ammount]"
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

function clearScreen(){
    store.dispatch(clear());
}

function enterBoutList(args) {
    battle.matchmake();
}

function changeChat(args){
    if(args.length === 1){
        var newRoom = args[0]
        chat.switchToRoom(newRoom);
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

function inventory(args){
    var counter = 0;
    var state = store.getState();
    console.log(state.mechInventory);
    for (var item in state.mechInventory.inventory){
        print(counter + ' - ' + state.mechInventory.inventory[item].name);
        counter++;
    }
}

function labelToIndex(label){
    if(label == null || label.length != 2){
        return null
    }
    label = label.toUpperCase();
    var letter = label.charCodeAt(0) - 'A'.charCodeAt(0);
    var number = label.charCodeAt(1) - '0'.charCodeAt(0);
    return letter * 10 + number;
}

function getPart(args){
    if(args.length != 1){
        print('Invalid use of command');
    }
    var mechInventory = store.getState().mechInventory;
    var part = mech.getPoint(mechInventory, labelToIndex(args[0]));
    console.log(part);
    print(part?part:"EMPTY");
}

function getParent(args){
    var mechInventory = store.getState().mechInventory;
    var parent = mech.getParent(mechInventory, labelToIndex(args[0]));
    print(parent.parent.name + ' ' + parent.slot);
}

function mkPartCmd(args){
    if(args.length!=1||isNaN(args[0])){
        print('error - command used improperly');
        print(commandsMap.mkpart.usage);
        return;
    }

    axios({
        method:'post',
        url:config.backendUrl + '/mkPart',
        headers:{'x-access-token':store.getState().authorization.token},
        data:{
            numAdj:args[0]
        }
    }).then((response) => {
        store.dispatch(setMech(response.data));
    }).catch((error) => {
        print('error - command used improperly');
        print(commandsMap.mkpart.usage);
     });
}

function mvPartCmd(args){
    var mechInventory = store.getState().mechInventory;

    try{
        var point = mech.getPoint(mechInventory,labelToIndex(args[0]));
        var endPoint = mech.getPoint(mechInventory,labelToIndex(args[1]));
    } catch(err) {
        print('error - command used improperly');
        print(commandsMap.mv.usage);
        return;
    }
    if(point && endPoint){
        axios({
            method:'post',
            url:config.backendUrl +'/mvPart',
            headers:{'x-access-token':store.getState().authorization.token},
            data:{
                point:point,
                endPoint:endPoint
            }
        }).then((response) => {
            store.dispatch(setMech(response.data));
        }).catch((error) => {
            print('error - command used improperly');
            print(commandsMap.mv.usage);
        });
    } else {
        print('error - command used improperly');
        print(commandsMap.mv.usage);
    }
}

function givePartCmd(args){
    var mechInventory = store.getState().mechInventory;

    var invSlot = args[0];

    var index = labelToIndex(args[1]);
    if(!invSlot){
        print('error - command used improperly');
        print(commandsMap.give.usage);
        return;
    }
    axios({
        method:'post',
        url:config.backendUrl + '/givePart',
        headers:{'x-access-token':store.getState().authorization.token},
        data:{
            slot:invSlot,
            player:args[1]
        }
    }).then((response) => {
        store.dispatch(setMech(response.data));
    }).catch((error) => {
        print('error - command used improperly');
        print(commandsMap.rm.usage);
     });
}

function rmvPartCmd(args){
    var mechInventory = store.getState().mechInventory;

    var index = labelToIndex(args[0]);
    var point = mech.getPoint(mechInventory,index);
    if(!point){
        print('error - command used improperly');
        print(commandsMap.rm.usage);
        return;
    }

    axios({
        method:'post',
        url:config.backendUrl + '/rmPart',
        headers:{'x-access-token':store.getState().authorization.token},
        data:{
            point
        }
    }).then((response) => {
        store.dispatch(setMech(response.data));
    }).catch((error) => {
        print('error - command used improperly');
        print(commandsMap.rm.usage);
     });
}

function instPartCmd(args){
    var mechInventory = store.getState().mechInventory;

    var invSlot = args[0];

    var index = labelToIndex(args[1]);
    var point = mech.getPoint(mechInventory,index);
    if(!point || !invSlot){
        print('error - command used improperly');
        print(commandsMap.rm.usage);
        return;
    }

    axios({
        method:'post',
        url:config.backendUrl +'/instPart',
        headers:{'x-access-token':store.getState().authorization.token},
        data:{
            invSlot:args[0],
            point
        }
    }).then((response) => {
        store.dispatch(setMech(response.data));
    }).catch((error) => {
        console.log('bad');
    });
}

function statCommand(args){
    var mechInventory = store.getState().mechInventory;
    var pointer = args[0];
    var part = null;
    if(!isNaN(pointer)){
        part = mechInventory.inventory[pointer];
    } else {
        var index = labelToIndex(args[0]);
        part = mech.getPartMech(mechInventory, index);
    }
    print('name: ' + part.name);
    for(var adjective of part.adjectives){
        for(var stat in adjective.stats){
            part.noun.stats[stat] += adjective.stats[stat];
        }
    }
    for(var stat in part.noun.stats){
        var value = part.noun.stats[stat];
        if(value != 0){
            print(value + '\t' + stat);
        }
    }

    console.log(part);
}

function updateMech(){
    var mechInventory = store.getState().mechInventory;
    axios({
        method:'get',
        url:config.backendUrl + '/myMech',
        headers:{'x-access-token':store.getState().authorization.token},
    }).then((response) => {
        store.dispatch(setMech(response.data));
    }).catch((error) => {
        console.log('bad');
    });
}

function payCredits(args){
    var username = args[0];
    var value = args[1];
    if(isNaN(value)){
        print('error - command used improperly');
        print(commandsMap.pay.usage);
        return;
    }
    value = parseInt(value);
    if(value < 0){
        print("I see what you're trying to do...");
        return;
    }

    axios({
        method:'post',
        url:config.backendUrl + '/sendCredits',
        headers:{'x-access-token':store.getState().authorization.token},
        data:{
            username,
            value
        }
    }).then((response) => {
        print(response.data);
    }).catch((error) => {
        if(error){
            print(error.response.data);
        }
    });
}

function getCredits(args){
    axios({
        method:'get',
        url:config.backendUrl + '/getCredits',
        headers:{'x-access-token':store.getState().authorization.token},
    }).then((response) => {
        console.log(response.data);
        print(response.data);
    }).catch((error) => {
        if(error){
            print('error - failed');
            console.log(error);
        }
    });    
}

function forfitMatch(){
    store.dispatch(endMatch());
}

function exit(){
    store.dispatch(logout());
}

export default {
    processCommand,
    updateMech,
    labelToIndex
}
