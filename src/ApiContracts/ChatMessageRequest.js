class ChatMessageRequest {
    constructor(sender, content, type, chatRoomId) {
        this.sender = sender;
        this.content = content;
        this.type = type;
        this.chatRoomId = chatRoomId;
    }
}

export default ChatMessageRequest;