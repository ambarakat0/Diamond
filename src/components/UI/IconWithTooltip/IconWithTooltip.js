/** @format */

import React from 'react';
import classes from './IconWithTooltip.css';
import Icon from '../Icon/Icon';

const icon = (props) => {
	let displayClassesContaineer = [classes.IcContainer];
	if (props.active) {
		displayClassesContaineer.push(classes.activeContainer);
	}

	let iconClasses = classes.Ic;
	if (props.activeClass) iconClasses = classes.active;

	return (
		<div className={classes.Tooltip} onClick={props.clicked}>
			<span className={classes.Tooltiptext}>{props.text}</span>
			<Icon
				classes={iconClasses}
				containerClass={displayClassesContaineer.join(' ')}
				iconname={props.iconName}
			/>
		</div>
	);
};

export default icon;
