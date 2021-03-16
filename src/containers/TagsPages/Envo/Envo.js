/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import SingleTagPage from '../../../components/SingleTagPage/SingleTagPage';
import SinglePost from '../../Posts/SinglePost/SinglePost';

import { filterPosts, fetchData } from '../../../Shared/utility';

const envo = (props) => {
	const [data, setData] = useState([]);
	const [auth, setAuth] = useState(true);
	useEffect(() => {
		let arr = [];
		fetchData(arr, setData, setAuth);
	}, []);

	const filteredPosts = filterPosts(data, 'enverionment');

	const posts = filteredPosts.map((post) => (
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

	let direct = null;
	if (!auth) {
		direct = <Redirect to='/' />;
	}

	return (
		<Fragment>
			{direct}
			<SingleTagPage name={props.location.pathname} posts={posts} />;
		</Fragment>
	);
};

export default envo;
