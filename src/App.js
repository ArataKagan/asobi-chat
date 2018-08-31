import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js'

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
        <header className='col-sm-4'>
          <h3 id='room-name-title'>Bloc Chat</h3>
          <RoomList firebase={ firebase }
            />
        </header>
        <aside className='col-sm-8'>
        </aside>
      </div>
    );
  }
}

export default App;
