/* eslint-disable array-callback-return */

import RestaurantApiSource from '../../data/restaurantApi-source';
import {
	createNetworkErrorTemplate,
	createRestaurantSearchTemplate,
	createSearchNotFoundTemplate,
}
	from '../templates/template-creator';

const Search = {
	async render() {
		return `
		<section class="restaurants">
			<div class="restaurants__content" id="restaurantContent">

			</div>
		</section>
		`;
	},

	async afterRender() {
		const restaurantContainer = document.querySelector('#restaurantContent');
		const searchButton = document.querySelector('#searchButton');
		const searchQuery = document.querySelector('#searchQuery');

		searchButton.addEventListener('click', async () => {
			try {
				const restaurantFromSearch = await RestaurantApiSource.restaurantSearch(searchQuery.value);

				this._searchResultTemplate(restaurantFromSearch, restaurantContainer);
			} catch (error) {
				this._networkErrorContainer(restaurantContainer);
			}
		});
	},

	_searchResultTemplate(restaurantFromSearch, restaurantContainer) {
		const arrayLength = restaurantFromSearch.length;
		if (arrayLength === 0) {
			restaurantContainer.innerHTML = createSearchNotFoundTemplate;
		} else {
			restaurantFromSearch.map((restaurant) => {
				restaurantContainer.innerHTML += createRestaurantSearchTemplate(restaurant);
			});
		}
	},

	_networkErrorContainer(restaurantContainer) {
		restaurantContainer.innerHTML = createNetworkErrorTemplate;
	},
};

export default Search;
