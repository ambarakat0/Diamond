/** @format */

import React from 'react';
import Icon from '../../UI/Icon/Icon';
import { NavLink, withRouter } from 'react-router-dom';
import classes from './Link.css';

const link = (props) => {
	const onClickRedirect = () => {
		props.history.push(props.link);
	};

	let classesArr = [classes.TagContianer];
	if (props.link === props.location.pathname) {
		classesArr.push(classes.active);
	}
	return (
		<li className={classesArr.join(' ')} onClick={onClickRedirect}>
			<Icon iconname='price-tag' containerClass={classes.IconContainer} />
			<NavLink
				to={props.link}
				className={classes.Link}
				activeClassName={classes.active}
			>
				{props.text}
			</NavLink>
		</li>
	);
};

export default withRouter(link);
