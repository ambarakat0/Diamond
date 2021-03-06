/** @format */

import firebase from '../components/Firebase/Firebase';

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
