const SearchbarInitiator = {
	init({
		searchIcon,
		searchBar,
		navLink,
	}) {
		window.addEventListener('load', () => {
			this._identifierUrlToOpenSearchBar(searchBar);
		});

		navLink.addEventListener('click', () => {
			this._identifierUrlToOpenSearchBar(searchBar);
		});

		window.addEventListener('hashchange', () => {
			this._identifierUrlToOpenSearchBar(searchBar);
		});

		searchIcon.addEventListener('click', () => {
			this._identifierUrlToOpenSearchBar(searchBar);
		});
	},

	_identifierUrlToOpenSearchBar(searchBar) {
		const url = window.location.hash.slice(2).toLowerCase();
		this._openSearchBar(url, searchBar);
	},

	_openSearchBar(url, searchBar) {
		if (url === 'search') {
			searchBar.classList.add('searchbarOpen');
		} else {
			searchBar.classList.remove('searchbarOpen');
		}
	},
};

export default SearchbarInitiator;
