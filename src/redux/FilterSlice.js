// filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        category_id: null,
        name: '',
        sex: null,
        typeProduct: null,
        priceFrom: null,
        priceTo: null,
        statusProduct: null,
    },
    reducers: {
        setFilter: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearFilters: (state) => {
            return {
                category_id: null,
                name: '',
                sex: null,
                typeProduct: null,
                priceFrom: null,
                priceTo: null,
                statusProduct: null,
            };
        },
    },
});

export const { setFilter, clearFilters } = filterSlice.actions;
export const getFilters = (state) => state.filters;

export default filterSlice.reducer;
