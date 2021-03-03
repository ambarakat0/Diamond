/** @format */

import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import SingleTagPage from '../../../components/SingleTagPage/SingleTagPage';
import GPost from '../../Posts/GPost/GPost';

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
		<GPost
			key={post.NickName}
			name={post.Name}
			nickname={post.NickName}
			text={post.Text}
			time={post.Time}
			tags={post.Tags}
			img={post.Img}
			video={post.Video}
			imgC={post.ImgContent}
			share={post.Share}
			comment={post.Comment}
			like={post.Like}
			public={post.Public}
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
