import React, {Component} from 'react'

import './Message.css'


class Message extends Component {
    render() {
        return (
            <div className={`message${this.props.isMine ? ' mine' : ''}`}>
                <div className="author-content">
                    {this.props.author}
                </div>
                <div className='message-content'>
                    {this.props.text}
                </div>
            </div>
        );
    }
}


export default Message;