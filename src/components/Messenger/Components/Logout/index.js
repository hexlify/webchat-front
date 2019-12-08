import React, {Component} from "react";
import AuthService from "../../../../service/AuthService";
import {Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";


class LogoutButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigate: false
        };

        this.logout = this.logout.bind(this);
    }

    logout() {
        AuthService.logOut();
        this.props.onLogout();
        this.setState({navigate: true});
    }

    render() {
        const {navigate} = this.state;
        if (navigate) {
            return <Redirect to="/login" />
        }
        return <Button variant="contained" color="secondary" onClick={this.logout}>Logout</Button>
    }
}

export default LogoutButton;