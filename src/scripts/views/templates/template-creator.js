import CONFIG from '../../globals/config';

const createSkeletonRestaurantTemplate = (count) => {
	let template = '';

	for (let i = 0; i < count; i += 1) {
		template += `
      <div class="restaurant skeletonLoading">
        <img src="./placeholder.png" width="50" height="29" alt="skeleton">
        <div class="body">
            <h3 class="skeleton">Lorem ipsum dolor</h3>
						<div class="skeleton"><p>Lorem ipsum dolor lorem ipsum dolor</p></div>
						<div>
							<span class="rate skeleton">Lorem</span>
							<span class="city skeleton">Lorem</span>
						</div>
				</div>
      </div>
  `;
	}
	return template;
};

const createRestaurantItemTemplate = (restaurant) => `
	<div id="restaurant" class="restaurant">
		<img class='lazyload' data-src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}" alt="${restaurant.name}" crossorigin='anonymous'>
		<div class="body">
			<h3><a href="${`/#/detail/${restaurant.id}`}">${restaurant.name}</a></h3>
			<p>${restaurant.description.substring(0, 60)}...</p>
			<div>
				<span class="rate"><i class="fa fa-star"></i> ${restaurant.rating}</span>
				<span class="city"><i class="fa fa-map-pin"></i> ${restaurant.city}</span>
			</div>
		</div>
	</div>
`;

const createRestaurantSearchTemplate = (restaurant) => `
	<div class="restaurant">
		<img src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}" alt="${restaurant.name}">
		<div class="body">
			<h3><a href="${`/#/detail/${restaurant.id}`}" id="linkToDetail">${restaurant.name}</a></h3>
			<p>${restaurant.description.substring(0, 60)}...</p>
			<div>
				<span class="rate"><i class="fa fa-star"></i> ${restaurant.rating}</span>
				<span class="city"><i class="fa fa-map-pin"></i> ${restaurant.city}</span>
			</div>
		</div>
	</div>
`;

const createRestaurantDetailTemplate = ({
	restaurant,
	categories,
	menus,
	customerReviews,
}) => `
	<a href="#/restaurant">
	<button>&larr;</button>
	</a>

	<div class="detail">
		<div class="detail__top">
			<div class="detail__poster">
				<img src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}" alt="${restaurant.name}">
			</div>

			<section class="detail__content">
				<div>
					<h2 id="restaurant-title">${restaurant.name}</h2>
				</div>
				<span>
					<i class="fa fa-map-pin"></i>
					${restaurant.city}
				</span><br>
				<span>
					<i class="fa fa-map-pin"></i>
					${restaurant.address}
				</span><br>
				<span>
					<i class="fa fa-star"></i>
					${restaurant.rating}
				</span>
			</section>
		</div>
			
		<div class="description">
			<h3>Detail</h3>
			<p>${restaurant.description}</p>
		</div>

		<section class="detail__category">
			<h3>Category</h3>
			<div>
			${categories.map((categorie) => `
				<p>${categorie.name}</p>
			`).join('')}
			</div>
		</section>

		<section class="detail__menus">
			<h3>Menus</h3>
			<div class="content">
				<div class="menu">
				<h4>Foods</h4>
				<hr>
				${menus.foods.map((food) => `
					<p>${food.name}</p>
				`).join('')}
				</div>
				<div class="menu">
					<h4>Drinks</h4>
					<hr>
					${menus.drinks.map((drink) => `
					<p>${drink.name}</p>
				`).join('')}
				</div>
			</div>
		</section>

		<section class="detail__reviews">
			<h3>Add Review</h3>
			<div class="review">
				<input type="text" id="reviewerName" class="reviewer-name" placeholder="Your name" required>
				<textarea id="reviewArea" class="review-text" cols="30" rows="5" placeholder="Give your riview ..." required></textarea>
				<button id="reviewButton" class="review-post">Post</button>
			</div>
		</section>

		<section class="all-reviews">
			<h3>Customer Reviews</h3>
			<div>
			${customerReviews.map((customerReview) => `
				<div class="review">
					<p class="name"><i class="fa fa-user"></i>${customerReview.name}</p>
					<p class="date">${customerReview.date}</p>
					<p class="review-text">${customerReview.review}</p>
				</div>
			`).join('')}
			</div>
		</section>
	</div>

	<div id="likeButtonContainer" class="likeButtonContainer">
	</div>
`;

const createLoadingIndicator = `
	<div id="loader" class="loader">Loading...</div>
`;

const createSearchNotFoundTemplate = `
	<div class="not-found-container">
		<h3>Restaurant Not Found</h3>
	</div>
`;

const createNetworkErrorTemplate = `
	<div id="errorHandling" class="error-handling">
		<h3>Lost Connection</h3>
	</div>
`;

const createLikeRestaurantButtonTemplate = () => `
	<button aria-label="Like this restaurant" id="likeButton" class="likeButton like">
		<p>Add to Favorite</p>
	</button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
	<button aria-label="Unlike this restaurant" id="likeButton" class="likeButton liked">
		<p>Remove from Favorite</p>
	</button>
`;

const createNumberOfRestaurant = (restaurantAmount) => `
	<p>You have <b>${restaurantAmount}</b> favorite restaurant</p>
`;

const createRestaurantNotFoundTemplate = () => `
	<div class="not-found-container">
		<h3>Not Found</h3>
	</div>
`;

export {
	createSkeletonRestaurantTemplate,
	createRestaurantItemTemplate,
	createRestaurantSearchTemplate,
	createRestaurantDetailTemplate,
	createLoadingIndicator,
	createSearchNotFoundTemplate,
	createNetworkErrorTemplate,
	createLikeRestaurantButtonTemplate,
	createUnlikeRestaurantButtonTemplate,
	createNumberOfRestaurant,
	createRestaurantNotFoundTemplate,
};
