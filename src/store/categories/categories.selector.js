import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => {
	//console.log('reselector 1 fired');
	//	console.log('reselector 1', state);
	return state.categories;
};

export const selectCategories = createSelector(
	[selectCategoryReducer],
	(categoriesSlice) => {
		//	console.log('reselector 2 fired');
		//	console.log('reselector 2:', categoriesSlice.categories);
		return categoriesSlice.categories;
	}
);

export const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories) => {
		//console.log('reselector 3 fired');
		//console.log('reselector 3', categories);
		return categories.reduce((acc, category) => {
			const { title, items } = category;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {});
	}
);
