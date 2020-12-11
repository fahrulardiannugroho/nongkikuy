import Routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';
import JumbotronInitiator from '../utils/jumbotron-initiator';
import SearchbarInitiator from '../utils/searchbar-initiator';

class App {
	constructor({
		hamburgerButton,
		navigationDrawer,
		navLink,
		main,
		jumbotron,
		searchIcon,
		searchBar,
		searchQuery,
		searchButton,
	}) {
		this._hamburgerButton = hamburgerButton;
		this._navigationDrawer = navigationDrawer;
		this._navLink = navLink;
		this._main = main;
		this._jumbotron = jumbotron;
		this._searchIcon = searchIcon;
		this._searchBar = searchBar;
		this._searchQuery = searchQuery;
		this._searchButton = searchButton;

		this._initialAppShell();
	}

	_initialAppShell() {
		DrawerInitiator.init({
			hamburgerButton: this._hamburgerButton,
			navigationDrawer: this._navigationDrawer,
			navLink: this._navLink,
		});

		JumbotronInitiator.init({
			jumbotron: this._jumbotron,
			navLink: this._navLink,
		});

		SearchbarInitiator.init({
			searchIcon: this._searchIcon,
			searchBar: this._searchBar,
			navLink: this._navLink,
		});
	}

	async renderPage() {
		const url = UrlParser.parseActiveUrlWithCombainer();
		const page = Routes[url];
		this._main.innerHTML = await page.render();
		await page.afterRender({
			searchButton: this._searchButton,
			searchQuery: this._searchQuery,
		});
	}
}

export default App;
