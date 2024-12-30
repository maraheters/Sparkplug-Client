import { Article } from "../api/newsApi";
import styles from "../styles/NewsList.module.scss"
import { formatDate } from "../utils/utils";

type ArticleCardProps = {
    article: Article
}

function ArticleCard({article}: ArticleCardProps) {

    return(
    <div className={styles.card}>
        <img src={article.urlToImage}></img>
        <div className={styles.descriptionContainer}>
            <a href={article.url}>
                <h1>{article.title}</h1>    
                <p className={styles.source}>{article.source.name}</p>
                <p>{formatDate(article.publishedAt)}</p>
            </a>
        </div>
    </div>
    )
}

export default ArticleCard;