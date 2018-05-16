import {connect} from 'react-redux';
import {submitCommand} from '../actions/commandActions';

import battleCommands from '../modules/battlePrompt';

import React, { Component } from 'react';

class BattleTerminal extends Component {
    constructor(){
        super();
        console.log(this);
        this.pre = 'COMBAT: ';
        this.state={
            newtermline:'',
        };
    }

    updatenewtermline = (e) => {
        this.setState({newtermline:e.target.value});
    }

    submitCommand = (e) => {
        e.preventDefault();

        var commandArray = this.state.newtermline.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
        var command = commandArray[0];
        commandArray.shift();

        battleCommands.processBattleCommand(command, commandArray);
        this.setState({
            newtermline:''
        });
    }

    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
      this.scrollToBottom();
    }

    componentDidUpdate() {
      this.scrollToBottom();
    }

    handleKeyDown = (e) => {
    }

    render() {
    return (
        <label htmlFor="command_line">
            <div className="game term">
                {
                    this.props.lines.map((line, index) =>
                        (<p key={index}>{line}</p>)
                    )
                }
                <form onSubmit={this.submitCommand}>
                    <pre>{this.pre}<input autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            id="command_line"
                            type="text"
                            className="commandInputArea"
                            value={this.state.newtermline}
                            onChange={this.updatenewtermline}
                            onKeyDown={this.handleKeyDown}/>
                    </pre>
                </form>
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        </label>
    );
    }
}

const mapStateToProps = state => ({
    lines:state.battle.battleLog,
    takeTurn:state.battle.needTakeTurn,
    turnCallback:state.battle.turnCallback
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(BattleTerminal);
