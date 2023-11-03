import React, { useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import Pagination from '../Pagination';
import { Link } from 'react-router-dom';
export default function ProductList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(9);
    const [products, setProducts] = useState([]);

    const baseUrl = 'https://653ea1a29e8bd3be29df9516.mockapi.io/products';

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await axios.get(baseUrl);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchAPI();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleProductsPerPage = (e) => {
        const newProductsPerPage = parseInt(e.target.value, 10);
        setProductsPerPage(newProductsPerPage);
        setCurrentPage(1);
    };

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {currentProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.category_id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <Link to={`/products/${product.category_id}`} style={{ textDecoration: 'none' }}>
                                <CardActionArea>
                                    <CardMedia component="img" height="140" image={product.image} alt={product.name} />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <label>
                Products per page:
                <select value={productsPerPage} onChange={handleProductsPerPage}>
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={9}>9</option>
                </select>
            </label>

            <Pagination
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                totalProducts={products.length}
                paginate={paginate}
            />
        </>
    );
}
