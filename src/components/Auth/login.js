import React, {Component} from 'react';
import AuthService from '../../service/AuthService';

import './Auth.css';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            message: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    async login(e) {
        this.setState({message: ''})
        e.preventDefault();
        const credentials = {username: this.state.username, password: this.state.password};
        AuthService.login(credentials)
            .then(async resp => {
                if (resp.ok) {
                    localStorage.setItem('userInfo', await resp.text())
                } else {
                    const error = (await resp.json()).error;
                    this.setState({message: error})
                }
            })
    }

    render() {
        return (
            <form className="signup-form" onSubmit={this.onSubmit}>
                {this.state.message}
                <ul>
                    <li>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </li>

                    <li>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </li>

                    <li>
                        <button
                            onClick={this.login}
                        >Login</button>
                    </li>
                </ul>
            </form>
        );
    }
}

export default Login;