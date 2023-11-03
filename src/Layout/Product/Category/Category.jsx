import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import bird from '../../../asset/images/bird-home-3.jpg';
import nestBird from '../../../asset/images/nestbird.jpg';
import mix from '../../../asset/images/nestbird.jpg';
import axios from 'axios';

const cx = classNames.bind(styles);
export default function Search() {
    // const [searchBird, setSearchBird] = useState([]);
    // let params = useParams();
    const [category, setCategory] = useState([]);
    const baseUrl = `https://birdsellingapi.azurewebsites.net/api/Product/GetProduct?category_id=${category.category_id}}`;
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await axios.get(baseUrl);
                setCategory(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchAPI();
    }, []);
    return (
        <div>
            {category.map((cate) => (
                <div className={cx('category')} key={cate.category_id}>
                    <div className={cx('category-title')}>NEST BIRD</div>
                </div>
            ))}
        </div>
    );
}

{
    /* /* <div className={cx('shop-by-category')}>
            <div className={cx('categories')}>
                <div className={cx('category')}>
                    <img src={bird} alt="" />
                    <div className={cx('category-title')  }>BIRD</div>
                    
                </div>
                <div className={cx('category')}>
                    <img src={nestBird} alt="" />
                    <div className={cx('category-title')}>NEST BIRD</div>
                </div>
                <div className={cx('category')}>
                    <img src={mix} alt="" />
                    <div className={cx('category-title')}>MIX</div>
                </div>
            </div>
        </div> 
    ); */
}
{
    /* </div> */
}
