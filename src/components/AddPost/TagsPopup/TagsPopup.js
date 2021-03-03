import React from 'react';
import classes from './TagsPopup.css'
import TagsButton from '../TagsButton/TagsButton'
import {tagsArr} from '../../../Shared/utility'

const popup = props => {
    const popupContainer = tagsArr.map(tag => (
        <TagsButton key={tag} tagName={tag} clicked={props.clicked}/>
    ))
    return (
        <div className={classes.Popup}>{popupContainer}</div>
    );
}

export default popup