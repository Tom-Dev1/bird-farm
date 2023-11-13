import Cart from '../pages/Cart/Cart';
import Home from '../pages/Home/Home';
import Products from '../pages/ProductsPage/Products';
import SingleProduct from '../pages/SingleProductPage/SingleProductPage';
export const publicRoutes = [
    { path: '/', Component: Home },
    // { path: '/about', Component: Home },
    { path: '/products', Component: Products },
];

export const privateRoutes = [

];
