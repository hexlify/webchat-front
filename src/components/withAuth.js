import React, {Component} from 'react';
import AuthService from '../service/AuthService';


export default function withAuth(AuthComponent) {
    return class AuthWrapped extends Component {
        constructor(props) {
            super(props);

            this.state = {
                username: null
            }
        }

        componentWillMount() {
            if (!AuthService.loggenIn()) {
                this.props.history.replace('/login');
            } else {
                const username = AuthService.getUserInfo().username;
                this.setState({
                    username: username
                });
            }
        }

        render() {
            if (this.state.username) {
                return (
                    <AuthComponent history={this.props.history} username={this.state.username} />
                )
            } else {
                return null;
            }
        }
    }
}