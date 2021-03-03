import React from 'react';
import classes from './Button.css'

const button = props => {
    return(
        <button disabled={props.disabled} onClick={props.clicked} type={props.type} className={classes.Button}>{props.children}</button>
    );
}

export default button