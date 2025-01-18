import { useEffect, useState } from 'react';
import CarCard from '../CarCard/CarCard';
import { fetchPostings, Posting } from '../../api/sparkplugApi';
import styles from './CarList.module.scss';
import WishlistButton from '../WishlistButton/WishlistButton';

function CarList() {
    const [postings, setPostings] = useState<Posting[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCars = async () => {
            try {
                const data = await fetchPostings();
                setPostings(data);
            } catch (error: any) {
                console.error("Error fetching cars:", error.message); 
                setError(error.message); 
            } finally {
                setLoading(false);
            }
        };

        getCars();
    }, []);

    const carList = postings.map(posting => (
        <li key={posting.id}>
            <CarCard
                posting={posting}
                additionalComponents={[
                    <WishlistButton postingId={posting.id} token={localStorage.getItem("authToken") as string} />
                ]}
            />
        </li>
    ));

    if (loading)
        return <div>Loading...</div>;
    
    if (error)
        return <div>Error: {error}</div>; 
    

    return (
        <ul className={styles.list}>{carList}</ul>
    );
}

export default CarList;