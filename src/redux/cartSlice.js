import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://birdsellingapi-001-site1.ctempurl.com/api/';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const fetchFromLocalStorage = createAsyncThunk('add-product-to-cart/fetch', async () => {
    try {
        const respone = await axios.get(`${BASE_URL}/Cart/Add-Product-To-Cart`);
        const data = await respone.data.data;
        return data;
    } catch (error) {
        return error;
    }
});
export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
