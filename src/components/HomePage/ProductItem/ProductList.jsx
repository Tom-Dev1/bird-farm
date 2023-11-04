import React, { useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import Pagination from '../Pagination';
import { Link } from 'react-router-dom';
import styles from './ProductItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
export default function ProductList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(9);
    const [products, setProducts] = useState([]);

    const baseUrl = 'https://birdsellingapi.azurewebsites.net/api/Product/GetProduct';

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await axios.get(baseUrl);
                setProducts(response.data.data);
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
            <div className={cx('choose-paginate')}>
                Products per page:
                <select value={productsPerPage} onChange={handleProductsPerPage}>
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={9}>9</option>
                </select>
            </div>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {currentProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="300px"
                                        // width="450px"
                                        image={product.image}
                                        alt={product.name}
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.price}$
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Pagination
                currentPage={currentPage}
                productsPerPage={productsPerPage}
                totalProducts={products.length}
                paginate={paginate}
            />
        </>
    );
}
