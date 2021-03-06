/** @format */

import React, { useEffect, useState, useContext } from 'react';
import classes from './AddPost.css';
import TextArea from '../../components/AddPost/TextArea/TextArea';
import Button from '../../components/UI/Button/Button';
import PopupTags from '../../components/AddPost/TagsPopup/TagsPopup';
import Popup from '../../components/UI/Popup/Popup';
import IconWithToolTip from '../../components/UI/IconWithTooltip/IconWithTooltip';
import Emoji from '../../components/AddPost/Emoji/Emoji';
import Spinner from '../../components/UI/Spinner/Spinner';

import noProfilePic from '../../assets/images/noprofilepic.png';

import firebase from '../../components/Firebase/Firebase';

import { authStateContext } from '../../Global/TrackAuthState';

const home = React.memo((props) => {
	const user = useContext(authStateContext).initState;
	//-------local state-----------/////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const [userData, setUserData] = useState({});
	const [uploadedData, setUploadedData] = useState(null);
	const [postData, setPostData] = useState('');
	const [imgContent, setImgContent] = useState(null);
	const [tagArr, setTagArr] = useState([]);
	const [chosenEmoji, setChosenEmoji] = useState(null);

	//////----state UI-----////
	const [toggleAddPostBox, setToggleAddPostBox] = useState(false);
	const [whoCanSee, setHowCanSee] = useState(true);
	const [showEmoji, setShowEmoji] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [showSpinner, setShowSpinner] = useState(false);
	const [tagBox, setTagBox] = useState(false);

	//------- useffect hooks-----------/////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (chosenEmoji) {
			setPostData((prevState) => prevState + chosenEmoji.emoji);
		}
	}, [chosenEmoji]);
	// Fetched data from server
	useEffect(() => {
		if (user) {
			firebase
				.firestore()
				.collection('users')
				.doc(user.uid)
				.get()
				.then((res) => {
					setUserData({
						name: res.data().userName,
						displayName: res.data().displayName,
						img: res.data().imgProfile,
					});
				});
		}
	}, [user]);

	//------pointer (useRef)-----------//

	//------- Function-----------/////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	///////////---------------Action functions-------------//////////
	const onPublishHandler = () => {
		setShowSpinner(true);
		let p = {
			Name: userData.name,
			NickName: userData.displayName,
			Img: userData.img,
			Text: postData,
			Tags: tagArr,
			Time: new Date().getTime(),
			Public: whoCanSee,
			ImgContent: imgContent,
			UserId: `${user.uid}-${new Date().getTime()}`,
			Comment: [],
			Like: [],
			Share: [],
		};
		firebase
			.firestore()
			.collection('Posts')
			.add(p)
			.then(() => {
				setShowSpinner(false);
				setPostData('');
				setToggleAddPostBox(false);
				setImgContent(null);
			});
		firebase
			.firestore()
			.collection('users')
			.doc(user.uid)
			.collection('posts')
			.add(p)
			.then(() => {});
	};

	const onAddTagsHandler = (e) => {
		if (tagArr.length === 3) return;
		setTagArr(Array.from(new Set([...tagArr, e.target.textContent])));
	};

	const onRemoveTag = (e) => {
		if (e.target.id) {
			setTagArr(tagArr.filter((tag) => tag !== e.target.id));
		}
		if (e.target.textContent) {
			setTagArr(tagArr.filter((tag) => tag !== e.target.textContent));
		}
	};

	const onAction = () => {
		setToggleAddPostBox(false);
		setShowPopup(false);
		setPostData('');
	};

	const onCancel = () => {
		setShowPopup(false);
	};

	const onPosttHandler = () => {
		if (!postData) setToggleAddPostBox((prevstate) => !prevstate);
		else setShowPopup(true);
	};

	///////////---------------state functions-------------//////////
	const uploadInputOnChange = (e) => {
		setUploadedData(e.target.files[0]);
		console.log(e.target.files[0]);
	};

	const onChangeHandler = (e) => {
		setPostData(e.target.value);
	};

	const onEmojiClick = async (e, emojiObject) => {
		setChosenEmoji(emojiObject);
	};

	const onShowEmoji = () => {
		setShowEmoji((prevState) => !prevState);
	};

	const manageSeePrivite = () => {
		setHowCanSee(false);
	};

	const manageSeePublic = () => {
		setHowCanSee(true);
	};

	const togglePopup = () => {
		setTagBox((prevState) => !prevState);
	};

	//------- Conditons-----------/////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// upload inputed img to server
	if (uploadedData) {
		setShowSpinner(true);
		const ref = firebase.storage().ref();

		const img = uploadedData;
		const name = img.name + '-' + user.uid;
		const metadata = {
			contentType: img.type,
		};
		const task = ref.child(name).put(img, metadata);
		task
			.then((snapshot) => snapshot.ref.getDownloadURL())
			.then((url) => {
				setShowSpinner(false);
				setImgContent(url);
			});
		setUploadedData(null);
	}

	///////////---------------manage UI -------------//////////
	//--popup--//
	let popupEl = null;
	if (tagBox) {
		popupEl = <PopupTags clicked={onAddTagsHandler} tagArr={tagArr} />;
	}

	//--Tag container--//
	let tagContainer = tagArr.map((tag) => (
		<div
			key={tag}
			id={tag}
			className={classes.TagContainer}
			onClick={onRemoveTag}
		>
			<h3>{tag}</h3>
		</div>
	));

	//--emoji container--//
	let emoji = null;
	if (showEmoji) {
		emoji = <Emoji onEmojiClick={onEmojiClick} />;
	}

	//--UI of Pulbish button--//
	let disabled = '';
	if (tagArr.length >= 1 && postData && !showSpinner) disabled = false;
	else disabled = true;

	//--UI of Spinner--//
	let spinner = null;
	if (showSpinner) {
		spinner = <Spinner />;
	}

	//--UI of popup--//
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

	//--UI of acutall addpost--//
	let ImgContent = null;
	if (imgContent) {
		ImgContent = (
			<figure className={classes.ImgContentContainer}>
				<img src={imgContent} alt='add' className={classes.ImgContent} />
			</figure>
		);
	}

	let addPostBox = null;
	if (toggleAddPostBox) {
		addPostBox = (
			<div className={classes.Content}>
				{spinner}
				<div className={classes.FirstRow}>
					<img
						className={classes.Img}
						src={userData.img || noProfilePic}
						alt='user'
					/>
					<div className={classes.SeeContainer}>
						<IconWithToolTip
							text='Every one can reply'
							iconName='earth'
							active={whoCanSee}
							clicked={manageSeePublic}
						/>
						<IconWithToolTip
							clicked={manageSeePrivite}
							text='Only who follow you can reply'
							iconName='user-plus'
							active={!whoCanSee}
						/>
					</div>
					{tagContainer}
				</div>
				<div className={classes.SecondRow}>
					<TextArea
						value={postData}
						changed={onChangeHandler}
						placeholder='Share your moment'
					/>
				</div>
				<div className={classes.ThirdRow}>
					<div>
						<label htmlFor='upload'>
							<IconWithToolTip text='Insert photo or video' iconName='image' />
						</label>
						<input
							style={{ display: 'none' }}
							type='file'
							id='upload'
							onChange={(e) => uploadInputOnChange(e)}
						></input>
					</div>
					<IconWithToolTip text='emoji' iconName='wink' clicked={onShowEmoji} />
					<IconWithToolTip text='Insert Poll' iconName='list2' />
					{emoji}
				</div>
				<div className={classes.FourthRow}>
					<div className={classes.TextContainer}>
						<h4 className={classes.Main}>Add tags</h4>
						<p className={classes.Sub}>at least one and upto three</p>
					</div>
					{/* <Select options={[{ value: 1, displayValue: "Sport" }, { value: 2, displayValue: "Tech" }, { value: 3, displayValue: "Politics" }]} /> */}
					<IconWithToolTip
						className={classes.four}
						text={tagBox ? 'Close tags' : 'Open tags'}
						iconName={tagBox ? 'circle-up' : 'circle-down'}
						clicked={togglePopup}
					/>
					<div className={classes.ButtonContainer}>
						<Button clicked={onPublishHandler} disabled={disabled}>
							Publish
						</Button>
					</div>
				</div>
				{popupEl}
				{ImgContent}
			</div>
		);
	}

	return (
		<div className={classes.Container}>
			{popup}
			<div style={{ textAlign: 'center' }}>
				<IconWithToolTip
					text='Share your moment'
					iconName={toggleAddPostBox ? 'circle-up' : 'circle-down'}
					clicked={onPosttHandler}
				/>
			</div>
			{addPostBox}
		</div>
	);
});

export default home;
