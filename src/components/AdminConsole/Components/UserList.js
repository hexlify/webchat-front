import React, {Component} from "react";
import AuthService from "../../../service/AuthService";
import MaterialTable from "material-table";


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

    getActionButton(rowData) {
        return rowData.status === 'ACTIVE'
            ?
            {
                icon: 'block',
                tooltip: 'Ban user',
                onClick: (e, rowData) => this.banUser(rowData.id)
            } :

            {
                icon: 'replay',
                tooltip: 'Unban user',
                onClick: (e, rowData) => this.activateUser(rowData.id)
            };
    }

    render() {
        return (
            <MaterialTable
                columns={[
                    {title: "Id", field: "id", editable: "never"},
                    {title: "Username", field: "username"},
                    {title: "FirstName", field: "firstName"},
                    {title: "Email", field: "email"},
                    {title: "Status", field: "status"},
                    {
                        title: "Roles",
                        field: "roles",
                        render: rowData => rowData.roles
                            .map(r => r.name === 'ROLE_ADMIN' ? 'ADMIN' : 'USER')
                            .join(',')
                    },
                ]}
                data={this.state.users.sort((a, b) => a.id > b.id)}
                title="Users"

                actions={[rowData => this.getActionButton(rowData)]}
            />
        );
    }
}

export default AdminConsole;