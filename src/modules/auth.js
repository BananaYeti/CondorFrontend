import {store, persistor} from '../store';
import {login, logout} from '../actions/authActions';
import axios from 'axios';

import config from '../config';

function sendLogin(username, password, cb){
    var postData = {
        username,
        password
    };
    console.log('logging in' + username)
    axios({
        method:'post',
        url:config.backendUrl + '/login',
        data:postData
    }).then((response) => {
        console.log('login succeeded');
        console.log(response);
        store.dispatch(login(response.data.user.name, response.data.token));
        cb(true);
    }).catch((error) => {
        console.log('login failed');
        store.dispatch(logout());
        cb(false);
    });
}

function sendRegister(username, password){
    var postData = {
        username,
        password
    };
    console.log('logging in' + username)
    axios({
        method:'post',
        url:config.backendUrl + '/register',
        data:postData
    }).then((response) => {
        console.log('login succeeded');
        console.log(response);
        //store.dispatch(login(response.data.user.name, response.data.token));
    }).catch((error) => {
        console.log('login failed');
        store.dispatch(logout());
    });
}

export default {
    sendLogin,
    sendRegister
};
