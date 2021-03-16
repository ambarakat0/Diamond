/** @format */

import React, { Fragment, useEffect, useState } from 'react';

import SingleTagPage from '../../../components/SingleTagPage/SingleTagPage';
import SinglePost from '../../Posts/SinglePost/SinglePost';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { fetchDataNew, fetchDataNextBatch } from '../../../Shared/handleData';

// import { authStateContext } from '../../../Global/TrackAuthState';
// import { Redirect } from 'react-router-dom';

const home = (props) => {
	// const user = useContext(authStateContext).initState;
	const [data, setData] = useState(null);
	const [lastKey, setLastKey] = useState('');
	const [nextPosts_loading, setNextPostsLoading] = useState(false);

	useEffect(() => {
		fetchDataNew()
			.then((res) => {
				setData(res.posts);
				setLastKey(res.lastKey);
			})
			.catch((err) => {
				console.log(err);
			});
		return () => {
			setData(null);
			setLastKey('');
			setNextPostsLoading(false);
		};
	}, [fetchDataNew]);

	// useEffect(() => {
	// 	fetchDataNew(setData, setLastKey);
	// 	return () => {
	// 		setData(null);
	// 		setLastKey('');
	// 		setNextPostsLoading(false);
	// 	};
	// }, [fetchDataNew]);

	const fetchMorePosts = (key) => {
		if (key) {
			setNextPostsLoading(true);
			fetchDataNextBatch(key)
				.then((res) => {
					setLastKey(res.lastKey);
					// add new posts to old posts
					setData(data.concat(res.posts));
					setNextPostsLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setNextPostsLoading(false);
				});
		}
	};

	if (data) {
		const posts = data.map((post) => (
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
			<Fragment>
				<SingleTagPage
					name='Home'
					posts={posts}
					spinner={
						nextPosts_loading ? (
							<div style={{ textAlign: 'center' }}>
								<Spinner />
							</div>
						) : null
					}
					more={() => fetchMorePosts(lastKey)}
				/>
			</Fragment>
		);
	} else {
		let spinner = (
			<div style={{ textAlign: 'center' }}>
				<Spinner />
			</div>
		);
		return (
			<Fragment>
				<SingleTagPage name='Home' posts={spinner} />
			</Fragment>
		);
	}
};

export default home;
