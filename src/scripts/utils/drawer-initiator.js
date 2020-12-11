const DrawerInitiator = {
	init({ hamburgerButton, navigationDrawer, navLink }) {
		hamburgerButton.addEventListener('click', (event) => {
			this._toggleDrawer(event, hamburgerButton, navigationDrawer);
		});

		navLink.addEventListener('click', (event) => {
			this._closeDrawer(event, hamburgerButton, navigationDrawer);
		});
	},

	_toggleDrawer(event, hamburgerButton, navigationDrawer) {
		event.stopPropagation();
		navigationDrawer.classList.toggle('open');
		hamburgerButton.classList.toggle('remove');
	},

	_closeDrawer(event, hamburgerButton, navigationDrawer) {
		event.stopPropagation();
		navigationDrawer.classList.remove('open');
		hamburgerButton.classList.remove('remove');
	},
};

export default DrawerInitiator;
