import React, {Component} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'

import MessageList from './Components/MessageList';
import ConversationList from './Components/ConversationList';
import MessageInput from './Components/MessageInput';
import LogoutButton from './Components/Logout';
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
            subscription: null,
            chatRoomId: null,
            messages: [],
            conversations: []
        };
        this.username = this.props.username;

        this.onConnected = this.onConnected.bind(this);
        this.onError = this.onError.bind(this);
        this.disconnect = this.disconnect.bind(this);

        this.sendMessage = this.sendMessage.bind(this);
        this.onMessageReceived = this.onMessageReceived.bind(this);
        this.onChatRoomSelected = this.onChatRoomSelected.bind(this);

        const socket = new SockJS('https://webchat-backend.herokuapp.com/ws');
        this.client = Stomp.over(socket);
        this.client.connect({'Authorization': `Bearer ${AuthService.getToken()}`}, this.onConnected, this.onError);
    }

    onConnected() {
        // const joinChatMessageRequest = new ChatMessageRequest('', 'JOIN', this.chatRoomId);
        // this.client.send(
        //     '/app/chat/addUser',
        //     {},
        //     JSON.stringify(joinChatMessageRequest)
        // );
    }

    onError(error) {
        console.log(error);
    }

    onChatRoomSelected(conversationId) {
        const {subscription} = this.state;
        if (subscription !== null) {
            subscription.unsubscribe();
        }

        AuthService.fetch('/room/' + conversationId)
            .then(resp => resp.chatMessages.map((m, i) => new ChatMessage(m.sender, m.content, m.sender === this.username)))
            .then(messages => this.setState(
                {
                    messages: Array.from(messages),
                    chatRoomId: conversationId,
                    subscription: this.client.subscribe(`/topic/room/${conversationId}`, this.onMessageReceived)
                })
            )
            .catch(e => console.log(e));
    }

    sendMessage(text) {
        const {subscription, chatRoomId} = this.state;

        if (subscription === null) {
            return;
        }

        let chatMessageRequest = new ChatMessageRequest(text, 'CHAT', this.state.chatRoomId);
        let chatMessage = new ChatMessage(this.username, text, true);

        this.client.send(`/chat/sendMessage/${chatRoomId}`, {}, JSON.stringify(chatMessageRequest));

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
            .then(rooms => this.setState({conversations: rooms}))
            .catch(e => console.log(e));
    }

    disconnect() {
        this.client.disconnect();
    }

    render() {
        return (
            <div className="messenger">
                <div className="top-bar">
                    <Toolbar>
                        <Typography variant="h6" className="app-header">
                            Webchat
                        </Typography>

                        {this.props.isAdmin &&
                            <Button variant="contained" color="red" href="/admin">Admin console</Button>
                        }

                        <Button variant="contained" color="primary" href="/me">{this.username}</Button>
                        <LogoutButton onLogout={this.disconnect} />
                    </Toolbar>
                </div>

                <div className="scrollable left-sidebar">
                    <ConversationList
                        conversations={this.state.conversations}
                        chooseConversation={this.onChatRoomSelected}/>
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