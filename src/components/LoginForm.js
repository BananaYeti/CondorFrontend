import React, { Component } from 'react';
import './LoginForm.css';
import axios from 'axios';
import auth from '../modules/auth';

class LoginForm extends Component{
    constructor(){
        super();
        this.state = {
            username:'',
            password:'',
            error:null
        }
    }

    sendForm = (event) => {
        event.preventDefault();
        console.log('sending');
        var postData = {
            username:this.state.username,
            password:this.state.password
        };

        this.setState({
            username:'',
            password:''
        })

        axios({
            method:'post',
            url:'http://localhost:8000/login',
            data:postData
        }).then((response) => {
            auth.authenticateUser(response.data.token);
        }).catch((error) => {
            auth.authenticateUser(null);
            this.setState({error: error});
        });
    }

    updateUsername = (event) => {
        this.setState({
            username:event.target.value
        });
    }
    updatePassword = (event) => {
        this.setState({
            password:event.target.value
        });
    }

    renderError(){
        if(this.state.error){
            return(<p className="error">Unable to log in</p>);
        }
        return;
    }

    render() {
        return(
        <div>
            {
                this.renderError()
            }
            <form>
                username: 
                <input autoComplete="off" 
                    autoCorrect="off" 
                    autoCapitalize="off" 
                    spellCheck="false" 
                    wrap="true"
                    cols="1"
                    type="text" 
                    className="inputArea"
                    onChange={this.updateUsername}/>
            </form>
            <form   onSubmit={this.sendForm}
                    id="passwordform">
                password: 
                <input autoComplete="off" 
                    autoCorrect="off" 
                    autoCapitalize="off" 
                    spellCheck="false" 
                    wrap="true"
                    cols="1"
                    type="password" 
                    className="inputArea"
                    onChange={this.updatePassword}/>
            </form>
        </div>
        );
    }
}

export default LoginForm;