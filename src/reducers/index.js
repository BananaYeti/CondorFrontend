import {combineReducers} from 'redux';

import messages from './messages';
import commands from './commands';
import authorization from './authorization';

const AppReducers = combineReducers({
    messages, 
    commands,
    authorization
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
    return AppReducers(state, action);
};

export default rootReducer;