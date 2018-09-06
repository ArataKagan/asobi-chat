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
            console.log('passed to message list')
            // store the entire message info into newPost
            const newPost = snapshot.val();
            newPost.key = snapshot.key; 
            console.log(newPost); 
            console.log(newPost.roomId);
            // store the message to initial state 
            this.setState({messages: this.state.messages.concat(newPost)});
            console.log('message was stored in messagelist')
            console.log(this.state.messages)
        })   
    }

    render(){
        return(
            <div className='messageList'>
                <p>{this.props.activeRoomKeyfromParent}</p>
                <ul>
                    {this.state.messages.filter((item) => item.roomId === this.props.activeRoomKeyfromParent)
                        .map((room, index) => ( <li key='index'> {room.username} {room.content} </li> ))}
                </ul>
            </div>
        )
    }
}

export default MessageList;
