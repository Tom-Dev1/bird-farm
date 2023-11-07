import React from 'react';
import './Banner.scss';
import image1 from '../../../assets/images/bird-4-removebg-preview.png';
const Banner = () => {
    return (
        <div className="hero-banner">
            <div className="content">
                <div className="text-content">
                    <h1>Bird Diversity</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error, explicabo quod porro
                        aliquam quasi mollitia adipisci ab non consequuntur sapiente dolor dicta voluptatem similique?
                        Quidem, mollitia expedita. Voluptates, ipsa.
                    </p>
                    <div className="ctas">
                        <div className="banner-cta">Read More</div>
                        <div className="banner-cta v2">Discover Now</div>
                    </div>
                </div>
                <img className="banner-img" src={image1} alt="" />
            </div>
        </div>
    );
};

export default Banner;
