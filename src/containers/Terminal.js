import React, { Component } from 'react';
import './Terminal.css';
import auth from '../modules/auth';
import LoginForm from '../components/LoginForm';

class BasicTerminal extends Component {
    constructor(){
        super();
        var child = null;
        if(auth.getToken()){
            console.log('entering login mode...');
            child = (<LoginForm/>);
        }
        this.state = {
            child:child
        }
    }

    render(){
        return (
            <div className="frame">
            <div className="piece output">
                {this.state.child}
                <div className="piece scanlines noclick"/>
                <div className="piece glow noclick"/>            
            </div>
            </div>
        );
    }
}

export default BasicTerminal;
