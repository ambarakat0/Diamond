/** @format */

import React, { useContext, useEffect, useState } from 'react';

import classes from './LVPost.css';

import { withRouter } from 'react-router';

import { db } from '../../../components/Firebase/Firebase';

import SinglePost from '../SinglePost/SinglePost';
import Nav from '../../../components/Nav/Nav';
import Spinner from '../../../components/UI/Spinner/Spinner';
import IconWithTooltip from '../../../components/UI/IconWithTooltip/IconWithTooltip';
// import TextArea from '../../../components/AddPost/TextArea/TextArea';

import { authStateContext } from '../../../Global/TrackAuthState';

import { timeDiffCalc } from '../../../Shared/utility';

const lvPost = (props) => {
	const user = useContext(authStateContext).initState;

	const [data, setData] = useState(null);
	const [commentsArr, setCommentsArr] = useState([]);

	const [activeUp, setUpActive] = useState(false);
	const [activeDown, setDownActive] = useState(false);
	// const [commentContent, setCommentContent] = useState('');
	const {
		params: { postId },
	} = props.match;

	useEffect(() => {
		db.collection('Posts')
			.where('UserId', '==', postId)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					const data = {
						name: doc.data().Name,
						nickname: doc.data().NickName,
						text: doc.data().Text,
						time: doc.data().Time,
						tags: doc.data().Tags,
						img: doc.data().Img,
						video: doc.data().Video,
						imgC: doc.data().ImgContent,
						share: doc.data().Share.length,
						comment: doc.data().Comment.length,
						like: doc.data().Like.length,
						public: doc.data().Public,
						ownerId: doc.data().UserId,
					};
					setData(data);
				});
				// const arr = [];
				snapshot.forEach((doc) => {
					db.collection('Posts')
						.doc(doc.id)
						.get()
						.then((res) => {
							setCommentsArr(res.data().Comment);
						});
				});
			});
	}, []);

	useEffect(() => {
		if (commentsArr) {
			commentsArr.forEach((comment) => {
				if (comment.upvote.includes(user.uid)) setUpActive(true);
				if (comment.downvote.includes(user.uid)) setDownActive(true);
			});
		}
	}, [commentsArr]);

	const onVoteHandler = async (e, typeOfVote) => {
		const commentId = e.target.closest('div#comment').dataset.id;
		const dataNode = await db
			.collection('Posts')
			.where('UserId', '==', data.ownerId)
			.get();

		dataNode.forEach((doc) => {
			const oldComments = doc.data().Comment;
			const targetComment = doc
				.data()
				.Comment.filter((c) => c.id === commentId);
			const vote = (vote) => {
				let newUpVote = [];
				let newDownVote = [];
				const upvote = targetComment[0].upvote;
				const downvote = targetComment[0].downvote;
				if (vote === 'up') {
					if (upvote.includes(user.uid)) newUpVote = upvote;
					else if (
						upvote.includes(user.uid) === false &&
						downvote.includes(user.uid)
					) {
						newDownVote = newDownVote.filter((dv) => dv !== user.uid);
						newUpVote = upvote ? [...upvote, user.uid] : [user.uid];
					} else {
						newUpVote = upvote ? [...upvote, user.uid] : [user.uid];
						newDownVote = downvote;
					}
				}
				if (vote === 'down') {
					if (downvote.includes(user.uid)) newDownVote = downvote;
					else if (
						downvote.includes(user.uid) === false &&
						upvote.includes(user.uid)
					) {
						newUpVote = upvote.filter((dv) => dv !== user.uid);
						newDownVote = downvote ? [...downvote, user.uid] : [user.uid];
					} else {
						newDownVote = downvote ? [...downvote, user.uid] : [user.uid];
						newUpVote = upvote;
					}
				}

				if (vote === 'reset') {
					newUpVote = upvote.filter((uv) => uv !== user.uid);
					newDownVote = downvote.filter((dv) => dv !== user.uid);
				}
				return [newUpVote, newDownVote];
			};

			const newVote = vote(typeOfVote);
			const newComments = () => {
				const arr = [];
				oldComments.forEach((c) => {
					if (c.id === commentId) {
						c.upvote = newVote[0];
						c.downvote = newVote[1];
						arr.push(c);
					} else {
						arr.push(c);
					}
				});
				return arr;
			};
			db.collection('Posts')
				.doc(doc.id)
				.set({ Comment: newComments() }, { merge: true });
		});
	};

	const goToOwnerPage = () => {
		if (data) {
			props.history.push(`/${data.nickname}`);
		}
	};

	const goToCommentOwnerPage = (name) => {
		props.history.push(`/${name}`);
	};

	if (data && commentsArr) {
		const comments = commentsArr.map((comment, i) => (
			<div
				key={i}
				className={classes.Comment}
				data-id={comment.id}
				id='comment'
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						marginBottom: '1rem',
					}}
				>
					<div className={classes.UserData}>
						<div className={classes.ImgContainer}>
							<img
								src={comment.img}
								alt={comment.name}
								className={classes.Img}
							/>
						</div>
						<div
							style={{
								display: 'flex',
								alignItems: 'start',
								flexDirection: 'column',
							}}
						>
							<h2
								className={classes.UserName}
								onClick={() => goToCommentOwnerPage(comment.nickname)}
							>
								{comment.name}
							</h2>
							<h3
								className={classes.AccountName}
								onClick={() => goToCommentOwnerPage(comment.nickname)}
							>
								{comment.nickname}
							</h3>
						</div>
					</div>
					<div className={classes.Data}>
						<p className={classes.DataText}>
							{timeDiffCalc(new Date(comment.time))}
						</p>
					</div>
				</div>
				<p className={classes.Text}>{comment.text}</p>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div className={classes.ReactIcon}>
						<IconWithTooltip iconName='bubble2' text='Reply' />
					</div>
					<div className={classes.ReactIcon}>
						<IconWithTooltip
							iconName='arrow-up'
							className={classes.Ic}
							text='Upvote'
							activeClass={activeUp}
							clicked={(e) => onVoteHandler(e, 'up')}
						/>
						<span className={classes.ReactText}>
							{comment.upvote ? comment.upvote.length : 0}
						</span>
					</div>
					<div className={classes.ReactIcon}>
						<IconWithTooltip
							iconName={'arrow-down'}
							text='Downvote'
							activeClass={activeDown}
							clicked={(e) => onVoteHandler(e, 'down')}
						/>
						<span className={classes.ReactText}>
							{comment.downvote ? comment.downvote.length : 0}
						</span>
					</div>
					<div className={classes.ReactIcon}>
						<IconWithTooltip
							iconName='loop2'
							text='Rest vote'
							clicked={(e) => onVoteHandler(e, 'reset')}
						/>
						<span className={classes.ReactText}>{props.share}</span>
					</div>
				</div>
			</div>
		));
		return (
			<div className={classes.Container}>
				<Nav />
				<div className={classes.Main}>
					<div className={classes.Onwer} onClick={goToOwnerPage}>
						<h1>{data.nickname}</h1>
					</div>
					<SinglePost
						name={data.name}
						nickname={data.nickname}
						text={data.text}
						time={data.time}
						tags={data.tags}
						img={data.img}
						video={data.video}
						imgC={data.imgC}
						share={data.share}
						comment={data.comment}
						like={data.like}
						public={data.public}
						ownerId={data.ownerId}
					/>
					<ul>{comments}</ul>
				</div>
			</div>
		);
	} else {
		return (
			<div style={{ textAlign: 'center' }}>
				<Spinner />
			</div>
		);
	}
};

export default withRouter(lvPost);
