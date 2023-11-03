import routesConfig from '../config/routes';

//layout
import { HeaderFooter } from '../Layout/HeaderFooter';

//page
import About from '../pages/About';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Products from '../pages/Products';
// import Category from '../pages/Category';
import ProductDetail from '../pages/ProductDetail';

const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.about, component: About, layout: HeaderFooter },
    { path: routesConfig.contact, component: Contact },
    { path: routesConfig.login, component: Login, layout: null },
    { path: routesConfig.products, component: Products },
    { path: routesConfig.product, component: ProductDetail },
];

const privateRoutes = [
    //phải login
];

export { privateRoutes, publicRoutes };
