/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbpromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
	upgrade(database) {
		database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
	},
});

const favoriteRestaurantIdb = {
	async getRestaurant(id) {
		if (!id) {
			return;
		}

		return (await dbpromise).get(OBJECT_STORE_NAME, id);
	},

	async getAllRestaurant() {
		return (await dbpromise).getAll(OBJECT_STORE_NAME);
	},

	async putRestaurant(restaurant) {
		if (!restaurant.hasOwnProperty('id')) {
			return;
		}

		return (await dbpromise).put(OBJECT_STORE_NAME, restaurant);
	},

	async deleteRestaurant(id) {
		return (await dbpromise).delete(OBJECT_STORE_NAME, id);
	},
};

export default favoriteRestaurantIdb;
