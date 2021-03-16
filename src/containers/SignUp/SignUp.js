/** @format */

import React, { useContext, useState, Fragment, useEffect } from 'react';
import classes from './SignUp.css';
import Button from '../../components/UI/Button/Button';
import Logo from '../../assets/images/diamond-logo.png';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import { updateObject, checkValidity, createData } from '../../Shared/utility';
import { signUpReq } from '../../Shared/auth';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// import firebase from '../../components/Firebase/Firebase';

import DatePicker from '../../components/UI/DatePicker/DatePicker';

import { authContext } from '../../Global/Auth';
import { authStateContext } from '../../Global/TrackAuthState';
import { Redirect } from 'react-router-dom';

const signup = (props) => {
	const user = useContext(authStateContext).initState;
	const {
		state: { error, loading },
		dispatch,
	} = useContext(authContext);

	const [birthDate, setBirthDate] = useState();
	const [userData, setUserData] = useState({
		name: {
			value: '',
			type: 'text',
			placeholder: 'User Name',
			validation: {
				required: true,
				minLength: 9,
			},
			valid: false,
			touched: false,
		},
		displayName: {
			value: '',
			type: 'text',
			placeholder: 'Display Name',
			validation: {
				required: true,
				minLength: 9,
			},
			valid: false,
			touched: false,
		},
		email: {
			value: '',
			type: 'email',
			placeholder: 'Email',
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		password: {
			value: '',
			type: 'password',
			placeholder: 'Password',
			validation: {
				required: true,
				minLength: 9,
				maxLength: 14,
			},
			valid: false,
			touched: false,
		},
		country: {
			value: '',
			type: 'text',
			placeholder: 'Country',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
	});
	const [disable, setDisable] = useState(true);

	useEffect(() => {
		if (
			userData.email.valid &&
			userData.password.valid &&
			userData.displayName.valid &&
			userData.name.valid &&
			userData.country.valid &&
			birthDate !== undefined
		) {
			setDisable(false);
		}
		if (
			!userData.email.valid ||
			!userData.password.valid ||
			!userData.displayName.valid ||
			!userData.name.valid ||
			!userData.country.valid ||
			birthDate === undefined
		) {
			setDisable(true);
		}
	}, [
		userData.email.valid,
		userData.password.valid,
		userData.displayName.valid,
		userData.name.valid,
		userData.country.valid,
		birthDate,
	]);
	const onChangeDateOfBirth = (e) => {
		setBirthDate(e.target.value);
	};
	const onSubmitHandler = async (e) => {
		e.preventDefault();
		const creationDate = createData(new Date());
		const userAuth = {
			userName: userData.name.value,
			displayName: `@${userData.displayName.value}`,
			email: userData.email.value,
			password: userData.password.value,
			country: userData.country.value,
			age: birthDate,
			data: creationDate,
		};
		// await firebase
		// 	.firestore()
		// 	.collection('users')
		// 	.get()
		// 	.then((snapshot) =>
		// 		snapshot.docs.forEach((doc) => {
		// 			console.log(doc);
		// 			console.log(doc.data().userName, doc.data().displayName);
		// 			if (
		// 				doc.data().userName === userAuth.userName ||
		// 				doc.data().displayName === userAuth.displayName
		// 			) {
		// 				alert('wrong');
		// 			} else {

		// 			}
		// 		}),
		// 	);
		await signUpReq(userAuth, dispatch);
	};

	const onclickLogo = () => {
		props.history.push('/');
	};

	const onChangeHandler = (e, id) => {
		const updatedData = updateObject(userData, {
			[id]: updateObject(userData[id], {
				value: e.target.value,
				valid: checkValidity(e.target.value, userData[id].validation),
				touched: true,
			}),
		});
		setUserData(updatedData);
	};

	const ElementsArr = [];
	for (let key in userData) {
		ElementsArr.push({
			id: key,
			config: userData[key],
		});
	}

	let form = ElementsArr.map((el) => (
		<Input
			key={el.id}
			type={el.config.type}
			placeholder={el.config.placeholder}
			value={el.config.value}
			touched={el.config.touched}
			isValid={el.config.valid}
			shouldValidate={el.config.validation}
			changed={(e) => onChangeHandler(e, el.id)}
		/>
	));

	let direct = null;
	let isAuth = user !== null;
	if (isAuth) {
		direct = <Redirect to='/home' />;
	}

	let err = null;
	if (error) {
		err = <p style={{ color: 'salmon' }}>{error.message}</p>;
	}

	let spinner = null;
	if (loading) {
		spinner = <Spinner />;
	}
	return (
		<Fragment>
			{direct}
			<div className={classes.Content}>
				<div className={classes.ImgContainer}>
					<img
						onClick={onclickLogo}
						className={classes.Img}
						src={Logo}
						alt='logo'
					/>
				</div>
				<div className={classes.TextContainer}>
					<h2 className={classes.TextPrimary}>Create your account</h2>
				</div>
				<form onSubmit={onSubmitHandler} className={classes.Form}>
					{form}
				</form>
				<div className={classes.TextContainer}>
					<h3 className={classes.TextSecondary}>Date of birth</h3>
					<p className={classes.TextSub}>
						This will not be shown publicly. Confirm your own age, even if this
						account is for a business, a pet, or something else.
					</p>
				</div>
				{/* <DatePicker
					selected={startDate}
					onChange={(date) => setStartDate(date)}
				/> */}
				<DatePicker submit={onChangeDateOfBirth} />
				<div className={classes.ButtonContainer}>
					<Button type='submit' clicked={onSubmitHandler} disabled={disable}>
						Sign Up
					</Button>
				</div>
				{err}
				{spinner}
			</div>
		</Fragment>
	);
};
export default signup;
