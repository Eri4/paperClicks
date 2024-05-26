import React from 'react';
import { User } from "../types/validationSchema";
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

interface UserListProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (userId: number | undefined) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Phone</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-4 px-6">{user.id}</td>
                        <td className="py-4 px-6">{user.name}</td>
                        <td className="py-4 px-6">{user.email}</td>
                        <td className="py-4 px-6">{user.phone}</td>
                        <td className="py-4 px-6 text-center">
                            <div className="flex item-center justify-center">
                                <button
                                    className="w-4 mr-4 transform hover:text-purple-500 hover:scale-110"
                                    onClick={() => onEdit(user)}
                                >
                                    <FaPencilAlt />
                                </button>
                                <button
                                    className="w-4 transform hover:text-purple-500 hover:scale-110"
                                    onClick={() => onDelete(user.id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;