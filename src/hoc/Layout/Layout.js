/** @format */

import React, { useContext } from 'react';

import { Route, Switch } from 'react-router-dom';

// import Layout from './hoc/Layout/Layout';
import Entry from '../../components/Entry/Entry';

import Login from '../../containers/Login/Login';
import Signup from '../../containers/SignUp/SignUp';
import Logout from '../../containers/Logout/Logout';

import Tags from '../../containers/Tags/Tags';
import SportTag from '../../containers/TagsPages/Sport/Sport';
import SciTag from '../../containers/TagsPages/Sci/Sci';
import TechTag from '../../containers/TagsPages/Tech/Tech';
import EnvoTag from '../../containers/TagsPages/Envo/Envo';
import MoviesTag from '../../containers/TagsPages/Movies/Movies';
import NovalsTag from '../../containers/TagsPages/Novals/Novals';
import PoliTag from '../../containers/TagsPages/Poli/Poli';
import ReliTag from '../../containers/TagsPages/Reli/Reli';
import WorldTag from '../../containers/TagsPages/World/World';

import Notification from '../../containers/Pages/Notification/Notification';
import Chat from '../../containers/Pages/Chat/Chat';
import Bookmarks from '../../containers/Pages/Bookmarks/Bookmarks';
import Profile from '../../containers/Pages/Profile/Profile';
import Settings from '../../containers/Pages/Settings/Settings';
import Home from '../../containers/Pages/Home/Home';

import { authStateContext } from '../../Global/TrackAuthState';

const layout = (props) => {
	const user = useContext(authStateContext).initState;
	let routes = (
		<Switch>
			<Route path='/' exact component={Entry} />
			<Route path='/signUp' component={Signup} />
			<Route path='/login' component={Login} />
		</Switch>
	);
	if (user !== null) {
		routes = (
			<Switch>
				<Route path='/' exact component={Entry} />

				<Route path='/home' exact component={Home} />

				<Route path='/tags' exact component={Tags} />
				<Route path='/tags/sport' exact component={SportTag} />
				<Route path='/tags/science' exact component={SciTag} />
				<Route path='/tags/enverionment' exact component={EnvoTag} />
				<Route path='/tags/movies' exact component={MoviesTag} />
				<Route path='/tags/novals' exact component={NovalsTag} />
				<Route path='/tags/religons' exact component={ReliTag} />
				<Route path='/tags/world' exact component={WorldTag} />
				<Route path='/tags/politics' exact component={PoliTag} />
				<Route path='/tags/tech' exact component={TechTag} />

				<Route path='/signUp' exact component={Signup} />
				<Route path='/login' exact component={Login} />
				<Route path='/logout' exact component={Logout} />

				<Route path='/notification' component={Notification} />
				<Route path='/chat' component={Chat} />
				<Route path='/bookmarks' component={Bookmarks} />
				<Route path={`/profile/${user.uid}`} component={Profile} />
				<Route path='/settings' component={Settings} />
			</Switch>
		);
	}

	return <main>{routes}</main>;
};

export default layout;
