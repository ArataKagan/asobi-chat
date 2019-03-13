import React, { Component } from 'react'; 
var moment = require('moment');

class SubmitMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            content : ''
        }
    this.messageRef = this.props.firebase.database().ref('Messages');
    }

    createMessage(e){
        e.preventDefault();
        if(!this.state.content){
            return null
        } else if (this.state.content){
            const currentTime = new Date().getTime();
            this.messageRef.push({
                username : this.props.userInfo ? this.props.userInfo.displayName : 'Guest', 
                content : this.state.content, 
                sentAt : moment(currentTime).format('MMMM Do YYYY, h:mm:ss a'),
                roomId : this.props.roomId
            })
        }
        this.setState({content: ' '});
    }

    onChange(e){
    this.setState({
        content : e.target.value
        });
    }

    render(){
        return(
            <form onSubmit={(e) => this.createMessage(e)} className='submitForm'>
                <textarea rows='2' cols='100' placeholder='Type your message here..' 
                onChange={(e) => this.onChange(e)} 
                value={this.state.content} className='textArea'> </textarea>
                <input type='submit' className='submitBtn'/>
            </form>
        )
    };  
};

export default SubmitMessage; 