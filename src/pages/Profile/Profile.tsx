import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header'; 
import { fetchPostingById, fetchPostingsByCreatorUsername, fetchCurrentUser, fetchWishlist, Posting, User } from '../../api/sparkplugApi';
import { Link } from 'react-router-dom';
import carListStyles from '../../components/CarList/CarList.module.scss';
import CarCard from '../../components/CarCard/CarCard';
import styles from './Profile.module.scss';

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
                editable={true}
            />
        </li>
    ));

    const wishlistList = wishlist?.map(posting => (
        <li key={posting.id}>
            <CarCard
                posting={posting}
            />
        </li>
    ));

    return (
        <>
            <Header />
            
            <div className={`container ${styles.profileContainer}`}>
                {postings.length > 0 && (
                    <>
                        <h1>Your postings</h1>
                        <ul className={carListStyles.list}>{carList}</ul>
                    </>
                )}

                {wishlist.length > 0 && (
                    <>
                        <h1>Your wishlist</h1>
                        <ul className={carListStyles.list}>{wishlistList}</ul>
                    </>
                )}
                <button><Link to="/upload">Create a new posting</Link></button>
                {/* Display other user information as needed */}

                
            </div>
            
        </>
    );
}

export default Profile;