import React, { useState } from 'react';
import styles from './ImageUploader.module.scss';

interface Props {
    onUpload: (images: File[]) => void;
}

const ImageUploader: React.FC<Props> = ({ onUpload }) => {
    const [images, setImages] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setImages(files); // Store the actual file objects
        onUpload(files); // Notify parent with file objects
    };


    return (
        <div className={styles.imageUploaderContainer}>
            <h2>Images</h2>
            <input type="file" accept="image/jpeg, image/png" multiple onChange={handleFileChange} />
            <div className={styles.imageGallery}>
                {images.map((image, index) => (
                    <div key={index} className={styles.imageAndButtonContainer}>
                        <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} className={styles.uploadedImage} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;