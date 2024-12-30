import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header'; // Adjust the import based on your file structure
import { fetchUser, User } from '../api/sparkplugApi';
import { json, Link } from 'react-router-dom';
import carListStyles from '../components/CarList/CarList.module.scss';
import CarCard from '../components/CarCard/CarCard';

function Profile() {
    const [loading, setLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<User>(); 
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                setError("No authentication token found.");
                setLoading(false);
                return;
            }

            try {
                const data = await fetchUser(token); 
                console.log(data);
                setUserInfo(data);
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

    const carList = userInfo?.postings.map(posting => (
        <li key={posting.id}>
            <CarCard
                posting={posting}
            />
        </li>
    ));

    return (
        <>
            <Header />
            <h1>Profile Information</h1>
            {userInfo && (
                <div>
                    <p><strong>Name:</strong> {userInfo.username}</p>
                    <p><strong>id:</strong> {userInfo.id}</p>
                    <ul className={`container ${carListStyles.list}`}>{carList}</ul>
                    <button><Link to="/upload">Create a new posting</Link></button>
                    {/* Display other user information as needed */}

                    
                </div>
            )}
        </>
    );
}

export default Profile;