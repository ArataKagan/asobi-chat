import React, { Component } from 'react'; 


class User extends Component{
  

    logIn = () => {
        console.log('before logged in');
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider).then((result) => {
            this.props.setUser(result.user);
        })
        console.log('after logged in');
    }

    logOut = () => {
        console.log('before logging out');
        this.props.firebase.auth().signOut().then((result) => {
            this.props.setUser('null');
        })
        console.log('after logging out');
    }

    componentDidMount(){
        console.log('before mounted');
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
        console.log('after mounted');
    };


    render(){
        let authButton = this.props.userInfo ? 
            <button className='sign_out_btn' onClick={this.logOut}>Sign Out</button> :
            <button className='sign_in_btn' onClick={this.logIn}>Sign In</button> 

        let userInfo = this.props.userInfo ? 
            <h5>You are logged in as {this.props.userInfo.displayName}</h5> :
            <h5>You are logged in as guest</h5>

        return(
            <div>
                {userInfo}
                {authButton}
            </div>
        );
    }

}

export default User;

