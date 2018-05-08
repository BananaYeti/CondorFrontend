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
            newtermline:''
        };
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

    render() {
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
                    <pre>foo@bar:~$ <input autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            id="command_line"
                            type="text"
                            className="commandInputArea"
                            value={this.state.newtermline}
                            onChange={this.updatenewtermline}/>
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
    username:state.authorization.username
})

const mapDispatchToProps = dispatch => ({
    submitCommand: (fullText, command, args) => dispatch(submitCommand(fullText, command, args))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainTerminal);
