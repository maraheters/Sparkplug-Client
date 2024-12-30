import { useEffect, useState } from "react";
import styles from "./ImageGallery.module.scss";

type Props = {
    imageUrls: string[];
};

const ImageGallery = ({ imageUrls }: Props) => {
    const [mainImage, setMainImage] = useState(imageUrls[0]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        setMainImage(imageUrls[currentImageIndex]);
    }, [currentImageIndex, imageUrls]);

    const allImages = imageUrls.map((url, index) => (
        <img 
            className={styles.gallerySmallerImage}
            key={index}
            src={url}
            alt="Thumbnail"
            onClick={() => setCurrentImageIndex(index)}
        />
    ));

    return (
        <div className={styles.gallery}>
            <img className={styles.galleryMainImage} src={mainImage} alt="Main" />
            <div className={styles.smallerImagesContainer}>
                {allImages}
            </div>
        </div>
    );
}

export default ImageGallery;