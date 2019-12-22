import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Messenger from './components/Messenger'
import Signup from "./components/Auth/signup";
import Login from "./components/Auth/login";
import UserInfo from './components/UserInfo'
import AdminConsole from './components/AdminConsole'
import Confirm from "./components/Confirm";

import './App.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/me" component={UserInfo}/>
                <Route exact path="/admin" component={AdminConsole}/>
                <Route exact path="/confirm/:token" component={Confirm}/>>
                <Route exact path="/" component={Messenger}/>
            </Switch>
        </Router>
    )
}

export default App;
