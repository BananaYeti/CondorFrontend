import React, { Component } from 'react';
import './BasicTerminal.css';
import socketApi from '../api';
import html2canvas from 'html2canvas';

class BasicTerminal extends Component {
    constructor(){
        super();
        console.log(this);
        this.pre = 'foo@bar:~$ ';
        this.commandList = {
            say:'say',
            scrot:'scrot',
            help:'help'
        };
        this.state={
            lines:[],
            newline:''
        };
        socketApi.subscribeToMessage(
            (message) => {
                this.writeLines(['Message: ' + message]);
            });
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
    updateNewLine = (e) => {
        //console.log(e.target.value);
        this.setState({newline:e.target.value});
    }
    writeLines = (lines) => {
            this.setState({
                lines:[...this.state.lines, ...lines]
            });
    }
    submitCommand = (e) => {
        e.preventDefault();
        var commandArray = this.state.newline.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
        switch(commandArray[0]) {
            case this.commandList.say:
                this.writeLines([this.pre + this.state.newline]);
                if (commandArray[1]) {
                    socketApi.sendMessage(commandArray[1]);
                }
                break;
            case this.commandList.scrot:
                this.takeScreenShot();
                this.writeLines([this.pre + this.state.newline]);
                break;
            case this.commandList.help:
                this.writeLines([this.pre + this.state.newline, 'Commands: ', ...Object.keys(this.commandList)]);
                break;
            default:
                this.writeLines([this.pre + this.state.newline, commandArray[0] + ' is not an operable command']);
        }
        //socketApi.sendMessage(this.state.newline);
        this.setState({
            newline:''
        });
    }
    render() {
    return (
        <div className="frame">
            <label htmlFor="command_line">
                <div className="piece output">
                    <h1>CONDOR 2049</h1>
                    <p>Welcome, contestant #F2A44D3E</p>
                    {
                        this.state.lines.map(
                            (line, index) => 
                            <p key={index}>{line}</p>
                        )
                    }
                    <form onSubmit={this.submitCommand}>
                    foo@bar:~$ <input autoComplete="off" 
                                autoCorrect="off" 
                                autoCapitalize="off" 
                                spellCheck="false" 
                                id="command_line" 
                                type="text" 
                                className="command_line"
                                value={this.state.newline}
                                onChange={this.updateNewLine}/>
                    </form>
                </div>
            </label>
            <div className="piece scanlines noclick"></div>
            <div className="piece glow noclick"></div>
        </div>
    );
    }
}

export default BasicTerminal;
