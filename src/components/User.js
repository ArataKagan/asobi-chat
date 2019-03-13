import React, { Component } from 'react'; 
class User extends Component{

    logIn = () => {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider).then((result) => {
            this.props.setUser(result.user);
        })
    }

    logOut = () => {
        this.props.firebase.auth().signOut().then((result) => {
            this.props.setUser('null');
        })
    }

    componentDidMount(){
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    };


    render(){
        let authButton = this.props.userInfo ? 
            <button className='sign_in_out_btn' onClick={this.logOut}>Sign Out</button> :
            <button className='sign_in_out_btn' onClick={this.logIn}>Sign In</button> 

        let userInfo = this.props.userInfo ? 
            <p>{this.props.userInfo.displayName}</p> :
            <p>Guest</p>

        return(
            <div className = 'user_authentication'>
                <div id='auth_info'>
                    {userInfo}
                </div>
                <div id='auth_botton'>
                    {authButton}
                </div>
            </div>
        );
    }

}

export default User;

