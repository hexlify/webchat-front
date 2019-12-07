import React, {Component} from 'react'
import Message from '../Message'

import './MessageList.css'


class MessageList extends Component {
      constructor(props) {
        super(props);

        this.messagesEndRef = React.createRef();
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    scrollToBottom() {
      this.messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    }

    componentDidMount() {
      this.scrollToBottom();
    }

    componentDidUpdate() {
      this.scrollToBottom();
    }

    render() {
        return (
            <div>
                <div className="message-list-container">
                    {this.props.messages.map((message, i) => <Message key={i} isMine={message.isMine} author={message.sender} text={message.content}/>)}
                </div>

                <div ref={this.messagesEndRef}>

                </div>
            </div>
        )
    }
}


export default MessageList;