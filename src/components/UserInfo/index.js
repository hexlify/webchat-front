import React, {Component} from 'react';
import withAuth from '../withAuth'

class UserInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h1>ME</h1>
    }
}


export default withAuth(UserInfo);