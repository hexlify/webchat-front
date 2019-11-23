import React, {Component} from 'react'
import Message from '../Message'
import MessageInput from '../MessageInput'

import './MessageList.css'


var tempMessages = [
    {
      text: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works. Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works. Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works. Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works. Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works. Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
      isMine: true
    },
    {
      text: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!v',
      isMine: true
    },
    {
      author: 'orange',
      text: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
      isMine: false
    },
    {
        text: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works. Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works. Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works. Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works. Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works. Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        isMine: true
      },
      {
        text: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!v',
        isMine: true
      },
      {
        author: 'orange',
        text: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        isMine: false
      },
          {
      text: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works. Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works. Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works. Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works. Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works. Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
      isMine: true
    },
    {
      text: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!v',
      isMine: true
    },
    {
      author: 'orange',
      text: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
      isMine: false
    }
]

class MessageList extends Component {
      constructor(props) {
        super(props);

        this.state = {
            messages: tempMessages
        };

        this.messagesEndRef = React.createRef();
        this.addMessage = this.addMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    addMessage(message) {
        this.setState({
            messages: [...this.state.messages, message]
        });
    }

    submitMessage(text) {
        const message = {
            author: null,
            text: text,
            isMine: true
        };
        this.addMessage(message);
    }

    scrollToBottom() {
      this.messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    }

    componentDidMount() {
      this.scrollToBottom();
    }

    componentDidUpdate() {
      this.scrollToBottom();
    }

    render() {
        return (
            <div>
                <div className="message-list-container">
                    {this.state.messages.map((message, i) => <Message key={i} isMine={message.isMine} author={message.author} text={message.text}/>)}
                </div>

                <div ref={this.messagesEndRef}>

                </div>

                <MessageInput onSubmitMessage={this.submitMessage} />
            </div>
        )
    }
}


export default MessageList;