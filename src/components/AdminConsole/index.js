import React, {Component} from "react";
import withAuth from "../withAuth";
import UserList from "./Components/UserList";

import './AdminConsole.css'
import ChatRoomList from "./Components/ChatRoomList";
import {Link, Route, Switch, useRouteMatch} from "react-router-dom";

class AdminConsole extends Component {

    componentDidMount() {
        if (!this.props.isAdmin) {
            this.props.history.replace('/');
        }
    }

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to={`/admin/users`}>User list</Link>
                    </li>
                    <li>
                        <Link to={`/admin/rooms`}>Chat rooms</Link>
                    </li>
                </ul>

                <Switch>
                    <Route path="/admin/users">
                        <UserList />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default withAuth(AdminConsole);