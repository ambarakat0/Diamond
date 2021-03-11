/** @format */

import firebase from '../components/Firebase/Firebase';
import { db } from '../components/Firebase/Firebase';

export const fetchDataNew = async () => {
	try {
		const data = await db
			.collection('Posts')
			.orderBy('Time', 'desc')
			.limit(5)
			.get();
		let lastKey = '';
		let posts = [];
		data.forEach((doc) => {
			posts.push(doc.data());
			lastKey = doc.data().Time;
		});
		return { posts, lastKey };
	} catch (err) {
		console.log('false');
	}
};

export const fetchDataNextBatch = async (key) => {
	try {
		const data = await db
			.collection('Posts')
			.orderBy('Time', 'desc')
			.startAfter(key)
			.limit(5)
			.get();
		let lastKey = '';
		let posts = [];
		data.forEach((doc) => {
			posts.push(doc.data());
			lastKey = doc.data().Time;
		});
		return { posts, lastKey };
	} catch (err) {}
};

export const fetchUserData = (user, setUserData) => {
	if (user) {
		try {
			const data = new Date(user.metadata.creationTime);
			const year = data.getFullYear();
			const month = data.toLocaleString('default', { month: 'long' });
			const creationDate = `Joined in ${month} ${year}`;
			db.collection('users')
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
