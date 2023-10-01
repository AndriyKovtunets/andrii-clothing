import { compose, createStore, applyMiddleware } from 'redux';
import persistStore from 'redux-persist/es/persistStore';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { loggerMiddleware } from './middleware/logger';
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';
import { rootSaga } from './root-saga';

const persistConfig = {
	key: 'root',
	storage,
	whiteList: ['cart'],
	//blacklist: ['user'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
	process.env.NODE_ENV !== 'production' && logger,
	sagaMiddleware,
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

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
