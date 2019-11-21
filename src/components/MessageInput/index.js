import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import './MessageInput.css'


class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {message: ''};

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        this.setState({message: e.target.value});
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.onSubmit(e);
        }
    }

    onSubmit(e) {
        if (this.state.message) {
            this.props.onSubmitMessage(this.state.message);
            this.setState({message: ''});
        }
    }

    render() {
        return (
            <div className="compose">
                <TextField
                    className="compose-input"
                    placeholder="Write message here..."
                    value={this.state.message}
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                    autoFocus
                />
                <RaisedButton className="submit-button" onClick={this.onSubmit}>Send</RaisedButton>
            </div>
        );
    }
}


export default MessageInput;