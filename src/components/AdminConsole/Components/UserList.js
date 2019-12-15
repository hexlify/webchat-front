import React, {Component} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AuthService from "../../../service/AuthService";

function parseRoles(roles) {
    return roles
        .map(r => r.name === 'ROLE_ADMIN' ? 'ADMIN' : 'USER')
        .join(',');
}


class AdminConsole extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        AuthService.fetch('/admin/users')
            .then(users => this.setState({users: users}))
            .catch(e => console.log(e));
    }

    banUser(userId) {
        AuthService.simpleFetch(`/admin/ban/${userId}`)
            .then(_ => this.setState(state => {
                let bannedUser = state.users.find(x => x.id === userId);
                bannedUser.status = 'BANNED';

                return state;
            }))
            .catch(e => alert(e));
    }

    activateUser(userId) {
        AuthService.simpleFetch(`/admin/activate/${userId}`)
            .then(_ => this.setState(state => {
                let activatedUser = state.users.find(x => x.id === userId);
                activatedUser.status = 'ACTIVE';

                return state;
            }))
            .catch(e => alert(e));
    }

    getActionButton(userStatus, userId) {
        return userStatus === 'ACTIVE'
            ?
            <Button variant="contained" color="secondary" size="small"
                    onClick={e => this.banUser(userId)}>Ban</Button>
            : <Button variant="contained" color="secondary" size="small"
                      onClick={e => this.activateUser(userId)}>Activate</Button>
    }

    render() {
        return (
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>FirstName</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Roles</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.users.sort((x, y) => x.id > y.id).map(u => (
                        <TableRow key={u.id}>
                            <TableCell>{u.id}</TableCell>
                            <TableCell>{u.username}</TableCell>
                            <TableCell>{u.firstName}</TableCell>
                            <TableCell>{u.email}</TableCell>
                            <TableCell>{u.status}</TableCell>
                            <TableCell>{parseRoles(u.roles)}</TableCell>
                            <TableCell>
                                {this.getActionButton(u.status, u.id)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }
}

export default AdminConsole;