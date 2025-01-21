import { useState } from 'react';
import styles from './Header.module.scss';
import { Link } from "react-router-dom";

type props = {
    profileButton?: React.ReactNode;
};

function Header( {profileButton}: props ) {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const showSidebar = () => {
        setIsSidebarVisible(prevState => !prevState);
    };

    return (
        <header>
            <nav className={`box-shadow-centered ${styles.header__nav}`}>
                <div className="container">
                    <ul className={styles.header__list}>
                        <li className={styles.header__logo}>sparkplug</li>
                        <li className={styles.hideOnMobile}><Link className='sliding-hover' to="/">Home</Link></li>
                        <li className={styles.hideOnMobile}><Link to="/news">News</Link></li>
                        <div className={styles.rightSide}>
                            <li className={styles.hideOnMobile}>
            
                            <div className={styles.additionalComponentsContainer}>
                                {profileButton}
                            </div>
                                
                            </li>
                            <li className={styles.menuButton} onClick={showSidebar} ><Link to="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></Link></li>
                        </div>
                        
                    </ul>
                </div>
                {isSidebarVisible && <div className={styles.header__sidebar}>
                    <ul>
                        <li onClick={showSidebar}><Link to="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></Link></li>
                        <li><Link to="/login">Log in</Link></li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/news">News</Link></li>
                    </ul>
                </div>}
            </nav>
        </header>
    );
}

export default Header;