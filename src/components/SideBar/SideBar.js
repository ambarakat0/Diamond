/** @format */

import React from 'react';
import Search from '../UI/Search/Search';
import FollowList from '../UI/FollowSugg/FollowSugg';
import classes from './SideBar.css';

const sideBar = (props) => {
	return (
		<div className={classes.SideBarContainer}>
			<Search />
			<FollowList />
		</div>
	);
};

export default sideBar;
