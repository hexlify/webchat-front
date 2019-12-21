import React, {Component} from 'react';
import withAuth from '../withAuth';
import AuthService from "../../service/AuthService";

import './UserInfo.css'


class UserInfo extends Component {
    constructor(props) {
        super(props);


        this.state = {
            username: '',
            firstName: '',
            email: ''
        };
    }

    componentDidMount() {
        AuthService.fetch('/user')
            .then(info => {
                this.setState({...info})
            })
            .catch(e => console.log(e.message))
    }

    render() {
        return (
            <div className="userinfo">
                <div className="userinfo-line">
                    <div className="label-container">
                        <label>Email</label>
                    </div>
                    <div className="value-container">
                        <label>{this.state.email}</label>
                    </div>
                </div>

                <div className="userinfo-line">
                    <div className="label-container">
                        <label>Username</label>
                    </div>
                    <div className="value-container">
                        <label>{this.state.username}</label>
                    </div>
                </div>

                <div className="userinfo-line">
                    <div className="label-container">
                        <label>First name</label>
                    </div>
                    <div className="value-container">
                        <label>{this.state.firstName}</label>
                    </div>
                </div>
            </div>
        );
    }
}


export default withAuth(UserInfo);