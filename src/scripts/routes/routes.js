import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';
import Restaurant from '../views/pages/restaurants';
import Search from '../views/pages/search';

const Routes = {
	'/': Restaurant,
	'/restaurant': Restaurant,
	'/search': Search,
	'/favorite': Favorite,
	'/detail/:id': Detail,
};

export default Routes;
