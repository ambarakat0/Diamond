/** @format */

import React, { useContext, useEffect, useState } from 'react';
import OutlineButton from '../ButtonOutline/ButtonOutline';
import SolidButton from '../Button/Button';
import noProfilePic from '../../../assets/images/noprofilepic.png';

import FlatButton from '../FlatButton/FlatButton';
import Spinner from '../Spinner/Spinner';
import classes from './FollowSugg.css';

import firebase from '../../../components/Firebase/Firebase';

import { authStateContext } from '../../../Global/TrackAuthState';

import { addFollow } from './Follow';

const follow = (props) => {
	const user = useContext(authStateContext).initState;
	const [followList, setFollowList] = useState(null);
	// const [followBtn, setFollowBtn] = useState(false);

	useEffect(() => {
		if (user) {
			let arr = [];
			const asy = async () => {
				await firebase
					.firestore()
					.collection('users')
					.get()
					.then((snapshot) =>
						snapshot.docs.forEach((doc) => {
							if (doc.id !== user.uid) arr.push(doc.data());
						}),
					);

				setFollowList(arr);
			};
			asy();
		}
	}, [user]);

	// const follow = () => {
	// 	setFollowBtn((prevState) => !prevState);
	// 	// addFollow(user.id);
	// };
	if (followList) {
		const followListComp = followList.map((f) => (
			<div className={classes.SingleFollow} key={f.displayName}>
				<div className={classes.FollowDetails}>
					<img
						src={f.imgProfile || noProfilePic}
						alt='user'
						className={classes.Img}
					/>
					<div className={classes.UserName}>
						<h4>{f.userName}</h4>
						<p>{f.displayName}</p>
					</div>
					<OutlineButton className={classes.Button} clicked={follow}>
						Follow
					</OutlineButton>
				</div>
			</div>
		));
		return (
			<div className={classes.Container}>
				<h3 className={classes.Header}>Follow Suggestions</h3>
				{followListComp}
				<FlatButton>See more</FlatButton>
			</div>
		);
	} else {
		return <Spinner />;
	}
};

export default follow;
