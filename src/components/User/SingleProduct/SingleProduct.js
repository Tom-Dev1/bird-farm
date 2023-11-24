// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// import './SingleProduct.scss';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductSingle, getProductSingle, setAddReviewToProduct } from '../../../redux/productSlice';
// import { addToCart, addToCartAsync } from '../../../redux/cartSlice';
// import Swal from 'sweetalert2';
// import useAuth from '../../../hooks/useAuth';
// import { useNavigate } from 'react-router-dom/dist';

// const SingleProduct = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const authContext = useAuth();
//     useEffect(() => {
//         dispatch(fetchProductSingle(id));
//     }, [dispatch, id]);
//     const productSingle = useSelector(getProductSingle);

//     const [userRating, setUserRating] = useState(0);
//     const [userComment, setUserComment] = useState('');

//     // const item = useSelector((state) => state.cart.items);
//     // console.log(item);
//     const handleAddToCart = () => {
//         if (authContext.isAuthenticated === false) {
//             Swal.fire({
//                 icon: 'info',
//                 title: 'Thông báo',
//                 text: 'Bạn cần đăng nhập để truy cập trang này.',
//                 confirmButtonText: 'Đăng nhập',
//                 showCancelButton: true,
//                 cancelButtonText: 'Hủy',
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     navigate('/login');
//                 }
//             });
//         } else {
//             if (productSingle) {
//                 const { id, name, price, image } = productSingle;

//                 const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
//                 const isItemInCart = existingCart.some((item) => item.id === id);
//                 Swal.fire({
//                     icon: 'success',
//                     title: `Thêm sản phẩm ${name} thành công !!!`,
//                 });
//                 if (isItemInCart) {
//                     Swal.fire({
//                         icon: 'info',
//                         title: 'Error',
//                         text: `Sản phẩm ${name} đã có trong giỏ hàng`,
//                     });
//                 } else {
//                     const updatedCart = [...existingCart, { id, name, price, image }];
//                     localStorage.setItem('cart', JSON.stringify(updatedCart));
//                 }
//             }
//         }
//     };
//     const handleAddReview = (productID) => {
//         dispatch(setAddReviewToProduct({ rating: userRating, comment: userComment }));
//         setUserRating(0);
//         setUserComment('');
//     };
//     return (
//         <div className="single-product-main-contain">
//             <div className="layout">
//                 <div className="single-product-page">
//                     <div className="left">
//                         <img src={productSingle.image} alt="" />
//                     </div>
//                     <div className="right">
//                         <span className="name">{productSingle.name}</span>
//                         <span className="price">{productSingle.price}$</span>
//                         <span className="desc">{productSingle.description}</span>
//                         <span className="desc">{productSingle.day_of_birth}</span>
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
//                         {/* <div className="info-item">
//                             <span className="text-bold">
//                                 <p>Rating:</p>
//                                 <span>{productSingle.rating}</span>
//                             </span>
//                             <span className="text-bold">
//                                 <p> Add Your Rating:</p>
//                                 <div>
//                                     <input
//                                         type="number"
//                                         min="1"
//                                         max="5"
//                                         value={userRating}
//                                         onChange={(e) => setUserRating(Number(e.target.value))}
//                                     />
//                                     <textarea value={userComment} onChange={(e) => setUserComment(e.target.value)} />
//                                     <button onClick={handleAddReview}>Submit Review</button>
//                                 </div>
//                             </span>
//                         </div> */}
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
import { fetchProductSingle, getProductSingle } from '../../../redux/productSlice';
import { fetchAddToCart, fetchAllCart } from '../../../redux/cartSlice';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom/dist';
import { Typography } from '@mui/material';

const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authContext = useAuth();
    useEffect(() => {
        dispatch(fetchProductSingle(id));
    }, [dispatch, id]);
    const productSingle = useSelector(getProductSingle);

    const item = useSelector((state) => state.cart.cartData);
    // console.log('item ne', item);

    const userID = localStorage.getItem('id');

    const handleAddToCart = () => {
        if (authContext.isAuthenticated === false) {
            Swal.fire({
                icon: 'info',
                title: 'Thông báo',
                text: 'Bạn cần đăng nhập để truy cập trang này.',
                confirmButtonText: 'Đăng nhập',
                showCancelButton: true,
                cancelButtonText: 'Hủy',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
        } else {
            if (productSingle) {
                const isItemInCart = item.some((item) => item.product_id === id);
                // console.log(productSingle.name);
                if (isItemInCart) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Error',
                        text: `Sản phẩm ${productSingle.name} đã có trong giỏ hàng`,
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: `Thêm sản phẩm ${productSingle.name} thành công !!!`,
                    });
                    dispatch(fetchAddToCart({ product_id: id, user_id: userID })).then(() => {
                        dispatch(fetchAllCart(userID));
                    });
                }
            }
        }
    };

    return (
        <div className="single-product-main-contain">
            <div className="layout">
                <div className="single-product-page">
                    <div className="left">
                        <img src={'http://birdsellingapi-001-site1.ctempurl.com/' + productSingle.image} alt="" />
                    </div>
                    <div className="right">
                        {/* <span className="name">{productSingle.name}</span>
                        <span className="sex"> sex: {productSingle.sex ? 'Đực' : 'Cái'}</span>
                        <span className="price">{productSingle.price}$</span>
                        <span className="desc">{productSingle.description}</span>
                        <span className="desc">{productSingle.day_of_birth}</span> */}
                        <Typography gutterBottom variant="h5" component="div">
                            {productSingle.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {productSingle.sex ? 'Male Bird' : 'Female Bird'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Price: <span style={{ fontSize: 'large', fontWeight: 'bold' }}>${productSingle.price}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span
                                style={{
                                    color:
                                        productSingle.statusProduct === 1
                                            ? 'green'
                                            : productSingle.statusProduct === 2
                                            ? 'red'
                                            : 'inherit',
                                    fontWeight: 'bold',
                                    fontSize: 'large',
                                }}
                            >
                                {productSingle.statusProduct === 1 ? 'Sell' : 'Sold out'}
                            </span>
                        </Typography>
                        <div className="cart-button">
                            <button className="add-to-cart-button" onClick={handleAddToCart}>
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
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SingleProduct;
