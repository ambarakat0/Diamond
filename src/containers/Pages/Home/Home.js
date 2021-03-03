/** @format */

import React, { Fragment, useEffect, useState } from 'react';

import SingleTagPage from '../../../components/SingleTagPage/SingleTagPage';
import GPost from '../../Posts/GPost/GPost';
import { fetchData } from '../../../Shared/utility';

// import { Gposts } from '../../../Data/GPostData';
import { Redirect } from 'react-router-dom';

const home = (props) => {
	const [data, setData] = useState([]);
	const [auth, setAuth] = useState(true);

	useEffect(() => {
		let arr = [];
		fetchData(arr, setData, setAuth);
	}, [fetchData]);

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
			<SingleTagPage name='Home' posts={posts} />;
		</Fragment>
	);
};

export default home;
