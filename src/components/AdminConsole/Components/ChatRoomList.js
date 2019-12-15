import React, {Component} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AuthService from "../../../service/AuthService";


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
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.chatRooms.sort((x, y) => x.id > y.id).map(r => (
                        <TableRow key={r.id}>
                            <TableCell>{r.id}</TableCell>
                            <TableCell>{r.name}</TableCell>
                            <TableCell>{r.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }
}

export default ChatRoomList;