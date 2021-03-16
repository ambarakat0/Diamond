/** @format */

import React, { useEffect, useState } from 'react';

import SingleTagPage from '../../../components/SingleTagPage/SingleTagPage';
import SinglePost from '../../Posts/SinglePost/SinglePost';

import { filterPosts, fetchData } from '../../../Shared/utility';

const politics = (props) => {
	const [data, setData] = useState([]);
	useEffect(() => {
		let arr = [];
		fetchData(arr, setData);
	}, []);
	const filteredPosts = filterPosts(data, 'politics');

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

	return <SingleTagPage name={props.location.pathname} posts={posts} />;
};

export default politics;
