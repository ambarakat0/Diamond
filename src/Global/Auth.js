/** @format */

import React, { createContext, useReducer } from 'react';

const initState = { user: null, error: null, isAuth: false, loading: false };
const authContext = createContext(initState);
const { Provider } = authContext;

const AUTH_START = 'AUTH_START';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAIL = 'AUTH_FAIL';
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const CHECK_AUTH_TIMEOUT = 'CHECK_AUTH_TIMEOUT';

const reducer = (state, action) => {
	if (action.type === AUTH_START) {
		return {
			user: null,
			error: null,
			isAuth: false,
			loading: true,
		};
	}
	if (action.type === AUTH_SUCCESS) {
		return {
			loading: false,
			error: null,
			user: action.user,
			isAuth: true,
		};
	}
	if (action.type === AUTH_FAIL) {
		return {
			loading: false,
			error: action.error,
			user: null,
			isAuth: false,
		};
	}
	if (action.type === AUTH_LOGOUT) {
		return {
			user: null,
			isAuth: false,
		};
	}
	if (action.type === CHECK_AUTH_TIMEOUT) {
		return () => {
			setTimeout(() => {}, action.expirationTime * 1000);
		};
	}

	return state;
};

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initState);
	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { authContext, AuthProvider };
