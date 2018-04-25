import auth from '../modules/auth';
import axios from 'axios';

const defaultState = {
    loggedIn:false,
    username:null,
    token:null
}

const authorization = (state = defaultState, action) => {
    switch(action.type){
        case 'LOGIN':
            return Object.assign({},state, {
                loggedIn:true,
                username:action.username,
                token:action.token
            })
        case 'LOGOUT':
            return Object.assign({},state, {
                loggedIn:false,
                username:undefined,
                password:undefined
            });
        default:
            return state;
    }
}

export default authorization;