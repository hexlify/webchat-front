import React, {Component} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'

import MessageList from './Components/MessageList';
import ConversationList from './Components/ConversationList';
import MessageInput from './Components/MessageInput';
import AuthService from "../../service/AuthService";
import ChatMessageRequest from '../../ApiContracts/ChatMessageRequest';
import ChatMessage from '../../ApiContracts/ChatMessage';
import withAuth from '../withAuth'


import './Messenger.css';
import {Toolbar, Typography} from "@material-ui/core/";
import Button from "@material-ui/core/Button";

class Messenger extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chatRoomId: '',
            messages: [],
            conversations: []
        };
        this.username = this.props.username;

        this.onConnected = this.onConnected.bind(this);
        this.onError = this.onError.bind(this);
        this.logout = this.logout.bind(this);

        this.sendMessage = this.sendMessage.bind(this);
        this.onMessageReceived = this.onMessageReceived.bind(this);
        this.getChatRoomMessages = this.getChatRoomMessages.bind(this);

        const socket = new SockJS('http://localhost:8000/ws');
        this.client = Stomp.over(socket);
        this.client.connect({'Authorization': `Bearer ${AuthService.getToken()}`}, this.onConnected, this.onError);
    }

    onConnected() {
        this.client.subscribe('/topic/public', this.onMessageReceived);

        // const joinChatMessageRequest = new ChatMessageRequest('', 'JOIN', this.chatRoomId);
        // this.client.send(
        //     '/app/chat/addUser',
        //     {},
        //     JSON.stringify(joinChatMessageRequest)
        // );
    }

    onError(error) {
        console.log(error);
        // let errorChatMessage = new ChatMessage('Webchat', error, false);
        //
        // this.setState({
        //     messages: [...this.state.messages, errorChatMessage]
        // });
    }

    sendMessage(text) {
        let chatMessageRequest = new ChatMessageRequest(text, 'CHAT', this.state.chatRoomId);
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

    componentDidMount() {
        AuthService.fetch('/room')
            .then(rooms => this.setState({conversations: rooms}));
    }

    getChatRoomMessages(conversationId) {
        AuthService.fetch('/room/' + conversationId)
            .then(resp => resp.chatMessages.map((m, i) => new ChatMessage(m.sender, m.content, m.sender === this.username)))
            .then(messages => this.setState(
                {
                    messages: Array.from(messages),
                    chatRoomId: conversationId
                }
                )
            );
    }

    logout() {
        AuthService.logOut();
        this.props.history.replace('/');
    }

    render() {
        return (
            <div className="messenger">
                <div className="top-bar">
                    <Toolbar>
                        <Typography variant="h6" className="app-header">
                            Webchat
                        </Typography>

                        <Button variant="contained" color="primary" href="/me">{this.username}</Button>
                        <Button variant="contained" color="primary" onClick={this.logout}>Logout</Button>
                    </Toolbar>
                </div>

                <div className="scrollable left-sidebar">
                    <ConversationList
                        conversations={this.state.conversations}
                        chooseConversation={this.getChatRoomMessages}/>
                </div>

                <div className="scrollable content">
                    <MessageList messages={this.state.messages}/>
                </div>

                <div className="bottom-bar">
                    <MessageInput onSubmitMessage={this.sendMessage}/>
                </div>
            </div>
        );
    }
}

export default withAuth(Messenger);