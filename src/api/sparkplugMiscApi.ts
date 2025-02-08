import { Manufacturer } from "./sparkplugModels";

const API_URL = "http://localhost:8080";

const fetchManufacturers = async (): Promise<Manufacturer[]> => {
    const response = await fetch(`${API_URL}/manufacturers`, {
        method: "GET"
    });

    if(!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

const fetchModelsByManufacturer = async (brand: string): Promise<string[]> => {
    const response = await fetch(`${API_URL}/manufacturers/${brand}/models`, {
        method: "GET"
    });

    if(!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

export {
    fetchManufacturers,
    fetchModelsByManufacturer
}