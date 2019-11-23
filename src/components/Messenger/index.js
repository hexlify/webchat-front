import React from 'react';
import MessageList from '../MessageList'
import ConversationList from '../ConversationList'

import './Messenger.css'


export default function Messenger(props) {
    return (
        <div className="messenger">
            <div className="scrollable sidebar">
                <ConversationList />
            </div>

            <div className="scrollable content">
                <MessageList />
            </div>
        </div>
    );
}