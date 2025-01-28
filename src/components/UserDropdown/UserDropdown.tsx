import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './UserDropdown.module.scss'

export default function UserDropdown() {
    const { userAuth } = useAuth();

    return (
        <div className={styles.container}>
            <Link to='/profile' className={styles.user}>{ userAuth?.username }</Link>       
            <div className={styles.content}>
                <div><Link to='/profile'>Profile</Link></div>
                <div><Link to='/chats'>Messages</Link></div>
                <div><Link to='/logout' >Log out</Link></div>
            </div>
        </div>
    );
}