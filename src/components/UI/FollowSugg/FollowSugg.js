/** @format */

import React from 'react';
import Button from '../ButtonOutline/ButtonOutline';
import img1 from '../../../assets/DataImgs/user10.jpeg';
import img2 from '../../../assets/DataImgs/user9.jpg';
import img3 from '../../../assets/DataImgs/user8.jpg';

import FlatButton from '../FlatButton/FlatButton';
import classes from './FollowSugg.css';

const follow = (props) => {
	return (
		<div className={classes.Container}>
			<h3 className={classes.Header}>Follow Suggestions</h3>
			<div className={classes.SingleFollow}>
				<div className={classes.FollowDetails}>
					<img src={img1} alt='user' className={classes.Img} />
					<div className={classes.UserName}>
						<h4>Rasha</h4>
						<p>@Rahahkassam</p>
					</div>
					<Button className={classes.Button}>Follow</Button>
				</div>
			</div>
			<div className={classes.SingleFollow}>
				<div className={classes.FollowDetails}>
					<img src={img2} alt='user' className={classes.Img} />
					<div className={classes.UserName}>
						<h4>Ahmed</h4>
						<p>@Ahmedsokar</p>
					</div>
					<Button className={classes.Button}>Follow</Button>
				</div>
			</div>
			<div className={classes.SingleFollow}>
				<div className={classes.FollowDetails}>
					<img src={img3} alt='user' className={classes.Img} />
					<div className={classes.UserName}>
						<h4>John</h4>
						<p>@johwshmet</p>
					</div>
					<Button className={classes.Button}>Follow</Button>
				</div>
			</div>
			<FlatButton>See more</FlatButton>
		</div>
	);
};

export default follow;
