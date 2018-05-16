import {actionTypes} from '../actions/battle';

const emptyEnemyMech = {
    name:"NO ENEMY",
    hardpoints:[]
}

const defaultState = {
    inMatch:false,
    opponentName:null,
    opponentMechInventory:emptyEnemyMech,
    needTakeTurn:false,
    turnCallback:null,
    battleLog:[]
}

const battleReducer = (state = defaultState, action) => {
    switch(action.type){

    case actionTypes.MATCH_BEGIN:
        return Object.assign({}, state, {
            inMatch:true
        });
    case actionTypes.MATCH_END:
        return Object.assign({}, state, {
            inMatch:false,
            opponentMechInventory:emptyEnemyMech
        });

    case actionTypes.TAKE_TURN:
        return Object.assign({}, state, {
            needTakeTurn:true,
            turnCallback:action.callback
        });
    case actionTypes.TOOK_TURN:
        return Object.assign({}, state, {
            needTakeTurn:false,
            turnCallback:null
        });

    case actionTypes.UPDATE_ENEMY:
        return Object.assign({}, state, {
            opponentMechInventory:action.enemy
        });

    case actionTypes.PRINT_LINE_BATTLE:
        return Object.assign({}, state, {
            battleLog: [...state.battleLog, action.text]
        });
    case actionTypes.CLEAR_MATCH_LOG:
        return Object.assign({}, state, {
            battleLog: []
        });
    
    default:
        return state
    }
}

export default battleReducer;