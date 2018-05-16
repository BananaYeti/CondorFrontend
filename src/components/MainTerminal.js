import {connect} from 'react-redux';
import {submitCommand} from '../actions/commandActions';

import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import commands from '../modules/commands';

class MainTerminal extends Component {
    constructor(){
        super();
        console.log(this);
        this.pre = 'foo@bar:~$ ';
        this.state={
            newtermline:'',
            oldCommand:0
        };
        commands.updateMech();
    }

    takeScreenShot = (e) => {
        html2canvas(document.body).then(function(canvas) {
            var img    = canvas.toDataURL("image/png");
            var a = document.createElement('a');
            a.href = img;
            a.download =  img;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    updatenewtermline = (e) => {
        this.setState({newtermline:e.target.value});
    }

    submitCommand = (e) => {
        e.preventDefault();

        var commandArray = this.state.newtermline.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
        var command = commandArray[0];
        if(command === 'scrot'){
            this.takeScreenShot(e);
            return;
        }
        commandArray.shift();
        this.props.submitCommand(this.pre + this.state.newtermline, command, commandArray);
        commands.processCommand(command, commandArray);
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
        if(e.key === "ArrowUp"){
            var oc = this.state.oldCommand + 1
            if(oc < this.props.commands.length){
                var command = this.props.commands[this.props.commands.length - oc];
                console.log(command.command + ' ' +command.args.join(' '))
                this.setState({
                    newtermline:command.command + ' ' +command.args.join(' '),
                    oldCommand:oc
                });
            }
        } else if (e.key === "ArrowDown"){
            var oc = this.state.oldCommand - 1
            if(oc > 0){
                var command = this.props.commands[this.props.commands.length - oc];
                console.log(command.command + ' ' +command.args.join(' '))
            } 
            if ( oc >= 0 ){
                this.setState({
                    newtermline:oc==0?'':command.command + ' ' +command.args.join(' '),
                    oldCommand:oc
                });
            }
        } else {
            this.setState({
                oldCommand:0
            });
        }
    }

    render() {
    this.pre = this.props.username + "@rig:~$ "
    return (
        <label htmlFor="command_line">
            <div className="game term">
                <h1>CONDOR 2049</h1>
                <p>Welcome, contestant {this.props.username}</p>
                {
                    this.props.lines.map((line, index) =>
                        <p key={index}>{line}</p>
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
    lines:state.commands.stdOut,
    commands:state.commands.commands,
    username:state.authorization.username,
})

const mapDispatchToProps = dispatch => ({
    submitCommand: (fullText, command, args) => dispatch(submitCommand(fullText, command, args))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainTerminal);
