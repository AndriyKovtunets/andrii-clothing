import { compose, createStore, applyMiddleware } from 'redux';
import persistStore from 'redux-persist/es/persistStore';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';
import { loggerMiddleware } from './middleware/logger';
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';

const persistConfig = {
	key: 'root',
	storage,
	whiteList: ['cart'],
	//blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
//root-reducer
const middleWares = [
	process.env.NODE_ENV === 'development' && logger,
	thunk,
].filter(Boolean);

const composeEnhancer =
	(process.env.NODE_ENV !== 'production' &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

//const middleWares = [loggerMiddleware];
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
	persistedReducer,
	undefined,
	composedEnhancers
);

export const persistor = persistStore(store);
