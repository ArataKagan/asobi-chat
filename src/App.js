import React, { Component } from 'react';
import {connect} from 'react-redux';

import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'
import User from './components/User'
import SubmitMessage from './components/SubmitMessage'

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
    console.log(value);
    this.setState({
      user : value
    });
    console.log(this.state.user.displayName);
  }

  render() {
    return (
      <div className="App" >
      <div className="container-fluid">
        <div className="row">
        <div class="sidebar-nav-fixed">
            <div className='col-sm-4 sidebar'>
            
              <h3 id='room-name-title' style={{fontFamily: 'Helvetica'}}>Asobi Chat</h3>
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
            <div className='col-sm-8'>
              <User 
                firebase={ firebase }
                setUser={this.setUser}
                userInfo={this.state.user}
                />
              <h3 style={{fontFamily: 'Helvetica'}}>{this.state.activeRoomName}</h3>
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

// const mapStateToProps = state => {
//   return {
//       actRoomName: state.activeRoomName
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {


//   }
// }
export default App;
