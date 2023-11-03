import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';

export default function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const baseUrl = `https://653ea1a29e8bd3be29df9516.mockapi.io/products/${productId}`;
    console.log(baseUrl);
    useEffect(() => {
        // console.log('productId:', productId);
        const fetchProduct = async () => {
            try {
                const response = await axios.get(baseUrl);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [baseUrl]);

    if (!product) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            <Typography variant="h4">{product.name}</Typography>
            <Typography>{product.description}</Typography>
            <Typography variant="h6">Price: {product.price}</Typography>
            {/* Rest of the product details */}
        </div>
    );
}
