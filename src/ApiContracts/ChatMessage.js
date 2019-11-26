class ChatMessage {
    constructor(sender, content, isMine) {
        this.sender = sender;
        this.content = content;
        this.isMine = isMine;
    }
}

export default ChatMessage;