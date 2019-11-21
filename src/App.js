import React from 'react';
import './App.css';
import Messenger from './components/Messenger';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

function App() {
  return (
    <MuiThemeProvider>
      <Messenger />
    </MuiThemeProvider>
  );
}

export default App;
