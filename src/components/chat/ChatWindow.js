import {connect} from 'react-redux';
import React, {Component} from 'react';
import {sendMessage} from '../../actions/messageActions';

import chat from '../../modules/chat';

class ChatWindow extends Component{
    constructor(){
        super();
        this.state = {
            nextMessage:''
        }
    }

    submitMessage = (event) => {
        event.preventDefault();
        chat.sendMessage(this.props.chat, this.props.username, this.state.nextMessage);
        this.setState({
            nextMessage:''
        });
    }

    updateNextMessage = (event) =>{
        event.preventDefault();
        this.setState({
            nextMessage:event.target.value
        })
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

    render(){
    return (
      <label htmlFor="chat_line">
          <div className="game chat">
          {
              this.props.messages.map((line, index) => (
                  <p key={index}>{line.username}: {line.text}</p>
              ))
          }
          <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
          </div>
          </div>
          <div className="messagebox">
              <form onSubmit={this.submitMessage}>
                  Say: <input
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      wrap="true" cols="1"
                      id="chat_line"
                      type="text"
                      className="inputArea"
                      value={this.state.nextMessage}
                      onChange={this.updateNextMessage}/>
              </form>
          </div>
      </label>
    );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return({
    chat:state.messages.room,
    messages:state.messages.messages,
    username:state.authorization.username
});
}

const mapDispatchToProps = dispatch => ({
    sendMessage: (username,message) => dispatch(sendMessage(username,message))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
