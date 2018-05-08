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
            checkPassword:'',
            error:null,
            signUp:false
        }
    }

    sendForm = (event) => {
        event.preventDefault();
        console.log('sending');
        var loginForm = this;
        auth.sendLogin(this.state.username, this.state.password, function(success){
          if(!success) {
            loginForm.setState({
                password:'',
                error:'Login failed'
            });
          }
        })
    }

    signUp = (event) => {
        this.setState({
            signUp:true,
            error:null
        });
    }

    register = (event) => {
        event.preventDefault();
        if (this.state.password==this.state.checkPassword) {
            auth.sendRegister(this.state.username, this.state.password);
            this.setState({
                signUp:false,
                error:null
            });
        } else {
            this.setState({
                error:"Passwords do not match!"
            });
        }
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
    updatePassword2 = (event) => {
        this.setState({
            checkPassword:event.target.value
        });
    }

    renderError(){
        if(this.state.error){
            return(<p className="error">{this.state.error}</p>);
        }
        return;
    }

    render() {
        return(
        <div className="signIn">
            {
                this.renderError()
            }
            <div className="forms">
                <form>
                    username:
                    <input autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        wrap="true"
                        cols="1"
                        type="text"
                        className="userInputArea"
                        onChange={this.updateUsername}
                        value={this.state.username}/>
                </form>
                {this.state.signUp ?
                  (<form id="passwordform">
                      password:
                      <input autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="off"
                          spellCheck="false"
                          wrap="true"
                          cols="1"
                          type="password"
                          className="userInputArea"
                          onChange={this.updatePassword2}
                          value={this.state.checkPassword}/>
                  </form>):
                  (<div></div>)
                }
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
                        className="userInputArea"
                        onChange={this.updatePassword}
                        value={this.state.password}/>
                </form>
            </div>
            {this.state.signUp?
              (<button className="userButton" onClick={this.register}>Sign Up!</button>):
              (
                <div className="buttonDiv">
                  <button className="userButton" onClick={this.sendForm}>Sign In</button><br/>
                  <button className="userButton" onClick={this.signUp}>Sign Up</button>
                </div>
              )
            }


        </div>
        );
    }
}

export default LoginForm;
