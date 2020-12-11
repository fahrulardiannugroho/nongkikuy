const JumbotronInitiator = {
	init({ jumbotron, navLink }) {
		window.addEventListener('load', () => {
			this._identifierUrlToOpenJumbotron(jumbotron);
		});

		navLink.addEventListener('click', () => {
			this._identifierUrlToOpenJumbotron(jumbotron);
		});

		window.addEventListener('hashchange', () => {
			this._identifierUrlToOpenJumbotron(jumbotron);
		});
	},

	_identifierUrlToOpenJumbotron(jumbotron) {
		const url = window.location.hash.slice(2).toLowerCase();
		this._openJumbotron(url, jumbotron);
	},

	_openJumbotron(url, jumbotron) {
		if (url === '' || url === 'restaurant') {
			jumbotron.classList.add('jumbotronOpen');
		} else {
			jumbotron.classList.remove('jumbotronOpen');
		}
	},
};

export default JumbotronInitiator;
