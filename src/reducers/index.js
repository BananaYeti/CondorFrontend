import {combineReducers} from 'redux';

import messages from './messages';
import commands from './commands';
import authorization from './authorization';
import mechInventory from './mechInventory';

const AppReducers = combineReducers({
    messages, 
    commands,
    authorization,
    mechInventory
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
    return AppReducers(state, action);
};

export default rootReducer;