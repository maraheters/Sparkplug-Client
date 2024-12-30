import { useState } from "react";
import CarUploadForm, { CarFormData } from "../../components/CarUploadForm/CarUploadForm";
import Header from "../../components/Header/Header";
import ImageUploader from "../../components/ImageUploader/ImageUploader";

import styles from './Upload.module.scss';

function Upload() {
    const [images, setImages] = useState<File[]>([]);
    const [formData, setFormData] = useState<CarFormData>();

    const handleImageUpload = (uploadedImages: File[]) => {
        setImages(uploadedImages);
    };

    const handleFormDataChange = (data: CarFormData) => {
        setFormData(data);
    };

    const handleSubmit = async () => {
        const formDataToSubmit = new FormData();
    
        // Append car data
        if (formData) {
            formDataToSubmit.append('car', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
        }
        
        // Append images
        images.forEach((image) => {
            formDataToSubmit.append('photos', image); 
        });
    
        try {
            const response = await fetch('http://localhost:8080/postings', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}` 
                    // No Content-Type header
                },
                body: formDataToSubmit,
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.text();
            console.log('Car uploaded successfully:', data);
        } catch (error) {
            console.error('Error uploading car:', error);
        }
    };

    return (
        <>
        <Header/>
        <div className={`container ${styles.formAndImageUploaderContainer}`}>
            <CarUploadForm onChange={handleFormDataChange}/>
            <ImageUploader onUpload={handleImageUpload}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
        </>

    );
}

export default Upload;