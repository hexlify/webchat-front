import React, {Component} from 'react';
// import {connect} from 'react-redux';


import './Signup.css';


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

    handleSubmit(e) {
        e.preventDefault();
        // this.props.usePostFetch(this.state);
    }

    render() {
        return (
            <form className="signup-form" onSubmit={this.onSubmit}>
                <ul>
                    <li>
                        <label for="username">Username</label>
                        <input
                            id="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </li>

                    <li>
                        <label for="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </li>

                    <li>
                        <label for="password">Password</label>
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
                            onSubmit={this.onSubmit}
                        >Signup</button>
                    </li>
                </ul>
            </form>
        );
    }
}

export default Signup;