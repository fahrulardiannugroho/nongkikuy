import favoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import { createRestaurantItemTemplate, createNumberOfRestaurant, createRestaurantNotFoundTemplate } from '../templates/template-creator';

const Favorite = {
	async render() {
		return `
		
		<section class="restaurants">
			<div class="favorite__label">
				<h2>Favorite Restaurant</h2>
				<div id="numberOfRestaurant">
				</div>
			</div>

			<div class="restaurants__content" id="restaurantContent">
			</div>
		</section>
			
		`;
	},

	async afterRender() {
		const restaurants = await favoriteRestaurantIdb.getAllRestaurant();
		const numberOfRestaurant = document.querySelector('#numberOfRestaurant');
		const restaurantContainer = document.querySelector('#restaurantContent');
		const restaurantAmount = restaurants.length;
		this._restaurantAmountTemplate(numberOfRestaurant, restaurantAmount);
		this._restaurantTemplate({ restaurants, restaurantAmount, restaurantContainer });
	},

	_restaurantAmountTemplate(numberOfRestaurant, restaurantAmount) {
		numberOfRestaurant.innerHTML = createNumberOfRestaurant(restaurantAmount);
	},

	_restaurantTemplate({ restaurants, restaurantAmount, restaurantContainer }) {
		if (restaurantAmount > 0) {
			restaurants.forEach((restaurant) => {
				restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
			});
		} else {
			restaurantContainer.innerHTML = createRestaurantNotFoundTemplate();
		}
	},
};

export default Favorite;
