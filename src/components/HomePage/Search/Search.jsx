import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Search() {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const url = `https://birdsellingapi.azurewebsites.net/api/Product/GetProduct`;

    const fetchData = (value) => {
        axios
            .get(url)
            .then((response) => {
                setSearchResults(response.data.data);
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

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            navigate('/products');
        }
    };

    const handleClickSearch = () => {
        navigate('/products');
    };
    return (
        <>
            <div className={cx('form-text')}>
                <div className={cx('div-text')}>
                    <button className={cx('css-icon')} onClick={handleClickSearch}>
                        <SearchIcon fontSize="large" />
                    </button>
                    <label className={cx('css-text')}>
                        <input
                            type="text"
                            placeholder="Search.."
                            value={input}
                            onChange={(e) => handleSearch(e.target.value)}
                            onKeyDown={handleEnter}
                        />
                    </label>
                </div>
            </div>

            {/* Hiển thị thông tin về kết quả tìm kiếm */}
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
