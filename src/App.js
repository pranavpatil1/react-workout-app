import React, { Component } from 'react';
import './App.css';
import Main from './Main'

import UserProvider  from './UserProvider'

class App extends Component {
    render() {
      return (
        <UserProvider>
            <Main />
        </UserProvider>
      )
    }
  }

export default App;
