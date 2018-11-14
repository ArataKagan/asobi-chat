import React, { Component } from 'react';
import Popup from 'reactjs-popup';


class RoomList extends Component{
  constructor(props){
    super(props);
    this.state = {
      rooms: [],
      newRoom : ' ',
      open: false, 
      roomKeys: ' ',
    };
    //accessing data from firebase
    this.roomsRef = this.props.firebase.database().ref('rooms');
    };

    componentDidMount(){
      // each room is stored in state inital 
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        //console.log(room.key);
        this.setState({ rooms: this.state.rooms.concat( room )})
      });
    }

    openModal = () => {
      this.setState({open: true});
    };

    closeModal = () => {
      this.setState({open: false})
    };

    createRoom(e){
      e.preventDefault();
      this.roomsRef.push({
        name: this.state.newRoom
      });
      this.setState({newRoom:' '});
    };

    handleChange(e){
      this.setState({ newRoom: e.target.value });
    }
  
    roomNameClickHandler(e){
      var roomName = e.name;
      var roomKey = e.key;
      this.props.roomNameHandlerFromParent(roomName);
      this.props.roomKeyHandlerFromParent(roomKey);
    }

    removeRoomHandler(e){
      // remove the child node from firebase
      var roomKey = e.key;
      var roomName = e.name;
      this.roomsRef.child(roomKey).set(null);
      // passing the room key and name to delete
      this.props.deleteRoomKeyHandler(roomKey);
      this.props.deleteRoomNameHandler(roomName);
      // remove the room name from the list
      this.removeRoomName(e);
    }

    removeRoomName(e){
      var indexed_val = this.state.rooms.indexOf(e);
      const rooms = this.state.rooms.slice();
      const room = rooms[indexed_val];
      this.setState({rooms: this.state.rooms.filter(item => item !== room)}); 
    }

    

    render(){
      return(
        <div>
          <button className='room_btn' onClick={this.openModal}>Create New Room</button>
          <Popup
            open={this.state.open}
            closeOnDocumentClick
            onClose={this.closeModal}>
              <form onSubmit={(e) => this.createRoom(e) } >
                <label>
                  Enter a room name:
                  <input type="text" value={this.state.newRoom} onChange={(e) => this.handleChange(e)} />
                  </label>
                <input type='submit' /> 
              </form>
              <input type='button' value='Cancel' onClick={this.closeModal}></input>
          </Popup>

          <li className='room_list'>
            {this.state.rooms.map((room, index) =>
              <div className='inner_room_list' key={index - 1}>
                <ul key={index} onClick = {(e) => this.roomNameClickHandler(room)} className='room_name'>{room.name}</ul>
                <span key={index + 1} className='icon ion-md-trash' onClick = {() => this.removeRoomHandler(room)}></span>
              </div>
            )}
          </li>

        </div>
    );
  }
}


export default RoomList;

