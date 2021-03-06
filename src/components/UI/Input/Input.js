/** @format */

import React from 'react';
import classes from './Input.css';

const input = (props) => {
	const inputClasses = [classes.Input];
	if (!props.isValid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}
	return (
		<input
			type={props.type}
			placeholder={props.placeholder}
			onChange={props.changed}
			className={inputClasses.join(' ')}
		></input>
	);
};

export default input;
