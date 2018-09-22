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

    deleteMessage(e){
        var messageKey = e.key;
        this.messageRef.child(messageKey).set(null);

        this.removeMessageFromScreen(e);
    }

    removeMessageFromScreen(e){
        const messages = this.state.messages.slice();
        const messageIndex = this.state.messages.indexOf(e);
        const message = messages[messageIndex]; 
        this.setState({ messages: this.state.messages.filter((item) => item !== message)});
    }

    render(){
        return(
            <div className='messageList'>
                {this.state.messages.filter((item) => item.roomId === this.props.activeRoomKeyfromParent)
                        .map((room, index) => ( 
                        <div className='messageBody' key={index}>
                            <p key= {index + 1}> <b>{room.username}</b></p> 
                            <p key= {index + 2}>{room.content}</p> 
                            <p key= {index + 3}> {room.sentAt}</p> 
                            <button onClick={() => this.deleteMessage(room)}>Delete</button>
                        </div>
                        ))}
            </div>
        )
    }
}

export default MessageList;
