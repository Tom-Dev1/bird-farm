import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../../redux/productSlice';
import { useSelector } from 'react-redux';

// import { Link } from 'react-router-dom';
import { getSearchResults } from '../../../redux/searchSlice';

import ProductListDisplay from './ProductListDisplay';
// import { fetchProductsOfCategory } from '../../../redux/categorySlice';

const ProductList = () => {
    // const dispatch = useDispatch();
    const searchResults = useSelector(getSearchResults);
    const allProducts = useSelector(getAllProducts);

    // const [selectedCategory, setSelectedCategory] = useState('all');

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(9);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleProductsPerPage = (e) => {
        const newProductsPerPage = parseInt(e.target.value, 10);
        setProductsPerPage(newProductsPerPage);
        setCurrentPage(1);
    };
    // useEffect(() => {
    //     // Hoặc hiển thị một thông báo khác cho người dùng
    //     // const numberOfResults = searchResults.length;
    //     // if (numberOfResults === 0) {
    //     //     setErrorMessage("Không tìm thấy kết quả nào phù hợp với từ khóa tìm kiếm của bạn.");
    //     // } else {
    //     //     setErrorMessage("");
    //     // }
    //     // Logic để xử lý thay đổi trong searchResults (nếu cần)
    //     //  const numberOfResults = searchResults.length;
    //     //   console.log(`Số lượng kết quả tìm kiếm: ${numberOfResults}`);
    //     // Gọi API hoặc dispatch action Redux khác dựa trên kết quả tìm kiếm
    //     // Cập nhật local state khác dựa trên kết quả tìm kiếm
    //     // Thực hiện các thống kê khác nếu cần
    //     // console.log('Search results have changed:', searchResults);
    // }, [searchResults]);
    useEffect(() => {
        if (searchResults.length > 0) {
            const maxPage = Math.ceil(searchResults.length / productsPerPage);
            if (currentPage > maxPage) {
                setCurrentPage(Math.max(1, maxPage));
            }
        }
    }, [searchResults, currentPage, productsPerPage, setCurrentPage]);

    // useEffect(() => {
    // Fetch products based on the selected category
    // Example:
    // dispatch(fetchProductsOfCategory(selectedCategory));
    // }, [selectedCategory]);
    // useEffect(() => {
    //     if (setSelectedCategory === 'all') {
    //         dispatch(fetchProducts());
    //     } else {
    //         dispatch(fetchProductsOfCategory(setSelectedCategory));
    //     }
    // }, [dispatch, setSelectedCategory]);

    return (
        <ProductListDisplay
            products={searchResults.length > 0 ? searchResults : allProducts}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            totalProducts={searchResults.length > 0 ? searchResults.length : allProducts.length}
            paginate={paginate}
            handleProductsPerPage={handleProductsPerPage}
        />
    );
};
export default ProductList;
