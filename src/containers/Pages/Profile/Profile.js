/** @format */

import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import classes from './Profile.css';

import Nav from '../../../components/Nav/Nav';
// import GPost from '../../Posts/GPost/GPost';

import noProfilePic from '../../../assets/images/noprofilepic.png';
import defCover from '../../../assets/images/defCover.jpg';

import firebase from '../../../components/Firebase/Firebase';
import Icon from '../../../components/UI/Icon/Icon';
import ButtonOutline from '../../../components/UI/ButtonOutline/ButtonOutline';
import Button from '../../../components/UI/Button/Button';

import { authStateContext } from '../../../Global/TrackAuthState';

import { uploadData, fetchUserData } from '../../../Shared/handleData';

const profile = (props) => {
	const user = useContext(authStateContext).initState;
	// const uid = props.match.param.id;
	//-------Fetched data from server-----------/////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const [ImgCover, setImgCover] = useState(defCover);
	const [ImgPro, setImgPro] = useState(noProfilePic);
	const [userData, setUserData] = useState(null);
	const [login, setLogin] = useState(false);
	const [signup, setSignup] = useState(false);
	useEffect(() => {
		fetchUserData(user, setUserData);
	}, [user]);

	useEffect(() => {
		if (ImgPro !== noProfilePic) {
			const name = userData.name + '-' + user.uid;
			uploadData(ImgPro, name).then((url) => {
				firebase.firestore().collection('users').doc(user.uid).update({
					imgProfile: url,
				});
			});
		}
	}, [ImgPro]);

	useEffect(() => {
		if (ImgCover !== defCover) {
			const name = userData.name + '-COVER-' + user.uid;
			uploadData(ImgCover, name).then((url) => {
				firebase.firestore().collection('users').doc(user.uid).update({
					imgCover: url,
				});
			});
		}
	}, [ImgCover]);

	const uploadProImgOnChange = (e) => {
		setImgPro(e.target.files[0]);
	};

	const uploadCoverImgOnChange = (e) => {
		setImgCover(e.target.files[0]);
	};

	let redirect = null;
	const onLoginHandler = () => {
		setLogin(true);
	};
	const onSignUpHandler = () => {
		setSignup(true);
	};

	if (login) {
		redirect = <Redirect to='/login' />;
	}
	if (signup) {
		redirect = <Redirect to='/signup' />;
	}

	if (!userData) {
		return (
			<Fragment>
				{redirect}
				<div className={classes.PopupContainer}>
					<p className={classes.PopupText}>{props.text}</p>
					<div className={classes.PopupBtnsContainer}>
						<Button clicked={onLoginHandler}>login</Button>
						<Button clicked={onSignUpHandler}>signUp</Button>
					</div>
				</div>
			</Fragment>
		);
	}

	return (
		<div className={classes.Container}>
			<Nav />
			<div className={classes.Main}>
				<div style={{ textAlign: 'center', position: 'relative' }}>
					<div>
						<label htmlFor='uploadCoverImg'>
							<img
								src={userData.cover ? userData.cover : ImgCover}
								alt='cover'
								className={classes.ImgCover}
							/>
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
							<img
								src={userData.imgPro ? userData.imgPro : ImgPro}
								alt='profile'
								className={classes.Img}
							/>
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
				</div>
			</div>
		</div>
	);
};

export default profile;
