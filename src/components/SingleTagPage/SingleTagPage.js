/** @format */

import React, { useRef } from 'react';
import classes from './SingleTagPage.css';
import Nav from '../Nav/Nav';
import AddPost from '../../containers/AddPost/AddPost';
import Icon from '../UI/Icon/Icon';
import SideBar from '../SideBar/SideBar';

import { title } from '../../Shared/utility';

const tagPage = (props) => {
	const topRef = useRef();

	let name = '';
	if (props.name === 'Home') name = 'Home';
	else name = title(props.name);

	const onClickHandler = () => {
		topRef.current.scrollIntoView({
			behavior: 'smooth',
		});
	};

	return (
		<div className={classes.Container}>
			<Nav clicked={onClickHandler} />
			<div className={classes.Main} ref={topRef}>
				<div className={classes.TagContainer}>
					<div className={classes.Tag}>
						<Icon
							containerClass={classes.IcContainer}
							classes={classes.Icon}
							iconname='price-tag'
						/>
						<h2 className={classes.Text}>{name}</h2>
					</div>
				</div>
				<AddPost />
				{props.posts}
			</div>
			<SideBar />
		</div>
	);
};

export default tagPage;
