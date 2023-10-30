import { Parallax } from 'react-parallax';
import classNames from 'classnames/bind';
import styles from './ImageTwo.modules.scss';
import image2 from '../../../../asset/images/image2.jpg';
const cx = classNames.bind(styles);

function ImageTwo() {
    return (
        <Parallax className={cx('image')} bgImage={image2} strength={300}>
            <div className={cx('content')}>
                <span className={cx('img-text')}>Bird Land</span>
            </div>
        </Parallax>
    );
}

export default ImageTwo;
