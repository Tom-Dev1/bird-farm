import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/bird-on-branch-svgrepo-com.png';
const Navbar = () => {
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
                <div className="inner-right">Login</div>
            </div>
        </div>
    );
};

export default Navbar;
