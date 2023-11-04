import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Carousel.module.scss';

const cx = classNames.bind(styles);

function CarouselItem({ image, title, description }) {
    return (
        <div>
            {image}
            {title}
            {description}
        </div>
    );
}

CarouselItem.proTypes = {
    image: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default CarouselItem;
