/** @format */

import React from 'react';
import classes from './ToolTip.css';

const toolTip = (props) => {
	return (
		<div>
			<p>
				{' '}
				<span className={classes.Tool} data-tip='By adding' tabIndex='1'>
					Comment
				</span>
			</p>
		</div>
	);
};

export default toolTip;
