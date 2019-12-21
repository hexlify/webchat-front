import React, {Component} from "react";
import AuthService from "../../../service/AuthService";
import MaterialTable from "material-table";

class ChatRoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chatRooms: []
        };
    }

    componentDidMount() {
        AuthService.fetch('/room')
            .then(rooms => this.setState({chatRooms: rooms}))
            .catch(e => console.log(e));
    }

    render() {
        return (
            <MaterialTable
                columns={[
                    {title: "Id", field: "id", editable: "never"},
                    {title: "Name", field: "name"},
                    {title: "Description", field: "description"},
                ]}
                data={this.state.chatRooms}
                editable={{
                    onRowDelete: oldData =>
                        new Promise(((resolve, reject) => {
                            AuthService.simpleFetch(`/room/${oldData.id}`, {method: 'DELETE'})
                                .then(_ => {
                                    let chatRooms = this.state.chatRooms;
                                    const index = chatRooms.indexOf(oldData);
                                    chatRooms.splice(index, 1);
                                    this.setState({chatRooms}, () => resolve());
                                })
                                .catch(e => {
                                    alert(e);
                                    reject();
                                })
                        })),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(((resolve, reject) => {
                            AuthService.simpleFetch(`/room/${oldData.id}`, {
                                method: 'PUT',
                                body: JSON.stringify({
                                    name: newData.name,
                                    description: newData.description
                                })
                            })
                                .then(_ => {
                                    const chatRooms = this.state.chatRooms;
                                    const index = chatRooms.indexOf(oldData);
                                    chatRooms[index] = newData;
                                    this.setState({chatRooms}, () => resolve());
                                })
                                .catch(e => {
                                    alert(e);
                                    reject();
                                })
                        })),
                    onRowAdd: newData =>
                        new Promise(((resolve, reject) => {
                            AuthService.simpleFetch('/room/create', {
                                method: 'POST',
                                body: JSON.stringify({
                                    name: newData.name,
                                    description: newData.description
                                })
                            })
                                .then(_ => {
                                    const chatRooms = this.state.chatRooms;
                                    chatRooms.push(newData);
                                    this.setState({chatRooms}, () => resolve());
                                })
                                .catch(e => {
                                    alert(e);
                                    reject();
                                })
                        }))
                }}
                title="Chatrooms"
            />
        );
    }
}

export default ChatRoomList;