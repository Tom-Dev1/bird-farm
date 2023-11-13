// store.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';
import searchReducer from './searchSlice';
import cartReducer from './cartSlice';
const store = configureStore({
    reducer: {
        categories: categoryReducer,
        products: productReducer,
        search: searchReducer,
        cart: cartReducer,
    },
});

export default store;
