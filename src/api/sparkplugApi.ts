import { Posting, User } from "./sparkplugModels";

const API_URL = "http://localhost:8080"


const fetchCurrentUser = async (token: string): Promise<User> => {
    const response = await fetch(`${API_URL}/users/me`, {
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
    const response = await fetch(`${API_URL}/users/${id}/postings`);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

const fetchPostingsByCreatorUsername = async (username: string): Promise<Posting[]> => {
    const response = await fetch(`${API_URL}/users/${username}/postings`);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

const fetchWishlist = async (token: string): Promise<Posting[]> => {
    const response = await fetch(`${API_URL}/users/wishlist`, {
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

const fetchImageByUrl = async (url: string): Promise<Blob> => {
    const objectName = url.split('/').pop();
    console.log(objectName);
    const response = await fetch(`${API_URL}/postings/images?object-name=${objectName}`);

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.blob();
}

const addToWishlist = async (token: string, postingId: string): Promise<string> => {
    const response = await fetch(`${API_URL}/users/wishlist/${postingId}`, {
        method: 'POST',
        headers: {
            'Authorization' : 'Bearer ' + token,
        }
    });

    if(!response.ok) {
        throw new Error(`${response.statusText}`);
    }

    const data = await response.text();
    return data;
}

const removeFromWishlist = async (token: string, postingId: string): Promise<string> => {
    const response = await fetch(`${API_URL}/users/wishlist/${postingId}`, {
        method: 'DELETE',
        headers: {
            'Authorization' : 'Bearer ' + token,
        }
    });

    if(!response.ok) {
        throw new Error(`${response.statusText}`);
    }

    const data = await response.text();
    return data;
}

const uploadCar = async (token: string, formData: any): Promise<string> => {

    const response = await fetch(`${API_URL}/postings`, {
        method: 'POST',
        headers: {
            'Authorization' : 'Bearer ' + token,
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error(`${response.statusText}`);
    }

    const data = await response.text();
    return data;
}

const updateCarByPostingId = async (token: string, id:string, formData: any): Promise<string> => {

    const response = await fetch(`${API_URL}/postings/${id}/car`, {
        method: 'PUT',
        headers: {
            'Authorization' : 'Bearer ' + token,
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error(`${response.statusText}`);
    }

    const data = await response.text();
    return data;
}

const updateImagesByPostingId = async (token: string, id:string, formData: any): Promise<string> => {

    const response = await fetch(`${API_URL}/postings/${id}/images`, {
        method: 'PUT',
        headers: {
            'Authorization' : 'Bearer ' + token,
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error(`${response.statusText}`);
    }

    const data = await response.text();
    return data;
}

export { 
    fetchPostings, 
    fetchPostingById, 
    fetchPostingsByCreatorId, 
    fetchPostingsByCreatorUsername, 

    fetchCurrentUser, 

    fetchImageByUrl,

    fetchWishlist, 
    addToWishlist,
    removeFromWishlist,
    
    uploadCar,
    updateCarByPostingId,
    updateImagesByPostingId};