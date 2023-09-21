import { Fragment } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import {
	selectCategoriesMap,
	selectCategoryIsLoading,
} from '../../store/categories/categories.selector';

import Spinner from '../../components/spinner/spinner.component';

import './categories-preview.styles.scss';

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoryIsLoading);

	return (
		<Fragment>
			{isLoading ? (
				<Spinner />
			) : (
				Object.keys(categoriesMap).map((title) => {
					const products = categoriesMap[title];
					return (
						<CategoryPreview key={title} title={title} products={products} />
					);
				})
			)}
		</Fragment>
	);
};

export default CategoriesPreview;
