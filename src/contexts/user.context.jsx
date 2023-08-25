import { createContext, useState, useEffect, useReducer } from 'react';

import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
	setCurrentUser: () => null,
	currentUser: null,
});

export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
	currentUser: null,
};

const userReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		/* case 'increment':
				return {
					value: state.value + 1,
				} */
		default:
			throw new Error(`Unhandled type ${type} in userReducer`);
	}
};

export const UserProvider = ({ children }) => {
	//const [currentUser, setCurrentUser] = useState(null);
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
	const { currentUser } = state;
	const setCurrentUser = (user) => {
		dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
	};
	// or -> const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);

	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
				/* console.log(`user=true`);
				console.log(user); */
			}
			/* console.log('user=false');
			console.log(user); */
			setCurrentUser(user);
		});
		/* console.log('unsubscribe');
		console.log(unsubscribe); */

		return unsubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
