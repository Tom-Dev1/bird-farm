import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchResults: [],
};

const productReducer = createSlice({
    name: 'PRODUCT',
    initialState,
    reducers: {
        setSearchResults(state, action) {
            state.searchResults = action.payload;
        },
    },
});

export default productReducer;
