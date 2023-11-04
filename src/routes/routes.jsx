<<<<<<< HEAD
//layout
// import { HeaderFooter } from '../Layout/HeaderFooter';
=======
import routesConfig from '../config/routes';

//layout
import { HeaderFooter } from '../Layout/HeaderFooter';
>>>>>>> main

//page
import About from '../pages/About';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
<<<<<<< HEAD
import Login from '../pages/LoginPage/Login';
import Product from '../pages/Product';
// import Products from '../pages/Products';
// import Register from '../pages/LoginPage/Register/register';
// // import Category from '../pages/Category';
import ProductDetail from '../pages/ProductDetail';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login },
    { path: '/products', component: Product },
    // { path: '/register', component: Register },
    { path: '/products/:id', component: ProductDetail },
=======
import Login from '../pages/LoginPage/Login/Login';
import Products from '../pages/Products';
import Register from '../pages/LoginPage/Register/register';
// import Category from '../pages/Category';
import ProductDetail from '../pages/ProductDetail';

const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.about, component: About, layout: HeaderFooter },
    { path: routesConfig.contact, component: Contact },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: routesConfig.products, component: Products },
    { path: routesConfig.product, component: ProductDetail },
>>>>>>> main
];

const privateRoutes = [
    //phải login
];

export { privateRoutes, publicRoutes };
