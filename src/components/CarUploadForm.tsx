import React, { useState } from 'react';
import { Engine, Manufacturer, Transmission } from '../api/sparkplugApi';

interface CarFormData {
    engine: Engine;
    color: string;
    transmission: Transmission;
    categoryName: string;
    price: number;
    model: string;
    mileage: number;
    manufacturer: Manufacturer;
    description: string;
    year: number;
    drivetrain: string;
}

const initialFormData: CarFormData = {
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
    price: 0,
    model: '',
    mileage: 0,
    manufacturer: {
        name: '',
        country: ''
    },
    description: '',
    year: 0,
    drivetrain: ''
};

const CarUploadForm: React.FC = () => {
    const [formData, setFormData] = useState<CarFormData>(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Handle nested objects
        if (name.startsWith('engine.') || name.startsWith('transmission.') || name.startsWith('manufacturer.')) {
            const keys = name.split('.');
            setFormData(prevData => ({
                ...prevData,
                [keys[0]]: {
                    ...prevData[keys[0]],
                    [keys[1]]: value
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/postings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Car uploaded successfully:', data);
        } catch (error) {
            console.error('Error uploading car:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Upload Car</h2>
            <div>
                <label>Model:</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} required />
            </div>
            <div>
                <label>Year:</label>
                <input type="number" name="year" value={formData.year} onChange={handleChange} required />
            </div>
            <div>
                <label>Color:</label>
                <input type="text" name="color" value={formData.color} onChange={handleChange} required />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
                <label>Mileage:</label>
                <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div>
                <label>Drivetrain:</label>
                <input type="text" name="drivetrain" value={formData.drivetrain} onChange={handleChange} required />
            </div>
            <div>
                <label>Category Name:</label>
                <input type="text" name="categoryName" value={formData.categoryName} onChange={handleChange} required />
            </div>
            <h3>Engine Details</h3>
            <div>
                <label>Power:</label>
                <input type="number" name="engine.power" value={formData.engine.power} onChange={handleChange} required />
            </div>
            <div>
                <label>Torque:</label>
                <input type="number" name="engine.torque" value={formData.engine.torque} onChange={handleChange} required />
            </div>
            <div>
                <label>Type:</label>
                <input type="text" name="engine.type" value={formData.engine.type} onChange={handleChange} required />
            </div>
            <div>
                <label>Fuel Type:</label>
                <input type="text" name="engine.fuelType" value={formData.engine.fuelType} onChange={handleChange} required />
            </div>
            <div>
                <label>Displacement:</label>
                <input type="number" name="engine.displacement" value={formData.engine.displacement} onChange={handleChange} required />
            </div>
            <h3>Transmission Details</h3>
            <div>
                <label>Gearbox Type:</label>
                <input type="text" name="transmission.gearboxType" value={formData.transmission.gearboxType} onChange={handleChange} required />
            </div>
            <div>
                <label>Number of Gears:</label>
                <input type="number" name="transmission.numberOfGears" value={formData.transmission.numberOfGears} onChange={handleChange} required />
            </div>
            <h3>Manufacturer Details</h3>
            <div>
                <label>Manufacturer Name:</label>
                <input type="text" name="manufacturer.name" value={formData.manufacturer.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Country:</label>
                <input type="text" name="manufacturer.country" value={formData.manufacturer.country} onChange={handleChange} required />
            </div>
            <button type="submit">Upload Car</button>
        </form>
    );
};

export default CarUploadForm;