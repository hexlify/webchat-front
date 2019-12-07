class ChatMessageRequest {
    constructor(content, type, chatRoomId) {
        this.content = content;
        this.type = type;
        this.chatRoomId = chatRoomId;
    }
}

export default ChatMessageRequest;