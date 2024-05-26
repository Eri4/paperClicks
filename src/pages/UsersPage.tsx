import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import UserModal from '../components/UserModal';
import { createUser, updateUser, deleteUser, getUsers } from '../services/api';
import { User } from "../types/validationSchema";
import {SubmitHandler} from "react-hook-form";

const UsersPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    };

    const handleCreateUser = () => {
        setSelectedUser(undefined);
        setIsModalOpen(true);
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDeleteUser = async (userId: number | undefined) => {
        if (userId) {
            await deleteUser(userId);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        }
    };

    const handleSubmit: SubmitHandler<User> = async (data: User) => {
        if (selectedUser) {
            await updateUser(selectedUser.id, data);//kur i ben update te dhenave qe shton kjo do hedh nje error sepse ato nuk ekzistojne ne server, mund ta komentosh ne qofte se do.
            setUsers(prevUsers =>
                prevUsers.map(user => (user.id === selectedUser.id ? { ...data, id: selectedUser.id } : user))
            );
        } else {
            const newUserId = Math.max(...users.map(user => user.id as number), 0) + 1;
            const newUser = { ...data, id: newUserId };
            await createUser(newUser);
            setUsers(prevUsers => [...prevUsers, newUser]);
        }
        setIsModalOpen(false);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={handleCreateUser}
            >
                Create New User
            </button>
            <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
            {isModalOpen && (
                <UserModal onClose={handleModalClose} onSubmit={handleSubmit} initialValues={selectedUser} />
            )}
        </div>
    );
};

export default UsersPage;