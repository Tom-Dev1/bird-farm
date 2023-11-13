import classNames from 'classnames/bind';
import styles from './Menu.Module.scss';

import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);
function MenuItem({ title, to, icon }) {
    return (
        <NavLink className={cx('menu-item')} to={to}>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};
export default MenuItem;
