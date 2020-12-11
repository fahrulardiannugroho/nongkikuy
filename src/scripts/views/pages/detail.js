import swal from 'sweetalert';
import favoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import RestaurantApiSource from '../../data/restaurantApi-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import {
	createLikeRestaurantButtonTemplate,
	createLoadingIndicator,
	createNetworkErrorTemplate,
	createRestaurantDetailTemplate,
} from '../templates/template-creator';

const Detail = {
	async render() {
		return `
			<div id="detailContainer">
			</div>
		`;
	},

	async afterRender() {
		const detailContainer = document.querySelector('#detailContainer');

		try {
			const url = UrlParser.parseActiveUrlWithoutCombainer();
			const restaurant = await RestaurantApiSource.restaurantDetail(url.id);
			const { categories, menus, customerReviews } = restaurant;

			this._restaurantDetailTemplate({
				restaurant, detailContainer, categories, menus, customerReviews, url,
			});

			LikeButtonPresenter.init({
				likeButtonContainer: document.querySelector('#likeButtonContainer'),
				favoriteRestaurant: favoriteRestaurantIdb,
				restaurant,
			});
		} catch (error) {
			this._addLoaderAnimation(detailContainer);
			this._networkErrorContainer(detailContainer);
		}
	},

	_restaurantDetailTemplate({
		restaurant, detailContainer, categories, menus, customerReviews, url,
	}) {
		detailContainer.innerHTML = createRestaurantDetailTemplate({
			restaurant, categories, menus, customerReviews,
		});
		const reviewer = document.querySelector('#reviewerName');
		const review = document.querySelector('#reviewArea');
		const reviewButton = document.querySelector('#reviewButton');

		this._addConsumerReview({
			reviewer, review, reviewButton, url, detailContainer,
		});
	},

	_addConsumerReview({
		reviewer, review, reviewButton, url,
	}) {
		reviewButton.addEventListener('click', () => {
			if ((reviewer.value && review.value) !== '') {
				const consumerReview = {
					id: url.id,
					name: reviewer.value,
					review: review.value,
				};
				RestaurantApiSource.addCustomerReview(consumerReview);
			} else {
				swal('info!', 'please fill in the review field!', 'info');
			}
		});
	},

	_addLoaderAnimation(detailContainer) {
		detailContainer.innerHTML = createLoadingIndicator;
	},

	_networkErrorContainer(detailContainer) {
		setTimeout(() => {
			detailContainer.innerHTML = createNetworkErrorTemplate;
		}, 500);
	},

	_likeButtonTemplate(likeButtonContainer) {
		likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();
	},
};

export default Detail;
