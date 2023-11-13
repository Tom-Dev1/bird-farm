import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/bird-on-branch-svgrepo-com.png';
import { useSelector } from 'react-redux';
const Navbar = () => {
    const cartProduct = useSelector((state) => state.cart);
    return (
        <div className="wrapper-navbar">
            <div className="navbar-inner">
                <Link to="/" className="inner-left">
                    <div className="nav-brand">
                        <img src={logo} alt="" />
                    </div>
                </Link>
                <div className="inner-center">
                    <Link to="/">Home</Link>
                    <Link>About</Link>
                    <Link>Contact</Link>
                    <Link to="/products">Products</Link>
                </div>
                <div className="inner-right">
                    <Link to="/cart">My Bag {cartProduct.length}</Link>
                    <div>Login</div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
