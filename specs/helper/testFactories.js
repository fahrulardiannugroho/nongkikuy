/* eslint-disable import/prefer-default-export */
import FavoriteRestaurantIdb from '../../src/scripts/data/favoriterestaurant-idb';
import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';

const CreateLikeButtonpresenter = async (restaurant) => {
	await LikeButtonPresenter.init({
		likeButtonContainer: document.querySelector('#likeButtonContainer'),
		favoriteRestaurant: FavoriteRestaurantIdb,
		restaurant,
	});
};

export { CreateLikeButtonpresenter };
