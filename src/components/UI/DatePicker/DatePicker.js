/** @format */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 300,
	},
}));

export default function DatePickers(props) {
	const classes = useStyles();

	return (
		<form className={classes.container} noValidate>
			<TextField
				onChange={props.submit}
				id='date'
				label='Birthday'
				type='date'
				defaultValue='2017-05-24'
				className={classes.textField}
				InputLabelProps={{
					shrink: true,
				}}
			/>
		</form>
	);
}
