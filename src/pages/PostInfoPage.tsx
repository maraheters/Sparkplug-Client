import { useParams } from "react-router-dom";
import CarInfo from "../components/CarInfo/CarInfo";
import { useEffect, useState } from "react";
import { fetchPostingById, Posting } from "../api/sparkplugApi";
import Header from "../components/Header/Header";

function PostInfoPage() {
    const [posting, setPosting] = useState<Posting | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { postingId: postingId } = useParams<{ postingId: string }>();

    if (!postingId) {
        return <div>Car ID not found</div>;
    }

    useEffect(() => {
        const fetchPosting = async () => {
            try {
                const data = await fetchPostingById(postingId);
                setPosting(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosting();
    }, [postingId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    
    if (!posting) return <div>No car information available</div>;

    return (
        <>
            <Header></Header>
            <CarInfo posting={posting} />
        </>
    );
}

export default PostInfoPage;