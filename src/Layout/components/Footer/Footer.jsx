import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
const cx = classNames.bind(styles);

function Footer() {
    const [isSubscribed, setIsSubscribed] = useState(false);

    const [email, setEmail] = useState('');
    const handleChange = (e) => {
        setEmail(e.target.value);
        console.log(e.target.value);
    };
    const handleSubscribe = (e) => {
        e.preventDefault();
        setIsSubscribed(true);
    };

    return (
        <div className={cx('newsletter-section')}>
            <div className={cx('newsletter-content')}>
                <span className={cx('small-text')}>Newsletter</span>
                <span className={cx('big-text')}>Sign up for latest updates and offers</span>
                <div className={cx('form')}>
                    <input type="text" placeholder="Email Address" />
                    <button>Subscribe</button>
                </div>
                <span className={cx('text')}>Will be used in accordance with our Privacy Policy</span>
                <span className={cx('social-icons')}>
                    <div className={cx('icon')}>
                        <LinkedInIcon fontSize="large" />
                    </div>
                    <div className={cx('icon')}>
                        <FacebookIcon fontSize="large" />
                    </div>
                    <div className={cx('icon')}>
                        <TwitterIcon fontSize="large" />
                    </div>
                    <div className={cx('icon')}>
                        <InstagramIcon fontSize="large" />
                    </div>
                </span>
            </div>
        </div>
    );
}

export default Footer;
