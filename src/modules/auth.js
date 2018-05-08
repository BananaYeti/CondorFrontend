import {store, persistor} from '../store';
import {login, logout} from '../actions/authActions';
import axios from 'axios';

function sendLogin(username, password, cb){
    var postData = {
        username,
        password
    };
    console.log('logging in' + username)
    axios({
        method:'post',
        url:'http://18.220.152.168:80/login',
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
        url:'http://18.220.152.168:80/register',
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
