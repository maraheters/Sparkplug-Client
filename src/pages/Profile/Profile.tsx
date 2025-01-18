import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header'; 
import { fetchPostingById, fetchPostingsByCreatorUsername, fetchCurrentUser, fetchWishlist, Posting, User, removeFromWishlist } from '../../api/sparkplugApi';
import { Link } from 'react-router-dom';
import carListStyles from '../../components/CarList/CarList.module.scss';
import CarCard from '../../components/CarCard/CarCard';
import styles from './Profile.module.scss';
import { handleRemoveFromWishlist } from '../../utils/wishlistHandlers';

function Profile() {
    const [loading, setLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<User>(); 
    const [postings, setPostings] = useState<Posting[]>([]);
    const [wishlist, setWishlist] = useState<Posting[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem("authToken");
            const username = localStorage.getItem("username");
            if (!token) {
                setError("No authentication token found.");
                setLoading(false);
                return;
            }

            if(!username) {
                setError("No username found.");
                setLoading(false);
                return;
            }

            try {
                const data = await fetchCurrentUser(token); 
                const postings = await fetchPostingsByCreatorUsername(username);
                const wishlist = await fetchWishlist(token);
                console.log(data);
                console.log(postings);
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
                    <button 
                        className={styles.removeFromWishlistButton}
                        onClick={async () => { handleRemoveFromWishlist(localStorage.getItem("authToken") as string, posting.id); }}
                    >Remove
                    </button>
                ]}
            />
        </li>
    ));

    return (
        <>
            <div className={styles.profileContainer}>
                <button><Link to="/upload">Create a new posting</Link></button>
                {postings.length > 0 && (
                    <div className={styles.postingsSection}>
                        <h1>Your postings</h1>
                        <ul className={carListStyles.list}>{carList}</ul>
                    </div>
                )}

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