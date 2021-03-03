/** @format */

import React from 'react';
import classes from './FlatButton.css';

const flatButton = (props) => {
	return (
		<button
			onClick={props.clicked}
			type={props.type}
			className={classes.Button}
		>
			{props.children}
		</button>
	);
};

export default flatButton;
