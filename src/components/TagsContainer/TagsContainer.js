/** @format */

import React from 'react';
import classes from './TagsContainer.css';
import Link from './Link/Link';

const tagsContainer = (props) => {
	return (
		<div className={classes.TagsContianer}>
			<Link link='/tags/world' text='world' />
			<Link link='/tags/sport' text='sport' />
			<Link link='/tags/movies' text='movies' />
			<Link link='/tags/religons' text='religons' />
			<Link link='/tags/enverionment' text='enverionment' />
			<Link link='/tags/tech' text='technology' />
			<Link link='/tags/science' text='science' />
			<Link link='/tags/novals' text='novals/books' />
			<Link link='/tags/politics' text='politics' />
		</div>
	);
};

export default tagsContainer;
