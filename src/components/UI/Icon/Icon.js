import React from 'react';
import classes from './Icon.css';
import icons from '../../../assets/icons.svg'

const icon = (props) => {
    const  allClasses = [classes.Icon, props.classes]
    const  containerClasses = [classes.IconContainer, props.containerClass]
    return (
        <div onClick={props.clicked} className={containerClasses.join(' ')}>
            <svg className={allClasses.join(' ')}>
                <use href={`${icons}#icon-${ props.iconname }`}></use>
            </svg>
        </div>
	);
};

export default icon;