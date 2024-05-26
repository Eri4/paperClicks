import axios from 'axios';
import {User} from "../types/validationSchema.ts";

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
    return response.data;
};

export const createUser = async (user: User): Promise<User> => {
    const response = await axios.post<User>(`${API_BASE_URL}/users`, user);
    return response.data;
};

export const updateUser = async (userId: number | undefined, user: User): Promise<User> => {
    const response = await axios.put<User>(`${API_BASE_URL}/users/${userId}`, user);
    return response.data;
};

export const deleteUser = async (userId: number | undefined): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/users/${userId}`);
};