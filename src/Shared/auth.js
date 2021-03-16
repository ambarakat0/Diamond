/** @format */

import firebase from '../components/Firebase/Firebase';
import { auth } from '../components/Firebase/Firebase';

export const signUpReq = async (userData, dispatch) => {
	try {
		dispatch({ type: 'AUTH_START' });
		await auth
			.createUserWithEmailAndPassword(userData.email, userData.password)
			.then((res) => {
				return firebase.firestore().collection('users').doc(res.user.uid).set({
					userName: userData.userName,
					displayName: userData.displayName,
					age: userData.age,
					country: userData.country,
					creationDate: userData.data,
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
		await auth
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
