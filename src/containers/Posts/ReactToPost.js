/** @format */

import firebase from '../../components/Firebase/Firebase';

export const addCommentOrShare = async (
	ownerOfData,
	datapassed,
	typeOfAction,
) => {
	try {
		let dataToChange = null;
		await firebase
			.firestore()
			.collection('Posts')
			.where('UserId', '==', ownerOfData)
			.get()
			.then((snapshot) =>
				snapshot.forEach((doc) => {
					firebase
						.firestore()
						.collection('Posts')
						.doc(doc.id)
						.get()
						.then((doc) => {
							if (typeOfAction === 'Comment') {
								dataToChange = doc.data().Comment;
								firebase
									.firestore()
									.collection('Posts')
									.where('UserId', '==', ownerOfData)
									.get()
									.then((snapshot) => {
										snapshot.forEach((doc) => {
											firebase
												.firestore()
												.collection('Posts')
												.doc(doc.id)
												.set(
													{
														Comment: [
															...dataToChange,
															{
																id: datapassed.uid,
																img: datapassed.imgPro,
																text: datapassed.text,
															},
														],
													},
													{ merge: true },
												);
										});
									});
							} else {
								dataToChange = doc.data().Share;
								firebase
									.firestore()
									.collection('Posts')
									.where('UserId', '==', ownerOfData)
									.get()
									.then((snapshot) => {
										snapshot.forEach((doc) => {
											firebase
												.firestore()
												.collection('Posts')
												.doc(doc.id)
												.set(
													{
														Share: [
															...dataToChange,
															{
																id: datapassed.uid,
																img: datapassed.imgPro,
															},
														],
													},
													{ merge: true },
												);
										});
									});
							}
						});
				}),
			);
	} catch (err) {
		console.log(err);
	}
};

export const toggleLike = (ownerOfData, datapassed) => {
	try {
		firebase
			.firestore()
			.collection('Posts')
			.where('UserId', '==', ownerOfData)
			.get()
			.then((snapshot) =>
				snapshot.forEach((doc) => {
					firebase
						.firestore()
						.collection('Posts')
						.doc(doc.id)
						.get()
						.then((doc) => {
							if (doc.data().Like.includes(datapassed.uid)) {
								firebase
									.firestore()
									.collection('Posts')
									.where('UserId', '==', ownerOfData)
									.get()
									.then((snapshot) => {
										snapshot.forEach((doc) => {
											let data = doc
												.data()
												.Like.filter((like) => like !== datapassed.uid);
											firebase
												.firestore()
												.collection('Posts')
												.doc(doc.id)
												.update({
													Like: data,
												});
										});
									});
							} else {
								firebase
									.firestore()
									.collection('Posts')
									.where('UserId', '==', ownerOfData)
									.get()
									.then((snapshot) => {
										snapshot.forEach((doc) => {
											let data = doc.data().Like;
											let newData = [...data, datapassed.uid];
											firebase
												.firestore()
												.collection('Posts')
												.doc(doc.id)
												.update({
													Like: newData,
												});
										});
									});
							}
						});
				}),
			);
	} catch (err) {
		console.log(err);
	}
};

export const displayLikeStar = (ownerOfData, uid, setLike) => {
	try {
		firebase
			.firestore()
			.collection('Posts')
			.where('UserId', '==', ownerOfData)
			.get()
			.then((snapshot) =>
				snapshot.forEach((doc) => {
					firebase
						.firestore()
						.collection('Posts')
						.doc(doc.id)
						.get()
						.then((doc) => {
							if (doc.data().Like.includes(uid)) {
								setLike(true);
							} else setLike(false);
						});
				}),
			);
	} catch (err) {
		console.log(err);
	}
};

export const share = (uid, data) => {
	try {
		firebase
			.firestore()
			.collection('users')
			.doc(uid)
			.collection('posts')
			.add(data)
			.then(() => console.log('done'));
	} catch (err) {
		console.log(err);
	}
};
