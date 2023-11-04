import Banner from './Banner/Banner';
import Search from './Search/Search';

import ProductItem from './ProductItem/ProductItem';
import Category from './Category/Category';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function Product() {
    window.scrollTo(0, 0);

    return (
        <div>
            <Banner />
            <div className={cx('layout')}>
                {/* <Category /> */}
                <Search />
                <ProductItem />
            </div>
        </div>
    );
}

export default Product;
