import React, { useState } from "react";
import { Link } from "react-router-dom";
import './NavigationManager.css';
const NavigationManager = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="main-header navbar" style={{ padding: "0 45px" }}>
            <div className="col-search"></div>
            <div className="col-nav">
                <button
                    className="btn btn-icon btn-mobile me-auto"
                    data-trigger="#offcanvas_aside"
                >
                    <i className="md-28 fas fa-bars"></i>
                </button>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className={`nav-link btn-icon `} title="Dark mode" to="#">
                            <i className="fas fa-moon"></i>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link btn-icon" to="#">
                            <i className="fas fa-bell"></i>
                        </Link>
                    </li>
                    <li className="dropdown nav-item" onClick={toggleDropdown}>
                        <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
                            <i className="fas fa-user"></i>
                        </Link>
                        {isOpen && (
                            <div className="dropdown-menu dropdown-menu-end" style={{ display: "block", position: 'fixed' }}>
                                <Link className="dropdown-item" to="/">
                                    Tài Khoản
                                </Link>
                                <Link
                                    className="dropdown-item text-danger"
                                    to="/"
                                >
                                    Thoát
                                </Link>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default NavigationManager;
