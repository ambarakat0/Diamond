/** @format */

import React, { useContext, useEffect, useState } from 'react';
import OutlineButton from '../ButtonOutline/ButtonOutline';
import noProfilePic from '../../../assets/images/noprofilepic.png';

import FlatButton from '../FlatButton/FlatButton';
import Spinner from '../Spinner/Spinner';
import classes from './FollowSugg.css';

import { db } from '../../../components/Firebase/Firebase';

import { authStateContext } from '../../../Global/TrackAuthState';
import { withRouter } from 'react-router';

const follow = (props) => {
	const user = useContext(authStateContext).initState;
	const [followList, setFollowList] = useState(null);
	// const [followBtn, setFollowBtn] = useState(false);

	useEffect(() => {
		if (user) {
			let arr = [];
			const asy = async () => {
				const UserFollowerList = await db
					.collection('users')
					.doc(user.uid)
					.get()
					.then((res) => {
						return [...res.data().followers];
					});
				await db
					.collection('users')
					.get()
					.then((snapshot) =>
						snapshot.docs.forEach((doc) => {
							if (doc.id !== user.uid && !UserFollowerList.includes(doc.id))
								arr.push(doc.data());
						}),
					);

				setFollowList(arr);
			};
			asy();
		}
	}, [user]);

	const follow = async (id) => {
		const followers = await db
			.collection('users')
			.doc(user.uid)
			.get()
			.then((doc) => {
				if (doc.data().followers) return [...doc.data().followers];
				else return [];
			});
		if (followers.includes(id)) {
			return;
		} else {
			const newFollowers = [...followers, id];
			await db
				.collection('users')
				.doc(user.uid)
				.set({ followers: newFollowers }, { merge: true });
			const followings = await db
				.collection('users')
				.doc(id)
				.get()
				.then((doc) => {
					if (doc.data().followings) return [...doc.data().followings];
					else return [];
				});
			const newFollowerings = [...followings, user.uid];
			db.collection('users')
				.doc(id)
				.set({ followings: newFollowerings }, { merge: true });
		}
	};
	const goToOwnerPage = (name) => {
		props.history.push(`/${name}`);
	};
	if (followList) {
		const followListComp = followList.map((f) => (
			<div className={classes.SingleFollow} key={f.displayName}>
				<div className={classes.FollowDetails}>
					<div
						className={classes.ImgContainer}
						onClick={() => goToOwnerPage(f.displayName)}
					>
						<img
							src={f.imgProfile || noProfilePic}
							alt={f.userName}
							className={classes.Img}
						/>
					</div>
					<div className={classes.UserName}>
						<h4 onClick={() => goToOwnerPage(f.displayName)}>{f.userName}</h4>
						<p onClick={() => goToOwnerPage(f.displayName)}>{f.displayName}</p>
					</div>
					<OutlineButton
						className={classes.Button}
						clicked={() => follow(f.id)}
					>
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

export default React.memo(withRouter(follow));
