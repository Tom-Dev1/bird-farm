import Sidebar from '../../components/User/Sidebar/Sidebar';

import './Products.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCategories,
    fetchProductsOfCategory,
    getAllCategories,
    getAllProductsByCategory,
} from '../../redux/categorySlice';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Products = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const categories = useSelector(getAllCategories);
    const products = useSelector(getAllProductsByCategory);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProductsOfCategory(id));
    }, [dispatch, id]);

    return (
        <div>
            <div className="wrap-sidebar">
                <div className="sidebar">
                    <Sidebar categories={categories} />
                </div>

                <div className="products">
                    <Grid container spacing={2}>
                        {products.map((product) => {
                            return (
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
                            );
                        })}
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default Products;
