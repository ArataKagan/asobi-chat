import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'

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
  constructor(props){
    super(props);
    this.state = {
      activeRoomName : null,
      activeRoomKey : null
    };
  }

  // get room name from RoomList and store into state
  getActiveRoomName = (roomName) => {
    this.setState({ 
      activeRoomName: roomName 
    });
  }
  // get room key from RoomList and store into state
  getActiveRoomKey = (roomKey) => {
    console.log('App: before storing room key into state')
    console.log(roomKey);
    this.setState({
      activeRoomKey : roomKey
    });
  }



  render() {
    return (
      <div className="App" >
        <header className='col-sm-4'>
          <h3 id='room-name-title'>Bloc Chat</h3>
          <RoomList 
              firebase={ firebase } 
              // get room name and room key from RoomList 
              roomNameHandlerFromParent={this.getActiveRoomName} 
              roomKeyHandlerFromParent={this.getActiveRoomKey}
            />
        </header>
        <aside className='col-sm-8'>
          <h3>{this.state.activeRoomName}</h3>
          <MessageList 
              firebase={ firebase } 
              // passing the active room key to the MessageList
              activeRoomKeyfromParent={this.state.activeRoomKey}
            />
        </aside>
      </div>
    );
  }
}

export default App;
