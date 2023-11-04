const searchProducts = (products) => ({
    type: 'SEARCH_PRODUCTS',
    payload: products,
});

const setSearchQuery = (query) => ({
    type: 'SET_SEARCH_QUERY',
    payload: query,
});

const navigateToProducts = () => ({
    type: 'NAVIGATE_TO_PRODUCTS',
});
