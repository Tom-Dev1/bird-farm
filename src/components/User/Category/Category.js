import React from 'react';
import './Category.scss';
import { Link } from 'react-router-dom';
const Category = ({ categories }) => {
    return (
        <div className="wrap-category">
            <div className="category-content">
                <div className="category-title">
                    <h2>CATEGORIES</h2>
                </div>
                <div className="category-list">
                    {categories.map((category) => {
                        return (
                            <div className="category-item" key={category.id}>
                                <Link to="/products">{category.category_name}</Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Category;
