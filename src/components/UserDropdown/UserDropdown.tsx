import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './UserDropdown.module.scss'
import { useEffect, useState } from 'react';
import { fetchCurrentUser } from '../../api/sparkplugApi';

export default function UserDropdown() {
    const { userAuth } = useAuth();
    const [profilePic, setProfilePic] = useState<string | null>(null);

    useEffect(() => {
        const getProfilePic = async () => {
            try {
                const data = await fetchCurrentUser(userAuth?.authToken!);
                setProfilePic(data.profilePicture);
                localStorage.setItem('profilePicture', data.profilePicture);
            } catch (e) {
                console.error(e);
            } 
        }

        const profilePicture = localStorage.getItem('profilePicture');
        if(!profilePicture) {
            getProfilePic();
        } else {
            setProfilePic(profilePicture);
        }
    }, [])

    return (
        <div className={styles.container}>
            <Link to='/profile' className={styles.user}>{ userAuth?.username }</Link>       
            <div className={styles.content}>
                <div><Link to='/profile'>Profile</Link></div>
                <div><Link to='/chats'>Messages</Link></div>
                <div><Link to='/logout' >Log out</Link></div>
            </div>
            {profilePic && (
                <figure className={styles.profilePicture}>
                    <img src={profilePic}></img>
                </figure>
            )} 

        </div>
    );
}