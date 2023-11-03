import React from 'react';
import styles from '../ProductItem/ProductItem.module.scss';
import classNames from 'classnames/bind';
import ProductList from './ProductList';
const cx = classNames.bind(styles);
export default function ProductItem() {
    return (
        <div className={cx('products-container')}>
            <div className={cx('sec-heading')}>Section Heading</div>
            <div className={cx('products')}>
                <ProductList />
            </div>
        </div>
    );
}
