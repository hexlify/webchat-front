import React, {Component} from 'react'
import AuthService from "../../service/AuthService";
import CircularProgress from "@material-ui/core/CircularProgress";


class Confirm extends Component {

    componentDidMount() {
        const {token} = this.props.match.params;

        AuthService.simpleFetch(`/email/confirm/${token}`)
            .then(_ => this.props.history.replace('/'))
            .catch(err => alert(err.message))
    }

    render() {
        return (
            <div>
                <CircularProgress disableShrink/>
            </div>
        );
    }
}


export default Confirm;