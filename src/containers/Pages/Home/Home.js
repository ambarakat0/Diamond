/** @format */

import React, { Fragment, useContext, useEffect, useState } from 'react';

import SingleTagPage from '../../../components/SingleTagPage/SingleTagPage';
import GPost from '../../Posts/GPost/GPost';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { fetchData } from '../../../Shared/handleData';

// import { Gposts } from '../../../Data/GPostData';

import { authStateContext } from '../../../Global/TrackAuthState';
// import { Redirect } from 'react-router-dom';

const home = (props) => {
	const user = useContext(authStateContext).initState;
	const [data, setData] = useState(null);
	// const [auth, setAuth] = useState(true);
	useEffect(() => {
		let arr = [];
		fetchData(arr, setData);
	}, [fetchData, user]);

	if (data) {
		const posts = data.map((post) => (
			<GPost
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
				{/* {direct} */}
				<SingleTagPage name='Home' posts={posts} />;
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
				<SingleTagPage name='Home' posts={spinner} />;
			</Fragment>
		);
	}

	// let direct = null;
	// if (!user) {
	// 	return (direct = <Redirect to='/' />);
	// }
};

export default home;
