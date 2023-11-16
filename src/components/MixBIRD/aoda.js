import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function PaymentForm() {
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleChange = (event) => {
        setCategory(event.target.value);
        // Reset selected product when category changes
        setSelectedProduct(null);
    };

    useEffect(() => {
        // Fetch products when the component mounts and when the category changes
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/Product/GetProduct?category_id=${category}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts(); // Fetch products when the component mounts

        if (category) {
            fetchProducts(); // Fetch products when the category changes
        }
    }, [category]);

    const handleProductSelect = (productName) => {
        // Find the selected product based on its name
        const selected = products.find((product) => product.name === productName);
        setSelectedProduct(selected);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Birds of Our Shop
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleChange}
                        >
                            <MenuItem value="38a3260d9bf44451961e9dc56def7388">Vẹt</MenuItem>
                            <MenuItem value="51d334ad9f0a48a59fa4c7a20f70dcfd">Đại bàng</MenuItem>
                            <MenuItem value="6bc3f28de70c4982b67d3bd1f0011cf2">Chào mào</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="product-select-label">Product</InputLabel>
                        <Select
                            labelId="product-select-label"
                            id="product-select"
                            value={selectedProduct ? selectedProduct.name : ''}
                            label="Name of the bird"
                            onChange={(e) => handleProductSelect(e.target.value)}
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
                        <Typography>{`Name: ${selectedProduct.name}`}</Typography>
                        <Typography>{`Description: ${selectedProduct.description}`}</Typography>
                        {/* Add more product information as needed */}
                    </Grid>
                )}
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                        label="Remember credit card details for next time"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}