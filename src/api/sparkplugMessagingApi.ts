import { ChatWithMessages } from "./sparkplugModels";


const API_URL = "http://localhost:8080";

async function fetchChats(token: string): Promise<ChatWithMessages[]> {
    const response = await fetch(`${API_URL}/chats`, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    });

    
    if(!response.ok) {
        throw new Error(`${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
}

async function initializeChat(token: string, postingId: string): Promise<string> {
    const response = await fetch(`${API_URL}/chats/initial/${postingId}`, {
        method: 'POST',
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

async function sendMessage(token: string, chatId:string, message:string): Promise<Date> {
    const response = await fetch(`${API_URL}/messages/${chatId}`, {
        method: 'POST',
        headers: { 
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "content": message
        })
    });

    if(!response.ok) {
        throw new Error(`${response.statusText}`);
    }

    const data = await response.json();
    return new Date(data.timestamp);
}

export {
    fetchChats,
    initializeChat,
    sendMessage
}