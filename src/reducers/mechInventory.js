import {actionTypes} from '../actions/mechInventoryActions';
import mechInventoryModule from '../modules/mechInventory';

var initialState = {
    inventory:[],
    name:'',
    chasis:null,
    hardpoints:[]
}

const mechInventory = (state = initialState, action) => {
    switch(action.type){
        //Moved all mech part movement logic to backend
        /*case actionTypes.MECH_INST_PART:
            if(mechInventoryModule.checkValidInstall(state, action.inventorySlot, action.endpoint)){
                var stateCopy = Object.assign({}, state);
                var part = stateCopy.inventory.splice(action.inventorySlot, 1)[0];
                var parentResult = mechInventoryModule.getParent(stateCopy, action.endPoint);
                parentResult.parent.hardpoints[parentResult.slot] = part;
                return stateCopy;
            }
            return state;

        case actionTypes.MECH_RMV_PART:
            var stateCopy = Object.assign({}, state);
            var part = mechInventoryModule.getPartMech(stateCopy, action.point);
            var parentResult = mechInventoryModule.getParent(stateCopy, action.point);
            parentResult.parent.hardpoints[parentResult.slot] = null;
            stateCopy.inventory = [...stateCopy.inventory, part];
            return stateCopy;

        case actionTypes.MECH_SWAP_PART:
            var stateCopy = Object.assign({},state);
            var startParentResult = mechInventoryModule.getParent(stateCopy, action.startPoint);
            var endParentResult = mechInventoryModule.getParent(stateCopy, action.endPoint);
            var startPart = mechInventoryModule.getPartMech(stateCopy, action.startPoint);            
            var endPart = mechInventoryModule.getPartMech(stateCopy, action.endPoint);
            startParentResult.parent.hardpoints[startParentResult.slot] = endPart;
            endParentResult.parent.hardpoints[endParentResult.slot] = startPart;
            return stateCopy;*/
        case actionTypes.SET_MECH:
            return action.mechInventory;
        default:
            return state;
    }
}

export default mechInventory;