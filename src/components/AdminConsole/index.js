import React, {Component} from "react";
import withAuth from "../withAuth";
import UserList from "./Components/UserList";

import './AdminConsole.css'
import ChatRoomList from "./Components/ChatRoomList";

class AdminConsole extends Component {

    componentDidMount() {
        if (!this.props.isAdmin) {
            this.props.history.replace('/');
        }
    }

    render() {
        return (
            <div>
                <ChatRoomList/>
                <UserList/>
            </div>
        );
    }
}

export default withAuth(AdminConsole);