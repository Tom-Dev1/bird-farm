import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../ProductDetail/ProductDetail.module.scss';
import classNames from 'classnames/bind';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
const cx = classNames.bind(styles);
export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    console.log(id);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `https://birdsellingapi.azurewebsites.net/api/Product/GetProductByID/${id}`,
                );
                setProduct(response.data.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div className={cx('single-product-main-contain')}>
            <div className={cx('layout')}>
                <div className={cx('single-product-page')}>
                    <div className={cx('left')}>
                        <img src={product?.image} alt="" />
                    </div>
                    <div className={cx('right')}>
                        <span>ProductName:</span>
                        <span>{product?.name}</span>
                        Price:
                        <span> {product?.price}</span>
                        Decription
                        <span>{product?.description}</span>
                    </div>
                    <div className={cx('cart-button')}>
                        <button className={cx('add-to-cart-button')}>
                            <AddShoppingCartIcon fontSize={'large'} />
                            ADD TO CART
                        </button>
                    </div>

                    <span className={cx('divider')}></span>
                    <div className={cx('info-item')}>
                        <span className={cx('text-bold')}>
                            Category:
                            <span>Bird</span>
                        </span>
                        <span className={cx('text-bold')}>
                            Share:
                            <span className={cx('social-icons')}>
                                <FacebookIcon />
                                <InstagramIcon />
                                <TwitterIcon />
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            {/* <h2>{product.name}</h2>
            <p>{product.description}</p>
            <img src={product.image} alt={product.name} />
            <p>Price: {product.price}</p>
            {/* Các thông tin khác về sản phẩm */}
        </div>
    );
}
