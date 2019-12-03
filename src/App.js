import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'

import Login from './components/Auth/login';
import Signup from './components/Auth/signup';
import Messenger from './components/Messenger'
import UserInfo from './components/UserInfo'

import './App.css';
import { Toolbar, Typography, Button } from '@material-ui/core';


function App() {
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className="app-header">
            Another webchat...
          </Typography>
          <Button color="inherit" href="/login">Login</Button>
          <Button color="inherit" href="/signup">Signup</Button>
        </Toolbar>
      </AppBar>

      <Router>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/me" component={UserInfo} />
            <Route path="/chat" component={Messenger} />
      </Router>
    </div>

  );
}

export default App;
