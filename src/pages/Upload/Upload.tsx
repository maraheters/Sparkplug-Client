import { useState } from "react";
import CarUploadForm, { CarFormData } from "../../components/CarUploadForm/CarUploadForm";
import ImageUploader from "../../components/ImageUploader/ImageUploader";

import styles from './Upload.module.scss';
import { uploadCar } from "../../api/sparkplugApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Upload() {
    const [images, setImages] = useState<File[]>([]);
    const [formData, setFormData] = useState<CarFormData>();
    const {userAuth} = useAuth();
    const navigate = useNavigate();

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
            formDataToSubmit.append('images', image); 
        });
    
        try {
            console.log(formData);
            const response = await uploadCar(userAuth?.authToken!, formDataToSubmit);

            console.log('Car uploaded successfully:', response);
            toast.success('Car uploaded successfully');
            navigate("/");
        } catch (error) {
            console.error('Error uploading car:', error);
            toast.error('Error uploading car');
        }

    };

    return (
        <>
            <div className={styles.formAndImageUploaderContainer}>
                <CarUploadForm onChange={handleFormDataChange}/>
                <ImageUploader onUpload={handleImageUpload}/>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </>

    );
}

export default Upload;