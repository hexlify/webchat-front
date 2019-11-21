import React, {Component} from 'react'


class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.setState({message: ''});

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({message: e.target.value});
        e.preventDefault();
    }

    onSubmit(e) {
        e.prevendDefault();
        this.props.onSubmitMessage(this.state.message);
        this.setState({message: ''});
    }

    render() {
        return (
            <div>
                <form
                    action="."
                    onSubmit={this.onSubmit}
                >
                    <input
                        type="text"
                        placeholder="Enter message..."
                        value={this.state.message}
                        onChange={this.onChange}
                    />
                    <input type="submit" value="Send"/>
                </form>
            </div>
        );
    }
}


export default ChatInput;