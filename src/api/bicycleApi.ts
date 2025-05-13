import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export interface User {
    id?: number;
    username: string;
    email: string;
}

export interface Bicycle {
    id?: number;
    brand: string;
    model: string;
    type: string;
    price: number;
    assignedUserId?: number;
    assignedUser?: User;
}

export interface Rental {
    userId: number;
    bicycleId: number;
    username: string;
    bicycleBrand: string;
    bicycleModel: string;
    rentStartTime: string;
    rentEndTime?: string;
    isActive?: boolean;
}

export const getBicycles = async (brand?: string, model?: string): Promise<Bicycle[]> => {
    const params = new URLSearchParams();
    if (brand) params.append('brand', brand);
    if (model) params.append('model', model);
    const response = await axios.get(`${API_URL}/bicycles?${params.toString()}`);
    return response.data;
};

export const getBicycleById = async (id: number): Promise<Bicycle> => {
    const response = await axios.get(`${API_URL}/bicycles/${id}`);
    return response.data;
};

export const createBicycle = async (data: Bicycle): Promise<Bicycle> => {
    const response = await axios.post(`${API_URL}/bicycles/single`, {
        ...data,
        assignedUserId: data.assignedUserId || null
    });
    return response.data;
};

export const updateBicycle = async (id: number, data: Bicycle): Promise<Bicycle> => {
    const response = await axios.put(`${API_URL}/bicycles/${id}`, {
        ...data,
        id: id,
        assignedUserId: data.assignedUserId || null
    });
    return response.data;
};

export const deleteBicycle = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/bicycles/${id}`);
};

export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
};

export const createUser = async (user: User): Promise<User> => {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
};

export const updateUser = async (id: number, user: User): Promise<User> => {
    const response = await axios.put(`${API_URL}/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/users/${id}`);
};

export const getRentals = async (): Promise<Rental[]> => {
    const response = await axios.get(`${API_URL}/bicycles/rentals`);
    return response.data;
};

export const rentBicycle = async (userId: number, bicycleId: number): Promise<Rental> => {
    try {
        const response = await axios.post(`${API_URL}/bicycles/${bicycleId}/rent/${userId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to rent bicycle');
    }
};

export const returnBicycle = async (userId: number, bicycleId: number): Promise<Rental> => {
    try {
        const response = await axios.post(`${API_URL}/bicycles/${bicycleId}/return/${userId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to return bicycle');
    }
};