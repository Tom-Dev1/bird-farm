import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';

import ImageOne from './ImageOne';
import ImageTwo from './ImageTwo';

const cx = classNames.bind(styles);
function Navbar() {
    return (
        <div className={cx('navbar')}>
            <ImageOne />
            {/* <ImageTwo /> */}
        </div>
        
    );
}

export default Navbar;
