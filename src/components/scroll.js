/** @format */

import React, { Component } from 'react';

import firebase from '../components/Firebase/Firebase';

class ScrollComponent extends Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			loading: false,
			page: 0,
			prevY: 0,
		};
	}

	componentDidMount() {
		this.getPosts(this.state.page);

		let options = {
			root: null,
			rootMargin: '0px',
			threshold: 1.0,
		};

		this.observer = new IntersectionObserver(
			this.handleObserver.bind(this),
			options,
		);
		this.observer.observe(this.loadingRef);
	}

	handleObserver(entities, observer) {
		const y = entities[0].boundingClientRect.y;
		if (this.state.prevY > y) {
			const lastPhoto = this.state.photos[this.state.photos.length - 1];
			const curPage = lastPhoto.albumId;
			this.getPhotos(curPage);
			this.setState({ page: curPage });
		}
		this.setState({ prevY: y });
	}

	async getPosts(page) {
		this.setState({ loading: true });
		let arr = [];
		await firebase
			.firestore()
			.collection('Posts')
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					arr.push(doc.data());
				});
			});
		this.setState({ post: [...this.state.posts, ...arr] });
		this.setState({ loading: false });
	}

	render() {
		// Additional css
		const loadingCSS = {
			height: '100px',
			margin: '30px',
		};

		// To change the loading icon behavior
		const loadingTextCSS = { display: this.state.loading ? 'block' : 'none' };

		return (
			<div className='container'>
				<div style={{ minHeight: '800px' }}>
					{this.state.photos.map((user) => (
						<img src={user.url} height='100px' width='200px' />
					))}
				</div>
				<div
					ref={(loadingRef) => (this.loadingRef = loadingRef)}
					style={loadingCSS}
				>
					<span style={loadingTextCSS}>Loading...</span>
				</div>
			</div>
		);
	}
}

export default ScrollComponent;
