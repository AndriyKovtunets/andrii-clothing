import { useNavigate } from 'react-router-dom';

import {
	BackgroundImage,
	Body,
	DirectoryItemContainer,
} from './directory-item.styles';

const DirectoryItem = ({ category }) => {
	const navigate = useNavigate();
	const { imageUrl, title, route } = category;
	return (
		// <DirectoryItemContainer onClick={() => navigate(`shop/${title}`)}>
		<DirectoryItemContainer onClick={() => navigate(route)}>
			<BackgroundImage $imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
