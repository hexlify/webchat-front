import React, {Component} from 'react';

import './Auth.css';
import AuthService from "../../service/AuthService";


class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    componentDidMount() {
        if (AuthService.loggenIn()) {
            this.props.history.replace('/');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        AuthService
            .register(this.state.username, this.state.email, this.state.password)
            .then(() => this.props.history.replace('/login'))
            .catch(err => alert(err));
    }

    render() {
        return (
            <form className="signup-form" onSubmit={this.onSubmit}>
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
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
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
                            type="submit"
                            onClick={this.handleSubmit}
                        >Signup</button>
                    </li>
                </ul>
            </form>
        );
    }
}

export default Signup;