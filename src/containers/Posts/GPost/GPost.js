/** @format */

import React, { useState, Fragment } from 'react';
import IconWithTooltip from '../../../components/UI/IconWithTooltip/IconWithTooltip';
import Icon from '../../../components/UI/Icon/Icon';
import classes from './GPost.css';
import TextArea from '../../../components/AddPost/TextArea/TextArea';
import Button from '../../../components/UI/Button/Button';
import Popup from '../../../components/UI/Popup/Popup';

import { withRouter } from 'react-router-dom';
// import VideoPlayer from '../../../components/VideoPlayer/VideoPlayer'

const gpost = (props) => {
	const [showComment, setShowComment] = useState(false);
	const [like, setLike] = useState(false);
	const [bookmark, setBookmark] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [commentContent, setCommentContent] = useState('');

	// const videoJsOptions = {
	//     autoplay: true,
	//     controls: true,
	//     sources: [{
	//         src: props.video,
	//         type: 'video/mp4'
	//     }]
	// }

	const onCommentHandler = () => {
		if (!commentContent) setShowComment((prevState) => !prevState);
		else setShowPopup(true);
	};

	const onLikeHandler = () => {
		setLike((prevState) => !prevState);
	};
	const onBookmarkHandler = () => {
		setBookmark((prevState) => !prevState);
	};
	const onChangeHandler = (e) => {
		setCommentContent(e.target.value);
	};
	const onTagClick = (id) => {
		// if (props.location.pathname === '/tags') props.history.push(`${id}`);
		// else props.history.replace(props.link);
		if (props.location.pathname === '/home') props.history.push(`tags/${id}`);
		else props.history.push(`${id}`);
	};

	const tags = props.tags.map((tag) => {
		return (
			<div
				className={classes.Tag}
				key={tag}
				id='yes'
				onClick={() => onTagClick(tag)}
			>
				<Icon
					iconname='price-tag'
					classes={classes.Icon}
					containerClass={classes.IconContainer}
				/>
				<h4 className={classes.TagText}>{tag}</h4>
			</div>
		);
	});

	let ImgContent = null;
	if (props.imgC) {
		ImgContent = (
			<figure className={classes.ImgContentContainer}>
				<img src={props.imgC} alt='add' className={classes.ImgContent} />
			</figure>
		);
	}

	let VideoContent = null;
	if (props.video) {
		VideoContent = (
			// <VideoPlayer {...videoJsOptions}/>
			<div className={classes.Video}>
				<video className={classes.VideoContent} controls>
					<source src={props.video} type='video/mp4' />
					Your browser is not supported
				</video>
			</div>
		);
	}

	let comment = null;
	if (showComment) {
		comment = (
			<div className={classes.Comment}>
				<TextArea
					value={commentContent}
					placeholder='Comment'
					changed={(e) => onChangeHandler(e)}
				/>
				<Button className={classes.AddCommentBtn}>Reply</Button>
			</div>
		);
	}

	const onAction = () => {
		setShowPopup(false);
		setShowComment(false);
		setCommentContent('');
	};

	const onCancel = () => {
		setShowPopup(false);
	};

	let popup = null;
	if (showPopup) {
		popup = (
			<Popup
				text='Discard the comment'
				cta='Discard'
				action={onAction}
				cancel={onCancel}
			/>
		);
	}
	return (
		<Fragment>
			{popup}
			<div className={classes.Container}>
				<div className={classes.First}>
					<div className={classes.TagsContainer}>{tags}</div>
					<div className={classes.More}>
						<IconWithTooltip iconName='equalizer2' text='More' />
					</div>
				</div>
				<div className={classes.Second}>
					<div className={classes.UserData}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<img
								src={props.img}
								alt='Jake Archibald'
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
							<h2 className={classes.UserName}>{props.name}</h2>
							<h3 className={classes.AccountName}>@{props.nickname}</h3>
						</div>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<IconWithTooltip
								iconName={props.public ? 'earth' : 'user-plus'}
								text={
									props.public
										? 'Every one can reply'
										: 'Only who follow you can reply'
								}
							/>
						</div>
					</div>
					<div className={classes.Data}>
						<p className={classes.DataText}>{props.time}</p>
					</div>
				</div>
				<div className={classes.Third}>
					<p className={classes.Text}>{props.text}</p>
					{ImgContent}
					{VideoContent}
				</div>
				<div className={classes.Fourth}>
					<div className={classes.ReactIcon} onClick={onCommentHandler}>
						<IconWithTooltip
							iconName='bubble2'
							className={classes.Ic}
							text='Reply'
						/>
						<span className={classes.ReactText}>{props.comment}</span>
					</div>
					<div className={classes.ReactIcon}>
						<IconWithTooltip iconName='share2' text='Share' />
						<span className={classes.ReactText}>{props.share}</span>
					</div>
					<div className={classes.ReactIcon} onClick={onLikeHandler}>
						<IconWithTooltip
							iconName={like ? 'star-full' : 'star-empty'}
							text={like ? 'unlike' : 'like'}
						/>
						<span className={classes.ReactText}>{props.like}</span>
					</div>
					<div className={classes.ReactIcon} onClick={onBookmarkHandler}>
						<IconWithTooltip
							iconName={bookmark ? 'bookmark' : 'pushpin'}
							text={bookmark ? 'unBookmark' : 'Bookmark'}
						/>
					</div>
				</div>
				{comment}
			</div>
		</Fragment>
	);
};

export default withRouter(gpost);
