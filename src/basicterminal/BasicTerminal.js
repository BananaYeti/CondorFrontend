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
            termLines:[],
            newtermline:'',
            chatLines:[],
            newchatline:''
        };
        socketApi.subscribeToMessage(
            (message) => {
                this.writeChatLines(['Message: ' + message]);
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

    updatenewtermline = (e) => {
        this.setState({newtermline:e.target.value});
    }

    updatenewchatline = (e) => {
        this.setState({newchatline:e.target.value});
    }

    writeChatLines = (lines) => {
            this.setState({
                chatLines:[...this.state.chatLines, ...lines]
            });
    }

    writeTermLines = (lines) => {
            this.setState({
                termLines:[...this.state.termLines, ...lines]
            });
    }


    submitMessage = (e) => {
        e.preventDefault();
        socketApi.sendMessage(this.state.newchatline);
        this.setState({
            newchatline:''
        });
    }

    submitCommand = (e) => {
        e.preventDefault();
        var commandArray = this.state.newtermline.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
        switch(commandArray[0]) {
            case this.commandList.say:
                this.writeTermLines([this.pre + this.state.newtermline]);
                if (commandArray[1]) {
                    socketApi.sendMessage(commandArray[1]);
                }
                break;
            case this.commandList.scrot:
                this.takeScreenShot();
                this.writeTermLines([this.pre + this.state.newtermline]);
                break;
            case this.commandList.help:
                this.writeTermLines([this.pre + this.state.newtermline, 'Commands: ', ...Object.keys(this.commandList)]);
                break;
            default:
                this.writeTermLines([this.pre + this.state.newtermline, commandArray[0] + ' is not an operable command']);
        }
        this.setState({
            newtermline:''
        });
    }
    render() {
    return (
        <div className="frame">
                <div className="piece output">
                    <label htmlFor="command_line">
                        <div className="term">
                            <h1>CONDOR 2049</h1>
                            <p>Welcome, contestant #F2A44D3E</p>
                            {
                                this.state.termLines.map(
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
                                        className="inputArea"
                                        value={this.state.newtermline}
                                        onChange={this.updatenewtermline}/>
                            </form>
                        </div>
                    </label>
                    <div className="chat">
                        {
                            this.state.chatLines.map(
                                (line, index) => 
                                <p key={index}>{line}</p>
                            )
                        }
                        <form onSubmit={this.submitMessage}>
                        Say: <input autoComplete="off" 
                                    autoCorrect="off" 
                                    autoCapitalize="off" 
                                    spellCheck="false" 
                                    wrap="true"
                                    cols="1"
                                    id="chat_line" 
                                    type="text" 
                                    className="inputArea"
                                    value={this.state.newchatline}
                                    onChange={this.updatenewchatline}/>
                        </form>
                    </div>
                </div>
            

            <div className="piece scanlines noclick"></div>
            <div className="piece glow noclick"></div>
        </div>
    );
    }
}

export default BasicTerminal;
