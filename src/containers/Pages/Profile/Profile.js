/** @format */

import React, {
	useState,
	useContext,
	useEffect,
	Fragment,
	useRef,
} from 'react';
// import { Redirect } from 'react-router-dom';

import classes from './Profile.css';

import Nav from '../../../components/Nav/Nav';
import SinglePost from '../../Posts/SinglePost/SinglePost';
import AddPost from '../../AddPost/AddPost';

import noProfilePic from '../../../assets/images/noprofilepic.png';
import defCover from '../../../assets/images/defCover.jpg';

import { db } from '../../../components/Firebase/Firebase';
import Icon from '../../../components/UI/Icon/Icon';
import IconWithTooltip from '../../../components/UI/IconWithTooltip/IconWithTooltip';
import ButtonOutline from '../../../components/UI/ButtonOutline/ButtonOutline';
// import Button from '../../../components/UI/Button/Button';
import TextArea from '../../../components/AddPost/TextArea/TextArea';
import FlatButton from '../../../components/UI/FlatButton/FlatButton';
import Spinner from '../../../components/UI/Spinner/Spinner';

import { authStateContext } from '../../../Global/TrackAuthState';

import {
	uploadData,
	fetchUserData,
	fetchDataNew,
	fetchDataNextBatch,
} from '../../../Shared/handleData';

const profile = (props) => {
	const topRef = useRef();
	const keyRef = useRef();
	const user = useContext(authStateContext).initState;
	//-------Fetched data from server-----------/////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const [ImgCover, setImgCover] = useState(defCover);
	const [ImgPro, setImgPro] = useState(noProfilePic);
	const [bio, setBio] = useState('');
	const [toggleBio, setToggleBio] = useState(false);
	const [userData, setUserData] = useState(null);
	// const [login, setLogin] = useState(false);
	// const [signup, setSignup] = useState(false);

	const [posts, setPosts] = useState(null);
	const [lastKey, setLastKey] = useState('');
	const [nextPosts_loading, setNextPostsLoading] = useState(false);

	useEffect(() => {
		fetchUserData(user, setUserData);
	}, [user]);

	useEffect(() => {
		if (userData) {
			fetchDataNew()
				.then((res) => {
					setPosts(
						res.posts.filter((p) => p.NickName === userData.displayName),
					);
					setLastKey(res.lastKey);
					keyRef.current = res.lastKey;
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

	useEffect(() => {
		if (ImgPro !== noProfilePic) {
			const name = userData.name + '-' + user.uid;
			uploadData(ImgPro, name).then((url) => {
				db.collection('users').doc(user.uid).update({
					imgProfile: url,
				});
			});
		}
	}, [ImgPro]);

	useEffect(() => {
		if (ImgCover !== defCover) {
			const name = userData.name + '-COVER-' + user.uid;
			uploadData(ImgCover, name).then((url) => {
				db.collection('users').doc(user.uid).update({
					imgCover: url,
				});
			});
		}
	}, [ImgCover]);
	const fetchMorePosts = (key) => {
		if (key === keyRef.current) console.log('same');
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

	const uploadProImgOnChange = (e) => {
		setImgPro(e.target.files[0]);
	};

	const uploadCoverImgOnChange = (e) => {
		setImgCover(e.target.files[0]);
	};

	// let redirect = null;
	// const onLoginHandler = () => {
	// 	setLogin(true);
	// };
	// const onSignUpHandler = () => {
	// 	setSignup(true);
	// };

	// if (login) {
	// 	redirect = <Redirect to='/login' />;
	// }
	// if (signup) {
	// 	redirect = <Redirect to='/signup' />;
	// }

	// if (!userData) {
	// 	return (
	// 		<Fragment>
	// 			{redirect}
	// 			<div className={classes.PopupContainer}>
	// 				<p className={classes.PopupText}>{props.text}</p>
	// 				<div className={classes.PopupBtnsContainer}>
	// 					<Button clicked={onLoginHandler}>login</Button>
	// 					<Button clicked={onSignUpHandler}>signUp</Button>
	// 				</div>
	// 			</div>
	// 		</Fragment>
	// 	);
	// }
	const onAddBioHandler = async () => {
		if (bio) {
			await db.collection('users').doc(user.uid).set(
				{
					bio: bio,
				},
				{ merge: true },
			);
			setBio('');
			setToggleBio(false);
		}
	};

	const onClickHandler = () => {
		topRef.current.scrollIntoView({
			behavior: 'smooth',
		});
	};

	const onOpenBio = () => {
		setToggleBio((prevState) => !prevState);
	};
	const onBioChangeHandler = (e) => {
		setBio(e.target.value);
	};
	let howAreYou = null;
	if (toggleBio) {
		howAreYou = (
			<div>
				<TextArea
					value={bio}
					placeholder='how are ya? :D'
					changed={onBioChangeHandler}
				/>
			</div>
		);
	}

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
				<Nav style={classes.Nav} />
				<div className={classes.Main}>
					<div
						style={{ textAlign: 'center', position: 'relative' }}
						ref={topRef}
					>
						<div>
							<label htmlFor='uploadCoverImg'>
								<div className={classes.ImgCoverContainer}>
									<img
										src={userData.cover ? userData.cover : ImgCover}
										alt='cover'
										className={classes.ImgCover}
									/>
								</div>
							</label>
							<input
								type='file'
								id='uploadCoverImg'
								onChange={(e) => uploadCoverImgOnChange(e)}
								style={{ display: 'none' }}
							></input>
						</div>
						<div>
							<label htmlFor='uploadProImg'>
								<div className={classes.ImgContainer}>
									<img
										src={userData.imgPro ? userData.imgPro : ImgPro}
										alt='profile'
										className={classes.Img}
									/>
								</div>
							</label>
							<input
								type='file'
								id='uploadProImg'
								onChange={(e) => uploadProImgOnChange(e)}
								style={{ display: 'none' }}
							></input>
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
						<div>
							{userData.bio ? (
								<p className={classes.Bio}>{userData.bio}</p>
							) : (
								<div>
									<IconWithTooltip
										iconName='quotes-left'
										text='open bio'
										clicked={onOpenBio}
									/>
									<IconWithTooltip
										iconName='checkmark'
										text='Add bio'
										clicked={onAddBioHandler}
									/>
								</div>
							)}
							{howAreYou}
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
						<div className={classes.MisData}>
							<div style={{ cursor: 'pointer' }}>
								<p className={classes.CreationTime}>
									Followers {userData.followers ? userData.followers.length : 0}
								</p>
							</div>
							<div style={{ cursor: 'pointer' }}>
								<p className={classes.CreationTime}>
									Followings{' '}
									{userData.followings ? userData.followings.length : 0}
								</p>
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
			<div
				style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
			>
				<Spinner />
			</div>
		);
};

export default profile;
