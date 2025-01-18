import { useEffect, useState } from "react";
import CarUploadForm, { CarFormData } from "../../components/CarUploadForm/CarUploadForm";
import ImageUploader from "../../components/ImageUploader/ImageUploader";

import styles from '../Upload/Upload.module.scss';
import { Car, fetchImageByUrl, fetchPostingById, updateCarByPostingId, updateImagesByPostingId } from "../../api/sparkplugApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";


function UpdatePosting() {
    const { postingId } = useParams<{ postingId: string }>();
    const [images, setImages] = useState<File[]>([]);
    const [formData, setFormData] = useState<CarFormData>();
    const navigate = useNavigate();

    const authToken = localStorage.getItem('authToken');
    
    useEffect(() => {
        const fetchData = async () => {
            const posting = await fetchPostingById(postingId as string);
            console.log(posting);
            const car: Car = posting.car;

            setFormData({
                engine: car.engine,
                color: car.color,
                transmission: car.transmission,
                categoryName: car.categoryName,
                price: car.price,
                model: car.model,
                mileage: car.mileage,
                manufacturer: car.manufacturer,
                description: car.description,
                year: car.year,
                drivetrain: car.drivetrain
            });

            //download actual images from urls
            const imageFiles = await Promise.all(
                posting.images.map(async (imageUrl: string) => {
                    const blob = await fetchImageByUrl(imageUrl);
                    return new File([blob], URL.createObjectURL(blob));
                })
            );

            setImages(imageFiles);
        };

        fetchData();
    }, []);

    const handleImageUpload = (uploadedImages: File[]) => {
        setImages(uploadedImages);
    };

    const handleFormDataChange = (data: CarFormData) => {
        setFormData(data);
    };

    const handleCarInfoSubmit = async () => {
        const formDataToSubmit = new FormData();
    
        if (formData) {
            formDataToSubmit.append('car', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
            console.log(formData);
        }
    
        try {
            if (!authToken) {
                throw new Error("No authentication token found");
            }
            const response = await updateCarByPostingId(authToken, postingId as string, formDataToSubmit);
            console.log('Car updated successfully:', response);
            toast.success('Car updated successfully');
            navigate(`/postings/${postingId}`);
        } catch (error) {
            console.error('Error uploading car:', error);
        }
    };

    const handleImagesSubmit = async () => {
        const formDataToSubmit = new FormData();

        images.forEach((image) => {
            formDataToSubmit.append('images', image); 
        });
    
        try {
            if (!authToken) {
                throw new Error("No authentication token found");
            }
            const response = await updateImagesByPostingId(authToken, postingId as string, formDataToSubmit);
            console.log('Images updated successfully:', response);
        } catch (error) {
            console.error('Error uploading car:', error);
        }
    };

    return (
        <>
            <div className={styles.formAndImageUploaderContainer}>
                <CarUploadForm onChange={handleFormDataChange} initialData={formData}/>
                <ImageUploader onUpload={handleImageUpload} initialImages={images}/>
                <button onClick={handleCarInfoSubmit}>Submit Car Info Changes</button>
                <button onClick={handleImagesSubmit}>Submit Image Changes</button>
            </div>
        </>

    );
}

export default UpdatePosting;