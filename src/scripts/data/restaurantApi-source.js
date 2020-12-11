/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */
import swal from 'sweetalert';
import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';
import { createLoadingIndicator, createSkeletonRestaurantTemplate } from '../views/templates/template-creator';

class RestaurantApiSource {
	static async restaurantSearch(query) {
		this._restaurantsSearchContainer();
		const response = await fetch(API_ENDPOINT.SEARCH(query));
		const responseJson = await response.json();
		this._hideLoader();
		return responseJson.restaurants;
	}

	static async restaurantList() {
		this._restaurantsContainer();
		const response = await fetch(API_ENDPOINT.RESTAURANT_LIST);
		const responseJson = await response.json();
		this._hideSkeletonLoading(responseJson.count);
		return responseJson.restaurants;
	}

	static async restaurantDetail(id) {
		this._restaurantDetailContainer();
		const response = await fetch(API_ENDPOINT.DETAIL(id));
		const responseJson = await response.json();
		this._hideLoader();
		return responseJson.restaurant;
	}

	static async _restaurantsContainer() {
		const restaurantContainer = document.querySelector('#restaurantContent');
		restaurantContainer.innerHTML = createSkeletonRestaurantTemplate(20);
	}

	static async _restaurantsSearchContainer() {
		const restaurantsSearchContainer = document.querySelector('#restaurantContent');
		restaurantsSearchContainer.innerHTML = createLoadingIndicator;
	}

	static async _restaurantDetailContainer() {
		const restaurantDetailContainer = document.querySelector('#detailContainer');
		restaurantDetailContainer.innerHTML = createLoadingIndicator;
	}

	static _hideLoader() {
		const loader = document.querySelector('#loader');
		loader.classList.add('loaderClose');
	}

	static _hideSkeletonLoading(count) {
		const skeletonLoading = document.querySelectorAll('.skeletonLoading');
		for (let i = 0; i < count; i += 1) {
			skeletonLoading[i].style.display = 'none';
		}
	}

	static async addCustomerReview(consumerReview) {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Auth-Token': CONFIG.KEY,
			},
			body: JSON.stringify(consumerReview),
		};

		await fetch(API_ENDPOINT.REVIEW, options);
		swal('Succes!', 'review added successfully!', 'success');
	}
}

export default RestaurantApiSource;
