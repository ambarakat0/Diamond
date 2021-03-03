/** @format */

import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { authContext } from '../../Global/Auth';

import firebase from '../../components/Firebase/Firebase';

const logout = (props) => {
	const { dispatch } = useContext(authContext);
	useEffect(() => {
		firebase
			.auth()
			.signOut()
			.then(() => console.log('log out'));
		// dispatch({
		// 	type: 'AUTH_LOGOUT',
		// });
	});
	return <Redirect to='/login' />;
};

export default logout;
