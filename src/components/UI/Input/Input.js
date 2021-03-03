import React from 'react';
import classes from './Input.css'

const input = props => {
    return(
        <input type={props.type} placeholder={props.placeholder} onChange={props.changed} className={classes.Input}></input>
    );
}

export default input