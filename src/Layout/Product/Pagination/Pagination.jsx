import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Pagination/Pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination({ productsPerPage, totalProducts, currentPage, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={cx('pagination')}>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={number === currentPage ? cx('btn-pagina', 'active') : cx('btn-pagina')}
                >
                    {number}
                </button>
            ))}
        </div>
    );
}

export default Pagination;
