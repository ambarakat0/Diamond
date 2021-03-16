/** @format */

import React, { useContext, useEffect, useState } from 'react';
import OutlineButton from '../ButtonOutline/ButtonOutline';
import noProfilePic from '../../../assets/images/noprofilepic.png';

import FlatButton from '../FlatButton/FlatButton';
import Spinner from '../Spinner/Spinner';
import classes from './FollowSugg.css';

import firebase from '../../../components/Firebase/Firebase';

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

export default React.memo(withRouter(follow));
