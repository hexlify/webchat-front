import React, {Component} from 'react'
import Message from '../Message'
import MessageInput from '../MessageInput'

import './MessageList.css'


class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };

        this.addMessage = this.addMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }

    addMessage(message) {
        this.setState({
            messages: [...this.state.messages, message]
        });
    }

    submitMessage(text) {
        const message = {
            text: text,
            isMine: true
        };
        this.addMessage(message);
    }

    render() {
        return (
            <div>
                <div className="message-list-container">
                    {this.state.messages.map((message, i) => <Message key={i} isMine={message.isMine} author={message.author} text={message.text}/>)}
                </div>

                <MessageInput onSubmitMessage={this.submitMessage} />
            </div>
        )
    }
}


export default MessageList;