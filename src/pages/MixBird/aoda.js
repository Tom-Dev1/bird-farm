import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function Step2() {
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [productDetails, setProductDetails] = useState({});
    const [sex, setSex] = useState('');
    const [productsAvailable, setProductsAvailable] = useState(true);


    const fetchProducts = async (storedCategory, selectedSex) => {
        try {
            const response = await fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/Product/GetProduct?category_id=${storedCategory}&sex=${selectedSex}`);
            const data = await response.json();
            setProducts(data.data);
            setSelectedProduct('');
            setProductDetails({});
            setProductsAvailable(data.data.length > 0);


        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchProductDetails = async (productId, category) => {
        try {
            const response = await fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/Product/GetProductByID/${productId}&category_id=${category}`);
            const data = await response.json();
            setProductDetails(data.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleChangeProduct = async (productName) => {
        setSelectedProduct(productName);
        const selectedProduct = products.find((product) => product.name === productName);
        if (selectedProduct) {
            await fetchProductDetails(selectedProduct.id);
        }
    };

    useEffect(() => {
        const storedCategory = localStorage.getItem('category_id');
        if (storedCategory) {
            setCategory(storedCategory);
            fetchProducts(storedCategory);
        }
    }, []);

    const getCategoryName = (value) => {
        switch (value) {
            case '51d334ad9f0a48a59fa4c7a20f70dcfd':
                return 'Đại bàng';
            case '6a2aab32b3574510a434136b31cec3df':
                return 'Vẹt';
            case '6bc3f28de70c4982b67d3bd1f0011cf2':
                return 'Chào mào';
            default:
                return '';
        }
    };

    useEffect(() => {
        const storedSex = localStorage.getItem('sex');
        if (storedSex) {
            setSex(storedSex === 'true' ? 'false' : 'true');
        }

        // Fetch products with the current sex
        fetchProducts(category, storedSex === 'true' ? 'false' : 'true');
    }, [sex]); // Add sex as a dependency

    const getSexName = (value) => {
        switch (value) {
            case 'true':
                return 'Male';
            case 'false':
                return 'Female';
            default:
                return '';
        }
    };

    useEffect(() => {
        localStorage.setItem('chimMuonPhoi_id', productDetails?.id || '');
    }, [productDetails]);
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Birds of Our Shop
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Category: {getCategoryName(category)}</Typography>

                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">Sex of Bird: {getSexName(sex)} </Typography>
                </Grid>
                <Grid item xs={12} >
                    {productsAvailable ? (
                        <FormControl fullWidth>
                            <InputLabel id="product-select-label">Product</InputLabel>
                            <Select
                                labelId="product-select-label"
                                id="product-select"
                                value={selectedProduct}
                                label="Bird of Our Shop"
                                onChange={(e) => handleChangeProduct(e.target.value)}
                            >
                                {Array.isArray(products) && products.map((product) => (
                                    <MenuItem key={product.id} value={product.name}>
                                        {product.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : (
                        <Typography variant="subtitle1"
                        >The birds are in the process of being updated, please come back and choose another bird</Typography>
                    )}
                </Grid>
                {productsAvailable && selectedProduct && (
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Product Information:</Typography>
                        <Typography>{`Sex: ${productDetails.sex}`}</Typography>
                        <Typography>{`Name: ${productDetails.name}`}</Typography>
                        <Typography>{`Description: ${productDetails.description}`}</Typography>
                        <Typography>{`Price: ${productDetails.price}$`}</Typography>
                        {productDetails.image && (
                            <img src={productDetails.image} alt={productDetails.name}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: '5px',
                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                    transition: '0.3s',
                                    marginBottom: '10px'
                                }} />
                        )}
                        {/* Add more information as needed */}
                    </Grid>
                )}
            </Grid>
        </React.Fragment>
    );
}
