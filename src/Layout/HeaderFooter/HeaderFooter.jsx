import Footer from '../components/Footer';
import Header from '../components/Header';

//style
import classnames from 'classnames/bind';
import styles from '../HeaderFooter/HeaderFooter.module.scss';

const cx = classnames.bind(styles);
function HeaderFooter({ children }) {
    return (
        <div>
             <div className={cx('wrapper')}>
                {/* <Header /> */}
                <main>
                    <div className={cx('container')}>{children}</div>
                </main>
                {/* <Footer /> */}
            </div> 
        </div>
    );
}

export default HeaderFooter;
