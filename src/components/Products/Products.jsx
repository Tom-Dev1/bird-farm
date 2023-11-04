import React from 'react';
import styles from './Products.module.scss';
import classNames from 'classnames/bind';
import ProductItem from '../HomePage/ProductItem/ProductItem';
import Search from '../HomePage/Search/Search';

const cx = classNames.bind(styles);
export default function Products() {
    return (
        <div>
            <Search />
            <ProductItem />
        </div>
    );
}
