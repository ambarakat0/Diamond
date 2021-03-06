/** @format */
import firebase from '../../Firebase/Firebase';

export const addFollow = async (id, data) => {
	firebase
		.firestore()
		.collection('users')
		.doc(id)
		.collection('followList')
		.add(data)
		.then(() => {});
};
