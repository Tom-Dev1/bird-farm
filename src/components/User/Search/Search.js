// import React, { useEffect, useState } from 'react';
// import './Search.scss';
// import { useDispatch, useSelector } from 'react-redux';

// import { setInput, fetchSearchResults, getInput, getSearchResults } from '../../../redux/searchSlice';
// import { getAllProducts, getIsLoading } from '../../../redux/productSlice';
// import { BeatLoader } from 'react-spinners';
// import ProductList from '../ProductList/ProductList';

// const Search = () => {
//     const dispatch = useDispatch();
//     const [searchInput, setSearchInput] = useState('');
//     const isLoading = useSelector(getIsLoading); // Thêm dòng này để lấy isLoading từ Redux
//     const products = useSelector(getAllProducts);
//     const input = useSelector(getInput);
//     const searchResults = useSelector(getSearchResults);

//     useEffect(() => {
//         dispatch(setInput(searchInput));
//     }, [dispatch, searchInput]);

//     const handleSearch = () => {
//         dispatch(fetchSearchResults(input));
//     };
//     return (
//         <div className="search-container">
//             <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//             />
//             <button onClick={handleSearch}>Search</button>
//             {isLoading ? (
//                 <div style={{ textAlign: 'center' }}>
//                     <BeatLoader color="#36d7b7" />
//                 </div>
//             ) : (
//                 <ProductList products={searchResults.length > 0 ? searchResults : products} />
//             )}
//         </div>
//     );
// };

// export default Search;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Search.scss';
import { fetchSearchResults, setInput } from '../../../redux/searchSlice';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(fetchSearchResults(searchInput));
        dispatch(setInput(searchInput));
        // navigate('/products');
    };

    return (
        <form className="search-container" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="search-button" type="submit">
                Search
            </button>
        </form>
    );
};

export default Search;
