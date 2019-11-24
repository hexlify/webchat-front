import React, {Component} from 'react';
import MessageList from '../MessageList'
import ConversationList from '../ConversationList'
import MessageInput from '../MessageInput'

import './Messenger.css'

var initialMessages = [
    {
      author: 'Webchat',
      text: 'Hello there! You can now chat with strangers!',
      isMine: false
    },
    {
        author: 'Webchat',
        text: 'Good luck',
        isMine: false
      }
]


class Messenger extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: initialMessages
        };

        this.submitMessage = this.submitMessage.bind(this);
    }

    submitMessage(text) {
        const message = {
            author: null,
            text: text,
            isMine: true
        };
        this.setState({
            messages: [...this.state.messages, message]
        });
    }

    render() {
        return (
            <div className="messenger">
                <div className="scrollable left-sidebar">
                    <ConversationList />
                </div>

                <div className="scrollable content">
                    <MessageList messages={this.state.messages}/>
                </div>

                <div className="bottom-bar">
                    <MessageInput onSubmitMessage={this.submitMessage} />
                </div>
            </div>
        );
    }
}


export default Messenger;