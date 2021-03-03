/** @format */

import React, { createContext, useReducer } from 'react';

const initialState = { showTagContainerNav: false };

const tagContainerContext = createContext(initialState);

const { Provider } = tagContainerContext;

const OPEN = 'OPEN';

const reducer = (state, action) => {
	if (action.type === OPEN) {
		return {
			showTagContainerNav: true,
		};
	}

	return state;
};

const TagContainerProvider = ({ children }) => {
	const [tagContainerState, dispatch] = useReducer(reducer, initialState);
	return (
		<Provider value={{ tagContainerState, dispatch }}>{children}</Provider>
	);
};

export { tagContainerContext, TagContainerProvider };
