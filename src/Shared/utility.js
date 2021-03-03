/** @format */

import firebase from '../components/Firebase/Firebase';

///////////---------------Pure JS -------------//////////

export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties,
	};
};

export const tagsArr = [
	'world',
	'sport',
	'movies',
	'religions',
	'enverionment',
	'tech',
	'sci',
	'novals/books',
	'politics',
];

export const title = (name) => {
	const pathname = name.split('/')[2];
	const title = pathname[0].toUpperCase() + pathname.slice(1);
	return title;
};

export const filterPosts = (posts, tag) => {
	let filteredPosts = [];
	posts.forEach((gp) => {
		if (gp.Tags.includes(tag)) filteredPosts.push(gp);
	});

	return filteredPosts;
};

///////////---------------Connection with server -------------//////////

export const signUpReq = async (userData, dispatch) => {
	try {
		dispatch({ type: 'AUTH_START' });
		await firebase
			.auth()
			.createUserWithEmailAndPassword(userData.email, userData.password)
			.then((res) => {
				return firebase.firestore().collection('users').doc(res.user.uid).set({
					userName: userData.userName,
					displayName: userData.displayName,
					age: userData.age,
					country: userData.country,
				});
			})
			.then((res) => {
				dispatch({
					type: 'AUTH_SUCCESS',
					user: res.user,
				});
			});
	} catch (err) {
		dispatch({
			type: 'AUTH_FAIL',
			error: err,
		});
	}
};

export const loginReq = async (userData, dispatch) => {
	try {
		dispatch({ type: 'AUTH_START' });
		await firebase
			.auth()
			.signInWithEmailAndPassword(userData.email, userData.password)
			.then((res) => {
				dispatch({
					type: 'AUTH_SUCCESS',
					user: res.user,
				});
			});
	} catch (err) {
		dispatch({
			type: 'AUTH_FAIL',
			error: err,
		});
	}
};

let msg = '';
export const handleAuthError = (m) => {
	if (m === 'INVALID_EMAIL') msg = 'Invalid email input';
	if (m === 'INVALID_PASSWORD') msg = 'Incorrect Password';
	if (m === 'EMAIL_NOT_FOUND') msg = 'Incorrect Email';
	if (m === 'EMAIL_EXISTS') msg = 'Email is taken try another one';
	if (m === 'INVALID_EMAIL' || m === 'MISSING_EMAIL')
		msg = 'Invalid email input';
	if (
		m === 'WEAK_PASSWORD : Password should be at least 6 characters' ||
		m === 'MISSING_PASSWORD'
	)
		msg = 'Weak Password, at least 6 characters';
	return msg;
};

export const fetchData = async (arr, setData, setAuth) => {
	try {
		await firebase
			.firestore()
			.collection('Posts')
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					arr.push(doc.data());
				});
			});

		setData(arr);
	} catch (err) {
		setAuth(false);
	}
};

export const fetchUserData = async (user, setUserData) => {
	try {
		const data = new Date(user.metadata.creationTime);
		const year = data.getFullYear();
		const month = data.toLocaleString('default', { month: 'long' });
		const creationDate = `Joined in ${month} ${year}`;
		firebase
			.firestore()
			.collection('users')
			.doc(user.uid)
			.onSnapshot((res) => {
				setUserData({
					name: res.data().userName,
					displayName: res.data().displayName,
					age: res.data().age,
					country: res.data().country,
					creationTime: creationDate,
					imgPro: res.data().imgProfile,
					cover: res.data().imgCover,
				});
			});
	} catch (err) {
		console.log(err.message);
	}
};

export const uploadData = async (data, name) => {
	const img = data;
	const n = name;
	const metadata = {
		contentType: img.type,
	};
	const ref = firebase.storage().ref();

	const task = ref.child(n).put(img, metadata);
	return task.then((snapshot) => snapshot.ref.getDownloadURL());
};
