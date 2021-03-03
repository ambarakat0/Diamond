import React from 'react';
import classes from './TagsButton.css'

const tagButton = props => {
    let cl = classes.Button
    if (props.active) {
        cl = classes.Active
    }
    return (
        <button className={cl} onClick={ props.clicked}>{ props.tagName }</button>
    );
}

export default tagButton