import RestaurantApiSource from '../../data/restaurantApi-source';
import {
	createNetworkErrorTemplate,
	createRestaurantItemTemplate,
} from '../templates/template-creator';

const Restaurant = {
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

		try {
			const restaurants = await RestaurantApiSource.restaurantList();
			this._restaurantTemplate(restaurants, restaurantContainer);
		} catch (error) {
			this._networkErrorContainer(restaurantContainer);
		}
	},

	_restaurantTemplate(restaurants, restaurantContainer) {
		restaurants.forEach((restaurant) => {
			restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
		});
	},

	_networkErrorContainer(restaurantContainer) {
		restaurantContainer.innerHTML = createNetworkErrorTemplate;
	},
};

export default Restaurant;
