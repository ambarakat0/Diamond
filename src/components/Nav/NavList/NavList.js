/** @format */

import React, { Fragment, useContext, useState } from 'react';
import NavItem from '../NavItem/NavItem';
import classes from './NavList.css';
import TagsContainer from '../../TagsContainer/TagsContainer';
import Icon from '../../../components/UI/Icon/Icon';
import { withRouter } from 'react-router-dom';

import { authStateContext } from '../../../Global/TrackAuthState';

const navlist = (props) => {
	const [open, setOpen] = useState(false);
	const user = useContext(authStateContext).initState;

	const onOpenHandler = () => {
		setOpen((prevState) => !prevState);
	};

	const tagsHash = props.match.path.split('/')[1];
	let classesCollection = [classes.NavItem];
	if (tagsHash === 'tags') {
		classesCollection.push(classes.active);
	}

	return (
		<Fragment>
			<ul className={classes.List}>
				<NavItem link='/home' iconName='home'>
					Home
				</NavItem>
				<NavItem link='/notification' iconName='bell'>
					Notification
				</NavItem>
				<NavItem link='/chat' iconName='bubbles'>
					Chat
				</NavItem>
				<li onClick={onOpenHandler} className={classesCollection.join(' ')}>
					<Icon iconname='price-tags' />
					<span>Tags</span>
				</li>
				<NavItem link='/bookmarks' iconName='pushpin'>
					Pin
				</NavItem>
				{user ? (
					<NavItem link={`/profile/${user.uid}`} iconName='user'>
						Profile
					</NavItem>
				) : (
					<NavItem link={`/profile/`} iconName='user'>
						Profile
					</NavItem>
				)}
				<NavItem link='/settings' iconName='cog'>
					Settings
				</NavItem>
				<NavItem link='/logout' iconName='exit'>
					Log out
				</NavItem>
			</ul>
			{open && <TagsContainer />}
		</Fragment>
	);
};

export default withRouter(navlist);
