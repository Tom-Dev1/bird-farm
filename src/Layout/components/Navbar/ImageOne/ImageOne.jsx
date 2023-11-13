import { Parallax } from 'react-parallax';

import classNames from 'classnames/bind';
import styles from './ImageOne.module.scss';

import image1 from '../../../../asset/images/baner1.jpg';
import image2 from '../../../../asset/images/image2.jpg';
import image3 from '../../../../asset/images/bidr-home-1.jpg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function ImageOne() {
    return (
        <>
            <Parallax className={cx('image')} bgImage={image1} strength={200}>
                <div className={cx('content')}>
                    <div className={cx('text-content')}>Bird Land</div>
                </div>
            </Parallax>
            <Parallax className={cx('image')} bgImage={image2} strength={200}>
                <div className={cx('content')}>
                    <div className={cx('text-content')}>BIRD DIVERISITY</div>
                    <Link to="/product " className={cx('link-content')}>
                        <span>BIRD SHOP → </span>
                    </Link>
                </div>
            </Parallax>
            <Parallax className={cx('image')} bgImage={image3} strength={200}>
                <div className={cx('content')}>
                    <div className={cx('text-content')}>BIRD DIVERISITY</div>
                    <Link to="/product" className={cx('link-content')}>
                        <span>BIRD SHOP → </span>
                    </Link>
                </div>
            </Parallax>
            <Parallax className={cx('image')} bgImage={image1} strength={200}>
                <div className={cx('content')}>
                    <div className={cx('text-content')}>BIRD DIVERISITY</div>
                    <Link to="/product" className={cx('link-content')}>
                        <span>BIRD SHOP → </span>
                    </Link>
                </div>
            </Parallax>
        </>
    );
}

export default ImageOne;
