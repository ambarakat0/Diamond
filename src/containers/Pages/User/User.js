/** @format */

import React, { useState, useEffect, Fragment, useRef } from 'react';
// import { Redirect } from 'react-router-dom';

import classes from './User.css';

import Nav from '../../../components/Nav/Nav';
import SinglePost from '../../Posts/SinglePost/SinglePost';
import AddPost from '../../AddPost/AddPost';

import Icon from '../../../components/UI/Icon/Icon';
import ButtonOutline from '../../../components/UI/ButtonOutline/ButtonOutline';
// import Button from '../../../components/UI/Button/Button';
import FlatButton from '../../../components/UI/FlatButton/FlatButton';
import Spinner from '../../../components/UI/Spinner/Spinner';

import { fetchDataNew, fetchDataNextBatch } from '../../../Shared/handleData';

import { db } from '../../../components/Firebase/Firebase';

import noProfilePic from '../../../assets/images/noprofilepic.png';
import defCover from '../../../assets/images/defCover.jpg';

const user = (props) => {
	const topRef = useRef();

	const [userData, setUserData] = useState(null);
	const {
		params: { userId },
	} = props.match;

	//-------Fetched data from server-----------/////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const [posts, setPosts] = useState(null);
	const [lastKey, setLastKey] = useState('');
	const [nextPosts_loading, setNextPostsLoading] = useState(false);
	console.log(userId);
	useEffect(() => {
		db.collection('users')
			.where('displayName', '==', userId)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					db.collection('users')
						.doc(doc.id)
						.get()
						.then((res) => {
							setUserData({
								name: res.data().userName,
								displayName: res.data().displayName,
								age: res.data().age,
								country: res.data().country,
								creationTime: res.data().creationDate,
								imgPro: res.data().imgProfile,
								cover: res.data().imgCover,
							});
						});
				});
			});
	}, []);
	useEffect(() => {
		if (userData) {
			fetchDataNew()
				.then((res) => {
					setPosts(
						res.posts.filter((p) => p.NickName === userData.displayName),
					);
					setLastKey(res.lastKey);
				})
				.catch((err) => {
					console.log(err);
				});
			return () => {
				setPosts(null);
				setLastKey('');
				setNextPostsLoading(false);
			};
		}
	}, [fetchDataNew, userData]);

	const fetchMorePosts = (key) => {
		if (key) {
			setNextPostsLoading(true);
			fetchDataNextBatch(key)
				.then((res) => {
					setLastKey(res.lastKey);
					// add new posts to old posts
					setPosts(
						posts.concat(
							res.posts.filter((p) => p.NickName === userData.displayName),
						),
					);
					setNextPostsLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setNextPostsLoading(false);
				});
		}
	};

	const onClickHandler = () => {
		topRef.current.scrollIntoView({
			behavior: 'smooth',
		});
	};

	if (posts) {
		const data = posts.map((post) => (
			<SinglePost
				key={`${post.NickName}-${Math.random(20000)}`}
				name={post.Name}
				nickname={post.NickName}
				text={post.Text}
				time={post.Time}
				tags={post.Tags}
				img={post.Img}
				video={post.Video}
				imgC={post.ImgContent}
				share={post.Share.length}
				comment={post.Comment.length}
				like={post.Like.length}
				public={post.Public}
				ownerId={post.UserId}
			/>
		));
		return (
			<div className={classes.Container}>
				<Nav />
				<div className={classes.Main}>
					<div
						style={{ textAlign: 'center', position: 'relative' }}
						ref={topRef}
					>
						<div className={classes.ImgCoverContainer}>
							<img
								src={userData.cover ? userData.cover : defCover}
								alt='cover'
								className={classes.ImgCover}
							/>
						</div>
						<div>
							<img
								src={userData.imgPro ? userData.imgPro : noProfilePic}
								alt='profile'
								className={classes.Img}
							/>
						</div>
					</div>
					<div className={classes.Data}>
						<div className={classes.NameAndBtn}>
							<div className={classes.Names}>
								<h2 className={classes.UserName}>{userData.name}</h2>
								<h3 className={classes.NickName}>{userData.displayName}</h3>
							</div>
							<ButtonOutline>Edit profile</ButtonOutline>
						</div>
						<div className={classes.MisData}>
							<div>
								<Icon
									iconname='calendar'
									containerClass={classes.containerClass}
								/>
								<p className={classes.Age}>{userData.age}</p>
							</div>
							<div>
								<Icon iconname='mug' containerClass={classes.containerClass} />
								<p className={classes.CreationTime}>{userData.creationTime}</p>
							</div>
							<div>
								<Icon
									iconname='location'
									containerClass={classes.containerClass}
								/>
								<p className={classes.Country}>{userData.country}</p>
							</div>
						</div>
					</div>
					<AddPost />
					{data}
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<FlatButton clicked={() => fetchMorePosts(lastKey)}>
							More
						</FlatButton>
						{nextPosts_loading ? <Spinner /> : null}
						<FlatButton clicked={onClickHandler}>Back to top</FlatButton>
					</div>
				</div>
			</div>
		);
	} else
		return (
			<Fragment>
				<div className={classes.Container}>
					<Nav />
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							justifySelf: 'center',
						}}
					>
						<Spinner />
					</div>
				</div>
			</Fragment>
		);
};

export default user;
