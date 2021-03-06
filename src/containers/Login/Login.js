/** @format */

import React, { Fragment, useContext, useEffect, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import classes from './Login.css';
import Button from '../../components/UI/Button/Button';
import Logo from '../../assets/images/diamond-logo.png';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import { updateObject, checkValidity } from '../../Shared/utility';
import { loginReq } from '../../Shared/auth';

import { authContext } from '../../Global/Auth';
import { authStateContext } from '../../Global/TrackAuthState';

const login = (props) => {
	const user = useContext(authStateContext).initState;
	const {
		state: { error, loading },
		dispatch,
	} = useContext(authContext);

	//--------state local in component------//
	const [userData, setUserData] = useState({
		email: {
			value: '',
			type: 'email',
			placeholder: 'Phone or Email',
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
	});

	const [disable, setDisable] = useState(true);

	useEffect(() => {
		if (userData.email.valid && userData.password.valid) {
			setDisable(false);
		}
		if (!userData.email.valid || !userData.password.valid) {
			setDisable(true);
		}
	}, [userData.email.valid, userData.password.valid]);

	//--------global state------//
	const onSubmitHandler = async (e) => {
		const userAuth = {
			email: userData.email.value,
			password: userData.password.value,
		};
		e.preventDefault();
		await loginReq(userAuth, dispatch);
	};

	const onclickLogo = () => {
		props.history.push('/home');
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
		const msg = 'Email or Password is incorrect';
		err = <p style={{ color: 'salmon' }}>{msg}</p>;
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
					<h2 className={classes.TextPrimary}>Log in to Diamond</h2>
				</div>
				<form onSubmit={onSubmitHandler} className={classes.Form}>
					{form}
				</form>
				<div className={classes.ButtonContainer}>
					<Button clicked={onSubmitHandler} type='submit' disabled={disable}>
						Log in
					</Button>
				</div>
				<div className={classes.LinkContainer}>
					<a href='/'>Forgot password?</a>
					<NavLink to='/SignUp'>Sign up for Diamond</NavLink>
				</div>
				{err}
				{spinner}
			</div>
		</Fragment>
	);
};
export default login;
