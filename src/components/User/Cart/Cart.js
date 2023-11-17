// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Cart.scss';
// import { useEffect } from 'react';

// const Cart = () => {
//     const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
//     const [carts, setCarts] = useState(initialCart);
//     const [cartItemCount, setCartItemCount] = useState(0);

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

//     return (
//         <>
//             {carts.length === 0 ? (
//                 <EmptyCart />
//             ) : (
//                 <div className="wrapper-cart">
//                     <h3 className="cart-title">My Cart</h3>
//                     <div className="wrap-content">
//                         <div className="list">
//                             {carts.map((product, index) => (
//                                 <div className="item" key={product.id}>
//                                     <div className="item-div">
//                                         <div className="item-name"> STT</div>
//                                         <span className="item-value"> {index + 1}</span>
//                                     </div>
//                                     <div>
//                                         <div>Image</div>
//                                         <img src={product.image} alt={product.name} className="img" />
//                                     </div>
//                                     <div className="item-div">
//                                         <div className="item-name">Name</div>
//                                         <h3 className="item-value">{product.name}</h3>
//                                     </div>
//                                     <div className="item-div">
//                                         <div className="item-name">Delete</div>
//                                         <button className="item-value">Delete</button>
//                                     </div>
//                                     <div className="item-div">
//                                         <div className="item-name">Price</div>
//                                         <div className="item-value">
//                                             ${product.price} x {product.qty}
//                                         </div>
//                                     </div>
//                                     <div className="item-div">
//                                         <div className="item-name">Quantity</div>
//                                         <div className="item-value">1</div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="item-div">
//                             <div className="item-name">Total</div>
//                             <div className="item-value"> $</div>
//                             <button className="checkout-btn">Checkout</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Cart;

// // useEffect(() => {
// //     setCarts(carts); // Đảm bảo cập nhật state khi có thay đổi
// //     const totalItems = carts.reduce((total, cart) => total + cart.qty, 0);
// //     setCartItemCount(totalItems);
// // }, [carts]);

// // const updateCart = (updatedCart) => {
// //     setCarts(updatedCart);
// //     localStorage.setItem('cart', JSON.stringify(updatedCart));
// // };

// // const handleDelete = (productId) => {
// //     const updatedCart = carts.filter((cart) => cart.id !== productId);
// //     updateCart(updatedCart);

// //     localStorage.setItem('cart', JSON.stringify(updatedCart));
// // };

// // const handleClearCart = () => {
// //     updateCart([]);
// // };

// // const calculateTotalAmount = () => {
// //     return carts.reduce((total, cart) => total + cart.price * cart.qty, 0);
// // };
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.scss';

const Cart = () => {
    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
    const [carts, setCarts] = useState(initialCart);

    const updateCart = (updatedCart) => {
        setCarts(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleDelete = (productId) => {
        const updatedCart = carts.filter((cart) => cart.id !== productId);
        updateCart(updatedCart);
    };

    const handleClearCart = () => {
        updateCart([]);
    };

    const calculateTotalAmount = () => {
        return carts.reduce((total, cart) => total + cart.price * cart.qty, 0);
    };

    const EmptyCart = () => {
        return (
            <div className="wrapper-cart">
                <h3 className="cart-title">My Cart</h3>
                <div className="wrap-content">
                    <div className="wrap-bg">
                        <span className="sentence">Cart is empty</span>
                        <span className="sentence">Please continue to search for products to add to cart</span>
                        <Link to="/" className="btn-cart">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    // const handleCheckout = () => {
    //     // In a real application, you would handle the checkout process here.
    //     // For now, we'll just clear the cart.
    //     handleClearCart();
    //     alert('Checkout successful! Cart cleared.');
    // };

    return (
        <>
            {carts.length === 0 ? (
                <EmptyCart />
            ) : (
                <div className="wrapper-cart">
                    <h3 className="cart-title">My Cart</h3>
                    <div className="wrap-content">
                        <div className="list">
                            {carts.map((product, index) => (
                                <div className="item" key={product.id}>
                                    <div className="item-div">
                                        <div className="item-name"> STT</div>
                                        <span className="item-value"> {index + 1}</span>
                                    </div>
                                    <div>
                                        <div>Image</div>
                                        <img src={product.image} alt={product.name} className="img" />
                                    </div>
                                    <div className="item-div">
                                        <div className="item-name">Name</div>
                                        <h3 className="item-value">{product.name}</h3>
                                    </div>
                                    <div className="item-div">
                                        <div className="item-name">Delete</div>
                                        <button className="btn-delete" onClick={() => handleDelete(product.id)}>
                                            Delete
                                        </button>
                                    </div>
                                    <div className="item-div">
                                        <div className="item-name">Price</div>
                                        <div className="item-value">
                                            ${product.price} x {product.qty}
                                        </div>
                                    </div>
                                    <div className="item-div">
                                        <div className="item-name">Quantity</div>
                                        <div className="item-value">1</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="item-div">
                            <div className="item-name">Total</div>
                            <div className="item-value">${calculateTotalAmount()}</div>
                            <button className="checkout-btn">
                                <Link to="/user/checkout"> Checkout</Link>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;
