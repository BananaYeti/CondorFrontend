import chat from './chat';
import {store, persistor} from '../store';
import axios from 'axios';

import {printLine} from '../actions/commandActions';
import {switchRoom} from '../actions/messageActions';
import {logout} from '../actions/authActions';
import {swapPart, installPart, removePart} from '../actions/mechInventoryActions';

import mech from '../modules/mechInventory';

var commandsMap = {
    'fight':{
      func:enterBoutList,
      description:'Enter the bout list and wait for an opponent',
      usage:'fight'
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
    'parent':{
        func:getParent,
        description:'gets the part which a part is attached to',
        usage:'parent [part label]'
    },
    'swap':{
        func:swapPartCmd,
        description:'Swaps two parts on the mech',
        usage:'swap [hardpoint] [hardpoint]'
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

function enterBoutList(args) {
  axios({
      method:'post',
      url:'http://18.220.152.168:80/matchmaking',
      data:{_id:store.getState().authorization.username}
  }).then((response) => {
      console.log('bout entered');
      console.log(response);
  }).catch((error) => {
      console.log('bad');
  });
}

function changeChat(args){
    if(args.length === 1){
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
    label = label.toUpperCase();
    var letter = label.charCodeAt(0) - 'A'.charCodeAt(0);
    var number = label.charCodeAt(1) - '0'.charCodeAt(0);
    return letter * 10 + number;
}

function getPart(args){
    var mechInventory = store.getState().mechInventory;
    var part = mech.getPartMech(mechInventory, labelToIndex(args[0]));
    console.log(part);
    print(part?part.name:"EMPTY");
}

function getParent(args){
    var mechInventory = store.getState().mechInventory;
    var parent = mech.getParent(mechInventory, labelToIndex(args[0]));
    print(parent.parent.name + ' ' + parent.slot);
}

function swapPartCmd(args){
    var mechInventory = store.getState().mechInventory;
    var pointA = labelToIndex(args[0]);
    var pointB = labelToIndex(args[1]);
    var partA = mech.getPartMech(mechInventory, pointA);
    var partB = mech.getPartMech(mechInventory, pointB);
    if(partA.hardpoints || partB.hardpoints){
        print('Cannot swap parts with sub-modules attached');
    } else {
        store.dispatch(swapPart(pointA, pointB));
    }
}

function rmvPartCmd(args){
    var point = labelToIndex(args[0]);

    var mechInventory = store.getState().mechInventory;
    var partA = mech.getPartMech(mechInventory, point);
    if(partA && partA.hardpoints){
        print('Cannot remove parts with sub-modules attached');
    } else {
        store.dispatch(removePart(point));
    }
}

function instPartCmd(args){
    var invslot = args[0];
    var mechpoint = labelToIndex(args[1]);
    store.dispatch(installPart(invslot,mechpoint));
}

function exit(){
    store.dispatch(logout());
}

export default {
    processCommand
}
