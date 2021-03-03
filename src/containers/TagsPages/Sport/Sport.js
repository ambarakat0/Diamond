/** @format */

import React, { useEffect, useState } from 'react';

import SingleTagPage from '../../../components/SingleTagPage/SingleTagPage';
import GPost from '../../Posts/GPost/GPost';

import { filterPosts, fetchData } from '../../../Shared/utility';

const sport = (props) => {
	const [data, setData] = useState([]);
	useEffect(() => {
		let arr = [];
		fetchData(arr, setData);
	}, []);
	const filteredPosts = filterPosts(data, 'sport');

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

	return <SingleTagPage name={props.location.pathname} posts={posts} />;
};

export default sport;
