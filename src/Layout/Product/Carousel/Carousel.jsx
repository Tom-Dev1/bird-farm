import styles from './Carousel.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Carousel() {
    const images = {
        bird1: require('../../../asset/images/bird-4-removebg-preview.png'),
        bird2: require('../../../asset/images/vetamazon.jpg'),
        bird3: require('../../../asset/images/hoamiden.jpg'),
    };
    return (
        <div className={cx('hero-banner')}>
            <div className={cx('content')}>
                <div className={cx('text-content')}>
                    <h1>Bird Diversity</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error, explicabo quod porro
                        aliquam quasi mollitia adipisci ab non consequuntur sapiente dolor dicta voluptatem similique?
                        Quidem, mollitia expedita. Voluptates, ipsa.
                    </p>
                    <div className={cx('ctas')}>
                        <div className={cx('banner-cta')}>Read More</div>
                        <div className={cx('banner-cta', 'v2')}>Discover Now</div>
                    </div>
                </div>
                <img className={cx('banner-img')} src={images.bird1} alt="" />
            </div>
        </div>
    );
}

export default Carousel;
