import React, { Component } from 'react';
// import {connect} from 'react-redux';

import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import SubmitMessage from './components/SubmitMessage';
import Nav from './components/Nav';
import logo from './assets/logo.png';

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
      activeRoomKey : null,
      user : []
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
    this.setState({
      activeRoomKey : roomKey
    });
  } 

  // delete room key
  deleteActiveRoomKey = () => {
    this.setState({
      activeRoomKey : null
    });
  } 

  // delete room name
  deleteActiveRoomName = () => {
    this.setState({
      activeRoomName : null
    });
  }

  setUser = (value) => {
    this.setState({
      user : value
    });
  }

  render() {
    return (
      <div className="App" >
      <div className="container">
        <div className="row">
        <div className="sidebar-nav-fixed">
            <div className='col-sm-3 col-md-2 sidebar'>
              <img  src={logo} alt='logo'/>
              <User 
                firebase={ firebase }
                setUser={this.setUser}
                userInfo={this.state.user}
                />
              <RoomList 
                  firebase={ firebase } 
                  // get room name and room key from RoomList 
                  roomNameHandlerFromParent={this.getActiveRoomName} 
                  roomKeyHandlerFromParent={this.getActiveRoomKey} 
                  deleteRoomKeyHandler={this.deleteActiveRoomKey}
                  deleteRoomNameHandler={this.deleteActiveRoomName}
                />
            </div>
          </div>
            <div className='col-sm-9 col-sm-offset-3 col-md-10- col-md-offset-2 main'>
                <Nav
                  chatTitle={this.state.activeRoomName}
                />
              <MessageList 
                  firebase={ firebase } 
                  // passing the active room key to the MessageList
                  activeRoomKeyfromParent={this.state.activeRoomKey}
                />
              
              <SubmitMessage
                firebase={ firebase }
                userInfo={ this.state.user } 
                roomId={ this.state.activeRoomKey }
              />
          
          
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
