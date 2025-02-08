import React, { useState, useEffect, useRef } from 'react';
import styles from './CarUploadForm.module.scss';
import { Engine, Manufacturer, Transmission } from '../../api/sparkplugModels';

export interface CarFormData {
    engine: Engine;
    color: string;
    transmission: Transmission;
    categoryName: string;
    model: string;
    mileage: number;
    manufacturer: Manufacturer;
    year: number;
    drivetrain: string;
}

export interface PostingData {
    price: number,
    description: string,
    car: CarFormData;
}

const initialFormData: PostingData = {
    price: 0,
    description: '',
    car: {
        engine: {
            power: 0,
            torque: 0,
            type: '',
            fuelType: '',
            displacement: 0
        },
        color: '',
        transmission: {
            gearboxType: '',
            numberOfGears: 0
        },
        categoryName: '',
        model: '',
        mileage: 0,
        manufacturer: {
            name: '',
            country: ''
        },
        year: 0,
        drivetrain: ''
    }
};

interface Props {
    onChange: (data: CarFormData) => void;
    initialData?: PostingData;
}

const CarUploadForm: React.FC<Props> = ({ onChange, initialData }) => {
    const [formData, setFormData] = useState<PostingData>(initialFormData);
    const initialDataSet = useRef(false);

    useEffect(() => {
        if (initialData && !initialDataSet.current) {
            setFormData(initialData);
            initialDataSet.current = true;
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Handle nested objects
        if (name.startsWith('engine.') || name.startsWith('transmission.') || name.startsWith('manufacturer.')) {
            const keys = name.split('.');
            setFormData(prevData => ({
                ...prevData,
                [keys[0]]: {
                    ...(prevData[keys[0] as keyof PostingData] as any),
                    [keys[1]]: value
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }

        onChange({
            ...formData,
            [name]: value,
            engine: {
                displacement: 0,
                power: 0,
                torque: 0,
                fuelType: '',
                type: ''
            },
            color: '',
            transmission: {
                gearboxType: '',
                numberOfGears: 0
            },
            categoryName: '',
            model: '',
            mileage: 0,
            manufacturer: {
                name: '',
                country: ''
            },
            year: 0,
            drivetrain: ''
        });
    };

    return (
        <form className={styles.form}>
            <h2>Car Data</h2>
            <div className={styles.formGroup}>
                <label>Model:</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Year:</label>
                <input type="number" name="year" value={formData.year} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Color:</label>
                <input type="text" name="color" value={formData.color} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Price:</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Mileage:</label>
                <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Drivetrain:</label>
                <input type="text" name="drivetrain" value={formData.drivetrain} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Category Name:</label>
                <input type="text" name="categoryName" value={formData.categoryName} onChange={handleChange} required />
            </div>
            <h3>Engine Details</h3>
            <div className={styles.formGroup}>
                <label>Power:</label>
                <input type="number" name="engine.power" value={formData.engine.power} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Torque:</label>
                <input type="number" name="engine.torque" value={formData.engine.torque} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Type:</label>
                <input type="text" name="engine.type" value={formData.engine.type} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Fuel Type:</label>
                <input type="text" name="engine.fuelType" value={formData.engine.fuelType} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Displacement:</label>
                <input type="number" name="engine.displacement" value={formData.engine.displacement} onChange={handleChange} required />
            </div>
            <h3>Transmission Details</h3>
            <div className={styles.formGroup}>
                <label>Gearbox Type:</label>
                <input type="text" name="transmission.gearboxType" value={formData.transmission.gearboxType} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Number of Gears:</label>
                <input type="number" name="transmission.numberOfGears" value={formData.transmission.numberOfGears} onChange={handleChange} required />
            </div>
            <h3>Manufacturer Details</h3>
            <div className={styles.formGroup}>
                <label>Manufacturer Name:</label>
                <input type="text" name="manufacturer.name" value={formData.manufacturer.name} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Country:</label>
                <input type="text" name="manufacturer.country" value={formData.manufacturer.country} onChange={handleChange} required />
            </div>
        </form>
    );
};

export default CarUploadForm;