// // // import React, { useState } from 'react';
// // // import { Link } from 'react-router-dom';
// // // import './Cart.scss';
// // // import { useEffect } from 'react';

// // // const Cart = () => {
// // //     const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
// // //     const [carts, setCarts] = useState(initialCart);
// // //     const [cartItemCount, setCartItemCount] = useState(0);

// // //     const EmptyCart = () => {
// // //         return (
// // //             <div className="wrapper-cart">
// // //                 <h3 className="cart-title">My Cart</h3>
// // //                 <div className="wrap-content">
// // //                     <div className="wrap-bg">
// // //                         <span className="sentence">Cart is empty</span>
// // //                         <span className="sentence">Please continue to search for products to add to cart</span>
// // //                         <Link to="/" className="btn-cart">
// // //                             Continue Shopping

// // //                         </Link>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         );
// // //     };

// // //     return (
// // //         <>
// // //             {carts.length === 0 ? (
// // //                 <EmptyCart />
// // //             ) : (
// // //                 <div className="wrapper-cart">
// // //                     <h3 className="cart-title">My Cart</h3>
// // //                     <div className="wrap-content">
// // //                         <div className="list">
// // //                             {carts.map((product, index) => (
// // //                                 <div className="item" key={product.id}>
// // //                                     <div className="item-div">
// // //                                         <div className="item-name"> STT</div>
// // //                                         <span className="item-value"> {index + 1}</span>
// // //                                     </div>
// // //                                     <div>
// // //                                         <div>Image</div>
// // //                                         <img src={product.image} alt={product.name} className="img" />
// // //                                     </div>
// // //                                     <div className="item-div">
// // //                                         <div className="item-name">Name</div>
// // //                                         <h3 className="item-value">{product.name}</h3>
// // //                                     </div>
// // //                                     <div className="item-div">
// // //                                         <div className="item-name">Delete</div>
// // //                                         <button className="item-value">Delete</button>
// // //                                     </div>
// // //                                     <div className="item-div">
// // //                                         <div className="item-name">Price</div>
// // //                                         <div className="item-value">
// // //                                             ${product.price} x {product.qty}
// // //                                         </div>
// // //                                     </div>
// // //                                     <div className="item-div">
// // //                                         <div className="item-name">Quantity</div>
// // //                                         <div className="item-value">1</div>
// // //                                     </div>
// // //                                 </div>
// // //                             ))}
// // //                         </div>
// // //                         <div className="item-div">
// // //                             <div className="item-name">Total</div>
// // //                             <div className="item-value"> $</div>
// // //                             <button className="checkout-btn">Checkout</button>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             )}
// // //         </>
// // //     );
// // // };

// // // export default Cart;

// // // // useEffect(() => {
// // // //     setCarts(carts); // Đảm bảo cập nhật state khi có thay đổi
// // // //     const totalItems = carts.reduce((total, cart) => total + cart.qty, 0);
// // // //     setCartItemCount(totalItems);
// // // // }, [carts]);

// // // // const updateCart = (updatedCart) => {
// // // //     setCarts(updatedCart);
// // // //     localStorage.setItem('cart', JSON.stringify(updatedCart));
// // // // };

// // // // const handleDelete = (productId) => {
// // // //     const updatedCart = carts.filter((cart) => cart.id !== productId);
// // // //     updateCart(updatedCart);

// // // //     localStorage.setItem('cart', JSON.stringify(updatedCart));
// // // // };

// // // // const handleClearCart = () => {
// // // //     updateCart([]);
// // // // };

// // // // const calculateTotalAmount = () => {
// // // //     return carts.reduce((total, cart) => total + cart.price * cart.qty, 0);
// // // // };
// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import './Cart.scss';
// // import { useDispatch } from 'react-redux';
// // import { fetchFromLocalStorage } from '../../../redux/cartSlice';

// // const Cart = () => {
// //     const dispatch = useDispatch();
// //     const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
// //     const [carts, setCarts] = useState(initialCart);

// //     const updateCart = (updatedCart) => {
// //         setCarts(updatedCart);
// //         localStorage.setItem('cart', JSON.stringify(updatedCart));
// //     };

// //     const handleDelete = (productId) => {
// //         const updatedCart = carts.filter((cart) => cart.id !== productId);
// //         updateCart(updatedCart);
// //     };

// //     const handleClearCart = () => {
// //         updateCart([]);
// //     };

// //     const calculateTotalAmount = () => {
// //         return carts.reduce((total, cart) => total + cart.price * cart.qty, 0);
// //     };

// //     const EmptyCart = () => {
// //         return (
// //             <div className="wrapper-cart">
// //                 <h3 className="cart-title">My Cart</h3>
// //                 <div className="wrap-content">
// //                     <div className="wrap-bg">
// //                         <span className="sentence">Cart is empty</span>
// //                         <span className="sentence">Please continue to search for products to add to cart</span>
// //                         <Link to="/" className="btn-cart">
// //                             Continue Shopping
// //                         </Link>
// //                     </div>
// //                 </div>
// //             </div>
// //         );
// //     };

// //     // const handleCheckout = () => {
// //     //     // In a real application, you would handle the checkout process here.
// //     //     // For now, we'll just clear the cart.
// //     //     handleClearCart();
// //     //     alert('Checkout successful! Cart cleared.');
// //     // };
// //     const handleCheckout = () => {
// //         dispatch(fetchFromLocalStorage(carts.id));
// //     };
// //     console.log('carts.id', carts.id);
// //     return (
// //         <>
// //             {carts.length === 0 ? (
// //                 <EmptyCart />
// //             ) : (
// //                 <div className="wrapper-cart">
// //                     <h3 className="cart-title">My Cart</h3>
// //                     <div className="wrap-content">
// //                         <div className="list">
// //                             {carts.map((product, index) => (
// //                                 <div className="item" key={product.id}>
// //                                     <div className="item-div">
// //                                         <div className="item-name"> STT</div>
// //                                         <span className="item-value"> {index + 1}</span>
// //                                     </div>
// //                                     <div>
// //                                         <div>Image</div>
// //                                         <img src={product.image} alt={product.name} className="img" />
// //                                     </div>
// //                                     <div className="item-div">
// //                                         <div className="item-name">Name</div>
// //                                         <h3 className="item-value">{product.name}</h3>
// //                                     </div>
// //                                     <div className="item-div">
// //                                         <div className="item-name">Delete</div>
// //                                         <button className="btn-delete" onClick={() => handleDelete(product.id)}>
// //                                             Delete
// //                                         </button>
// //                                     </div>
// //                                     <div className="item-div">
// //                                         <div className="item-name">Price</div>
// //                                         <div className="item-value">
// //                                             ${product.price} x {product.qty}
// //                                         </div>
// //                                     </div>
// //                                     <div className="item-div">
// //                                         <div className="item-name">Quantity</div>
// //                                         <div className="item-value">1</div>
// //                                     </div>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                         <div className="item-div">
// //                             <div className="item-name">Total</div>
// //                             <div className="item-value">${calculateTotalAmount()}</div>

// //                             <button className="checkout-btn" onClick={handleCheckout()}>
// //                                 <Link to="/user/checkout"> Checkout</Link>
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}
// //         </>
// //     );
// // };

// // export default Cart;
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { fetchFromLocalStorage } from '../../../redux/cartSlice';
// import {
//     List,
//     ListItem,
//     ListItemAvatar,
//     Avatar,
//     ListItemText,
//     ListItemSecondaryAction,
//     IconButton,
//     Typography,
//     Button,
//     Checkbox,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

// const Cart = () => {
//     const dispatch = useDispatch();
//     const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
//     const [carts, setCarts] = useState(initialCart);
//     const [selectedProducts, setSelectedProducts] = useState([]);

//     const updateCart = (updatedCart) => {
//         setCarts(updatedCart);
//         localStorage.setItem('cart', JSON.stringify(updatedCart));
//     };

//     const handleDelete = (productId) => {
//         const updatedCart = carts.filter((cart) => cart.id !== productId);
//         updateCart(updatedCart);
//     };

//     const calculateTotalAmount = () => {
//         return selectedProducts.reduce((total, product) => total + product.price * product.qty, 0);
//     };

//     const handleToggleProduct = (productId) => {
//         const isSelected = selectedProducts.some((product) => product.id === productId);
//         if (isSelected) {
//             const updatedSelectedProducts = selectedProducts.filter((product) => product.id !== productId);
//             setSelectedProducts(updatedSelectedProducts);
//         } else {
//             const productToAdd = carts.find((product) => product.id === productId);
//             if (productToAdd) {
//                 setSelectedProducts([...selectedProducts, productToAdd]);
//             }
//         }
//     };

//     const EmptyCart = () => {
//         return (
//             <div className="wrapper-cart">
//                 <h3 className="cart-title">My Cart</h3>
//                 <div className="wrap-content">
//                     <div className="wrap-bg">
//                         <span className="sentence">Cart is empty</span>
//                         <span className="sentence">Please continue to search for products to add to cart</span>
//                         <Link to="/" className="btn-cart">
//                             Continue Shopping
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     const handleCheckout = () => {
//         // dispatch(fetchFromLocalStorage(selectedProducts.map((product) => product.id)));
//     };

//     return (
//         <>
//             {carts.length === 0 ? (
//                 <EmptyCart />
//             ) : (
//                 <div className="wrapper-cart">
//                     <h3 className="cart-title">My Cart</h3>
//                     <div className="wrap-content">
//                         <List>
//                             {carts.map((product, index) => (
//                                 <ListItem key={product.id}>
//                                     <ListItemAvatar>
//                                         <Avatar alt={product.name} src={product.image} />
//                                     </ListItemAvatar>
//                                     <ListItemText
//                                         primary={product.name}
//                                         secondary={`$${product.price} x ${product.qty}`}
//                                     />
//                                     <ListItemSecondaryAction>
//                                         <Checkbox
//                                             edge="end"
//                                             checked={selectedProducts.some((p) => p.id === product.id)}
//                                             onChange={() => handleToggleProduct(product.id)}
//                                         />
//                                         <IconButton
//                                             edge="end"
//                                             aria-label="delete"
//                                             onClick={() => handleDelete(product.id)}
//                                         >
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </ListItemSecondaryAction>
//                                 </ListItem>
//                             ))}
//                         </List>
//                         <div className="item-div">
//                             <Typography variant="h6" gutterBottom>
//                                 Total: ${calculateTotalAmount()}
//                             </Typography>
//                             <Button variant="contained" color="primary" onClick={handleCheckout}>
//                                 <Link to="/user/checkout" className="checkout-link">
//                                     Checkout
//                                 </Link>
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Cart;
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllCart, fetchDeleteCarts } from '../../../redux/cartSlice';
// import { Link } from 'react-router-dom';

// const Cart = () => {
//     const dispatch = useDispatch();
//     const userID = localStorage.getItem('userID');
//     const cartItems = useSelector((state) => state.cart.cartData);

//     useEffect(() => {
//         dispatch(fetchAllCart(userID));
//     }, [dispatch, userID]);
//     console.log('cartItems', cartItems);
//     const handleRemoveCart = (cartItemID) => {
//         dispatch(fetchDeleteCarts(cartItemID)).then(() => {
//             dispatch(fetchAllCart(userID));
//         });
//     };

//     return (
//         <div>
//             <h2>Shopping Cart</h2>
//             {cartItems.length === 0 ? (
//                 <p>Your cart is empty.</p>
//             ) : (
//                 <div>
//                     {cartItems.map((item) => (
//                         <div key={item.id}>
//                             <p>{item.product.name}</p>
//                             <p>Price: ${item.product.price}</p>
//                             <p>Quantity: {item.quantity}</p>
//                             <button onClick={() => handleRemoveCart([item.id])}>Remove from Cart</button>
//                         </div>
//                     ))}
//                     <p>Total Items: {cartItems.length}</p>
//                     <Link to="/user/checkout">Checkout</Link>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Cart;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCart, fetchDeleteCarts } from '../../../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import {
    Button,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Avatar,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userID = localStorage.getItem('id');
    const cartItems = useSelector((state) => state.cart.cartData);

    useEffect(() => {
        dispatch(fetchAllCart(userID));
    }, [dispatch, userID]);

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [discountedProducts, setDiscountedProducts] = useState([]);
    const handleToggleProduct = (productID) => {
        const updatedSelection = selectedProducts.includes(productID)
            ? selectedProducts.filter((id) => id !== productID)
            : [...selectedProducts, productID];
        setSelectedProducts(updatedSelection);
    };

    const handleRemoveCart = (cartItemID) => {
        dispatch(fetchDeleteCarts(cartItemID)).then(() => {
            dispatch(fetchAllCart(userID));
        });
    };
    const handleCheckout = () => {
        if (selectedProducts.length > 0) {
            const selectedProductsInfo = selectedProducts.map((productId) => {
                const selectedProduct = cartItems.find((item) => item.id === productId);

                if (selectedProduct) {
                    const discountedPrice = discountedProducts.includes(productId)
                        ? selectedProduct.price
                        : selectedProduct.product.price;
                    console.log(' selectedProduct.product.price', selectedProduct.product.price);
                    console.log(' selectedProduct.price', selectedProduct.price);
                    return {
                        id: selectedProduct.id,
                        name: selectedProduct.product.name,
                        quantity: selectedProduct.quantity,
                        price: discountedPrice,
                        discount: discountedProducts.includes(productId) ? selectedProduct.product.discount : 0,
                    };
                }

                return null;
            });

            navigate('/user/checkout', {
                state: {
                    selectedProducts: selectedProductsInfo.filter(Boolean),
                },
            });
        }
    };
    const handleToggleDiscount = (productId) => {
        if (discountedProducts.includes(productId)) {
            setDiscountedProducts(discountedProducts.filter((id) => id !== productId));
        } else {
            setDiscountedProducts([...discountedProducts, productId]);
        }
    };

    const calculateTotalAmount = (cartItems, selectedProducts, discountedProducts) => {
        let totalAmount = 0;

        for (const item of cartItems) {
            const isSelected = selectedProducts.includes(item.id);
            if (isSelected) {
                const isDiscounted = discountedProducts.includes(item.id);

                const price = isDiscounted ? item.price : item.product.price;

                totalAmount += price * item.quantity;
            }
        }

        return totalAmount;
    };

    const totalAmount = calculateTotalAmount(cartItems, selectedProducts, discountedProducts);
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ flexGrow: 1 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Shopping Cart
                </Typography>
                {cartItems.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Product Image</TableCell>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Quantity</TableCell>

                                    <TableCell>Discount</TableCell>
                                    <TableCell>Price </TableCell>
                                    <TableCell>Action</TableCell>
                                    <TableCell>Select</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <Avatar
                                                style={{ width: 100, height: 100 }}
                                                alt={item.product.name}
                                                src={
                                                    'http://birdsellingapi-001-site1.ctempurl.com/' + item.product.image
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>{item.product.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>
                                            <Checkbox onChange={() => handleToggleDiscount(item.id)} />
                                            {item.product.discount}%
                                        </TableCell>
                                        <TableCell>
                                            {discountedProducts.includes(item.id) ? item.price : item.product.price}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outlined" onClick={() => handleRemoveCart([item.id])}>
                                                Remove
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedProducts.includes(item.id)}
                                                onChange={() => handleToggleProduct(item.id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '16px' }}>
                <div style={{ marginRight: 'auto' }}>
                    <Typography variant="h6">Total Items: {cartItems.length}</Typography>
                </div>
                <div style={{ marginRight: '16px' }}>
                    <Typography variant="h6">Total Amount: ${totalAmount}</Typography>
                </div>
                <Button
                    onClick={handleCheckout}
                    variant="contained"
                    color="primary"
                    disabled={selectedProducts.length === 0}
                >
                    Checkout <ShoppingCartIcon style={{ marginLeft: '8px' }} />
                </Button>
            </div>
        </div>
    );
};

export default Cart;
