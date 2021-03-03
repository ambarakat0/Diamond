/** @format */

import React from 'react';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';

import classes from './Search.css';

const search = (props) => {
	return (
		<div className={classes.Search}>
			<Icon iconname='search' containerClass={classes.containerClassSvg} />
			<Input placeholder='search' />
		</div>
	);
};

export default search;
