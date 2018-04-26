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
            <MechDisplay/>
        </div>
        )
    }
}

export default GameLayout;
