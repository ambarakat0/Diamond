/** @format */

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
	apiKey: 'AIzaSyC9RMfyrLatAHO0pTpX56YXx598blFyJKs',
	authDomain: 'diamond-amb.firebaseapp.com',
	databaseURL: 'https://diamond-amb-default-rtdb.firebaseio.com',
	projectId: 'diamond-amb',
	storageBucket: 'diamond-amb.appspot.com',
	appId: '1:565393827147:web:54582e5924ca1a8a9234ce',
	measurementId: 'G-01VZCKWMJW',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

export default firebase;
