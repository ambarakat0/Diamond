import React from 'react';
import classes from './ButtonOutline.css'

const button = props => {
    return(
        <button onClick={props.clicked} type={props.type} className={classes.ButtonOutline}>{props.children}</button>
    );
}

export default button