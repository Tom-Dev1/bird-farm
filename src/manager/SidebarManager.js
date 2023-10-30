import React from "react";
import { NavLink } from "react-router-dom";
import './SidebarManager.css'; 

const Sidebar = () => {
    return (
        <div>
            <aside className="navbar-aside" id="offcanvas_aside">
                <nav>
                    <ul className="menu-aside">
                        <li className="menu-item">
                            <NavLink to="/manager" activeClassName="active" className="menu-link" exact>
                                <i className="icon fas fa-home"></i>
                                <span className="text">Thống Kê</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/products" activeClassName="active" className="menu-link">
                                <i className="icon fas fa-shopping-bag"></i>
                                <span className="text">Sản Phẩm</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/new-product" activeClassName="active" className="menu-link">
                                <i className="icon fas fa-cart-plus"></i>
                                <span className="text">Thêm Sản Phẩm</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/account" activeClassName="active" className="menu-link">
                                <i className="icon fas fa-list"></i>
                                <span className="text">Tài Khoản</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/news" activeClassName="active" className="menu-link">
                                <i className="icon fas fa-list"></i>
                                <span className="text">News</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/orders" activeClassName="active" className="menu-link">
                                <i className="icon ri-handbag-fill"></i>
                                <span className="text">Đơn Hàng</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
