import React, { Component } from 'react';
import Popup from 'reactjs-popup';


class RoomList extends Component{
  constructor(props){
    super(props);
    this.state = {
      rooms: [],
      newRoom : ' ',
      open: false
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
      console.log(this.state.newRoom);
      
      this.roomsRef.push({
        name: this.state.newRoom
      });

      this.setState({newRoom:' '});
    };

    handleChange(e){
      console.log('room created');
      this.setState({ newRoom: e.target.value });
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
              <ul key={index}>{room.name}</ul>
            )}
          </li>

        </div>
    );
  }
}


export default RoomList;

