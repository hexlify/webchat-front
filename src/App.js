import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Login from './components/Auth/login';
import Signup from './components/Auth/signup';
import Messenger from './components/Messenger'
import UserInfo from './components/UserInfo'

import './App.css';

function App() {
  return (
    <Router>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/me" component={UserInfo} />
          <Route path="/chat" component={Messenger} />
    </Router>
  );
}

export default App;
