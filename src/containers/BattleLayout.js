import {connect} from 'react-redux';

import React, {Component} from 'react';

import BattleTerminal from '../components/BattleTerminal';
import ChatWindow from '../components/chat/ChatWindow';
import MechDisplay from '../components/mech/MechDisplay';

class BattleLayout extends Component{
    render(){
        return(
        <div id="gameLayout" className="battle">
            <BattleTerminal/>
            <ChatWindow/>
            <MechDisplay mechInventory={this.props.mechInventory}/>
            <MechDisplay enemy='true' mechInventory={this.props.opponentMechInventory}/>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    inMatch:state.battle.inMatch,
    mechInventory:state.mechInventory,
    opponentMechInventory:state.battle.opponentMechInventory
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(BattleLayout);
