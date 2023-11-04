import Header from '../../components/Header';
import Footer from '../../components/Footer';

import PropTypes from 'prop-types';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />

            <div className={cx('container')}>{children}</div>

            <Footer />
        </div>
    );
}

DefaultLayout.protoTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
