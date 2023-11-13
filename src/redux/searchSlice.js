import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://birdsellingapi-001-site1.ctempurl.com/api/';

export const fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async (value) => {
    try {
        const response = await axios.get(`${BASE_URL}Product/GetProduct`);
        const results = await response.data.data.filter((product) => {
            return value && product.name.toLowerCase().includes(value.toLowerCase());
        });
        return results;
    } catch (error) {
        return error;
    }
});

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        input: '',
        searchResults: [],
    },
    reducers: {
        setInput: (state, action) => {
            state.input = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.searchResults = action.payload;
        });
    },
});

export const getInput = (state) => state.search.input;
export const getSearchResults = (state) => state.search.searchResults;

export const { setInput } = searchSlice.actions;
export default searchSlice.reducer;
//unicode
