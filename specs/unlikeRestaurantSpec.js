/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb';
import * as TestFactories from './helper/testFactories';

const likeButtonContainer = () => {
	document.body.innerHTML = '<div id="likeButtonContainer" class="likeButtonContainer"></div>';
};

describe('Unliking A Restaurant', () => {
	beforeEach(async () => {
		likeButtonContainer();
		await FavoriteRestaurantIdb.putRestaurant({ id: 'rqdv5juczeskfw1e867' });
	});

	afterEach(async () => {
		await FavoriteRestaurantIdb.deleteRestaurant('rqdv5juczeskfw1e867');
	});

	it('should display unlike widget when the restaurant has been liked', async () => {
		await TestFactories.CreateLikeButtonpresenter({ id: 'rqdv5juczeskfw1e867' });

		expect(document.querySelector('[aria-label="Unlike this restaurant"]')).toBeTruthy();
	});

	it('should not display like widget when the restaurant has been liked', async () => {
		await TestFactories.CreateLikeButtonpresenter({ id: 'rqdv5juczeskfw1e867' });

		expect(document.querySelector('[aria-label="Like this restaurant"]')).toBeFalsy();
	});

	it('should be able to remove liked restaurant from the list', async () => {
		await TestFactories.CreateLikeButtonpresenter({ id: 'rqdv5juczeskfw1e867' });

		document.querySelector('[aria-label="Unlike this restaurant"]').dispatchEvent(new Event('click'));
		expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
	});

	it('should not throw error if the unliked restaurant is not in the list', async () => {
		await TestFactories.CreateLikeButtonpresenter({ id: 'rqdv5juczeskfw1e867' });

		await FavoriteRestaurantIdb.deleteRestaurant('rqdv5juczeskfw1e867');

		document.querySelector('[aria-label="Unlike this restaurant"]').dispatchEvent(new Event('click'));

		expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
	});
});
