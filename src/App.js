/** @format */

import React from 'react';
import './App.css';

import Layout from './hoc/Layout/Layout';

import { AuthProvider } from './Global/Auth';
import { AuthStateProvider } from './Global/TrackAuthState';

const app = () => {
	return (
		<AuthStateProvider>
			<AuthProvider>
				<Layout />
			</AuthProvider>
		</AuthStateProvider>
	);
};

export default app;
