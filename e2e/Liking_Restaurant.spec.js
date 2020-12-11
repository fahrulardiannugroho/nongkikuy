/* eslint-disable no-undef */
Feature('Liking Restaurant');

Before(({ I }) => {
	I.amOnPage('/#/favorite');
});

const assert = require('assert');

Scenario('added restaurant to favorite list', async ({ I }) => {
	I.see('Not Found', '.not-found-container');

	I.amOnPage('/');

	I.seeElement('#restaurant');
	const firstRestaurant = locate('h3 a').first();
	const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
	I.click(firstRestaurant);

	I.seeElement('#likeButton');
	I.click('#likeButton');

	I.amOnPage('/#/favorite');
	I.seeElement('#restaurant');
	const likedRestaurantTitle = await I.grabTextFrom('h3 a');
	assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('cancel liking the restaurant', async ({ I }) => {
	I.see('Not Found', '.not-found-container');

	I.amOnPage('/');

	I.seeElement('#restaurant');
	const firstRestaurant = locate('h3 a').first();
	const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
	I.click(firstRestaurantTitle);

	I.seeElement('#likeButton');
	I.click('#likeButton');

	I.amOnPage('/#/favorite');
	I.seeElement('#restaurant');
	const likedRestaurantTitle = await I.grabTextFrom('h3 a');

	assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

	I.seeElement('h3 a');
	const restaurantFavorite = locate('h3 a').first();
	const restaurantFavoriteTitle = await I.grabTextFrom(restaurantFavorite);
	I.click(restaurantFavoriteTitle);

	I.seeElement('.liked');
	I.click('.liked');

	I.amOnPage('/#/favorite');
	I.dontSeeElement(restaurantFavoriteTitle);
});

Scenario('customer review', async ({ I }) => {
	I.see('Not Found', '.not-found-container');

	I.amOnPage('/');

	I.seeElement('#restaurant');
	I.click(locate('h3 a').first());

	I.seeElement('.review');

	const reviewerName = 'Fahrul';
	const reviewText = 'E2E Testing';
	I.fillField('#reviewerName', reviewerName);
	I.fillField('#reviewArea', reviewText);

	I.click('#reviewButton');

	I.seeElement('.swal-modal');

	I.click('.swal-button');

	const lastReviewerName = locate('.name').last();
	const lastReviewerNameText = await I.grabTextFrom(lastReviewerName);
	const lastReview = locate('.review-text').last();
	const lastReviewText = await I.grabTextFrom(lastReview);

	assert.strictEqual(reviewerName, lastReviewerNameText);
	assert.strictEqual(reviewText, lastReviewText);
});
