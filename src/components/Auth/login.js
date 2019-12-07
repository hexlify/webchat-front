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

        AuthService.login(this.state.username, this.state.password)
            .then(res => {
                this.props.history.replace('/')
            })
            .catch(err => alert(err))
    }

    componentDidMount() {
        if (AuthService.loggenIn()) {
            this.props.history.replace('/');
        }
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