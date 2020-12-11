/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb';
import * as TestFactories from './helper/testFactories';

describe('Liking a Restaurant', () => {
	const likeButtonContainer = () => {
		document.body.innerHTML = '<div id="likeButtonContainer" class="likeButtonContainer"></div>';
	};

	beforeEach(() => {
		likeButtonContainer();
	});

	it('should show the like button when the restaurant has not been liked before', async () => {
		await TestFactories.CreateLikeButtonpresenter({ id: 'rqdv5juczeskfw1e867' });

		expect(document.querySelector('[aria-label="Like this restaurant"]')).toBeTruthy();
	});

	it('should not show the unlike button when the restaurant has not been liked before', async () => {
		await TestFactories.CreateLikeButtonpresenter({ id: 'rqdv5juczeskfw1e867' });

		expect(document.querySelector('[aria-label="Unlike this restaurant"]')).toBeFalsy();
	});

	it('should be able to like the restaurant', async () => {
		await TestFactories.CreateLikeButtonpresenter({ id: 'rqdv5juczeskfw1e867' });

		document.querySelector('#likeButton').dispatchEvent(new Event('click'));
		const restaurant = await FavoriteRestaurantIdb.getRestaurant('rqdv5juczeskfw1e867');

		expect(restaurant).toEqual({ id: 'rqdv5juczeskfw1e867' });

		FavoriteRestaurantIdb.deleteRestaurant('rqdv5juczeskfw1e867');
	});

	it('should not add a restaurant again when its already liked', async () => {
		await TestFactories.CreateLikeButtonpresenter({ id: 'rqdv5juczeskfw1e867' });

		await FavoriteRestaurantIdb.putRestaurant({ id: 'rqdv5juczeskfw1e867' });
		document.querySelector('#likeButton').dispatchEvent(new Event('click'));

		expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([{ id: 'rqdv5juczeskfw1e867' }]);

		FavoriteRestaurantIdb.deleteRestaurant('rqdv5juczeskfw1e867');
	});

	it('should not add a movie when it has no id', async () => {
		await TestFactories.CreateLikeButtonpresenter({});

		document.querySelector('#likeButton').dispatchEvent(new Event('click'));
		expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
	});
});
