/** @format */

import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router';

import SinglePost from '../SinglePost/SinglePost';

const gpost = (props) => {
	useEffect(() => {});

	return (
		<Fragment>
			<SinglePost goToPost='true' />
		</Fragment>
	);
};

export default withRouter(gpost);
