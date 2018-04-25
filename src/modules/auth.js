import {store, persistor} from '../store';
import {login, logout} from '../actions/authActions';
import axios from 'axios';

function sendLogin(username, password){
    var postData = {
        username,
        password
    };

    axios({
        method:'post',
        url:'http://localhost:8000/login',
        data:postData
    }).then((response) => {
        console.log('login succeeded');
        console.log(response);
        store.dispatch(login(response.data.user.name, response.data.token));
    }).catch((error) => {
        console.log('login failed');
        store.dispatch(logout());
    });
}

export default {
    sendLogin
};