import React from 'react';
import {BrowserRouter as Router, Route, } from "react-router-dom";
import Messenger from './components/Messenger'
import Signup from "./components/Auth/signup";
import Login from "./components/Auth/login";
import UserInfo from './components/UserInfo'

import './App.css';

function App() {
    return (
        <Router>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/me" component={UserInfo}/>
            <Route exact path="/" component={Messenger}/>

        </Router>
    )
}

export default App;
