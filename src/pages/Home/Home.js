import React, { useEffect } from 'react';

import './Home.scss';
import Banner from '../../components/User/Banner/Banner';
// import ProductList from '../../components/ProductList/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, getAllCategories } from '../../redux/categorySlice';
import Category from '../../components/User/Category/Category';
const Home = () => {
    const dispatch = useDispatch();
    // const categories = useSelector((state) => state.categories.categories);
    // console.log(categories);
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const categories = useSelector(getAllCategories);
    // console.log(categories);

    return (
        <div>
            <Banner />
            <Category categories={categories} />

            <div className="layout">
                <div className="products-container">
                    <div className="sec-heading">Section Heading</div>
                    <div className="products">{/* <ProductList /> */}</div>
                </div>
            </div>
        </div>
    );
};

export default Home;
