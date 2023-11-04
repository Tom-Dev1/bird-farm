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
    // console.log(id);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `https://birdsellingapi.azurewebsites.net/api/Product/GetProductByID/${id}`,
                );
                setProduct(response.data.data);
                // console.log(response.data.data);
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
                        <span className={cx('name')}>{product?.name}</span>
                        <span className={cx('price')}>&#8377;{product?.price}</span>
                        <span className={cx('desc')}>{product?.description}</span>
                        <div className={cx('cart-button')}>
                            <button className={cx('add-to-cart-button')}>
                                <AddShoppingCartIcon fontSize={'large'} />
                                ADD TO CART
                            </button>
                        </div>
                        <span className={cx('divider')}></span>
                        <div className={cx('info-item')}>
                            <span className={cx('text-bold')}>
                                <p>Category:</p>
                                <span>Bird</span>
                            </span>
                            <span className={cx('text-bold')}>
                                <p> Share:</p>
                                <span className={cx('social-icons')}>
                                    <FacebookIcon />
                                    <InstagramIcon />
                                    <TwitterIcon />
                                </span>
                            </span>
                        </div>
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
