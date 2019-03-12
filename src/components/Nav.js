import React from 'react';

const Nav = (props) => {
    const chatTitle = props.chatTitle;
    return (
        <div className='chat-title'>
            {chatTitle ? chatTitle : null}
        </div>
    )
}

export default Nav;