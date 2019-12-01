import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Login from './components/Auth/login';
import Signup from './components/Auth/signup';
import Messenger from './components/Messenger'

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/chat">
            <Messenger />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
