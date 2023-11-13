// ProductListDisplay.js
import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';

const ProductListDisplay = ({
    products,
    currentPage,
    productsPerPage,
    totalProducts,
    paginate,
    handleProductsPerPage,
}) => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div>
            <div style={{ paddingBottom: '30px' }}>
                Số sản phẩm trên mỗi trang: {''}
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
                                        height="350px"
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
                totalProducts={totalProducts}
                paginate={paginate}
            />
        </div>
    );
};

export default ProductListDisplay;
