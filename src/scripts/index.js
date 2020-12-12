import 'regenerator-runtime';
import '../styles/style.scss';
import '../styles/responsive.scss';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
	hamburgerButton: document.querySelector('#hamburgerButton'),
	navigationDrawer: document.querySelector('#navigationDrawer'),
	navLink: document.querySelector('#navLink'),
	main: document.querySelector('#main'),
	jumbotron: document.querySelector('#jumbotron'),
	searchIcon: document.querySelector('#searchIcon'),
	searchBar: document.querySelector('#searchBar'),
});

window.addEventListener('hashchange', () => {
	app.renderPage();
});

window.addEventListener('load', () => {
	app.renderPage();
	swRegister();
});
