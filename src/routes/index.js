import Home from '../pages/Home/Home';
import Login from '../pages/Login';
import Products from '../pages/Products/Products';
export const publicRoutes = [
    { path: '/', Component: Home },
    // { path: '/about', Component: Home },
    { path: '/products', Component: Products },

    { path: '/login', Component: Login }
];

export const privateRoutes = [

];
