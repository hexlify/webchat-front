import React, {Component} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'

import MessageList from '../MessageList';
import ConversationList from '../ConversationList';
import MessageInput from '../MessageInput';

import './Messenger.css';

var initialMessages = [
    {
        sender: 'Webchat',
        content: 'Hello there! You can now chat with strangers! Good luck',
        isMine: false
    }
]

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class Messenger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: initialMessages
        };

        this.username = 'User' + getRandomInt(10);

        this.onConnected = this.onConnected.bind(this);
        this.onError = this.onError.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onMessageReceived = this.onMessageReceived.bind(this);

        let socket = new SockJS('https://webchat-backend.herokuapp.com/ws');
        this.client = Stomp.over(socket);
        this.client.connect({}, this.onConnected, this.onError);
    }

    onConnected() {
        this.client.subscribe('/topic/public', this.onMessageReceived);
        this.client.send(
            '/app/chat/addUser',
            {},
            JSON.stringify({sender: this.username, type: 'Join'})
        );
    }

    onError(error) {
        let errorChatMessage =     {
            sender: 'Webchat',
            content: error,
            isMine: false
        };

        this.setState({
            messages: [...this.state.messages, errorChatMessage]
        });
    }

    sendMessage(text) {
        let chatMessage = {
            sender: this.username,
            content: text,
            type: 'Chat'
        };
        this.client.send('/app/chat/sendMessage', {}, JSON.stringify(chatMessage));

        chatMessage.isMine = true;
        this.setState({
            messages: [...this.state.messages, chatMessage]
        });
    }

    onMessageReceived(payload) {
        let chatMessage = JSON.parse(payload.body);

        if (chatMessage.sender === this.username) {
            return;
        }

        if (chatMessage.type === 'Join') {
            chatMessage.content = 'Entered the room';
        }

        if (chatMessage.type === 'Leave') {
            chatMessage.content = 'Left the room';
        }

        chatMessage.isMine = false;

        this.setState({
            messages: [...this.state.messages, chatMessage ]
        })
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
                    <MessageInput onSubmitMessage={this.sendMessage} />
                </div>
            </div>
        );
    }
}


export default Messenger;