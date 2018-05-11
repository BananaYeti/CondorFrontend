import {actionTypes} from '../actions/battle';

const defaultState = {
    inMatch:false,
    opponentName:null,
    opponentMechInventory:{
        name:"ENEMY MECH",
        hardpoints:[null,null,null]
    }
}

const battleReducer = (state = defaultState, action) => {
    switch(action.type){
    case actionTypes.MATCH_BEGIN:
        return Object.assign({}, state, {
            inMatch:true
        });
    case actionTypes.MATCH_END:
        return Object.assign({}, state, {
            inMatch:false
        });
    default:
        return state
    }
}

export default battleReducer;