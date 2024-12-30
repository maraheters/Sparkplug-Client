
const local = true;
const API_URL = "http://localhost:8080"

export type Engine = {
    displacement: number;
    power: number;
    torque: number;
    fuelType: string;
    type: string;
}

export type Manufacturer = {
    name: string,
    country: string
}

export type Transmission = {
    gearboxType: string,
    numberOfGears: number
}

export type Car = {
    id: string;
    model: string;
    price: number;
    mileage: number;
    year: number;
    manufacturer: Manufacturer;
    color: string;
    description: string;
    category: string;
    drivetrain: string
    engine: Engine;
    transmission: Transmission
}

export type Posting = {
    id: string;
    creationDate: Date;
    creator: string;
    creatorId: string;
    car: Car;
    images: string[];
}

export type User = {
    id: string;
    username: string;
    password: string;
    authority: string;
    postings: Posting[];
}

const whoAmIRequest = async (token: string): Promise<string> => {
    const response = await fetch(`${API_URL}/users/authenticate`, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });
    
    if(!response.ok) {
        throw new Error(`${response.statusText}`);
    }

    const data = await response.text();
    return data;
}

const fetchUser = async (token: string): Promise<User> => {
    const response = await fetch(`${API_URL}/users/credentials`, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });
    
    if(!response.ok) {
        throw new Error(`${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

const fetchPostings = async (): Promise<Posting[]> => {
    const response = await fetch(`${API_URL}/postings`);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

const fetchPostingById = async (id: string): Promise<Posting> => {
    const response = await fetch(`${API_URL}/postings/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

const fetchPostingsByCreatorId = async (id: string): Promise<Posting[]> => {
    const response = await fetch(`${API_URL}/postings/user/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export { fetchPostings, fetchPostingById, fetchUser, fetchPostingsByCreatorId, whoAmIRequest };