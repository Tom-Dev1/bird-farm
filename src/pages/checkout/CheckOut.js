// import * as React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Toolbar from '@mui/material/Toolbar';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
// import Review from './Review';

// export default function Checkout() {
//     const [activeStep, setActiveStep] = React.useState(2);

//     return (
//         <React.Fragment>
//             <CssBaseline />
//             <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
//                 <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
//                     <Typography component="h1" variant="h4" align="center">
//                         Checkout
//                     </Typography>
//                     {activeStep === 2 ? (
//                         <React.Fragment>
//                             <Review />
//                         </React.Fragment>
//                     ) : null}
//                 </Paper>
//             </Container>
//         </React.Fragment>
//     );
// }

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';

// export default function Checkout() {
//     // const location = useLocation();
//     // // dispatch = useDispatch();
//     // const selectedProductsIds = location.state?.selectedProducts || [];
//     // const cartItems = useSelector((state) => state.cart.cartData);
//     // const selectedProducts = cartItems.filter((item) => selectedProductsIds.includes(item.id));
//     const location = useLocation();
//     const selectedProducts = location.state?.selectedProducts || [];
//     console.log(selectedProducts);

//     const calculateTotalAmount = () => {
//         return selectedProducts.reduce((total, product) => {
//             return total + product.price;
//         }, 0);
//     };

//     return (
//         <div>
//             <ul>
//                 {selectedProducts.map((product) => (
//                     <li key={product.id}>
//                         <p>Name: {product.name}</p>
//                         <p>ID: {product.id}</p>
//                         <p>Price: ${product.price}</p>
//                         <p>Discount: {product.discount}%</p>
//                     </li>
//                 ))}
//             </ul>
//             <p>Total Amount: ${calculateTotalAmount()}</p>

//         </div>
//     );
// }
// Checkout.js

// import React from 'react';
// import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import AddressForm from './AddressForm';
// import Review from './Review';
// import { Container } from '@mui/system';
// import { Paper, Typography } from '@mui/material';
// const CheckOut = () => {
//     const [step, setStep] = useState(1);
//     const [addressInfo, setAddressInfo] = useState(null);
//     const location = useLocation();
//     const selectedProducts = location.state?.selectedProducts || [];
//     const handleAddressNext = (addressData) => {
//         setAddressInfo(addressData);
//         setStep(2);
//     };
//     const handleBack = () => {
//         setStep(1);
//     };
//     return (
//         <div>
//             <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
//                 <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
//                     <Typography component="h1" variant="h4" align="center">
//                         Checkout
//                     </Typography>
//                     {step === 1 ? (
//                         <AddressForm onNext={handleAddressNext} />
//                     ) : (
//                         <Review selectedProducts={selectedProducts} addressInfo={addressInfo} />
//                     )}
//                 </Paper>
//             </Container>

//             {step !== 1 && <button onClick={handleBack}>Back</button>}
//         </div>
//     );
// };

// export default CheckOut;

import React from 'react';
import AddressForm from './AddressForm';
import Review from './Review';
import { AppBar, Button, CssBaseline, Paper, Step, StepLabel, Stepper, Toolbar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const steps = ['Shipping address', 'Review your order'];

function getStepContent(step, handleShippingInfoChange, shippingInfo) {
    switch (step) {
        case 0:
            return <AddressForm onShippingInfoChange={handleShippingInfoChange} />;
        case 1:
            return <Review shippingInfo={shippingInfo} />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [shippingInfo, setShippingInfo] = React.useState({});
    const location = useLocation();
    const selectedProducts = location.state?.selectedProducts || [];

    const handlePlaceOrder = async () => {
        const userId = localStorage.getItem('id');
        try {
            const orderData = {
                listIDCarts: selectedProducts.map((product) => product.id),
                user_id: userId,
                paymentMenthod_id: '89f5deddc7984625885c9055ebb0ca2a',
                address: shippingInfo.address,
            };

            const response = await axios.post(
                'http://birdsellingapi-001-site1.ctempurl.com/api/Order/Create-Order',
                orderData,
            );

            console.log('Order created successfully:', response.data);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handlePlaceOrder();
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleShippingInfoChange = (newInfo) => {
        setShippingInfo(newInfo);
    };
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Company name
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order confirmation, and will send
                                you an update when your order has shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep, handleShippingInfoChange, shippingInfo)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}

                                <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <Copyright />
            </Container>
        </React.Fragment>
    );
}
