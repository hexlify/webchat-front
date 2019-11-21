import React, {Component} from 'react'


class ChatMessage extends Component {
    render() {
        return (
        <div className="chatMessage">
            <p>
                <strong>{this.props.author} <em>{this.props.message}</em></strong>
            </p>
        </div>
        );
    }
}


export default ChatMessage;