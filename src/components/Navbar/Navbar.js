import React, { useEffect } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/bird-on-branch-svgrepo-com.png';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
// import AccountCircle from '@mui/icons-material/AccountCircle';
import { AccountCircle } from '@mui/icons-material';
import swal from 'sweetalert2';

const Navbar = () => {
    const { logout, isAuthenticated } = useAuth();
    const cartProduct = useSelector((state) => state.cart);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        // Update the isLoggedIn state when the authentication status changes
        setLoggedIn(isAuthenticated);
    }, [isAuthenticated]);
    const isMenuOpen = Boolean(anchorEl);

    const handleLogout = async () => {
        try {
            // Use SweetAlert for the confirmation dialog
            const result = await swal.fire({
                title: 'Logout',
                text: 'Are you sure you want to logout?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, logout!',
            });

            if (result.isConfirmed) {
                // User clicked "Yes, logout!"
                await logout();
                localStorage.removeItem('role');
                localStorage.removeItem('username');
                handleMenuClose();
                swal.fire('Logged Out!', 'You have been logged out.', 'success');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            swal.fire('Error', 'An error occurred during logout.', 'error');
        }
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const menuId = 'primary-search-account-menu';

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );
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
                    <Link to="/cart">My Bag {cartProduct.length}</Link>
                </div>
                <div className="inner-right">
                    {isLoggedIn ? (
                        <>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            {renderMenu}
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
