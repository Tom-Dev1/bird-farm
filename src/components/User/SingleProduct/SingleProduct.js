// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// import './SingleProduct.scss';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductSingle, getProductSingle } from '../../../redux/productSlice';
// import { addToCart, addToCartAsync } from '../../../redux/cartSlice';

// const SingleProduct = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(fetchProductSingle(id));
//     }, [dispatch, id]);
//     const productSingle = useSelector(getProductSingle);
//     // console.log(productSingle);
//     const handleAddToCart = (productSingle) => {
//         dispatch(addToCart(productSingle));
//     };
//     return (
//         <div className="single-product-main-contain">
//             <div className="layout">
//                 <div className="single-product-page">
//                     <div className="left">
//                         <img src={productSingle?.image} alt="" />
//                     </div>
//                     <div className="right">
//                         <span className="name">{productSingle?.name}</span>
//                         <span className="price">&#8377;{productSingle?.price}</span>
//                         <span className="desc">{productSingle?.description}</span>
//                         <div className="cart-button">
//                             <button className="add-to-cart-button" onClick={() => handleAddToCart(productSingle.id)}>
//                                 <AddShoppingCartIcon fontSize={'large'} />
//                                 ADD TO CART
//                             </button>
//                         </div>
//                         <span className="divider"></span>
//                         <div className="info-item">
//                             <span className="text-bold">
//                                 <p>Category:</p>
//                                 <span>Bird</span>
//                             </span>
//                             <span className="text-bold">
//                                 <p> Share:</p>
//                                 <span className="social-icons">
//                                     <FacebookIcon />
//                                     <InstagramIcon />
//                                     <TwitterIcon />
//                                 </span>
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default SingleProduct;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './SingleProduct.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductSingle, getProductSingle, setAddReviewToProduct } from '../../../redux/productSlice';
import { addToCart, addToCartAsync } from '../../../redux/cartSlice';

const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProductSingle(id));
    }, [dispatch, id]);
    const productSingle = useSelector(getProductSingle);
    const [userRating, setUserRating] = useState(0);
    const [userComment, setUserComment] = useState('');
    // console.log(productSingle);
    const handleAddToCart = (productSingle) => {
        dispatch(addToCart(productSingle));
    };
    const handleAddReview = (productID) => {
        dispatch(setAddReviewToProduct({ rating: userRating, comment: userComment }));
        setUserRating(0);
        setUserComment('');
    };
    return (
        <div className="single-product-main-contain">
            <div className="layout">
                <div className="single-product-page">
                    <div className="left">
                        <img src={productSingle?.image} alt="" />
                    </div>
                    <div className="right">
                        <span className="name">{productSingle?.name}</span>
                        <span className="price">&#8377;{productSingle?.price}</span>
                        <span className="desc">{productSingle?.description}</span>
                        <div className="cart-button">
                            <button className="add-to-cart-button" onClick={() => handleAddToCart(productSingle.id)}>
                                <AddShoppingCartIcon fontSize={'large'} />
                                ADD TO CART
                            </button>
                        </div>
                        <span className="divider"></span>
                        <div className="info-item">
                            <span className="text-bold">
                                <p>Category:</p>
                                <span>Bird</span>
                            </span>
                            <span className="text-bold">
                                <p> Share:</p>
                                <span className="social-icons">
                                    <FacebookIcon />
                                    <InstagramIcon />
                                    <TwitterIcon />
                                </span>
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="text-bold">
                                <p>Rating:</p>
                                <span>{productSingle.rating}</span>
                            </span>
                            <span className="text-bold">
                                <p> Add Your Rating:</p>
                                <div>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={userRating}
                                        onChange={(e) => setUserRating(Number(e.target.value))}
                                    />
                                    <textarea value={userComment} onChange={(e) => setUserComment(e.target.value)} />
                                    <button onClick={handleAddReview}>Submit Review</button>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SingleProduct;
