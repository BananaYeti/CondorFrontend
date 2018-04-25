import React, { Component } from 'react';
import './LoginForm.css';
import axios from 'axios';
import auth from '../../modules/auth';

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            error:null
        }
    }

    sendForm = (event) => {
        event.preventDefault();
        console.log('sending');
        auth.sendLogin(this.state.username, this.state.password);
        this.setState({
            username:'',
            password:''
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