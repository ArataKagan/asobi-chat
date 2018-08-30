import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';


  // Initialize Firebase
var config = {
    apiKey: "AIzaSyCphZRFH4a5RmE_poq1R_-CEe3trxj6qIg",
    authDomain: "bloc-chat-react-3b3db.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-3b3db.firebaseio.com",
    projectId: "bloc-chat-react-3b3db",
    storageBucket: "bloc-chat-react-3b3db.appspot.com",
    messagingSenderId: "312732468411"
  };
  firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
