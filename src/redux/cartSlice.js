import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://birdsellingapi-001-site1.ctempurl.com/api/';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        cartTotalAmount: 0,
        status: 'idle',
        error: null,
    },
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
            } else {
                const temProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(temProduct);
            }
        },
    },
});

export const { addToCart } = cartSlice.actions;
// export const selectedCartItems = (state) => state.cart.items;
export default cartSlice.reducer;
