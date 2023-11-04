import React, { useEffect, useState } from 'react';
import styles from '../Header/Header.module.scss';
import classNames from 'classnames/bind';
// import routes from '../../../config/routes';
import logo from '../../asset/images/bird-on-branch-svgrepo-com.png';
import MenuItem from './Menu/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from './Menu';

import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('header')}>
            <div className={cx('header-inner')}>
                <div className={cx('inner-left')}>
                    <a href="/" className={cx('header-brand')}>
                        <img src={logo} alt="logo" />
                    </a>
                </div>

                <div className={cx('inner-center')}>
                    <Menu>
                        <MenuItem title="Home" to="/" />
                        <MenuItem title="About" to="/about" />
                        <MenuItem title="Contact" to="/contact" />
                        <MenuItem title="Products" to="/products" />
                        <MenuItem title="News" to="/news" />
                    </Menu>
                </div>

                <div className={cx('inner-right')}>
                    {/* <span>
                        <ShoppingCartIcon fontSize="large" />
                    </span> */}
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
