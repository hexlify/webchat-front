import React, {Component} from 'react';
import AuthService from '../service/AuthService';


export default function withAuth(AuthComponent) {
    return class AuthWrapped extends Component {
        constructor(props) {
            super(props);

            this.state = {
                username: null,
                roles: []
            }
        }

        componentDidMount() {
            if (!AuthService.loggedIn()) {
                this.props.history.replace('/login');
            } else {
                AuthService
                    .fetch('/user')
                    .then(info => this.setState({username: info.username, roles: info.roles}))
                    .catch(e => console.log(e));
            }
        }

        render() {
            if (this.state.username) {
                return (
                    <AuthComponent
                        history={this.props.history}
                        username={this.state.username}
                        isAdmin={this.state.roles.some(x => x.name === 'ROLE_ADMIN')}
                    />
                )
            } else {
                return null;
            }
        }
    }
}