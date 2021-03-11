/** @format */

import React from 'react';
import NavList from './NavList/NavList';
import classes from './Nav.css';
import Logo from '../../assets/images/diamond-logo.png';
import Button from '../UI/Button/Button';

import { withRouter } from 'react-router-dom';

const nav = (props) => {
	const onclickLogo = () => {
		props.history.push('/home');
	};
	return (
		<nav className={classes.Nav}>
			<div className={classes.ImgContainer}>
				<img
					onClick={onclickLogo}
					className={classes.Img}
					src={Logo}
					alt='logo'
				/>
			</div>
			<NavList />
			<div className={classes.ButtonContainer}>
				<Button clicked={props.clicked}>Diamond</Button>
			</div>
		</nav>
	);
};

export default withRouter(nav);
