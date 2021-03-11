/** @format */

import firebase from '../components/Firebase/Firebase';

///////////---------------Pure JS -------------//////////

export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties,
	};
};

export const checkValidity = (value, rules) => {
	let isValid = true;

	if (!rules) {
		return true;
	}
	if (rules.required) {
		isValid = value.trim() !== '' && isValid;
	}
	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}
	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	}
	if (rules.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test(value) && isValid;
	}

	if (rules.isNumeric) {
		const pattern = /^\d+$/;
		isValid = pattern.test(value) && isValid;
	}
	return isValid;
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

export const timeDiffCalc = (last) => {
	const now = new Date();
	let diffInMilliSeconds = Math.abs(now - last) / 1000;

	// calculate days
	const days = Math.floor(diffInMilliSeconds / 86400);
	diffInMilliSeconds -= days * 86400;

	// calculate hours
	const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
	diffInMilliSeconds -= hours * 3600;

	// calculate minutes
	const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
	diffInMilliSeconds -= minutes * 60;

	let difference = '';
	if (days > 0) difference += days === 1 ? `${days} d` : `${days} ds`;

	if (days === 0 && hours >= 1)
		difference += hours === 0 || hours === 1 ? `${hours} h` : `${hours} hs`;
	if (days === 0 && hours === 0 && minutes >= 1)
		difference +=
			minutes === 0 || hours === 1 ? `${minutes} min` : `${minutes} mins`;
	if (minutes === 0 && days === 0 && hours === 0) difference += 'just now';

	return difference;
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

export const fetchData = async (arr, setData) => {
	try {
		firebase
			.firestore()
			.collection('Posts')
			.onSnapshot((snapshot) => {
				snapshot.docs.forEach(async (doc) => {
					await arr.push(doc.data());
					setData(arr.sort((a, b) => b.Time - a.Time));
				});
			});
	} catch (err) {
		console.log('false');
		// setAuth(false);
	}
};

export const fetchUserData = async (user, setUserData, setAuth) => {
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
