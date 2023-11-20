import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function Step2() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [productDetails, setProductDetails] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://birdsellingapi-001-site1.ctempurl.com/api/BirdCategory/GetAll');
                const data = await response.json();
                setCategories(data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const fetchProducts = async (categoryId) => {
        try {
            const response = await fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/Product/GetProduct?category_id=${categoryId}`);
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    };

    const fetchProductDetails = async (productId) => {
        try {
            const response = await fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/Product/GetProductByID/${productId}`);
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching product details:', error);
            return {};
        }
    };

    const handleChangeCategory = async (event) => {
        const newCategory = event.target.value;
        setCategory(newCategory);

        const products = await fetchProducts(newCategory);
        setProducts(products);
        setSelectedProduct('');
        setProductDetails({});
    };

    const handleChangeProduct = async (productName) => {
        setSelectedProduct(productName);

        const selectedProduct = products.find((product) => product.name === productName);
        if (selectedProduct) {
            const details = await fetchProductDetails(selectedProduct.id);
            setProductDetails(details);
        }
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Birds of Our Shop
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="category-select-label">Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={category}
                            label="Category"
                            onChange={handleChangeCategory}
                        >
                            {Array.isArray(categories) && categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.category_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="product-select-label">Product</InputLabel>
                        <Select
                            labelId="product-select-label"
                            id="product-select"
                            value={selectedProduct}
                            label="Product"
                            onChange={(e) => handleChangeProduct(e.target.value)}
                        >
                            {Array.isArray(products) && products.map((product) => (
                                <MenuItem key={product.id} value={product.name}>
                                    {product.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {selectedProduct && (
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Product Information:</Typography>
                        <Typography>{`Name: ${productDetails.name}`}</Typography>
                        <Typography>{`Description: ${productDetails.description}`}</Typography>
                        <Typography>{`Price: ${productDetails.price}`}</Typography>
                        {productDetails.image && (
                            <img src={productDetails.image} alt={productDetails.name} style={{ maxWidth: '10%', height: '50%' }} />
                        )}
                        {/* Add more information as needed */}
                    </Grid>
                )}
            </Grid>
        </React.Fragment>
    );
}
