import { useEffect, useState } from 'react';
import { Article, fetchNews } from '../../api/newsApi';
import ArticleCard from '../ArticleCard/ArticleCard';
import styles from "./NewsList.module.scss"

const PAGE_SIZE = 50;

function NewsList() {
    const [news, setNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getNews = async () => {
            try {
                const data = await fetchNews(1, PAGE_SIZE);
                setNews(data);
            } catch (error: any) {
                console.error("Error fetching news:", error.message); 
                setError(error.message); 
            } finally {
                setLoading(false);
            }
        };

        getNews();
    }, []);

        useEffect(() => {
        console.log('Updated news:', news);
    }, [news]);

    const newsList = news.map(article => (
        <li>
            <ArticleCard article={article}/>
        </li>
    ));

    if (loading)
        return <div>Loading...</div>;
    
    if (error)
        return <div>Error: {error}</div>; 
    

    return (
        <ul className={`container ${styles.list}`} >{newsList}</ul>
    );
}

export default NewsList;