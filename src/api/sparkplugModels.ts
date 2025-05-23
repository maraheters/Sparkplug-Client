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
    mileage: number;
    year: number;
    manufacturer: Manufacturer;
    color: string;
    categoryName: string;
    drivetrain: string
    engine: Engine;
    transmission: Transmission
}

export type Posting = {
    id: string;
    creationDate: Date;
    price: number;
    description: string;
    creator: string;
    creatorId: string;
    car: Car;
    images: string[];
}

export type User = {
    id: string;
    username: string;
    profilePicture: string;
    postingIds: string[]
}

export type UserAuth = {
    id: string;
    username: string;
    authority: string;
    authToken: string;
}

export type Message = {
    senderId: string;
    senderUsername: string;
    content: string;
    createdAt: Date;
    read: boolean;
}

export type ChatWithMessages = {
    chatId: string;
    postingId: string;
    seller: User;
    buyer: User;
    messages: Message[];
}