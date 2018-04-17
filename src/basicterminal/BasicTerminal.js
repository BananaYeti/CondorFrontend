import React, { Component } from 'react';
import './BasicTerminal.css';

class BasicTerminal extends Component {
    constructor(){
        super();
        console.log(this);
        this.state={
            lines:[],
            newline:''
        };
    }
    updateNewLine = (e) => {
        console.log(e.target.value);
        this.setState({newline:e.target.value});
    }
    addLine = (e) => {
        e.preventDefault();
        console.log(this.state.newline);
        this.setState({
            lines:[...this.state.lines, 'foo@bar:~$ ' + this.state.newline],
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
                    <form onSubmit={this.addLine}>
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
