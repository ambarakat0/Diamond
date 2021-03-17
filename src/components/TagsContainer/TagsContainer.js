/** @format */

import React, { useState } from 'react';
import classes from './TagsContainer.css';
import Link from './Link/Link';

import IconWithTooltip from '../UI/IconWithTooltip/IconWithTooltip';
import { Fragment } from 'react';

const tagsContainer = (props) => {
	const [toggle, setToggle] = useState(false);

	const expand = () => {
		setToggle((prevState) => !prevState);
	};

	let links = null;
	if (toggle) {
		links = (
			<Fragment>
				<Link link='/tags/world' text='world' />
				<Link link='/tags/sport' text='sport' />
				<Link link='/tags/movies' text='movies' />
				<Link link='/tags/religons' text='religons' />
				<Link link='/tags/enverionment' text='enverionment' />
				<Link link='/tags/tech' text='technology' />
				<Link link='/tags/science' text='science' />
				<Link link='/tags/novals' text='novals/books' />
				<Link link='/tags/Anime' text='Anime' />
				<Link link='/tags/Arts' text='Arts' />
				<Link link='/tags/Business' text='Business' />
				<Link link='/tags/Careers' text='Careers' />
				<Link link='/tags/Entertainment' text='Entertainment' />
				<Link link='/tags/Fashion' text='Fashion' />
				<Link link='/tags/Fitness' text='Fitness' />
				<Link link='/tags/Food' text='Food' />
				<Link link='/tags/Gaming' text='Gaming' />
				<Link link='/tags/Music' text='Music' />
				<Link link='/tags/News' text='News' />
				<Link link='/tags/Travel' text='Travel' />
			</Fragment>
		);
	}

	return (
		<div className={classes.TagsContianer}>
			<div>
				<IconWithTooltip iconName='circle-up' text='expand' clicked={expand} />
			</div>
			{links}
		</div>
	);
};

export default tagsContainer;
