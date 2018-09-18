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
      // console.log('room created')
      e.preventDefault();
      //console.log(this.state.newRoom);
      
      this.roomsRef.push({
        name: this.state.newRoom
      });

      this.setState({newRoom:' '});
    };

    handleChange(e){
      this.setState({ newRoom: e.target.value });
    }

    roomNameClickHandler(e){
      var selectedRoom = e.name;
      var selectedRoomKey = e.key;
      // console.log(selectedRoomKey);
      this.props.roomNameHandlerFromParent(selectedRoom);
      this.props.roomKeyHandlerFromParent(selectedRoomKey);
    }

    removeRoomHandler(e){
      // remove the child node from firebase
      var selectedRoomKey = e.key;
      var selectedRoomName = e.name;
      this.roomsRef.child(selectedRoomKey).set(null);
      var indexed_val = this.state.rooms.indexOf(e);
      
      // passing the room key to delete
      this.props.deleteRoomKeyHandler(selectedRoomKey);
      // passing the room name to delete
      this.props.deleteRoomNameHandler(selectedRoomName);

      // remove the room name from the list
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
          </Popup>

          <li className='room_list'>
            {this.state.rooms.map((room, index) =>
            <div className='outer_room_list'>
              <div className='inner_room_list' key={index - 1}>
                <ul key={index} onClick = {(e) => this.roomNameClickHandler(room)}>{room.name}</ul>
                <span key={index + 1} className='icon ion-md-trash' onClick = {() => this.removeRoomHandler(room)}></span>
              </div>
            </div>
            )}
          </li>

        </div>
    );
  }
}


export default RoomList;

