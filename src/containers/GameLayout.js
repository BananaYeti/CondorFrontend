import React, {Component} from 'react';

import MainTerminal from '../components/MainTerminal';
import ChatWindow from '../components/chat/ChatWindow';

class GameLayout extends Component{
    render(){
        return(
        <div id="gameLayout">
            <MainTerminal/>
            <ChatWindow/>
        </div>
        )
    }
}

export default GameLayout;