import {connect} from 'react-redux';

import React, {Component} from 'react';

import MainTerminal from '../components/MainTerminal';
import ChatWindow from '../components/chat/ChatWindow';
import MechDisplay from '../components/mech/MechDisplay';

class GameLayout extends Component{
    render(){
        return(
        <div id="gameLayout">
            <MainTerminal/>
            <ChatWindow/>
            <MechDisplay mechInventory={this.props.mechInventory}/>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    inMatch:state.battle.inMatch,
    mechInventory:state.mechInventory
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GameLayout);
