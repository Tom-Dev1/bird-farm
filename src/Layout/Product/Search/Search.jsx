import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const cx = classNames.bind(styles);

export default function Search() {
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const url = `https://653ea1a29e8bd3be29df9516.mockapi.io/products`;
    const fetchData = (value) => {
        axios
            .get(url)
            .then((response) => {
                const results = response.data.filter((product) => {
                    return value && product.name.toLowerCase().includes(value);
                });
                setSearchResults(results);
            })
            .catch((error) => {
                console.error('error: ', error);
            });
    };
    const handleSearch = (value) => {
        setInput(value);
        fetchData(value);
        // e.preventDefault();
    };
    return (
        <>
            <div className={cx('form-text')}>
                <div className={cx('div-text')}>
                    <button className={cx('css-icon')}>
                        <SearchIcon fontSize="large" />
                    </button>
                    <label className={cx('css-text')}>
                        <input
                            type="text"
                            placeholder="Search.."
                            value={input}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </label>
                </div>
            </div>
            {/* <div className={cx('search-results')}>
                {searchResults.map((result) => (
                    <div key={result.id} className={cx('result-item')}>
                        Hiển thị thông tin về kết quả tìm kiếm
                        <p>{result.name}</p>
                        <p>{result.description}</p>
                    </div>
                ))}
            </div> */}
            Hiển thị thông tin về kết quả tìm kiếm
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {searchResults.map((result) => (
                    <Grid item xs={12} sm={4} key={result.category_id}>
                        <CardActionArea>
                            <Card>
                                <CardMedia
                                    className={cx('card-media')}
                                    component="img"
                                    // height="140"
                                    image={result.image}
                                    alt=""
                                />
                                <CardContent>
                                    <Typography variant="h4" component="div">
                                        {result.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                ))}
            </Grid>
            {/* Các thành phần khác trong component */}
        </>
    );
}
