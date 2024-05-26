import axios from 'axios';
import { User } from "../types/validationSchema.ts";

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const createUser = async (user: User): Promise<User> => {
    try {
        const response = await axios.post<User>(`${API_BASE_URL}/users`, user);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (userId: number | undefined, user: User): Promise<User> => {
    try {
        const response = await axios.put<User>(`${API_BASE_URL}/users/${userId}`, user);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (userId: number | undefined): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/users/${userId}`);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};