import React, {Component} from 'react'

import './Message.css'


class Message extends Component {
    render() {
        return (
            <div className={`message ${this.props.isMine ? 'mine' : ''}`}>
                <div className="bubble-container">
                    <div className="author">
                        {this.props.author}
                    </div>
                    <div className="text">
                        {this.props.text}
                    </div>
                </div>
            </div>
        );
    }
}


export default Message;