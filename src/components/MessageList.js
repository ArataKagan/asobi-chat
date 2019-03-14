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
                            <span key= {index + 1} className='rowName'> <b>{room.username}</b></span>
                            <span onClick={() => this.deleteMessage(room)} className='icon ion-md-trash messsage'></span><br/>
                            <p key= {index + 2} className='rowContent'>{room.content}</p> 
                            <span key= {index + 3} className='rowDate'> {room.sentAt}</span>
                            
                        </div>
                    ))}
            </div>
        )
    }
}

export default MessageList;
