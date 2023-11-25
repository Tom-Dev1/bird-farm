// import Sidebar from '../../components/User/Sidebar/Sidebar';

// import './Products.scss';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     fetchCategories,
//     fetchProductsOfCategory,
//     getAllCategories,
//     getAllProductsByCategory,
// } from '../../redux/categorySlice';
// import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
// import { useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { fetchProducts, getAllProducts } from '../../redux/productSlice';

// const Products = () => {
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     console.log('id: ' + id);
//     const categories = useSelector(getAllCategories);
//     console.log('categories: ' + categories);
//     const products = useSelector(getAllProductsByCategory);
//     console.log('products: ' + products);
//     const allProducts = useSelector(getAllProducts);
//     console.log('allProducts: ' + allProducts);

//     // useEffect(() => {
//     //     dispatch(fetchCategories());
//     //     if (id === 'all') {
//     //         dispatch(fetchProducts());
//     //     } else {
//     //         dispatch(fetchProductsOfCategory(id));
//     //     }
//     // }, [dispatch, id]);

//     useEffect(() => {
//         dispatch(fetchCategories());
//         if (id === 'all') {
//             dispatch(fetchProductsOfCategory({})); // Fetch all products
//         } else {
//             dispatch(fetchProductsOfCategory({ category_id: id })); // Fetch products by category ID
//         }
//     }, [dispatch, id]);
//     return (
//         <div>
//             <div className="wrap-sidebar">
//                 <div className="sidebar">
//                     <Sidebar categories={categories} />
//                 </div>

//                 <div className="products">
//                     <Grid container spacing={2}>
//                         {/* {(id === 'all' ? allProducts : products).map((product) => {
//                             return (
//                                 <Grid item xs={12} sm={6} md={4} key={product.id}>
//                                     <Card sx={{ maxWidth: 345 }}>
//                                         <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
//                                             <CardActionArea>
//                                                 <CardMedia
//                                                     component="img"
//                                                     height="350px"
//                                                     image={
//                                                         'http://birdsellingapi-001-site1.ctempurl.com/' + product.image
//                                                     }
//                                                     alt={product.name}
//                                                     style={{ objectFit: 'contain' }}
//                                                 />
//                                                 <CardContent>
//                                                     <Typography height="40px" gutterBottom variant="h5" component="div">
//                                                         {product.name}
//                                                     </Typography>
//                                                     <Typography variant="body2" color="text.secondary">
//                                                         {product.sex ? 'Male Bird' : 'Female Bird'}
//                                                     </Typography>
//                                                     <Typography variant="body2" color="text.secondary">
//                                                         Price:{' '}
//                                                         <span style={{ fontSize: 'large', fontWeight: 'bold' }}>
//                                                             ${product.price}
//                                                         </span>
//                                                     </Typography>
//                                                     <Typography variant="body2" color="text.secondary">
//                                                         <span
//                                                             style={{
//                                                                 color:
//                                                                     product.statusProduct === 1
//                                                                         ? 'green'
//                                                                         : product.statusProduct === 2
//                                                                         ? 'red'
//                                                                         : 'inherit',
//                                                                 fontWeight: 'bold',
//                                                                 fontSize: 'large',
//                                                             }}
//                                                         >
//                                                             {product.statusProduct === 1 ? 'Sell' : 'Sold out'}
//                                                         </span>
//                                                     </Typography>
//                                                 </CardContent>
//                                             </CardActionArea>
//                                         </Link>
//                                     </Card>
//                                 </Grid>
//                             );
//                         })}
//                     </Grid>
//                 </div>
//             </div>
//         </div>
//     );
// }; */}
//                         {products.map((product) => (
//                             <Grid item xs={12} sm={6} md={4} key={product.id}>
//                                 <Card sx={{ maxWidth: 345 }}>
//                                     <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
//                                         <CardActionArea>
//                                             <CardMedia
//                                                 component="img"
//                                                 height="350px"
//                                                 image={`http://birdsellingapi-001-site1.ctempurl.com/${product.image}`}
//                                                 alt={product.name}
//                                                 style={{ objectFit: 'contain' }}
//                                             />
//                                             <CardContent>
//                                                 <Typography height="40px" gutterBottom variant="h5" component="div">
//                                                     {product.name}
//                                                 </Typography>
//                                                 <Typography variant="body2" color="text.secondary">
//                                                     {product.sex ? 'Male Bird' : 'Female Bird'}
//                                                 </Typography>
//                                                 <Typography variant="body2" color="text.secondary">
//                                                     Price:{' '}
//                                                     <span style={{ fontSize: 'large', fontWeight: 'bold' }}>
//                                                         ${product.price}
//                                                     </span>
//                                                 </Typography>
//                                                 <Typography variant="body2" color="text.secondary">
//                                                     <span
//                                                         style={{
//                                                             color:
//                                                                 product.statusProduct === 1
//                                                                     ? 'green'
//                                                                     : product.statusProduct === 2
//                                                                     ? 'red'
//                                                                     : 'inherit',
//                                                             fontWeight: 'bold',
//                                                             fontSize: 'large',
//                                                         }}
//                                                     >
//                                                         {product.statusProduct === 1 ? 'Sell' : 'Sold out'}
//                                                     </span>
//                                                 </Typography>
//                                             </CardContent>
//                                         </CardActionArea>
//                                     </Link>
//                                 </Card>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default Products;

// Products.jsx
import React, { useEffect, useState } from 'react';
import './Products.scss';
import Sidebar from '../../components/User/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, getAllProducts } from '../../redux/productSlice';
import { fetchCategories, getAllCategories } from '../../redux/categorySlice';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(getAllProducts);
    console.log(products);
    const categories = useSelector(getAllCategories);

    const handleFilterChange = (filterConditions) => {
        dispatch(fetchProducts(filterConditions));
    };

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div>
            <div className="wrap-sidebar">
                <div className="sidebar">
                    <Sidebar categories={categories} onFilterChange={handleFilterChange} />
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
                                                    image={
                                                        'http://birdsellingapi-001-site1.ctempurl.com/' + product.image
                                                    }
                                                    alt={product.name}
                                                    style={{ objectFit: 'contain' }}
                                                />
                                                <CardContent>
                                                    <Typography
                                                        paddingBottom={'20px'}
                                                        gutterBottom
                                                        variant="h5"
                                                        component="div"
                                                    >
                                                        {product.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {product.sex ? 'Male Bird' : 'Female Bird'}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Price:{' '}
                                                        <span style={{ fontSize: 'large', fontWeight: 'bold' }}>
                                                            ${product.price}
                                                        </span>
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        <span
                                                            style={{
                                                                color:
                                                                    product.statusProduct === 1
                                                                        ? 'green'
                                                                        : product.statusProduct === 2
                                                                        ? 'red'
                                                                        : 'inherit',
                                                                fontWeight: 'bold',
                                                                fontSize: 'large',
                                                            }}
                                                        >
                                                            {product.statusProduct === 1 ? 'Sell' : 'Sold out'}
                                                        </span>
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
