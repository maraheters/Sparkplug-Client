import { useEffect, useState } from 'react';
import CarCard from '../CarCard/CarCard';
import { fetchPostings, fetchPostingsByQuery } from '../../api/sparkplugApi';
import { Posting } from '../../api/sparkplugModels';
import styles from './CarList.module.scss';
import WishlistButton from '../WishlistButton/WishlistButton';
import { useLocation } from 'react-router-dom';

function CarList() {
    const location = useLocation();

    const [postings, setPostings] = useState<Posting[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCars = async (q?: string | null) => {
            try {
                const data = await fetchPostingsByQuery(q);
                console.log(data);
                setPostings(data);
            } catch (error: any) {
                console.error("Error fetching cars:", error.message); 
                setError(error.message); 
            } finally {
                setLoading(false);
            }
        };
        
        const params = new URLSearchParams(location.search);
        const query = params.get('q');
        const sort = params.get('sort');
        console.log(query);

        getCars(query);

    }, [location]);

    const carList = postings.map(posting => (
        <li key={posting.id}>
            <CarCard
                posting={posting}
                additionalComponents={
                    [<WishlistButton postingId={posting.id}/>]}
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