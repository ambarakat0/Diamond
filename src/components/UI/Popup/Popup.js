/** @format */

import React from 'react';
import Button from '../Button/Button';
import classes from './Popup.css';

const popup = (props) => {
	return (
		<div className={classes.Container}>
			<div className={classes.PopupContainer}>
				<p className={classes.PopupText}>{props.text}</p>
				<div className={classes.PopupBtnsContainer}>
					<Button clicked={props.action}>{props.cta}</Button>
					<Button clicked={props.cancel}>Cancel</Button>
				</div>
			</div>
		</div>
	);
};

export default popup;
