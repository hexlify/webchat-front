import React, {Component} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'

import MessageList from '../MessageList';
import ConversationList from '../ConversationList';
import MessageInput from '../MessageInput';

import ChatMessageRequest from '../../ApiContracts/ChatMessageRequest';
import ChatMessage from '../../ApiContracts/ChatMessage';
import withAuth from '../withAuth'


import './Messenger.css';


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const URL = 'https://webchat-backend.herokuapp.com';
// const URL = 'http://localhost:8000';


class Messenger extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chatRoomId: '',
            messages: [],
            conversations: []
        };

        this.username = 'Anon' + getRandomInt(1000);

        this.onConnected = this.onConnected.bind(this);
        this.onError = this.onError.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onMessageReceived = this.onMessageReceived.bind(this);
        this.getChatRoomMessages = this.getChatRoomMessages.bind(this);

        let socket = new SockJS(URL +'/ws');
        this.client = Stomp.over(socket);
        this.client.connect({}, this.onConnected, this.onError);
    }

    onConnected() {
        this.client.subscribe('/topic/public', this.onMessageReceived);

        let joinChatMessageRequest = new ChatMessageRequest(this.username, '', 'JOIN', this.chatRoomId);
        this.client.send(
            '/app/chat/addUser',
            {},
            JSON.stringify(joinChatMessageRequest)
        );
    }

    onError(error) {
        let errorChatMessage = new ChatMessage('Webchat', error, false);

        this.setState({
            messages: [...this.state.messages, errorChatMessage]
        });
    }

    sendMessage(text) {
        let chatMessageRequest = new ChatMessageRequest(this.username, text, 'CHAT', this.state.chatRoomId);
        let chatMessage = new ChatMessage(this.username, text, true);

        this.client.send('/app/chat/sendMessage', {}, JSON.stringify(chatMessageRequest));

        this.setState({
            messages: [...this.state.messages, chatMessage]
        });
    }

    onMessageReceived(payload) {
        let chatMessageRequest = JSON.parse(payload.body);
        let chatMessage = new ChatMessage(chatMessageRequest.sender, chatMessageRequest.content, false);

        if (chatMessage.sender === this.username) {
            return;
        }

        if (chatMessage.type === 'JOIN') {
            chatMessage.content = 'Entered the room';
        }

        if (chatMessage.type === 'LEAVE') {
            chatMessage.content = 'Left the room';
        }

        this.setState({
            messages: [...this.state.messages, chatMessage]
        })
    }

    async componentDidMount() {
        fetch(URL + '/cr')
            .then(resp => resp.json())
            .then(json => this.setState({conversations: json}));
    }

    getChatRoomMessages(conversationId) {
        fetch(URL + '/cr/' + conversationId)
            .then(resp => resp.json())
            .then(resp => resp.chatMessages.map((m, i) => new ChatMessage(m.sender, m.content, m.sender === this.username)))
            .then(messages => this.setState(
                {
                    messages: Array.from(messages),
                    chatRoomId: conversationId
                }
            )
        );
    }

    render() {
        return (
            <div className="messenger">
                <div className="scrollable left-sidebar">
                    <ConversationList
                        conversations={this.state.conversations}
                        chooseConversation={this.getChatRoomMessages} />
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


export default withAuth(Messenger);