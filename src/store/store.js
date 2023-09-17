import { compose, createStore, applyMiddleware } from 'redux';
import persistStore from 'redux-persist/es/persistStore';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';

import { rootReducer } from './root-reducer';
const loggerMiddleware = (store) => (next) => (action) => {
	if (!action.type) {
		return next(action);
	}

	console.log('type: ', action.type);
	console.log('payload: ', action.payload);
	console.log('currentState: ', store.getState());

	next(action);

	console.log('next state: ', store.getState());
};

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
//root-reducer
// const middleWares = [logger];
const middleWares = [loggerMiddleware];
const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

export const persistor = persistStore(store);
