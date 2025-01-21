import { useEffect, useState } from 'react';
import { fetchPostingsByCreatorUsername, fetchCurrentUser, fetchWishlist } from '../../api/sparkplugApi';
import { Link } from 'react-router-dom';
import carListStyles from '../../components/CarList/CarList.module.scss';
import CarCard from '../../components/CarCard/CarCard';
import styles from './Profile.module.scss';
import { Posting, User } from '../../api/sparkplugModels';
import { useAuth } from '../../context/AuthContext';
import WishlistButton from '../../components/WishlistButton/WishlistButton';

function Profile() {
    const [loading, setLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<User>(); 
    const [postings, setPostings] = useState<Posting[]>([]);
    const [wishlist, setWishlist] = useState<Posting[]>([]);
    const [error, setError] = useState<string | null>(null);
    const {isLoggedIn, userAuth} = useAuth();

    useEffect(() => {
        const fetchUserInfo = async () => {
            isLoggedIn();
            console.log(userAuth);

            try {
                const data = await fetchCurrentUser(userAuth?.authToken!); 
                const postings = await fetchPostingsByCreatorUsername(userAuth?.username!);
                const wishlist = await fetchWishlist(userAuth?.authToken!);
                
                setUserInfo(data);
                setPostings(postings);
                setWishlist(wishlist);
            } catch (err: any) {
                setError(err.message || "Failed to fetch user information");
            } finally {
                setLoading(false);
            }
        };


        fetchUserInfo();
    }, []);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const carList = postings?.map(posting => (
        <li key={posting.id}>
            <CarCard
                posting={posting}
                additionalComponents={[
                    <Link to={"/edit-posting/" + posting.id} className={styles.editLink}> 
                        ✎Edit
                    </Link>
                ]}
            />
        </li>
    ));

    const wishlistList = wishlist?.map(posting => (
        <li key={posting.id}>
            <CarCard
                posting={posting}
                additionalComponents={[
                    <WishlistButton postingId={posting.id}/>
                ]}
            />
        </li>
    ));

    return (
        <>
            <div className={styles.profileContainer}>
                
                
                <div className={styles.postingsSection}>
                    <div className={styles.postingHeadingAndLink}>
                        <h1>Your postings</h1>
                        <span className={styles.separator}>|</span>
                        <Link to="/upload">Upload new</Link>
                    </div>
                    {postings.length > 0 && (
                        <ul className={carListStyles.list}>{carList}</ul>
                    )}
                </div>
                

                {wishlist.length > 0 && (
                    <div className={styles.postingsSection}>
                        <h1>Your wishlist</h1>
                        <ul className={carListStyles.list}>{wishlistList}</ul>
                    </div>
                )}
            </div>
            
        </>
    );
}

export default Profile;