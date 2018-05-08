import {connect} from 'react-redux';

import React, { Component } from 'react';

import auth from '../modules/auth';
import LoginForm from '../components/login/LoginForm';
import './Terminal.css';
import GameLayout from './GameLayout';

class Terminal extends Component {
    render(){
        return (
            <div className="frame">
            <div className="piece output">
                {
                    this.props.authorized?(<GameLayout/>):<LoginForm/>
                }
                <div className="piece scanlines noclick"/>
                <div className="piece glow noclick"/>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authorized:state.authorization.loggedIn
});

export default connect(mapStateToProps)(Terminal);
