import React from 'react'
import Picker from 'emoji-picker-react';
import classes from './Emoji.css'

const emoji = props => {
   
    return (
        <div className={classes.Emoji}>
            <Picker onEmojiClick={props.onEmojiClick} />
        </div>
    );
}

export default emoji