import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages : [],
        }
        // retrieve message data from firebase
        this.messageRef = this.props.firebase.database().ref('Messages')
    }

    componentDidMount(){
        this.messageRef.on('child_added', snapshot => {
            // store the entire message into newPost 
            // store the entire message info into newPost
            const newPost = snapshot.val();
            newPost.key = snapshot.key; 
            // store the message to initial state 
            this.setState({messages: this.state.messages.concat(newPost)});
        })   
    } 

    render(){
        return(
            <div className='messageList'>
                {this.state.messages.filter((item) => item.roomId === this.props.activeRoomKeyfromParent)
                        .map((room, index) => ( 
                        <p key='index'> <b>{room.username}</b> <p>{room.content}</p> </p> 
                        ))}
            </div>
        )
    }
}

export default MessageList;
