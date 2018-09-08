import React, { Component } from 'react'; 
var moment = require('moment');

class SubmitMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            content : '',
        }
    this.messageRef = this.props.firebase.database().ref('Messages');
    
    }

    newMessage(e){
        e.preventDefault();
        console.log(e);
        if(!this.state.content){
            return null
        } else if (this.state.content){
            this.messageRef.push({
                username : this.props.userInfo ? this.props.userInfo.displayName : 'Guest', 
                content : this.state.content, 
                sentAt : moment(this.props.firebase.database.ServerValue.TIMESTAMP).utcOffset(60).format('YYYY-MM-DD HH:mm'),
                roomId : this.props.roomId
            })
        } 
    }

    onChange(e){
    this.setState({
        content : e.target.value
        });
    }

    render(){
        return(
            <form onSubmit={(e) => this.newMessage(e)}>
                <textarea rows='4' cols='100' placeholder='Type your message here..' 
                onChange={(e) => this.onChange(e)} 
                value={this.state.content}> </textarea>
                <input type='submit' />
            </form>
        )
    };  
};

export default SubmitMessage; 