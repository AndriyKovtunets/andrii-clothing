import { createContext, useState, useEffect } from 'react';

import {
	addCollectionAndDocument,
	getCategoriesAndDocuments,
} from '../utils/firebase/firebase.utils';

import SHOP_DATA from '../shop-data';

export const CategoriesContext = createContext({
	categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments('categories');
			//	console.log(categoryMap);
			setCategoriesMap(categoryMap);
		};
		getCategoriesMap();
	}, []);

	//set data into firebase from js SHOP_DATA
	/* 	useEffect(() => {
		addCollectionAndDocument('categories', SHOP_DATA);
	}, []); */

	const value = { categoriesMap };
	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
