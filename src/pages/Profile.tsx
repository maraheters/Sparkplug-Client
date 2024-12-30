import React, { useEffect, useState } from 'react';
import Header from '../components/Header'; // Adjust the import based on your file structure
import { fetchPostingsByCreatorId, Posting, User, whoAmIRequest } from '../api/sparkplugApi';
import { json, Link } from 'react-router-dom';
import carListStyles from '../styles/CarList.module.scss'
import CarCard from '../components/CarCard';

function Profile() {
    const [loading, setLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<User | null>(null); 
    const [postings, setPostings] = useState<Posting[]>([]); 
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                setError("No authentication token found.");
                setLoading(false);
                return;
            }

            let userId: string | undefined;
            try {
                const data = await whoAmIRequest(token); 
                console.log(data);
                setUserInfo(data);
                userId = data.id;
            } catch (err: any) {
                setError(err.message || "Failed to fetch user information");
            } finally {
                setLoading(false);
            }

            if (userId) {
                try {
                    const data = await fetchPostingsByCreatorId(userId); 
                    console.log(data);
                    setPostings(data);
                } catch (err: any) {
                    setError(err.message || "Failed to fetch postings");
                } finally {
                    setLoading(false);
                }
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

    const carList = postings.map(posting => (
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
                    {/* Display other user information as needed */}

                    
                </div>
            )}
        </>
    );
}

export default Profile;