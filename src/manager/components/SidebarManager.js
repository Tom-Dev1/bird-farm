import React from "react";
import { NavLink } from "react-router-dom";
import '../StyleManager/SidebarManager.css';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListIcon from '@mui/icons-material/List';
import { useState } from "react";

const SidebarManager = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "Home",
            icon: <HomeIcon sx={{ fontSize: 25 }} />
        },
        {
            path: "/manager/dashboard",
            name: "Dashboard",
            icon: <BarChartIcon sx={{ fontSize: 25 }} />
        },
        {
            path: "/manager/products",
            name: "Products",
            icon: <ProductionQuantityLimitsIcon sx={{ fontSize: 25 }} />
        },
        {
            path: "/manager/categories",
            name: "Category",
            icon: <CategoryIcon sx={{ fontSize: 25 }} />
        },
        {
            path: "/manager/account",
            name: "Account",
            icon: <AccountBoxIcon sx={{ fontSize: 25 }} />
        },
        {
            path: "/manager/orders",
            name: "Orders",
            icon: <ShoppingCartIcon sx={{ fontSize: 25 }} />
        },
    ]
    return (
        <div className="container_sidebar">
            <div style={{ width: isOpen ? "200px" : "80px" }} className="sidebar">
                <div className="top-section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Xin Chào, Manager</h1>
                    <div style={{ marginLeft: isOpen ? "130px" : "10px" }} className="bars">
                        <ListIcon onClick={toggle} sx={{ fontSize: 35 }} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeClassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default SidebarManager;
