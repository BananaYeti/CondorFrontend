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
        case actionTypes.MECH_INST_PART:
            if(mechInventoryModule.checkValidInstall(state, action.inventorySlot, action.endpoint)){
                var inventory = state.inventory;
                inventory.splice(inventorySlot, 1);
                return Object.assign({},state,{
                    inventory:state.inventory.splice(inventorySlot,1);
                });
            }

        case actionTypes.MECH_RMV_PART:
    
        case actionTypes.MECH_SWAP_PART:
    
        default:
            return state
    }
}

export default mechInventory;